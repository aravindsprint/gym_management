import frappe


def execute():
	frappe.reload_doc("gym_management", "doctype", "gym_membership")
	gym_membership = frappe.qb.DocType("Gym Membership")

	posted_date = "2022-09-30"
	default_cost_center = "Main - TMF"
	frappe.qb.update(gym_membership).set(gym_membership.cost_center, default_cost_center).where(
		gym_membership.posting_date <= posted_date
	).run()
