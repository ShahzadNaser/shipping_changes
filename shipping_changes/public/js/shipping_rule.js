
frappe.ui.form.on('Shipping Rule', {
	toggle_reqd: function(frm) {
		frm.toggle_reqd("shipping_amount", frm.doc.calculate_based_on === 'Fixed,Shipping Carrier');
        setTimeout(function(){
            cur_frm.toggle_reqd("conditions", !["Fixed","Shipping Carrier"].includes(cur_frm.doc.calculate_based_on));
        },100)
	}
});
