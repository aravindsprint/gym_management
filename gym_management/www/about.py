import frappe

def get_context(context):
    context.about_us_settings = frappe.get_doc('About Us Settings')
    # context.base_template_path = "frappe/templates/test/_test_base_breadcrumbs.html"
    print("context.about_us_settings",context.about_us_settings)
    # read query_params in the browser url
    query_params = frappe.utils.get_url()
    print("query_params",query_params);
    context.name = "Aravind"
    context.add_breadcrumbs = 1
    context.show_sidebar = 1
    print("\n\n\n context \n\n\n",context)
    return context