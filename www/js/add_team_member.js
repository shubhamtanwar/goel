$(document).ready(function(){	
	//validation rules
	if(localStorage.getItem('login') == 'true' && localStorage.getItem('user_type') == 'admin'){

		$("#employee_created_by").attr('value',localStorage.getItem('employee_created_by'));
		$("#employee_company").attr('value',localStorage.getItem('employee_company'));
		$("#account_expiry_date").attr('value',localStorage.getItem('account_expiry_date'));
		M.updateTextFields();
		
		$("#AddTeamMember").validate({
		  errorElement: "div",
		    rules: {
		        "employee_name" : {
		            required : true,
		            maxlength: 50
		        },
		        "employee_designation" : {
		        	required : true,
		        	maxlength : 50
		        },
		        "employee_company" : {
		        	required : true,
		        	maxlength : 50
		        },
		        "employee_email" : {
		            required : true,
		            maxlength: 100,
		            email : true
		        },
		        "employee_address" : {
		            required : true
		        },
		        "employee_mobile" : {
		            required : true,
		            maxlength: 15
		        },
		        "employee_password" : {
		            required : true,
		            maxlength: 15,
		            minlength: 5	
		        }, 
		        "employee_industry_vertical" : {
		            required : true,
		            maxlength: 50
		        },
		        "employee_location" : {
		        	required : true,
		            maxlength : 100
		        },
		        "nonfield_or_field" : {
		        	required : true,
		        	maxlength: 10
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddTeamMember").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddTeamMember/",
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

	}
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});
