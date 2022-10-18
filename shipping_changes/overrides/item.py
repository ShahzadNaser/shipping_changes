import frappe

def before_save(doc, method):
    for row in doc.get("uoms"):
        row.volume_ccm = round((row.get("length") or 0) * (row.get("breadth") or 0) * (row.get("width") or 0),2)
