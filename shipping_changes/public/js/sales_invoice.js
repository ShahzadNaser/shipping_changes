
frappe.ui.form.on('Sales Invoice', {
	location: function(frm) {
        frm.trigger("shipping_rule");
    }
});


frappe.ui.form.on('Sales Invoice Item', {
	item_volumn: function(frm,cdt,cdn) {
        frm.trigger("shipping_rule");
    }
});
