import frappe
import string
from datetime import date
import datetime as DT
from frappe.utils import add_to_date, cast, is_html, nowdate, validate_email_address
from email.utils import formataddr
from frappe.core.doctype.communication.email import _make as make_communication
from frappe.model.docstatus import DocStatus
from frappe.core.doctype.role.role import get_info_based_on_role, get_user_info
from frappe.core.doctype.sms_settings.sms_settings import send_sms
from frappe.desk.doctype.notification_log.notification_log import enqueue_create_notification
from frappe.integrations.doctype.slack_webhook_url.slack_webhook_url import send_slack_message
from frappe.model.document import Document
from frappe.modules.utils import export_module_json, get_doc_module
from frappe.utils import add_to_date, cast, is_html, nowdate, validate_email_address
from frappe.utils.jinja import validate_template
from frappe.utils.safe_exec import get_safe_globals
from frappe.utils.background_jobs import enqueue
from frappe import enqueue



def daily():
    print("\n\n\n Send Email\n\n\n")
    current_day = date.today().strftime("%A")
    if(current_day != "Sunday"):
        today_date = DT.date.today()
        week_ago_date = today_date - DT.timedelta(days=30)
        print("week_ago_date",week_ago_date)
        emailIds = frappe.db.sql("""
        select  s.gym_member as gym_member, s.email as email 
        from  `tabGym Class Booking` s 
        where  s.docstatus = 1 and 
        s.date >= '{0}' group by s.email order by s.date asc
        """.format(week_ago_date), as_dict=True)
        print("emailIds",emailIds)
        for x in emailIds:
            print(x)
            for key, value in x.items():
                if(key == "gym_member"):
                    search_gym_member = value
                if(key == "email"):
                    recipients = value
                    print("recipients",recipients)
                    emailSubject = "Last Week Class Attended Summary in Our Tirupur Muscle Factory"
                    sender = "aravindsprint@gmail.com"
                    content = "<h4>Hello, Customer </h4><p>Last Week Class Attened Summary. Please make a note for that.</p><table class='table table-bordered'><tr><th>Date</th><th>Class Name</th><th>Time</th></tr>"
                    class_list = frappe.db.sql("""
                    select  s.date, i.gym_class as gym_class, i.gym_time as gym_time
                    from `tabGym Classes` i, `tabGym Class Booking` s 
                    where s.name=i.parent and i.docstatus = 1 and 
                    s.gym_member = '{0}' and s.date >= '{1}' and s.date <= '{2}' order by s.date asc
                    """.format(search_gym_member, week_ago_date, today_date), as_dict=True)
                    for class_obj in class_list:
                        for key, value in class_obj.items():
                            if(key == "date"):
                                gymdate = str(value.strftime('%d/%m/%Y'))
                            if(key == "gym_class"):
                                gymclass = value
                            if(key == "gym_time"):
                                gymtime = value
                                content = content + "<tr><td>"+gymdate+"</td><td>"+gymclass+"</td><td>"+gymtime+"</td></tr>"  
                    content = content + "</table>"
                    print("\n\n\n Outside send_email \n\n\n")
                    frappe.sendmail(
                    recipients=recipients,
                    subject=emailSubject,
                    sender=sender,
                    message=content
                    )
                    print("\n\n\n Outside send_email \n\n\n")

                   
    else:
        # print("Not Sunday")
        print("Sunday")


   






