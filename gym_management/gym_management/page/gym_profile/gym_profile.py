from datetime import datetime

import frappe
from frappe.utils import getdate

@frappe.whitelist()
def get_gym_details(user, date):
    print("user1",user)
    try:
        date = getdate(date)
    except Exception:
        date = getdate()

    data = frappe.db.sql(
            """select gym_member,  gym_trainer, from_date, to_date, plans, gym_trainer_mobile_no, creation
        from `tabGym Membership`
        where from_date <= '{0}' and to_date >= '{1}' and
            full_name = '{2}' 
        order by creation asc""".format(
                date, date, user
            ),
        )
    data2 = frappe.db.sql(
            """select gym_member,  gym_trainer, from_date, to_date, plans, gym_trainer_mobile_no, creation
        from `tabGym Membership`
        where 
            full_name = '{0}' 
        order by to_date asc""".format(
                 user
            ),
        )
    return data, data2

@frappe.whitelist()
def get_gym_details2(user, date):
    print("user2",user)
    try:
        date = getdate(date)
    except Exception:
        date = getdate()

    data2 = frappe.db.sql(
            """select gym_member,  gym_trainer, from_date, to_date, plans, gym_trainer_mobile_no, creation
        from `tabGym Membership`
        where 
            full_name = '{0}' 
        order by to_date asc""".format(
                 user
            ),
        )
    print("data2",data2)
    return data2

    