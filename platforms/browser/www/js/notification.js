$(document).ready(function(){
	
	if(localStorage.getItem('login') == 'true'){ 
		
		$.ajax({
	    	// The URL for the request
		    url: "http://tamarindlabs.com/index.php/Employee/GetLeadsForToday/",
		 
		    // The data to send (will be converted to a query string)
		    data: {
		    	'employee_id' : localStorage.getItem('employee_id'),
		    	'employee_created_by' : localStorage.getItem('employee_created_by')
		    },
		 
		    // Whether this is a POST or GET request
		    type: "GET",
		 
		    // The type of data we expect back
		    dataType : "json",
		    crossDomain: true,
			cache: false,

	    	beforeSend:function(){
	      	$("#load_screen").show();
	    	},
	    	success:function(data){
	        	$("#load_screen").hide();
	        	var str = "";
	        	if(data.length == 0){
	        		str = "<p> No Leads For You Today. Please Check back later ! </p>";
	        	}
	        	else{
	        		
	        		for (var i = 0; i < data.length; i++) {
	        			var lead_designation = data[i].lead_designation;
	        			if(lead_designation == null){
	        				lead_designation = "";
	        			}

	        			var lead_company = data[i].lead_company;
	        			if(lead_company == null){
	        				lead_company = "";
	        			}


	   				str += "<a href=\"individual_lead_details.html?lead_id="+data[i].lead_id+"&assigned_to="+data[i].assigned_to+"&referer=notification\">\
	   							<li class=\"collection-item avatar waves-effect\"> \
						        	<img src=\""+data[i].media_path+"\" alt=\"\" class=\"circle\">\
						        	<span class=\"title\">"+data[i].lead_first_name+" "+data[i].lead_last_name+"</span>\
						        	<p style=\"color:gray;font-size:small;\">"+lead_designation+" - \
						           		"+lead_company+"<br>"+data[i].next_follow_up_time+"\
						        	</p>\
						        	<a href=\"#!\" class=\"secondary-content\">"+data[i].lead_potential+"</a>\
						        	<a href=\"#!\" class=\"secondary-content-1\">"+data[i].lead_stage+"</a>\
						    	</li>\
						    </a>";
	        		}
	        	}
	        	
	         	$("#all_leads_today_notifications").html("").html(str);
	    	},
	    	error:function(){
	        	$("#all_leads_today_notifications").html("").html("<p>Sorry, there was a problem</p>");
	    	}
		});
	}
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});