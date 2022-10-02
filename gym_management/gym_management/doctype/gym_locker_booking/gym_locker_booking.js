// Copyright (c) 2022, Aravind and contributors
// For license information, please see license.txt


frappe.ui.form.on('Gym Locker Booking', {
    // frm passed as the first parameter
    setup(frm) {
        // write setup code
        console.log("setup");
        frm.set_query('gym_membership', () => {
            return {
                filters: {
                    gym_member: frm.doc.gym_member,
                    docstatus: 1
                    }
                    };
           
        });
       

    }
});
