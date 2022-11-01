// Copyright (c) 2022, Aravind and contributors
// For license information, please see license.txt


frappe.ui.form.on('Gym Class Booking',  {
    validate: function(frm) {
        // calculate incentives for each person on the deal
        console.log("frm",frm);
        var total_class = frm.doc.gym_classes;
        var total_class_len = total_class.length;
        console.log("total_class_len",total_class_len);
        if(total_class_len > 2){
          frappe.throw("You cannot book more than 2 classes per day");
          frappe.validated = false;
        }
        if(total_class_len == 2){
        	var firstClassTime = total_class[0].gym_time;
            var secondClassTime = total_class[1].gym_time;
            if(firstClassTime == secondClassTime){
             frappe.throw("You cannot book 2 classes at the same time");
             frappe.validated = false;
            }
        }
        if(frm.doc.date != frappe.datetime.get_today()){
          frappe.throw("Please select the current date");
          frappe.validated = false;
        }
    }, 
    refresh: function (frm) {
        // body...
        console.log("frm",frm);
        frm.call('test').then(r => {
        if (r.message) {
            let linked_doc = r.message;
            console.log("linked_doc",linked_doc);
            // do something with linked_doc
        }
        })

    }
})
