$(document).ready(function(){	
	//validation rules
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

		var employee_id     	= getParameterByName('employee_id');
		var employee_created_by = getParameterByName('employee_created_by');
		var referer 			= getParameterByName('referer');
		
		$.ajax({

		    // The URL for the request
		    url: "http://tamarindlabs.com/index.php/Employee/EmployeeSpecificProfile/",
		 
		    // The data to send (will be converted to a query string)
		    data: {
		    	"employee_id" : employee_id
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
	        
	        	var str_1 = "<img class=\"responsive-img\" src=\"http://tamarindlabs.com/public/img/default.png\">";
	        	var str_2 =  "<span class=\"title\">"+data.profile.employee_name+"</span>\
	                          <p style=\"color:gray;font-size:small;font-style:oblique;\">"+data.profile.employee_designation+"<br>\
	                             "+data.profile.employee_company+"\
	                          </p>";
	  
	            var str_3 = "";
	        	if(data.profile.is_active == "1"){
	          		str_3 += "<button class=\"btn waves-effect waves-light col s12 #d50000 red accent-4\"  id='Deactivate-Employee' Employee-Id='"+data.profile.employee_id+"'>DEACTIVATE</button>";
	        	}
	        	else if(data.profile.is_active == "0"){
	        		$("#Deactivate-Assign-Tab").addClass('disabled');
	          		str_3 +=  "<button class=\"btn waves-effect waves-light col s12 light-blue lighten-1\"  id='Activate-Employee' Employee-Id='"+data.profile.employee_id+"'>ACTIVATE</button>";;
	        	}

	        
	        
	       		var str_4 = "<div class='row'>\
					        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Mobile : </span><br>"+data.profile.employee_mobile+"</p></div>\
					        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Email : </span><br>"+data.profile.employee_email+"</p></div>\
					        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Location : </span><br>"+data.profile.employee_location+"</p></div>\
					        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Address : </span><br>"+data.profile.employee_address+"</p></div>\
					        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Employee Type : </span><br>"+data.profile.nonfield_or_field+"</p></div>\
					         <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Industry Vertical : </span><br>"+data.profile.employee_industry_vertical+"</p></div>\
					        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Account Expiry : </span><br>"+data.profile.account_expiry_date+"</p></div>\
					    </div>";
			    var str_5 = "";
			    
			    if(data.leads_assigned.length == 0){
        			str_5 = "<p> No Leads Assigned to "+data.profile.employee_name+" ! </p>";
        		}
        		else{

				    for (var i = 0; i < data.leads_assigned.length; i++) {
	        			
	        			var lead_designation = data.leads_assigned[i].lead_designation;
	        			if(lead_designation == null){
	        				lead_designation = "";
	        			}

	        			var lead_company = data.leads_assigned[i].lead_company;
	        			if(lead_company == null){
	        				lead_company = "";
	        			}
		        	    
		        	    str_5 += "<a href=\"individual_lead_details.html?lead_id="+data.leads_assigned[i].lead_id+"&assigned_to="+data.leads_assigned[i].assigned_to+"&referer=my_team\"><li class=\"collection-item avatar waves-effect\"> \
							        <img src=\""+data.leads_assigned[i].media_path+"\" alt=\"\" class=\"circle\">\
							        <span class=\"title\">"+data.leads_assigned[i].lead_first_name+" "+data.leads_assigned[i].lead_last_name+"</span>\
							        <p style=\"color:gray;font-size:small;\">"+lead_designation+"<br>\
							           "+lead_company+"\
							        </p>\
							        <a href=\"#!\" class=\"secondary-content\">"+data.leads_assigned[i].lead_potential+"</a>\
							        <a href=\"#!\" class=\"secondary-content-1\">"+data.leads_assigned[i].lead_stage+"</a>\
							    </li></a>";
					}
				}
	                  
		        $("#individual_employee_image").html(str_1);
		        $("#individual_employee_name").html(str_2); 
		        $("#activate_deactivate_button").html(str_3); 
		        $("#test1").html(str_4);
		        $("#all_leads_assigned").html(str_5);
	
		        if(referer == 'my_team'){
		          $('#referer-icon').attr('href','my_team.html');
		        }
	    	},
	    	error:function(){
		        $("#load_screen").hide();
		        $.sweetModal({
		            content: "Sorry, there is some problem !",
		            icon: $.sweetModal.ICON_ERROR,
	                buttons: [
	                      {
	                        label: 'Close',
	                        classes: 'redB'
	                      }
	                    ]
		        }); 
	    	}
		});

		$.ajax({
	        url: "http://tamarindlabs.com/index.php/Employee/GetAllEmployee/",
	        data : {
	          employee_created_by : localStorage.getItem('employee_created_by')
	        }, 
	        type: "GET",
	        crossDomain: true,
	        cache: false,
	        dataType : "json",
	        beforeSend:function(){
	          $("#load_screen").show(); 
	        },
	        success: function(data) {
	          $("#load_screen").hide();
	          var temp = "";
	          for(var i=0;i<data.length;i++){
	            if(localStorage.getItem('user_type') == 'admin'){
	                temp += "<option value='"+data[i].employee_id+"'>"+data[i].employee_name+"</option>";
	            }
	          }
	          $("#Lead-Assigned").append(temp);
	          $("#employee_id").attr('value',employee_id);
	        },
	        error: function(data){
	          $('#load_screen').hide();
	          $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
	        }
	    });

	    $("#UpdateLeadAssigned").validate({
	        errorElement: "div",
	        rules: {
	            "assigned_to" : {
	                required : true
	            }
	        },
	        submitHandler: function(form) {
	        var formData = $("#UpdateLeadAssigned").serialize(); 
	        $.ajax({
	            // The URL for the request
	            url: "http://tamarindlabs.com/index.php/Employee/AssignLeadMultiple/",
	            // The data to send (will be converted to a query string)
	            data: formData,
	            // Whether this is a POST or GET request
	            type: "POST",
	            // The type of data we expect back
	            dataType : "json",
	            beforeSend:function(){
	              $("#load_screen").show(); 
	            },
	            success: function(data) {
	              $("#load_screen").hide();
	              if(data.success == 'true'){ 
	                $.sweetModal({
	                    content: data.message,
	                    title: 'Success',
	                    icon: $.sweetModal.ICON_SUCCESS,

	                    buttons: [
	                      {
	                        label: 'Close',
	                        classes: 'greenB'
	                      }
	                    ],
	                    onClose : function(){
	                      document.location.reload();
	                    }
	                });                                
	              }
	              else{
	                $.sweetModal({
	                  content: data.message,
	                  icon: $.sweetModal.ICON_ERROR,
	                  buttons: [
	                      {
	                        label: 'Close',
	                        classes: 'redB'
	                      }
	                    ]
	                });                  
	              }
	            },
	            error: function(data){
	              $('#load_screen').hide();
	              $.sweetModal({
	                  content: data.message,
	                  icon: $.sweetModal.ICON_ERROR,
	                  buttons: [
	                      {
	                        label: 'Close',
	                        classes: 'redB'
	                      }
	                    ]
	              }); 
	            }
	        });
	      }
	    });

		$(document.body).on('click', '#Deactivate-Employee' ,function(event){
	      event.preventDefault();
	      this.blur(); // Manually remove focus from clicked link.
	      var parameters = {
	            "employee_id" :   $(this).attr('Employee-Id'),
	            "activate"    :   "false",
	            "deactivate"  :   "true"
	      };
	      $.ajax({
            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/ChangeEmployeeStatus/",
            // The data to send (will be converted to a query string)
            data: parameters,
            // Whether this is a POST or GET request
            type: "POST",
            // The type of data we expect back
            dataType : "json",
            beforeSend:function(){
              $("#load_screen").show(); 
            },
            success: function(data) {
              $("#load_screen").hide();
              if(data.success == 'true'){ 
                $.sweetModal({
                    content: data.message,
                    title: 'Success',
                    icon: $.sweetModal.ICON_SUCCESS,

                    buttons: [
                      {
                        label: 'Close',
                        classes: 'greenB'
                      }
                    ],
                    onClose : function(){
                      document.location.reload();
                    }
                });                                
              }
              else{
                $.sweetModal({
                  content: data.message,
                  icon: $.sweetModal.ICON_ERROR,
                  buttons: [
                      {
                        label: 'Close',
                        classes: 'redB'
                      }
                    ]
                });                  
              }
            },
            error: function(data){
              $('#load_screen').hide();
              $.sweetModal({
                  content: data.message,
                  icon: $.sweetModal.ICON_ERROR,
                  buttons: [
                      {
                        label: 'Close',
                        classes: 'redB'
                      }
                    ]
              }); 
            }
          });
        });
		
		$(document.body).on('click', '#Activate-Employee' ,function(event){
	      event.preventDefault();
	      this.blur(); // Manually remove focus from clicked link.
	      var parameters = {
	            "employee_id" :   $(this).attr('Employee-Id'),
	            "activate"    :   "true",
	            "deactivate"  :   "false"
	      };
	      $.ajax({
            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/ChangeEmployeeStatus/",
            // The data to send (will be converted to a query string)
            data: parameters,
            // Whether this is a POST or GET request
            type: "POST",
            // The type of data we expect back
            dataType : "json",
            beforeSend:function(){
              $("#load_screen").show(); 
            },
            success: function(data) {
              $("#load_screen").hide();
              if(data.success == 'true'){ 
                $.sweetModal({
                    content: data.message,
                    title: 'Success',
                    icon: $.sweetModal.ICON_SUCCESS,

                    buttons: [
                      {
                        label: 'Close',
                        classes: 'greenB'
                      }
                    ],
                    onClose : function(){
                      document.location.reload();
                    }
                });                                
              }
              else{
                $.sweetModal({
                  content: data.message,
                  icon: $.sweetModal.ICON_ERROR,
                  buttons: [
                      {
                        label: 'Close',
                        classes: 'redB'
                      }
                    ]
                });                  
              }
            },
            error: function(data){
              $('#load_screen').hide();
              $.sweetModal({
                  content: data.message,
                  icon: $.sweetModal.ICON_ERROR,
                  buttons: [
                      {
                        label: 'Close',
                        classes: 'redB'
                      }
                    ]
              }); 
            }
          });
        });
	}
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});
