import frappe
from jinja2 import Template
from frappe.model.document import Document



def get_context(context):
    context.users = frappe.get_list("User", fields=["first_name", "last_name"])
    context.users_data = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
    context.seq = [1,2,3,4,5]