// Copyright (c) 2022, Aravind and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Fitness Track"] = {
	"filters": [{
    fieldname: "number_filter",
    label: "Number Filter",
    fieldtype: "Select",
    //You can supply the options as a string of new-line (\n) separated values,
    //    or as an array of strings such as options: ["1","2","3","4","5","6","7"],
    options: "1\n2\n3\n4\n5\n6\n7",
    default: 3
    },
    {
    fieldname: "check_filter",
    label: "Check Filter",
    fieldtype: "Check",
    default: 1,
    },
    {
    fieldname: "date_filter",
    label: "Date Filter",
    fieldtype: "Date",
    //Note the following default attribute, which contains an API call
    default: frappe.datetime.get_today()
    },
    {
    fieldname: "user_filter",
    label: "User Filter",
    fieldtype: "Link",
    options: "User",
    reqd: 1,
    }

	]
};


// frappe.query_reports["Fitness Track"] = {
// 	"treeView": true,
// 	"name_field": "name",
// 	"parent_field": "name",
// 	"initial_depth": 1,			//The level to which the initial rendering will expand to
// 	//onload: function () {
// 		//var filter = frappe.query_report.get_filter("name_filter");
// 		//if (frappe.user.has_role("Administrator") || frappe.user.has_role("System Manager")) {
// 			//filter.set_input("Goofy");
// 		//} else {
// 			//filter.set_input(frappe.user.name);
// 		//};
// 		//filter.refresh();
// 		//frappe.query_report.refresh();
// 	//},
// 	"filters": [
// 		{
// 			fieldname: "name_filter",
// 			label: "Name Filter",
// 			fieldtype: "Link",
// 			options: "User",
// 			reqd: 1,
// 			default: (frappe.user.has_role("Administrator") || frappe.user.has_role("System Manager")) ? "" : frappe.user.name,
// 			hidden: !(frappe.user.has_role("Administrator") || frappe.user.has_role("System Manager")),
// 			on_change: function(query_report){
// 				query_report.set_filter_value('subject_filter', []);
// 				query_report.refresh();
// 			},
// 		},
// 		{
// 			fieldname: "subject_filter",
// 			label: "Subject Filter",
// 			fieldtype: "MultiSelectList",
// 			get_data: function(txt) {
// 				if (frappe.query_report.get_filter_value('name_filter')) {
// 					var name = frappe.query_report.get_filter_value("name_filter");
// 					return frappe.db.get_list("Activity Log", {fields: ['subject AS value', 'subject AS label', 'subject AS description'], filters: {"user": name}, distinct: 1, order_by: "subject"});
// 					//return frappe.db.get_link_options("Activity Log", txt, {"user":name});
// 				}
// 				else {
// 					return [];
// 				};
// 			},
// 			on_change: function(query_report) {
// 				query_report.refresh();
// 			},
// 		},
// 		{
// 			fieldname: "date_from_filter",
// 			label: "Date From Filter",
// 			fieldtype: "Date",
// 			default: frappe.datetime.add_months(frappe.datetime.get_today(), -1)
// 		},
// 		{
// 			fieldname: "date_to_filter",
// 			label: "Date To Filter",
// 			fieldtype: "Date",
// 			default: frappe.datetime.get_today()
// 		}
// 	],
// };
