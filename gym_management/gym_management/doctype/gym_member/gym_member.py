# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document
from frappe.utils.background_jobs import enqueue
from frappe import enqueue

class GymMember(Document):
	#this method will run every time a document is saved
	def before_save(self):
		print("self",self)
		print("self",self.first_name)
		print("self",self.last_name)
		self.full_name = f'{self.first_name} {self.last_name or ""}'
		frappe.publish_realtime("Saved")

	def before_validate(self):
		print("self before_validate",self)   
	 
	def on_change(self):
		print("\n\n\n\n self \n\n\n",self)
		# print("selfcity",self.city)
		frappe.publish_realtime("Saved", {"data": self})
		frappe.enqueue(self.send_email, doc=self, queue='short', now=True, is_async=True,  timeout=300, )
		print("\n\n\n After enqueue \n\n\n")
		frappe.publish_realtime('event_name', data={'key': 'value'})


	def send_email(doc):
		print("\n\n doc", doc)
		print("\n\n doc mail",doc.email)
		print("\n\n\n inside send_email \n\n\n")
		email_subject = "Your Document has been modified"
		email_content = "Announcement from The Muscle Gym"
		frappe.sendmail(
		#recipients=recipients,
		recipients = doc.email,
		subject=email_subject,
		sender='aravindsprint@gmail.com',
		message=email_content
		)

	# def validate(self):
	#   print("Validate the Gym Member")