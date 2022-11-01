# Copyright (c) 2022, Aravind and Contributors
# See license.txt


import json

import unittest

import frappe
from frappe.tests.utils import FrappeTestCase
from frappe.utils import add_days, flt, getdate, nowdate


def create_gym_member():
	if not frappe.db.exists("Gym Member", "_Test Gym Member"):
		gym_member = frappe.new_doc("Gym Member")
		gym_member.first_name = "_Test Gym Member"
		gym_member.last_name = "_Test Last Name"
		gym_member.enabled = 1
		gym_member.insert()

def create_gym_membership():
	if not frappe.db.exists("Gym Membership", "_Test Gym Membership"):
		gym_membership = frappe.new_doc("Gym Membership")
		gym_membership.gym_member = "_Test Gym Member"
		gym_membership.posting_date = "2022-10-31"
		gym_membership.from_date = "2022-10-01"
		gym_membership.to_date = "2022-10-31"
		gym_membership.submit()      

class TestGymClassBooking(FrappeTestCase):
	def setUp(self):
		create_gym_member()
		create_gym_membership()

	def test_validate_membership(self):
		print("self",self)


		valid_membership = frappe.db.exists("Gym Membership",{
			"gym_member": "_Test Gym Member",
			"docstatus": 1,
			"from_date": ("<=", "2022-10-01"),
			"to_date": (">=", "2022-10-31"),
			},
		)

		gcb = frappe.new_doc("Gym Class Booking")
		gcb.gym_member = "_Test Gym Member"
		gcb.date = "2022-10-31"
		gcb.locker_book = 2
		gcb.gym_membership = ""
		print("valid_membership",valid_membership)
		self.assertEqual(gcb.gym_member, "_Test Gym Member")
		self.assertRaises(frappe.ValidationError, gcb.save)
		

		gcb.delete()
