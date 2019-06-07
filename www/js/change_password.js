$(document).ready(function(){	
	//validation rules
	if(localStorage.getItem('login') == 'true'){
		$("#Employee-Id").attr('value',localStorage.getItem('employee_id'));
		$("#ChangePassword").validate({
	        errorElement: "div",
	        rules: {
	            "employee_password" : {
		            required : true,
		            maxlength: 15,
		            minlength:5
		        }
	        },
	        submitHandler: function(form) {
	        var formData = $("#ChangePassword").serialize(); 
	        $.ajax({
	            // The URL for the request
	            url: "http://tamarindlabs.com/index.php/Employee/ChangeEmployeePassword/",
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
	        event.preventDefault();
	      }
    	});

	}
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});
