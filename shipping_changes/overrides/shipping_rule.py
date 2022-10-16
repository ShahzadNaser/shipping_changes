from __future__ import unicode_literals

import frappe
from frappe import _, msgprint, throw
from frappe.utils import flt, fmt_money

from erpnext.accounts.doctype.shipping_rule.shipping_rule import ShippingRule

class CustomShippingRule(ShippingRule):
	def apply(self, doc):
		'''Apply shipping rule on given doc. Called from accounts controller'''

		shipping_amount = 0.0
		by_value = False

		if doc.get_shipping_address():
			# validate country only if there is address
			self.validate_countries(doc)

		if self.calculate_based_on == 'Net Total':
			value = doc.base_net_total
			by_value = True

		elif self.calculate_based_on == 'Net Weight':
			value = doc.total_net_weight
			by_value = True

		elif self.calculate_based_on == 'Fixed':
			shipping_amount = self.shipping_amount

		elif self.calculate_based_on == 'Shipping Carrier':
			shipping_amount = calculate_shipping_charges(doc)
			doc.shipping_charges = shipping_amount

		# shipping amount by value, apply conditions
		if by_value:
			shipping_amount = self.get_shipping_amount_from_rules(value)

		# convert to order currency
		if doc.currency != doc.company_currency:
			shipping_amount = flt(shipping_amount / doc.conversion_rate, 2)

		self.add_shipping_rule_to_tax_table(doc, shipping_amount)

def calculate_shipping_charges(doc):
	carrier = frappe.get_doc("Shipping Carrier","Shipping Carrier")
	default_freight = carrier.default_freight
	for row in carrier.get("shipping_carrier_locations"):
		if row.get("location") == doc.get("location"):
			default_freight = row.get("rate")
			break

	tv = 0
	cv = 0
	ca = carrier.min_amount
	for item in doc.items:
		uom_details = frappe.db.get_value("UOM Conversion Detail",{"parent":item.item_code,"uom":item.uom},["volume_ccm","conversion_factor"],as_dict=True)
		if uom_details:
			tv +=  (uom_details.volume_ccm or 0) * item.qty


	cv = tv if tv > (carrier.min_val) else carrier.min_val
	ca = ca if  ca > cv * default_freight else cv * default_freight

	if doc.meta.get_field("total_volume"):
		doc.total_volume = tv

	return ca + carrier.basic_charge