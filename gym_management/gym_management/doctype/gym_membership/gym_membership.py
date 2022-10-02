# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.model.document import Document




class GymMembership(WebsiteGenerator):
	def before_save(self):
	    frappe.db.set_default("currency", "INR")
