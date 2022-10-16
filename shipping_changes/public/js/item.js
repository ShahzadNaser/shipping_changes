frappe.ui.form.on('UOM Conversion Detail', {
	length: function(frm,cdt, cdn) {
		var item = frappe.get_doc(cdt, cdn);
        var volume_ccm = flt((item.length || 0) * (item.breadth || 0) * (item.width || 0))
        frappe.model.set_value(item.doctype, item.name,"volume_ccm",volume_ccm);
    },
    breadth: function(frm, cdt, cdn){
		var item = frappe.get_doc(cdt, cdn);
        var volume_ccm = flt((item.length || 0) * (item.breadth || 0) * (item.width || 0))
        frappe.model.set_value(item.doctype, item.name,"volume_ccm",volume_ccm);

    },
    width: function(frm, cdt, cdn){
		var item = frappe.get_doc(cdt, cdn);
        var volume_ccm = flt((item.length || 0) * (item.breadth || 0) * (item.width || 0))
        frappe.model.set_value(item.doctype, item.name,"volume_ccm",volume_ccm);
    }
});