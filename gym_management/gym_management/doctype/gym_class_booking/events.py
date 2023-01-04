import frappe

def on_submit(doc, event):
	print("doc.email",doc.email)
	print(f"\n\n\n {doc}, {event}\n\n\n", doc, event)
	frappe.sendmail(recipients=[doc.email], subject="Gym Class Booking Confirmation", message="Thank you for registering!")
	# frappe.throw("Doc Events Occured")