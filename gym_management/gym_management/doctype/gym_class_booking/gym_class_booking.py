# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.docstatus import DocStatus

class GymClassBooking(Document):
    def before_save(self):
        print("self", self.gym_classes)
        print("self.date", self.date)
        #frappe.db.set_global_default("year_start_date", "01-04-2022")
        #frappe.db.set_global_default("year_end_date", "31-03-2023")
        self.validate_maximum_limit()
        #self.validate_membership()

    def validate_maximum_limit(self):
        self.validate_membership()
        max_booking = frappe.db.get_single_value('Gym Settings','max_booking')
        print("max_booking",max_booking)
        # count = frappe.db.sql("""
        # select count(gym_class) as gym_class from `tabGym Classes` where docstatus = 1 and modified like %s
        # ""","%{0}%".format(self.date), as_dict=True)
        count = frappe.db.sql("""
        select sum(i.gym_qty) as gym_class, s.date, s.gym_member as gym_member 
        from `tabGym Classes` i, `tabGym Class Booking` s 
        where s.name=i.parent and i.docstatus = 1 and 
        s.gym_member = '{0}' and s.date = '{1}' group by s.gym_member
        """.format(self.gym_member, self.date), as_dict=True)
        print("count",count)
        if not count:
            print("empty")
        else:
            print("not empty")    
            past_gymclass = (count[0].gym_class)
            print("past_gymclass",past_gymclass)
            gymclass = []
            gymclass = self.gym_classes
            current_gymclass = len(self.gym_classes)
            total_gymclass = past_gymclass + current_gymclass
            print("total_gymclass",total_gymclass)
            #print("current_gymclass",len(current_gymclass))
            if total_gymclass != None and int(total_gymclass) > max_booking:
                frappe.throw('Maximum limit reached for Gym Class booking, You can book max 2 class per day')
        

    def validate_membership(self):
        # check if a valid membership exist for this library member
        valid_membership = frappe.db.exists("Gym Membership",{
            "gym_member": self.gym_member,
            "docstatus": DocStatus.submitted(),
            "from_date": ("<=", self.date),
            "to_date": (">=", self.date),
            },
        )
        if not valid_membership:
            frappe.throw("The member does not have a valid membership")    
    
