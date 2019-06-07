$(document).ready(function(){
	$(document).on('click','#logout',function(){
          
        if(localStorage.getItem('login') == 'true'){
            localStorage.setItem('login',"false");
            localStorage.removeItem('employee_id')
            localStorage.removeItem('employee_email');
            localStorage.removeItem('is_super_admin');
            localStorage.removeItem('user_type');
            localStorage.removeItem('employee_created_by');
            localStorage.removeItem('account_expiry_date');
            localStorage.removeItem('employee_company');
			$.sweetModal({
                content: "You have been logged out successfully!",
                title: 'Success',
                icon: $.sweetModal.ICON_SUCCESS,

                buttons: [
                  {
                    label: 'Close',
                    classes: 'greenB'
                  }
                ],
                onClose : function(){
                  window.location.href = "index.html";
                }
            });
        }
        else if(localStorage.getItem('login') == null || localStorage.getItem('login') == 'false'){
           window.location.href = "index.html";
        }
    });

	

    if(localStorage.getItem('user_type') == 'admin'){
        $("#dropdown1").append("<li class=\"divider\"></li>\
                                <li><a href=\"add_team_member.html\" style=\"font-size: small;color: black;\" class=\"waves-effect\">Add Employee</a></li>\
                                <li class=\"divider\"></li>\
                                <li><a href=\"leave_applications.html\" style=\"font-size: small;color: black;\" class=\"waves-effect\">Leave Applications</a></li>\
                                <li class=\"divider\"></li>\
                                <li><a href=\"settings.html\" style=\"font-size: small;color: black;\" class=\"waves-effect\">Settings</a></li>\
                                <li class=\"divider\"></li>\
                                <li><a href=\"#\" id=\"logout\" style=\"font-size: small;color: black;\" class=\"waves-effect\">Logout</a></li>");
    }
    else{
        $("#dropdown1").append("<li class=\"divider\"></li>\
                                <li><a href=\"apply_leave.html\" style=\"font-size: small;color: black;\" class=\"waves-effect\">Apply Leave</a></li>\
                                <li class=\"divider\"></li>\
                                <li><a href=\"#\" id=\"logout\" style=\"font-size: small;color: black;\" class=\"waves-effect\">Logout</a></li>");
    }

    $(document).ajaxStart(function() {
      $("#load_screen").show();
    });

    $(document).ajaxStop(function() {
      $("#load_screen").hide();
    });


    /* Functionality for Tracking Attendance */

    $('#Start-Day').on('click',function(){
        $.ajax({

            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/MarkAttendance/",
         
            // The data to send (will be converted to a query string)
            data: {
                "employee_id" : localStorage.getItem('employee_id'),
                "employee_created_by" : localStorage.getItem('employee_created_by'),
                "start" : "true",
                "end"   : "false"
            },
         
            // Whether this is a POST or GET request
            type: "GET",
         
            // The type of data we expect back
            dataType : "json",
            crossDomain: true,
            cache: false,
            success:function(data){
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
            error:function(){
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

     $('#End-Day').on('click',function(){
        $.ajax({

            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/MarkAttendance/",
         
            // The data to send (will be converted to a query string)
            data: {
                "employee_id" : localStorage.getItem('employee_id'),
                "employee_created_by" : localStorage.getItem('employee_created_by'),
                "start" : "false",
                "end"   : "true"
            },
         
            // Whether this is a POST or GET request
            type: "GET",
         
            // The type of data we expect back
            dataType : "json",
            crossDomain: true,
            cache: false,
            success:function(data){
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
            error:function(){
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


    if(localStorage.getItem('user_type') == 'admin'){
        $.ajax({
            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/GetAllAttendance/",
            // The data to send (will be converted to a query string)
            data: {
                "employee_created_by" : localStorage.getItem('employee_created_by')
            },
            // Whether this is a POST or GET request
            type: "GET",
            // The type of data we expect back
            dataType : "json",
            crossDomain: true,
            cache: false,
            success:function(data){
                var str = "";
                if(data.attendance.length == 0){
                    str = "<p> No one has marked attendance today! </p>";
                }
                else{
                    str+= "<table class=\"striped\">\
                            <thead>\
                                <tr>\
                                  <th>Employee Name</th>\
                                  <th>Day Start</th>\
                                  <th>Day End</th>\
                              </tr>\
                            </thead>\
                            <tbody>";
                    for (var i = 0; i < data.attendance.length; i++) {
                        str +="<tr>\
                                <td>"+data.employee_detail[i].employee_name+"</td>\
                                <td>"+data.attendance[i].start_time+"</td>\
                                <td>"+data.attendance[i].stop_time+"</td>\
                              </tr>";
                    }
                    str +="</tbody>\
                        </table>";
                }
                $("#Employee-Tracking").html("").html(str);
            },
            error:function(){
                $("#Employee-Tracking").html("").html("<p>Sorry, there is a problem</p>");
            }
        });   
    }

    /*****************************************/

	$.ajax({
	    // The URL for the request
	    url: "http://tamarindlabs.com/index.php/Employee/GetAllLeads/",
	    // The data to send (will be converted to a query string)
	    data: {
	    	"employee_id" : localStorage.getItem('employee_id'),
            "employee_created_by" : localStorage.getItem('employee_created_by')
	    },
	    // Whether this is a POST or GET request
	    type: "GET",
	    // The type of data we expect back
	    dataType : "json",
	    crossDomain: true,
		cache: false,
    	success:function(data){
        	var str = "";
        	if(data.length == 0){
        		str = "<p> No Leads Assigned to you ! </p>";
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


   				str += "<a href=\"individual_lead_details.html?lead_id="+data[i].lead_id+"&assigned_to="+data[i].assigned_to+"&referer=dashboard\"><li class=\"collection-item avatar waves-effect\"> \
					        <img src=\""+data[i].media_path+"\" alt=\"\" class=\"circle\">\
					        <span class=\"title\">"+data[i].lead_first_name+" "+data[i].lead_last_name+"</span>\
					        <p style=\"color:gray;font-size:small;\">"+lead_designation+"<br>\
					           "+lead_company+"\
					        </p>\
					        <a href=\"#!\" class=\"secondary-content\">"+data[i].lead_potential+"</a>\
					        <a href=\"#!\" class=\"secondary-content-1\">"+data[i].lead_stage+"</a>\
					    </li></a>";
        		}
        	}
        	
         	$("#all_leads_assigned").html("").html(str);
    	},
    	error:function(){
        	$("#all_leads_assigned").html("").html("<p>Sorry, there was a problem</p>");
    	}
	});

    $('.Filters').on('click',function(){
        $.ajax({

            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/FilterLead/",
         
            // The data to send (will be converted to a query string)
            data: {
                "employee_id" : localStorage.getItem('employee_id'),
                "employee_created_by" : localStorage.getItem('employee_created_by'),
                "based_on" : $(this).attr('value')
            },
         
            // Whether this is a POST or GET request
            type: "GET",
         
            // The type of data we expect back
            dataType : "json",
            crossDomain: true,
            cache: false,
            success:function(data){
                var str = "";
                if(data.length == 0){
                    str = "<p> No Leads Assigned to you ! </p>";
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


                    str += "<a href=\"individual_lead_details.html?lead_id="+data[i].lead_id+"&assigned_to="+data[i].assigned_to+"&referer=dashboard\"><li class=\"collection-item avatar waves-effect\"> \
                                <img src=\""+data[i].media_path+"\" alt=\"\" class=\"circle\">\
                                <span class=\"title\">"+data[i].lead_first_name+" "+data[i].lead_last_name+"</span>\
                                <p style=\"color:gray;font-size:small;\">"+lead_designation+"<br>\
                                   "+lead_company+"\
                                </p>\
                                <a href=\"#!\" class=\"secondary-content\">"+data[i].lead_potential+"</a>\
                                <a href=\"#!\" class=\"secondary-content-1\">"+data[i].lead_stage+"</a>\
                            </li></a>";
                    }
                }
                
                $("#all_leads_assigned").html("").html(str);
            },
            error:function(){
                $("#all_leads_assigned").html("").html("<p>Sorry, there was a problem</p>");
            }
        });
    });
 
});