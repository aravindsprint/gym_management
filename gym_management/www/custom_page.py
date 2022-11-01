import frappe
from jinja2 import Template
from frappe.model.document import Document



def get_context(context):
    context.users = frappe.get_list("User", fields=["first_name", "last_name"])
    context.users_data = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
    context.seq = [1,2,3,4,5]





vlan_j2 = '''{% for vlan in vlans %}
vlan {{ vlan['id'] }}
{% if vlan.get('name') -%}
name {{ vlan['name'] }}
{%- endif %}
{% endfor %}'''

vlans = [{"id": "10"}, {"id": "20", "name": "printer"}]

t = Template(vlan_j2,  trim_blocks=True, lstrip_blocks=True, keep_trailing_newline=True)

print(t.render(vlans=vlans))  