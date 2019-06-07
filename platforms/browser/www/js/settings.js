$(document).ready(function(){	
 	//validation rules

	if(localStorage.getItem('login') == 'true'){
		$(".admin_id").attr('value',localStorage.getItem('employee_id'));
		$("#AddLeadCategory").validate({
		  errorElement: "div",
		    rules: {
		        "category" : {
		            required : true,
		            maxlength: 50
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddLeadCategory").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddLeadCategory/",
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
			                  document.location.reload();
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

		$("#AddLeadCity").validate({
		  errorElement: "div",
		    rules: {
		        "city" : {
		            required : true,
		            maxlength: 50
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddLeadCity").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddLeadCity/",
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
			                  document.location.reload();
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

		$("#AddProducts").validate({
		  errorElement: "div",
		    rules: {
		        "product" : {
		            required : true,
		            maxlength: 50
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddProducts").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddProducts/",
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
			                  document.location.reload();
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

		$("#AddStoreLevel").validate({
		  errorElement: "div",
		    rules: {
		        "store_level" : {
		            required : true,
		            maxlength: 50
		        }
		    },
		    submitHandler: function(form) {
				var formData = $("#AddStoreLevel").serialize(); 
				$.ajax({
			        // The URL for the request
			        url: "http://tamarindlabs.com/index.php/Employee/AddStoreLevel/",
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
			                  document.location.reload();
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

		$("#DeleteCategory").validate({
        	errorElement: "div",
        	rules: {
            	"category_id" : {
                	required : true
            	}
        	},
	        submitHandler: function(form) {
	        var formData = $("#DeleteCategory").serialize(); 
	        $.ajax({
	            // The URL for the request
	            url: "http://tamarindlabs.com/index.php/Employee/DeleteCategory/",
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
	              $('#modal1').modal('close');
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
	              $('#modal1').modal('close');
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

	    $("#DeleteCity").validate({
        	errorElement: "div",
        	rules: {
            	"category_id" : {
                	required : true
            	}
        	},
	        submitHandler: function(form) {
	        var formData = $("#DeleteCity").serialize(); 
	        $.ajax({
	            // The URL for the request
	            url: "http://tamarindlabs.com/index.php/Employee/DeleteCity/",
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
	              $('#modal2').modal('close');
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
	              $('#modal2').modal('close');
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


	    $("#DeleteProduct").validate({
        	errorElement: "div",
        	rules: {
            	"category_id" : {
                	required : true
            	}
        	},
	        submitHandler: function(form) {
	        var formData = $("#DeleteProduct").serialize(); 
	        $.ajax({
	            // The URL for the request
	            url: "http://tamarindlabs.com/index.php/Employee/DeleteProduct/",
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
	              $('#modal3').modal('close');
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
	              $('#modal3').modal('close');
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


	    $("#DeleteStoreLevel").validate({
        	errorElement: "div",
        	rules: {
            	"category_id" : {
                	required : true
            	}
        	},
	        submitHandler: function(form) {
	        var formData = $("#DeleteStoreLevel").serialize(); 
	        $.ajax({
	            // The URL for the request
	            url: "http://tamarindlabs.com/index.php/Employee/DeleteStoreLevel/",
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
	              $('#modal4').modal('close');
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
	              $('#modal4').modal('close');
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


		$.ajax({
	        url: "http://tamarindlabs.com/index.php/Employee/GetCityProductCategory/",
	        data : {
	        	"admin_id" : localStorage.getItem('employee_id')
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
	          var str1 = "<option value=\"\" disabled selected>Cities</option>";
	          var str2 = "<option value=\"\" disabled selected>Products</option>";
	          var str3 = "<option value=\"\" disabled selected>Categories</option>";
	          var str4 = "<option value=\"\" disabled selected>Store Levels</option>";

	          var dstr1 = "<option value=\"\" disabled selected>Cities</option>";
	          var dstr2 = "<option value=\"\" disabled selected>Products</option>";
	          var dstr3 = "<option value=\"\" disabled selected>Categories</option>";
	          var dstr4 = "<option value=\"\" disabled selected>Store Levels</option>";

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

	          for(var i=0;i<data.cities.length;i++){
	            dstr1 += "<option value='"+data.cities[i].city_id+"'>"+data.cities[i].city+"</option>";
	          }

	          for(var i=0;i<data.products.length;i++){
	            dstr2 += "<option value='"+data.products[i].interest_id+"'>"+data.products[i].product+"</option>";
	          }

	          for(var i=0;i<data.categories.length;i++){
	            dstr3 += "<option value='"+data.categories[i].category_id+"'>"+data.categories[i].category+"</option>";
	          }

	          for(var i=0;i<data.store_levels.length;i++){
	            dstr4 += "<option value='"+data.store_levels[i].store_level_id+"'>"+data.store_levels[i].store_level+"</option>";
	          }

	          $("#Lead-Cities").append(str1);
	          $("#Lead-Categories").append(str3);
	          $("#Lead-Products").append(str2);
	          $("#Lead-StoreLevel").append(str4);


	          $("#Delete-Lead-City").html("").html(dstr1);
	          $("#Delete-Lead-Category").html("").html(dstr3);
	          $("#Delete-Lead-Product").html("").html(dstr2);
	          $("#Delete-Lead-Store-Level").html("").html(dstr4);


	          $('.select').formSelect();
	          $('.modal').modal();
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
