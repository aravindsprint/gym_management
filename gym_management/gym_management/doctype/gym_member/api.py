# import frappe

# @frappe.whitelist( )
# def check_same_city_members(city):
# 	return frappe.db.sql(f"""SELECT name, full_name FROM `tabGym Member` WHERE city= '{city}';""", as_dict=True)
	# return frappe.db.sql(f"""SELECT full_name FROM `tabGym Member` WHERE city= 'Kovai';""", as_dict=True)  