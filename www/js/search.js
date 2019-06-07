$(document).ready(function(){
	
	if(localStorage.getItem('login') == 'true'){ 
		function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		}
		  
		var search_term = getParameterByName('search_term');

		if(search_term != null || search_term != ''){
			$.ajax({
		    	// The URL for the request
			    url: "http://tamarindlabs.com/index.php/Employee/SearchLeads/",
			 
			    // The data to send (will be converted to a query string)
			    data: {
			    	'search_term' : search_term,
			    	'employee_id' : localStorage.getItem('employee_id'),
			    	'employee_created_by' : localStorage.getItem('employee_created_by')
			    },
			 
			    // Whether this is a POST or GET request
			    type: "POST",
			 
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
		        		str = "<p> No Leads Matches your search query ! </p>";
		        	}
		        	else{
		        		if(search_term == null){
		        			str += "<p class='center-align'> You have searched for ' '</p><li class='divider'></li>";		
		        		}
		        		else{
		        			str += "<p class='center-align'> You have searched for '"+search_term+"'</p><li class='divider'></li>";
		        		}
		        		
		        		for (var i = 0; i < data.length; i++) {
		        			var lead_designation = data[i].lead_designation;
		        			if(lead_designation == null){
		        				lead_designation = "";
		        			}

		        			var lead_company = data[i].lead_company;
		        			if(lead_company == null){
		        				lead_company = "";
		        			}


		   				str += "<a href=\"individual_lead_details.html?lead_id="+data[i].lead_id+"&assigned_to="+data[i].assigned_to+"&referer=search&search_term="+search_term+"\">\
		   							<li class=\"collection-item avatar waves-effect\"> \
							        	<img src=\""+data[i].media_path+"\" alt=\"\" class=\"circle\">\
							        	<span class=\"title\">"+data[i].lead_first_name+" "+data[i].lead_last_name+"</span>\
							        	<p style=\"color:gray;font-size:small;\">"+lead_designation+"<br>\
							           		"+lead_company+"\
							        	</p>\
							        	<a href=\"#!\" class=\"secondary-content\">"+data[i].lead_potential+"</a>\
							        	<a href=\"#!\" class=\"secondary-content-1\">"+data[i].lead_stage+"</a>\
							    	</li>\
							    </a>";
		        		}
		        	}
		        	
		         	$("#all_leads_searched").html("").html(str);
		    	},
		    	error:function(){
		        	$("#all_leads_searched").html("").html("<p>Sorry, there was a problem</p>");
		    	}
			});
		}

		$("#Search-Leads").validate({
	        errorElement: "div",
	        rules: {
	            "search_term" : {
	                required : true,
	            }
	        },
	        submitHandler: function(form) {
	        	var term = $("#search_term").val();
			 	$.ajax({
			    	// The URL for the request
				    url: "http://tamarindlabs.com/index.php/Employee/SearchLeads/",
				 
				    // The data to send (will be converted to a query string)
				    data: {
				    	'search_term' : term,
				    	'employee_id' : localStorage.getItem('employee_id'),
				    	'employee_created_by' : localStorage.getItem('employee_created_by')
				    },
				 
				    // Whether this is a POST or GET request
				    type: "POST",
				 
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
			        		str = "<p> No Leads Matches your search query ! </p>";
			        	}
			        	else{
			        		str += "<p class='center-align'> You have searched for '"+term+"'</p><li class='divider'></li>";
			        		for (var i = 0; i < data.length; i++) {
			        			var lead_designation = data[i].lead_designation;
			        			if(lead_designation == null){
			        				lead_designation = "";
			        			}

			        			var lead_company = data[i].lead_company;
			        			if(lead_company == null){
			        				lead_company = "";
			        			}


			   				str += "<a href=\"individual_lead_details.html?lead_id="+data[i].lead_id+"&assigned_to="+data[i].assigned_to+"&referer=search&search_term="+term+"\">\
			   							<li class=\"collection-item avatar waves-effect\"> \
								        	<img src=\""+data[i].media_path+"\" alt=\"\" class=\"circle\">\
								        	<span class=\"title\">"+data[i].lead_first_name+" "+data[i].lead_last_name+"</span>\
								        	<p style=\"color:gray;font-size:small;\">"+lead_designation+"<br>\
								           		"+lead_company+"\
								        	</p>\
								        	<a href=\"#!\" class=\"secondary-content\">"+data[i].lead_potential+"</a>\
								        	<a href=\"#!\" class=\"secondary-content-1\">"+data[i].lead_stage+"</a>\
								    	</li>\
								    </a>";
			        		}
			        	}
			        	
			         	$("#all_leads_searched").html("").html(str);
			    	},
			    	error:function(){
			        	$("#all_leads_searched").html("").html("<p>Sorry, there was a problem</p>");
			    	}
				});
			}
		});
	}
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});