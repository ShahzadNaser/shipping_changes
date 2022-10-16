
frappe.ui.form.on('Delivery Note', {
	location: function(frm) {
        frm.trigger("shipping_rule");
    }
});
