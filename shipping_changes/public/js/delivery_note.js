
frappe.ui.form.on('Delivery Note', {
	location: function(frm) {
        frm.trigger("shipping_rule");
    }
});

frappe.ui.form.on('Delivery Note Item', {
	item_volumn: function(frm,cdt,cdn) {
        frm.trigger("shipping_rule");
    }
});
