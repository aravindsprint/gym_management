# Copyright (c) 2022, Aravind and Contributors
# See license.txt

# import frappe
from frappe.tests.utils import FrappeTestCase


def create_gym_membership():
	if not frappe.db.exists("Gym Membership", "_Test Gym Membership"):
		gym_membership = frappe.new_doc("Gym Membership")
		gym_membership.gym_member = "_Test Gym Member"
		gym_membership.posting_date = "2022-10-01"
		gym_membership.from_date = "2022-10-01"
		gym_membership.to_date = "2022-10-31"
		gym_membership.insert() 

class TestGymMembership(FrappeTestCase):
	def setUp(self):
		create_gym_membership()
