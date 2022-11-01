// Copyright (c) 2022, Aravind and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Member', {
	validate: function(frm) {
    console.log("frm",frm);
    frappe.realtime.on("Saved", ({ data }) => {
            console.log("real time data",data);
        });
	},
	// on_update(frm){
	// 	frappe.realtime.on("Saved", ({ data }) => {
	// 		console.log("real time data 2",data);
	// 	});
	// },
	// refresh: function(frm) {
	// 	frm.add_custom_button('Check Same City Members', ()=>{
 //        let city = frm.doc.city;
 //        console.log("city",city);
 //        frappe.call({
 //        	method: "gym_management.gym_management.doctype.gym_member.api.check_same_city_members",
 //        	args: {'city': city},
 //        	callback: function(r){
 //        		console.log("r",r);
 //        		if(r.message.length >0){
 //        			let header = `<h3> Below Members Belong to Same ${city}</h3>`;
 //        			let body = ``;
 //        			r.message.forEach(d=>{
 //        				let cont = `<p> Name: ${d.full_name} :<a href='/app/gym-member/${d.name}'>Visit</a>`
 //        				body = body + cont;
 //        				console.log("body",body);
 //        			})
 //        			let all = header + body;
 //        			console.log("all",all);
 //        			frappe.msgprint(__(all));
 //        		}
        		
 //        	}
 //        })
	// 	},"Actions");
	// }
});
