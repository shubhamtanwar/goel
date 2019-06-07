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

		$("#Employee-Id").attr('value',localStorage.getItem('employee_id'));

		$.ajax({

		    // The URL for the request
		    url: "http://tamarindlabs.com/index.php/Employee/GetAllEmployee/",
		 	data : {
		 		"employee_created_by" : localStorage.getItem('employee_created_by')
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
	        	
        		for (var i = 0; i < data.length; i++) {
        			if(localStorage.getItem('user_type') == 'admin' && localStorage.getItem('is_super_admin') == "1"){
        				if(localStorage.getItem('employee_created_by') == data[i].employee_id){
        					//Admin Profile Cannot be Viewed
        					str +="<li class=\"collection-item avatar waves-effect\"> \
							        <img src=\"http://tamarindlabs.com/public/img/default.png\" alt=\"\" class=\"circle\">\
							        <span class=\"title\">"+data[i].employee_name+"</span>\
							        <p style=\"color:gray;font-size:small;line-height: 18px;margin-top: 4px;\">"+data[i].employee_email+"<br>\
							           "+data[i].employee_mobile+" <br>\
							           "+data[i].employee_industry_vertical+"\
							        </p>\
							        <a href=\"#!\" class=\"secondary-content\">"+data[i].employee_location+"</a>\
							        <a href=\"#!\" class=\"secondary-content-1\">"+data[i].nonfield_or_field+"</a>\
						    	</li>";

        				}
        				else{
        					//Employee Profile Can be Viewed
        					str += "<a href=\"individual_employee_details.html?employee_id="+data[i].employee_id+"&employee_created_by="+data[i].employee_created_by+"&referer=my_team\">\
		        					  <li class=\"collection-item avatar waves-effect\"> \
								        <img src=\"http://tamarindlabs.com/public/img/default.png\" alt=\"\" class=\"circle\">\
								        <span class=\"title\">"+data[i].employee_name+"</span>\
								        <p style=\"color:gray;font-size:small;line-height: 18px;margin-top: 4px;\">"+data[i].employee_email+"<br>\
								           "+data[i].employee_mobile+" <br>\
								           "+data[i].employee_industry_vertical+"\
								        </p>\
								        <a href=\"#!\" class=\"secondary-content\">"+data[i].employee_location+"</a>\
								        <a href=\"#!\" class=\"secondary-content-1\">"+data[i].nonfield_or_field+"</a>\
								      </li>\
								    </a>";
        				}
        			}
        			else{
	        			str +="<li class=\"collection-item avatar waves-effect\"> \
							        <img src=\"http://tamarindlabs.com/public/img/default.png\" alt=\"\" class=\"circle\">\
							        <span class=\"title\">"+data[i].employee_name+"</span>\
							        <p style=\"color:gray;font-size:small;line-height: 18px;margin-top: 4px;\">"+data[i].employee_email+"<br>\
							           "+data[i].employee_mobile+" <br>\
							           "+data[i].employee_industry_vertical+"\
							        </p>\
							        <a href=\"#!\" class=\"secondary-content\">"+data[i].employee_location+"</a>\
							        <a href=\"#!\" class=\"secondary-content-1\">"+data[i].nonfield_or_field+"</a>\
						    	</li>";
					}
        		}
	        	
	         	$("#TeamMembersActiveList").html("").html(str);
	   
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

		    // The URL for the request
		    url: "http://tamarindlabs.com/index.php/Employee/GetAllBlockedEmployee/",
		 	data : {
		 		"employee_created_by" : localStorage.getItem('employee_created_by')
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
        			str = "<p> No Blocked Employee ! </p>";
        		}
        		else{
	        		for (var i = 0; i < data.length; i++) {
	        			if(localStorage.getItem('user_type') == 'admin' && localStorage.getItem('is_super_admin') == "1"){
	        				
	    					str += "<a href=\"individual_employee_details.html?employee_id="+data[i].employee_id+"&employee_created_by="+data[i].employee_created_by+"&referer=my_team\">\
		        					  <li class=\"collection-item avatar waves-effect\"> \
								        <img src=\"http://tamarindlabs.com/public/img/default.png\" alt=\"\" class=\"circle\">\
								        <span class=\"title\">"+data[i].employee_name+"</span>\
								        <p style=\"color:gray;font-size:small;line-height: 18px;margin-top: 4px;\">"+data[i].employee_email+"<br>\
								           "+data[i].employee_mobile+" <br>\
								           "+data[i].employee_industry_vertical+"\
								        </p>\
								        <a href=\"#!\" class=\"secondary-content\">"+data[i].employee_location+"</a>\
								        <a href=\"#!\" class=\"secondary-content-1\">"+data[i].nonfield_or_field+"</a>\
								      </li>\
								    </a>";
	        			}
	        			else{
		        			str +="<li class=\"collection-item avatar waves-effect\"> \
								        <img src=\"http://tamarindlabs.com/public/img/default.png\" alt=\"\" class=\"circle\">\
								        <span class=\"title\">"+data[i].employee_name+"</span>\
								        <p style=\"color:gray;font-size:small;line-height: 18px;margin-top: 4px;\">"+data[i].employee_email+"<br>\
								           "+data[i].employee_mobile+" <br>\
								           "+data[i].employee_industry_vertical+"\
								        </p>\
								        <a href=\"#!\" class=\"secondary-content\">"+data[i].employee_location+"</a>\
								        <a href=\"#!\" class=\"secondary-content-1\">"+data[i].nonfield_or_field+"</a>\
							    	</li>";
						}
	        		}
	        	}
	        	
	         	$("#TeamMembersBlockedList").html("").html(str);
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


		$(document.body).on('click', '.modal-btn' ,function(event){
	      event.preventDefault();
	      this.blur(); // Manually remove focus from clicked link.
	      var parameters = {
	            "employee_id" : localStorage.getItem('employee_id')
	      };
	      $.getJSON("http://tamarindlabs.com/index.php/Employee/EmployeeSpecificDetails", parameters)
	        .done(function(data, textStatus, jqXHR) {
	            $("input[name='employee_name']").attr("value",data.employee_name);
	            $("input[name='employee_email']").attr("value",data.employee_email);
	            $("input[name='employee_address']").attr("value",data.employee_address);
	            $("input[name='employee_mobile']").attr("value",data.employee_mobile);
	            $("input[name='employee_industry_vertical']").attr("value",data.employee_industry_vertical);
	            $("input[name='employee_location']").attr("value",data.employee_location);
	            $("#Member-Field-NonField").val(data.nonfield_or_field);     
	        })
	        .fail(function(jqXHR, textStatus, errorThrown) {
	            // log error to browser's console
	            console.log(errorThrown.toString());
	        });
    	});

		$("#UpdateMemberDetails").validate({
	        errorElement: "div",
	        rules: {
	            "employee_name" : {
		            required : true,
		            maxlength: 50
		        },
		        "employee_email" : {
		            required : true,
		            maxlength: 100,
		            email : true
		        },
		        "employee_address" : {
		            required : true
		        },
		        "employee_location" : {
		            required : true,
		            maxlength: 100
		        },
		        "employee_mobile" : {
		            required : true,
		            maxlength: 15
		        }, 
		        "employee_industry_vertical" : {
		            required : true,
		            maxlength: 50
		        },
		        "employee_location" : {
		            maxlength : 100,
		            required : true
		        },
		        "nonfield_or_field" : {
		        	required : true,
		        	maxlength: 10
		        }
	        },
	        submitHandler: function(form) {
	        var formData = $("#UpdateMemberDetails").serialize(); 
	        $.ajax({
	            // The URL for the request
	            url: "http://tamarindlabs.com/index.php/Employee/EditEmployeeProfile/",
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
	                if($('.feedback').hasClass('#e53935 red darken-1')){
	                  $(".feedback").removeClass('#e53935 red darken-1').addClass('#00796b teal darken-2').html("").html("<span class=\"white-text\">"+data.message+"</span>"); 
	                }
	                else{
	                  $(".feedback").addClass('#00796b teal darken-2').html("").html("<span class=\"white-text\">"+data.message+"</span>");
	                }
	                document.location.reload();                                     
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
	      }
    	});
	}
	else if(localStorage.getItem('login') == 'false'){
		window.location.href = "index.html";
	}
});
