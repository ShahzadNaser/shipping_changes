
frappe.ui.form.on('Sales Order', {
	location: function(frm) {
        frm.trigger("shipping_rule");
    }
});
