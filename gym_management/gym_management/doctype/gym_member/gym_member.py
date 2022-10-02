# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class GymMember(Document):
	#this method will run every time a document is saved
    
    def before_save(self):
      print("self",self)
      print("self",self.first_name)
      print("self",self.last_name)
      self.full_name = f'{self.first_name} {self.last_name or ""}'
	
