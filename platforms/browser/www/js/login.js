$(document).ready(function(){	
	//validation rules
	if(localStorage.getItem('login') == null || localStorage.getItem('login') == 'false'){
		$("#loginform").validate({
		  errorElement: "div",
		    rules: {
		        "employee_email" : {
		            required : true
		        },
		        "employee_password" : {
		            required : true
		        }   
		    },
		    messages: {
		        "employee_email": {
		            required: "You must enter a email value"
		        },
		        "employee_password": {
		          	required: "You must enter a password value",
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#loginform").serialize(); 
				$.ajax({
			        url: "http://tamarindlabs.com/index.php/Employee/EmployeeLogin/",
			        data: formData,
			        type: "POST",
			        crossDomain: true,
					cache: false,
			        dataType : "json",
			    	beforeSend:function(){
			    	  $("#load_screen").show();	
			    	},
			    	success: function(data) {
	                  $("#load_screen").hide();
	                  if(data.success == 'true'){ 
		                    if($('.feedback').hasClass('#e53935 red darken-1')){
		                      $(".feedback").removeClass('#e53935 red darken-1').addClass('#00796b teal darken-2').html("").html("<span class=\"white-text\">"+data.message+"</span>");	
		                    }
		                    else{
		                      $(".feedback").addClass('#00796b teal darken-2').html("").html("<span class=\"white-text\">"+data.message+"</span>");
		                    }
		                
		                    //Employee successfully logged in 
			           		localStorage.setItem('login',"true");
							localStorage.setItem('employee_id',parseInt(data.user_data.employee_id,10));
							localStorage.setItem('employee_email',data.user_data.employee_email);
							localStorage.setItem('is_super_admin',data.user_data.is_super_admin);
							localStorage.setItem('user_type',data.user_data.user_type);	
		                    localStorage.setItem('employee_created_by',data.user_data.employee_created_by);	
		                    localStorage.setItem('account_expiry_date',data.user_data.account_expiry_date);
		                    localStorage.setItem('employee_company',data.user_data.employee_company);
		                    window.location.href = 'dashboard.html';                                        
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
				event.preventDefault();
			},

		});
	}
	else if(localStorage.getItem('login') == 'true'){
		$.ajax({
	        // The URL for the request
	        url: "http://tamarindlabs.com/index.php/Employee/CheckEmployeeStatus/",
	        // The data to send (will be converted to a query string)
	        data: {
	        	"employee_id" : localStorage.getItem('employee_id')
	        },
	        // Whether this is a POST or GET request
	        type: "GET",
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
              	if(data.expired == 'true'){
              		localStorage.setItem('login',"false");
					localStorage.removeItem('employee_id')
					localStorage.removeItem('employee_email');
					localStorage.removeItem('is_super_admin');
					localStorage.removeItem('user_type');
					localStorage.removeItem('employee_created_by');
					localStorage.removeItem('account_expiry_date');
					localStorage.removeItem('employee_company');
					$.sweetModal({
                		content: "Your Account has Expired. Please renew your subscription!",
		                title: 'ERROR',
		                icon: $.sweetModal.ICON_ERROR,

		                buttons: [
		                  {
		                    label: 'Close',
		                    classes: 'redB'
		                  }
		                ],
		                onClose : function(){
		                  document.location.reload();
		                }
		            });
              	}
              	else if(data.suspended == 'true'){
              		localStorage.setItem('login',"false");
					localStorage.removeItem('employee_id')
					localStorage.removeItem('employee_email');
					localStorage.removeItem('is_super_admin');
					localStorage.removeItem('user_type');
					localStorage.removeItem('employee_created_by');
					localStorage.removeItem('account_expiry_date');
					localStorage.removeItem('employee_company');
					$.sweetModal({
                		content: "Your Account is suspended. Please contact the admin!",
		                title: 'ERROR',
		                icon: $.sweetModal.ICON_ERROR,

		                buttons: [
		                  {
		                    label: 'Close',
		                    classes: 'redB'
		                  }
		                ],
		                onClose : function(){
		                  document.location.reload();
		                }
		            });
              	}
              	else{
              		window.location.href = 'dashboard.html';
              	}                                        
              }
            },
            error: function(data){
              $('#load_screen').hide();
              $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
            }
		});
	}
});
