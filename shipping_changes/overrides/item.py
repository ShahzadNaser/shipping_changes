import frappe

def before_save(doc, method):
    for row in doc.get("uoms"):
        row.volume_ccm = round(row.get("length") * row.get("breadth") * row.get("width"),2)
