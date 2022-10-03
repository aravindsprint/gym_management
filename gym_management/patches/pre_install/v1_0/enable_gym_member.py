import frappe


def execute():
	frappe.reload_doc("gym_management", "doctype", "gym_member")

	gym_member = frappe.qb.DocType("Gym Member")

	(
		frappe.qb.update(gym_member)
		.set(gym_member.enabled, 1)
		.where(gym_member.creation >= "2022-09-01")  # date when this field was released
	).run()
