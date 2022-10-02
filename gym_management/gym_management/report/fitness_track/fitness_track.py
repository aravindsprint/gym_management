# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt

# import frappe


# def execute(filters=None):
#     columns = [
#     {'fieldname':'letter','label':'Letter','fieldtype':'Data','dropdown':False,'sortable':False, 'align':'right','width':200},
#     {'fieldname':'number','label':'Number','fieldtype':'Int','dropdown':False,'sortable':False, 'align':'right','width':200}
#     ]
#     data = [
#     {'letter':'c','number':2,'indent':0},
#     {'letter':'a','number':2,'indent':1},
#     {'letter':'t','number':8,'indent':2},
#     {'letter':'s','number':7,'indent':0}
#     ]
#     data = [dic for dic in data if dic["number"] > int(filters.number_filter)]
#     print("data",data)
#     message = [
#     "The letters '<b>cats</b>' in numbers is <span style='color:Red;'>2287</span>",
#     "<br>",
#     "The letters '<b>dogs</b>' in numbers is <span style='color:Blue;'>3647</span>"
#     ]
#     message.append("<br>The value of the Number Filter is : " + filters.get("number_filter"))
#     chart = {
#     'data':{
#         'labels':['d','o','g','s'],
#         'datasets':[
#             #In axis-mixed charts you have to list the bar type first
#             {'name':'Number','values':[3,6,4,7],'chartType':'bar'},
#             {'name':'Vowel','values':[0,1,0,0],'chartType':'line'}
#         ]
#     },
#     'type':'axis-mixed'
#     }
#     report_summary = [
#     {"label":"cats","value":2287,'indicator':'Red'},
#     {"label":"dogs","value":3647,'indicator':'Blue'}
#     ]
#     return columns, data, message, chart, report_summary


import frappe
import datetime
def execute(filters=None):
    # frappe.msgprint("<pre>{}</pre>".format(filters))
    columns = [
        {'fieldname':'name','label':'ID','fieldtype':'Data'},
        {'fieldname':'first_name','label':'First Name','fieldtype':'Data'},
        {'fieldname':'last_name','label':'Last Name','fieldtype':'Data'},
        {'fieldname':'creation','label':'Creation','fieldtype':'Date'}
    ]
    data = frappe.db.get_all('User', ['name','first_name','last_name','creation'])
    print("data1", data)
    # frappe.msgprint("<span style='color:Red;'>Once this popup has served it's purpose, then comment out it's invocation, viz. #frappe.msgprint...</span><br><br>" + "<pre>{}</pre>".format(frappe.as_json(data)))
    datefilter = datetime.datetime.strptime(filters.date_filter,"%Y-%m-%d").date()
    today = datetime.datetime.now(tz=None).date()
    data = [dic for dic in data if dic.creation.date() > datefilter]
    print("data2", data)
    data = sorted(data, key=lambda k: k['first_name'])
    chart = {
        'title':"Script Chart Tutorial : Days since the user's database record was created",
        'data':{
            'labels':[str(dic.first_name) + " " + str(dic.last_name) for dic in data],
            'datasets':[{'values':[(today - dic.creation.date()).days for dic in data]}]
        },
        'type':'line',
        'height':300,
        'colors':['#F16A61'],
        'lineOptions':{'hideDots':0, 'dotSize':6, 'regionFill':1}
    }
    report_summary = [{"label":"Count","value":len(data),'indicator':'Red' if len(data) < 10 else 'Green'}]
    return columns, data, None, chart, report_summary

# import frappe
# import datetime
# def execute(filters=None):
#     #frappe.msgprint("<pre>{}</pre>".format(filters))
#     columns = [
#         {'fieldname':'name','label':'Name'},
#         {'fieldname':'full_name','label':'Full Name'},
#         {'fieldname':'user_type','label':'User Type'},
#         {'fieldname':'owner','label':'Owner'},
#         {'fieldname':'subject','label':'Subject'},
#         {'fieldname':'status','label':'Status'},
#         {'fieldname':'creation','label':'Creation'}
#     ]
#     data = []
#     parent = frappe.db.sql("SELECT t1.name, t1.full_name, t1.user_type, t2.owner FROM `tabUser` AS t1 JOIN `tabUser Type` AS t2 ON t1.user_type = t2.name", as_dict=1)
#     #frappe.msgprint("<pre>{}</pre>".format(frappe.as_json(parent)))
#     for dic_p in parent:
#         dic_p["indent"] = 0
#         data.append(dic_p)
#         #frappe.msgprint(dic_p["name"])
#         child = frappe.db.sql("SELECT subject, status, creation FROM `tabActivity Log` WHERE user = '" + dic_p["name"] + "'", as_dict=1)
#         #frappe.msgprint("<pre>{}</pre>".format(frappe.as_json(child)))
#         for dic_c in child:
#             dic_c["indent"] = 1
#             data.append(dic_c)
#     return columns, data

# import frappe
# import datetime
# def execute(filters=None):
# 	if filters.date_from_filter and filters.date_to_filter:
# 		if filters.date_from_filter > filters.date_to_filter:
# 			frappe.throw("The 'From Date' ({}) must be before the 'To Date' ({})".format(filters.date_from_filter, filters.date_to_filter))
# 	if filters.date_from_filter == None:
# 		filters.date_from_filter = "2000-01-01"
# 	if filters.date_to_filter == None:
# 		filters.date_to_filter = frappe.datetime.get_today()
# 	conditions = " WHERE creation BETWEEN '" + filters.date_from_filter + "' AND '" + filters.date_to_filter + "'"
# 	if filters.get("name_filter"):
# 		name = filters.get("name_filter")
# 		conditions += f" AND user = '{name}'"
# 	# if len(filters.get("subject_filter")) > 0:
# 		# subject = ','.join("'{0}'".format(x) for x in filters.get("subject_filter"))
# 		# conditions += " AND subject IN (" + subject + ")"
# 	columns = [
# 		{'fieldname':'name','label':'Name','width':'250'},
# 		{'fieldname':'full_name','label':'Full Name','width':'250'},
# 		{'fieldname':'subject','label':'Subject','width':'350'},
# 		{'fieldname':'status','label':'Status','width':'100'},
# 		{'fieldname':'creation','label':'Creation','width':'250'}
# 	]
# 	data = []
# 	users = frappe.get_list("User", fields=["name","full_name","'0' AS indent"], filters=[{"name":filters.get("name_filter")}], order_by='full_name ASC')
# 	for user in users:
# 		user["has_value"] = True
# 		data.append(user)
# 		activities = frappe.db.sql("SELECT subject, status, creation, '1' AS indent FROM `tabActivity Log`" + conditions, as_dict=1)
# 		for activity in activities:
# 			activity["has_value"] = False
# 			data.append(activity)
# 	return columns, data