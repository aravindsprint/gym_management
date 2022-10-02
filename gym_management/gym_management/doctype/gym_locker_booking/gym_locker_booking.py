# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt


import frappe
from frappe.model.document import Document
from frappe.model.docstatus import DocStatus

class GymLockerBooking(Document):
    def before_save(self):
        print("self.date", self.date)
        self.validate_maximum_limit()
   
    def validate_maximum_limit(self):
        self.validate_membership()
        max_locker = frappe.db.get_single_value('Gym Settings','max_locker')
        print("max_locker",max_locker);
        locker_book = self.locker_book
        # count = frappe.db.sql("""
        # select sum(locker_book) as total_locker from `tabGym Locker Booking` where docstatus = 1 and date = %s
        # """,(self.date),
        # as_dict=True,)
        count = frappe.db.sql("""
        select sum(i.locker_book) as locker_book, i.date, i.gym_member as gym_member 
        from `tabGym Locker Booking` i
        where i.docstatus = 1 and 
        i.gym_member = '{0}' and i.date = '{1}' group by i.gym_member
        """.format(self.gym_member, self.date), as_dict=True)
        print("count",count)
        #print("count",count)
        if not count:
            print("empty")
            if locker_book > max_locker:
                frappe.throw('Maximum limit reached for booking lockers')
        else:
            total_locker = (count[0].locker_book)
            print("total_locker",total_locker)
            print("locker_book",locker_book)
            #day_locker = total_locker + locker_book
            #print("type", type(total_locker))
            if total_locker != None:
                day_locker = total_locker + locker_book
                if day_locker > max_locker:
                    frappe.throw('Maximum limit reached for booking lockers, you can book max 2 lockers per day')   
            

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
