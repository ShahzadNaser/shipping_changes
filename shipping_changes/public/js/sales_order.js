
frappe.ui.form.on('Sales Order', {
	location: function(frm) {
        frm.trigger("shipping_rule");
    }
});

frappe.ui.form.on('Sales Order Item', {
	item_volumn: function(frm,cdt,cdn) {
        frm.trigger("shipping_rule");
    }
});
