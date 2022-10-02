# Copyright (c) 2022, Aravind and contributors
# For license information, please see license.txt

import datetime
from datetime import datetime
from typing import List

import frappe
from frappe import _, scrub
from frappe.utils import add_days, add_to_date, flt, getdate
from frappe.utils import get_first_day as get_first_day_of_month
from frappe.utils import get_first_day_of_week, get_quarter_start, getdate

def execute(filters=None):

    return Analytics(filters).run()

class Analytics(object):
    def __init__(self, filters=None):
        self.filters = frappe._dict(filters or {})
        self.date_field = (
            "date"
        )
        self.months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]
        self.get_period_date_ranges()

    def run(self):
        self.get_columns()
        self.get_data()
        self.get_chart_data()

        # Skipping total row for tree-view reports
        skip_total_row = 0

        # if self.filters.tree_type in ["Gym Class", "Gym Trainer"]:
        if self.filters.tree_type in ["Gym Class"]:    
            skip_total_row = 1

        return self.columns, self.data, None, None, None, skip_total_row
    
    def get_columns(self):
        self.columns = [
            {
                "label": _(self.filters.tree_type),
                "options": self.filters.tree_type,
                "fieldname": "entity",
                "fieldtype": "Link",
                "width": 140,
            }
        ]
        # if self.filters.tree_type in ["Gym Class", "Gym Trainer"]:
        if self.filters.tree_type in ["Gym Class"]:    
            self.columns.append(
                {
                    "label": _(self.filters.tree_type + " Name"),
                    "fieldname": "entity_name",
                    "fieldtype": "Data",
                    "width": 140,
                }
            )

        for end_date in self.periodic_daterange:
            period = self.get_period(end_date)
            self.columns.append(
                {"label": _(period), "fieldname": scrub(period), "fieldtype": "Float", "width": 120}
            )

        self.columns.append(
            {"label": _("Total"), "fieldname": "total", "fieldtype": "Float", "width": 120}
        )

    def get_data(self):
        if self.filters.tree_type in ["Gym Class"]:    
            self.get_sales_transactions_based_on_gym_class_or_gym_trainer()
            self.get_rows()

      

    def get_sales_transactions_based_on_gym_class_or_gym_trainer(self):

      if self.filters["value_quantity"] == "Quantity":
          value_field = "gym_qty"

      self.entries = frappe.db.sql(
          """
          select i.gym_class as entity, i.gym_class as entity_name, i.{value_field} as value_field, s.{date_field}
          from `tabGym Classes` i , `tab{doctype}` s
          where s.name = i.parent and i.docstatus = 1 
          and s.{date_field} between %s and %s
      """.format(
              date_field=self.date_field, value_field=value_field, doctype=self.filters.doc_type
          ),
          (self.filters.from_date, self.filters.to_date),
          as_dict=1,
      )

      self.entity_names = {}
      for d in self.entries:
          self.entity_names.setdefault(d.entity, d.entity_name)
    
    def get_rows(self):
        self.data = []
        self.get_periodic_data()

        for entity, period_data in self.entity_periodic_data.items():
            row = {
                "entity": entity,
                "entity_name": self.entity_names.get(entity) if hasattr(self, "entity_names") else None,
            }
            total = 0
            for end_date in self.periodic_daterange:
                period = self.get_period(end_date)
                amount = flt(period_data.get(period, 0.0))
                print("amount",amount)
                row[scrub(period)] = amount
                total += amount

            row["total"] = total

            # if self.filters.tree_type == "Item":
            #   row["stock_uom"] = period_data.get("stock_uom")

            self.data.append(row)

    def get_periodic_data(self):
        self.entity_periodic_data = frappe._dict()

        for d in self.entries:
            period = self.get_period(d.get(self.date_field))
            self.entity_periodic_data.setdefault(d.entity, frappe._dict()).setdefault(period, 0.0)
            self.entity_periodic_data[d.entity][period] += flt(d.value_field)

            # if self.filters.tree_type == "Item":
            #   self.entity_periodic_data[d.entity]["stock_uom"] = d.stock_uom

    def get_period(self, posting_date):
        if self.filters.range == "Weekly":
            period = "Week " + str(posting_date.isocalendar()[1]) + " " + str(posting_date.year)
        elif self.filters.range == "Monthly":
            period = str(self.months[posting_date.month - 1]) + " " + str(posting_date.year)
        elif self.filters.range == "Quarterly":
            period = "Quarter " + str(((posting_date.month - 1) // 3) + 1) + " " + str(posting_date.year)
        else:
            #year = get_fiscal_year(posting_date, company=self.filters.company)
            year = "2022-2023"
            period = str(year[0])
        return period               
            

    def get_period_date_ranges(self):
        from dateutil.relativedelta import MO, relativedelta

        from_date, to_date = getdate(self.filters.from_date), getdate(self.filters.to_date)

        increment = {"Monthly": 1, "Quarterly": 3, "Half-Yearly": 6, "Yearly": 12}.get(
            self.filters.range, 1
        )

        if self.filters.range in ["Monthly", "Quarterly"]:
            from_date = from_date.replace(day=1)
        elif self.filters.range == "Yearly":
            date_str = '04-01-2022'
            from_date = datetime.strptime(date_str, '%m-%d-%Y').date()
            print("from_date",from_date)
            print("from_date",type(from_date))
        else:
            from_date = from_date + relativedelta(from_date, weekday=MO(-1))

        self.periodic_daterange = []
        for dummy in range(1, 53):
            if self.filters.range == "Weekly":
                period_end_date = add_days(from_date, 6)
                print("period_end_date 1",period_end_date)
            else:
                period_end_date = add_to_date(from_date, months=increment, days=-1)
                print("period_end_date 2",period_end_date)

            if period_end_date > to_date:
                period_end_date = to_date

            self.periodic_daterange.append(period_end_date)

            from_date = add_days(period_end_date, 1)
            if period_end_date == to_date:
                break

    def get_chart_data(self):
        length = len(self.columns)

        if self.filters.tree_type == "Gym Class":    
            labels = [d.get("label") for d in self.columns[2 : length - 1]]
        else:
            labels = [d.get("label") for d in self.columns[1 : length - 1]]
        self.chart = {"data": {"labels": labels, "datasets": []}, "type": "line"}

        if self.filters["value_quantity"] == "Quantity":
            self.chart["fieldtype"] = "Float"
        else:
            self.chart["fieldtype"] = "Currency"                
    
