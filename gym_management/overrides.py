from gym_management.gym_management.doctype.gym_member.gym_member import GymMember
from frappe.model.document import Document

class UpdateGymMember(Document):
    def before_validate(self):
        print("\n\n\n Override Member\n\n\n")
        if self.city == "":
            print("\n\n City is empty\n\n")
            self.city = "Tiruppur"