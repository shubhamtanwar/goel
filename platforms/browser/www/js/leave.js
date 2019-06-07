		            
$(document).ready(function(){	
	//validation rules

	if(localStorage.getItem('login') == 'true'){
		$("#employee_id").attr('value',localStorage.getItem('employee_id'));
		$("#employee_created_by").attr('value',localStorage.getItem('employee_created_by'));
		$("#AddLeaveApplication").validate({
		  errorElement: "div",
		    rules: {
		        "leave_reason" : {
		            required : true,
		            
		        },
		        "time_from" : {
		            required : true,
		            
		        },
		        "time_to" : {
		            required : true,
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddLeaveApplication").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddLeaveApplication/",
			        // The data to send (will be converted to a query string)
			        data: formData,
			        // Whether this is a POST or GET request
			        type: "POST",
			        crossDomain: true,
					cache: false,
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
			                  window.location.href = "dashboard.html";
			                }
			              });                                               
	                  }
	                  else{
	                    $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">"+data.message+"</span>");                     
	                  }
	                },
	                error: function(data){
	                  $('#load_screen').hide();
	                  $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
	                }
				});
			},
		});	

		$.ajax({
	        url: "http://tamarindlabs.com/index.php/Employee/GetEmployeeLeaveInfo/",
	        data : {
	        	"employee_created_by" : localStorage.getItem('employee_created_by'),
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
	          var str = "";
	          if(data.employee_detail.length == 0){
	          	str = "<p> No leave applications ! </p>";
	          }
	          else{
		          for(var i=0;i<data.employee_detail.length;i++){
		      		str += "<div class=\"col s12\">\
	                          	<div class=\"card\">\
		                          <div class=\"card-content\" style='font-size:smaller'>\
		                            <p style=\"margin-top:2px;\"> Name :"+data.employee_detail[i].employee_name+"</p>\
		                            <p>Email : "+data.employee_detail[i].employee_email+"</p>\
		                            <p>Mobile : "+data.employee_detail[i].employee_mobile+"</p>\
		                            <br>\
		                            <p>Leave Reason : "+data.leave_reason[i].leave_reason+"</p>\
		                            <p>Time From : "+data.leave_reason[i].time_from+"</p>\
		                            <p>Time To : "+data.leave_reason[i].time_to+"</p>\
		                          </div>\
		                          <div class=\"card-action\" style='padding:10px;'>\
		                            <a href=\"#!\" style='font-size:x-small;color: #4fbff1 !important;'>"+data.leave_reason[i].timestamp+"</a>\
		                          </div>\
	                        	</div>\
	                      </div>";
		          }
		      }

	          
	          $("#Employee-Leaves").html("").html(str);
	        },
	        error: function(data){
	          $('#load_screen').hide();
	          $.sweetModal({
                  content: "ERROR",
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
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});
