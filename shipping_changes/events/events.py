import frappe
from erpnext.stock.doctype.batch.batch import get_batch_no

@frappe.whitelist()
def get_item_details(item_code=None, warehouse=None):
    if not item_code:
        return False
    stock_uom = frappe.db.get_value("Item",item_code,"stock_uom")
    result = frappe.db.get_value("UOM Conversion Detail",{"parent":item_code,"uom":stock_uom},["length","width","breadth","volume_ccm"],as_dict=True) or False
    return result