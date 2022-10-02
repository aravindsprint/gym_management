frappe.provide("frappe.gym_management");

frappe.pages['gym-profile'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Gym Profile',
		single_column: true
	});
	//page.body.append('hello');
	
	frappe.gym_profile.make(page);
	frappe.gym_profile.run();

}

frappe.gym_profile = {
	make: function(page) {
		var me = frappe.gym_profile;
		me.page = page;
		me.body = $('<div></div>').appendTo(me.page.main, function() {
			me.run();
			});
	},
	run: function() {
		var me = frappe.gym_profile;
		var user = frappe.session.user_fullname;
		//var user = "Tamil Arasu";
		//var user = "Aravind Govindaraj";
		console.log("user",user);
		frappe.call({
			method: 'gym_management.gym_management.page.gym_profile.gym_profile.get_gym_details',
			args: {
				user: user,
			    date: frappe.datetime.get_today(),
			},
			callback: function(r) {
				console.log("r",r)
				if (r.message && r.message.length > 0) {
					// r.message.forEach(function(d) {
					// 	me.add_row(d);
					// });
					me.add_row(r);
				} else {
					frappe.show_alert({message: __('No more Subscription data'), indicator: 'gray'});
				}
			}
		});
	},
	add_row: function(data) {
		var me = frappe.gym_profile;
        
        data1 = data.message[0];
        data2 = data.message[1]
    
        data_01 = data1[0];
        if(data1[0] !== undefined){
        	data.trainer = data_01[1];
	        data.end_date = data_01[3];
	     
	        var date1 = new Date(data.end_date);
	        data.plans = data_01[4];
	        data.gym_trainer_mobile_no = data_01[5];
	        today = frappe.datetime.get_today();
            var date2 = new Date(today);
            var Difference_In_Time = date1.getTime() - date2.getTime();

	        // To calculate the no. of days between two dates 
            difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        }else{
        	data.trainer = "None";
	        data.end_date = "None";
	        data.plans = "None";
	        data.gym_trainer_mobile_no = "None";
	        difference_In_Days = "None"

        }

        data_02 = data2;
        data_02_len = data_02.length;

        if(data_02_len > 1){
        	data_02lastNum = data_02_len - 1;
        	data_02last = data_02[data_02lastNum]
        	data.prevoius_plan = data_02last[4];
        	
        }else{
        	
        	data_02last = data_02[0];
        	data.prevoius_plan = data_02last[4];
        	
        }
       
		$(frappe.render_template('gym_profile', data)).appendTo(me.body);
	 }
}


