# Copyright (c) 2022, Aravind and Contributors
# See license.txt

import frappe
from frappe.test_runner import make_test_records
from frappe.tests.utils import FrappeTestCase

# test_records = frappe.get_test_records("Gym Member")

def create_gym_member():
    if not frappe.db.exists("Gym Member", "_Test Gym Member"):
        gym_member = frappe.new_doc("Gym Member")
        gym_member.first_name = "_Test Gym Member"
        gym_member.last_name = "_Test Last Name"
        gym_member.insert()
        
class TestGymMember(FrappeTestCase):
    def setUp(self):
        create_gym_member()

    # def test_print(none):
    #     print("test hi")