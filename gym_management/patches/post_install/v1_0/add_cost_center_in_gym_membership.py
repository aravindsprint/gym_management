import frappe


def execute():
	frappe.reload_doc("gym_management", "doctype", "gym_membership")
	gym_membership = frappe.qb.DocType("Gym Membership")

	posted_date = "30-09-2022"
	default_cost_center = "Main - TMF"
	frappe.qb.update(gym_membership).set(gym_membership.cost_center, default_cost_center).where(
		gym_membership.posting_date <= posted_date
	).run()
