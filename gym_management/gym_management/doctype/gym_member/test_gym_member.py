# Copyright (c) 2022, Aravind and Contributors
# See license.txt

import frappe
from frappe.test_runner import make_test_records
from frappe.tests.utils import FrappeTestCase

test_records = frappe.get_test_records("Gym Member")


class TestGymMember(FrappeTestCase):
    pass