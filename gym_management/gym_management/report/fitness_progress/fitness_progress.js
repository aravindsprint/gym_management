// Copyright (c) 2022, Aravind and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Fitness Progress"] = {
	"filters": [
		{
	        fieldname: "gym_member",
	        label: "Gym Member",
	        fieldtype: "Link",
	        options: "Gym Member",
	        reqd: 1,
	    },
	    {
			fieldname: "date_from_filter",
			label: "Date From Filter",
			fieldtype: "Date",
			default: frappe.datetime.add_months(frappe.datetime.get_today(), -1)
		},
		{
			fieldname: "date_to_filter",
			label: "Date To Filter",
			fieldtype: "Date",
			default: frappe.datetime.get_today()
		}

	]
};
