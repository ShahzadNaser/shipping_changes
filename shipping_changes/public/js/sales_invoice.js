
frappe.ui.form.on('Sales Invoice', {
	location: function(frm) {
        frm.trigger("shipping_rule");
    }
});
