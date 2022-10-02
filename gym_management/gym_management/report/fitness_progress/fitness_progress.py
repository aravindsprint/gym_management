# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt

import frappe
import datetime


def execute(filters=None):
    # frappe.msgprint("<pre>{}</pre>".format(filters))
    columns = [
        {'fieldname':'date','label':'Date','fieldtype':'Date','align':'left','width':200},
        {'fieldname':'gym_member','label':'Gym Member','fieldtype':'Data','align':'left','width':200},
        {'fieldname':'chest','label':'Chest','fieldtype':'Float','align':'right','width':200},
        {'fieldname':'weight','label':'Weight','fieldtype':'Float','align':'right','width':200},
        {'fieldname':'height','label':'Height','fieldtype':'Float','align':'right','width':200}
    ]
    data = frappe.db.get_all('Gym Fitness Progress', ['gym_member','date','chest','weight','height', 'modified'])
    print("data1", data)
    # frappe.msgprint("<span style='color:Red;'>Once this popup has served it's purpose, then comment out it's invocation, viz. #frappe.msgprint...</span><br><br>" + "<pre>{}</pre>".format(frappe.as_json(data)))
    datefilter = datetime.datetime.strptime(filters.date_from_filter,"%Y-%m-%d").date()
    print("datefilter", datefilter)
    today = datetime.datetime.now(tz=None).date()
    print("today",today)
    data = [dic for dic in data if dic.modified.date() > datefilter]
    print("data2", data)
    gym_member_filter = filters.get("gym_member")
    print("gym_member_filter",gym_member_filter)
    data = [dic for dic in data if dic.gym_member == gym_member_filter]
    print("data3", data)
    data = sorted(data, key=lambda k: k['date'])
    print("data4",data)
    chart = {
        'title':"Gym Member Fitness Progress Chart",
        # 'data':{
        #     'labels':[dic.date for dic in data],
        #     'datasets':[{"name": "weight", "chartType": "line","values":[dic.weight for dic in data]}],
        #     'datasets':[{"name": "height", "chartType": "bar","values":[dic.height for dic in data]}]
        # },
        'data': {
            'labels':[dic.date for dic in data],
            'datasets': [
            {
            "name": "Weight",
            "values": [dic.weight for dic in data],
            "chartType": 'bar'
            },
            {
            "name": "Chest",
            "values": [dic.chest for dic in data],
            "chartType": 'line'
            }
            ]
        },
        'type':'axis-mixed',
        # 'height':300,
        # 'colors':['#F16A61'],
        'lineOptions':{'hideDots':0, 'dotSize':6, 'regionFill':1}
    }
    # report_summary = [{"label":"Count","value":len(data),'indicator':'Red' if len(data) < 10 else 'Green'}]
    return columns, data, None, chart, None