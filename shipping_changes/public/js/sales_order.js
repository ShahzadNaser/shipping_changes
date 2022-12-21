
frappe.ui.form.on('Sales Order', {
	location: function(frm) {
        frm.trigger("shipping_rule");
    },
    update_item_details: function(item){
        console.log(item);
        return cur_frm.call({
            method: "shipping_changes.events.events.get_item_details",
            child: item,
            args: {
                "item_code": item.item_code,
                "warehouse": item.warehouse || cur_frm.doc.set_warehouse || ""
            },
            callback: function(r) {
                if(r.message){
                    frappe.model.set_value(item.doctype, item.name,"length", flt(r.message.length));
                    frappe.model.set_value(item.doctype, item.name,"width", flt(r.message.width));
                    frappe.model.set_value(item.doctype, item.name,"breadth", flt(r.message.breadth));
                    frappe.model.set_value(item.doctype, item.name,"item_volume",r.message.volume_ccm);
                }
            }
        });
    }
});

frappe.ui.form.on('Sales Order Item', {
	item_code: function(frm,cdt, cdn) {
		var item = frappe.get_doc(cdt, cdn);
        frm.events.update_item_details(item)
    },
    length: function(frm,cdt, cdn) {
        var item = frappe.get_doc(cdt, cdn);
        var volume_ccm = flt((item.length || 0) * (item.breadth || 0) * (item.width || 0))
        frappe.model.set_value(item.doctype, item.name,"item_volume",volume_ccm);
        frm.trigger("shipping_rule");

    },
    breadth: function(frm, cdt, cdn){
        var item = frappe.get_doc(cdt, cdn);
        var volume_ccm = flt((item.length || 0) * (item.breadth || 0) * (item.width || 0))
        frappe.model.set_value(item.doctype, item.name,"item_volume",volume_ccm);
        frm.trigger("shipping_rule");


    },
    width: function(frm, cdt, cdn){
		var item = frappe.get_doc(cdt, cdn);
        var volume_ccm = flt((item.length || 0) * (item.breadth || 0) * (item.width || 0))
        frappe.model.set_value(item.doctype, item.name,"item_volume",volume_ccm);
        frm.trigger("shipping_rule");
    }
});
