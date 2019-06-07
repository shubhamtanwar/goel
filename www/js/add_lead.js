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

		$("#Lead-First-Name").attr('value',getParameterByName('first_name'));
		$("#Lead-Last-Name").attr('value',getParameterByName('last_name'));
		$("#Lead-Mobile").attr('value',getParameterByName('mobile'));
		$("#Lead-Email").attr('value',getParameterByName('email'));
		$("#assigned_to").attr('value',localStorage.getItem('employee_id'));
		$("#employee_created_by").attr('value',localStorage.getItem('employee_created_by'));
		M.updateTextFields();
		$("#AddFullLead").validate({
		  errorElement: "div",
		    rules: {
		        "lead_first_name" : {
		            required : true,
		            maxlength: 50
		        },
		        "lead_last_name" : {
		            required : true,
		            maxlength: 50
		        },
		        "lead_email" : {
		            required : true,
		            maxlength: 100,
		            email : true
		        },
		        "lead_company" : {
		            required : true,
		            maxlength: 100
		        },
		        "lead_country" : {
		            required : true,
		            maxlength: 50
		        },
		        "lead_mobile_no" : {
		            required : true,
		            maxlength: 15	
		        }, 
		        "deal_value" : {
		            number : true
		        },
		        "lead_category" : {
		            required : true
		        },
		        "lead_designation" : {
		        	required : true,
		        	maxlength:100
		        },
		        "beat_no" : {
		        	number : true
		        },
		        "lead_city" : {
		        	required : true
		        },
		        "interested_in[]" : {
		        	required : true
		        },
		        "beat_name" : {
		        	maxlength : 50
		        },
		        "store_level" : {
		        	maxlength : 50
		        },
		        "lead_latitude":{
		        	required : true
		        },
		        "lead_longitude" : {
		        	required : true
		        },
		        "lead_stage" : {
		        	required : true
		        },
		        "lead_potential" : {
		        	required : true
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddFullLead").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddFullLead/",
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

		$("#AddQuickLead").validate({
		  errorElement: "div",
		    rules: {
		        "lead_first_name" : {
		            required : true,
		            maxlength: 50
		        },
		        "lead_last_name" : {
		            required : true,
		            maxlength: 50
		        },
		        "lead_email" : {
		            required : true,
		            maxlength: 100,
		            email : true
		        },
		        "lead_country" : {
		            required : true,
		            maxlength: 50
		        },
		        "lead_mobile_no" : {
		            required : true,
		            maxlength: 15	
		        },
		        "lead_city" : {
		        	required : true
		        },
		        "interested_in" : {
		        	required : true
		        },
		        "lead_category" : {
		            required : true
		        },
		        "lead_latitude":{
		        	required : true
		        },
		        "lead_longitude" : {
		        	required : true
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddQuickLead").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddQuickLead/",
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


		$("#ImportLeads").submit(function(e){
	      e.preventDefault();
	      var formData = new FormData($('#ImportLeads')[0]);
	       $.ajax({
	        url: "http://tamarindlabs.com/index.php/Employee/ImportLeadDataAsCSV/",
	        type: "POST", // Type of request to be send, called as method
	        data: formData,
	        dataType : "json",
	        cache: false,
	        contentType: false,
	        processData: false,
	        beforeSend: function() {
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
		      $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
		    }
	      }); 
	    });

	    $.ajax({
	        url: "http://tamarindlabs.com/index.php/Employee/GetCityProductCategory/",
	        data : {
	        	"admin_id" : localStorage.getItem('employee_created_by')
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
	          var str1 = "";
	          var str2 = "";
	          var str3 = "";
	          var str4 = "";
	          for(var i=0;i<data.cities.length;i++){
	            str1 += "<option value='"+data.cities[i].city+"'>"+data.cities[i].city+"</option>";
	          }

	          for(var i=0;i<data.products.length;i++){
	            str2 += "<option value='"+data.products[i].product+"'>"+data.products[i].product+"</option>";
	          }

	          for(var i=0;i<data.categories.length;i++){
	            str3 += "<option value='"+data.categories[i].category+"'>"+data.categories[i].category+"</option>";
	          }

	          for(var i=0;i<data.store_levels.length;i++){
	            str4 += "<option value='"+data.store_levels[i].store_level+"'>"+data.store_levels[i].store_level+"</option>";
	          }
	        
	          $("#Lead-StoreLevel").append(str4);   
	          $("#Lead-Cities").append(str1);
	          $("#Lead-Categories").append(str3);
	          $("#Lead-Products").append(str2);
	          $('.select').formSelect();
	        },
	        error: function(data){
	          $('#load_screen').hide();
	          $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
	        }
	    });
	}
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});
