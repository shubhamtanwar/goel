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
  
  
  $(document).on('click','#Add-Lead-Mobile-Number',function(){
          var mob = parseInt($(this).attr('phone_no'));       
          window.open('tel:'+parseInt(mob)+'', '_system')  
  });
  
  var lead_id     = getParameterByName('lead_id');
  var assigned_to = getParameterByName('assigned_to');	
  var referer     = getParameterByName('referer');
  var search_term = getParameterByName('search_term');

	$.ajax({

	    // The URL for the request
	    url: "http://tamarindlabs.com/index.php/Employee/GetIndividualLead/",
	 
	    // The data to send (will be converted to a query string)
	    data: {
	    	"lead_id" : lead_id,
        "assigned_to" : assigned_to
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
        
        if(data.lead_details.lead_designation == null){
          data.lead_details.lead_designation = "";
        }
        
        if(data.lead_details.lead_company == null){
          data.lead_details.lead_company = "";
        }
        
        if(data.lead_details.website == null){
          data.lead_details.website = "";
        }

        if(data.lead_details.lead_address == null){
          data.lead_details.lead_address = "";
        }

        if(data.lead_details.deal_value == null){
          data.lead_details.deal_value = "";
        }

        if(data.lead_details.notes == null){
          data.lead_details.notes = "";
        }

        if(data.lead_details.next_follow_up_time == null){
          data.lead_details.next_follow_up_time = "";
        }

        if(data.lead_details.next_follow_up_date == null){
          data.lead_details.next_follow_up_date = "";
        }

        if(data.lead_details.beat_no == null){
          data.lead_details.beat_no = "";
        }

        if(data.lead_details.beat_name == null){
          data.lead_details.beat_name = "";
        }

        if(data.lead_details.store_level == null){
          data.lead_details.store_level = "";
        }


        var str_1 = "<img class=\"responsive-img\" src=\""+data.lead_details.media_path+"\">";
        var str_2 =  "<span class=\"title\">"+data.lead_details.lead_first_name+" "+data.lead_details.lead_last_name+"</span>\
                          <p style=\"color:gray;font-size:small;font-style:oblique;\">"+data.lead_details.lead_designation+"<br>\
                             "+data.lead_details.lead_company+"\
                          </p>";
        var str_3 = "Assigned To : "+data.employee_details.employee_name+"<br> Created On :"+data.lead_details.created_date+"<br>";

        if(data.lead_details.next_follow_up_time == "" && data.lead_details.next_follow_up_date == ""){
          str_3 += "No follow up assigned till now!";
        }
        else{
          str_3 += "Next Follow Up: "+data.lead_details.next_follow_up_date+" "+data.lead_details.next_follow_up_time+"";
        }

        
        var clone_lead = "First Name:"+data.lead_details.lead_first_name+"\
                          Last Name:"+data.lead_details.lead_last_name+"\
                          Designation: "+data.lead_details.lead_designation+"\
                          Company: "+data.lead_details.lead_company+"\
                          Address: "+data.lead_details.lead_address+"\
                          City: "+data.lead_details.lead_city+"\
                          Website: "+data.lead_details.website+"\
                          Mobile: "+data.lead_details.lead_mobile_no+"\
                          Email: "+data.lead_details.lead_email+"\
                          Country: "+data.lead_details.lead_country+"\
                          Stage: "+data.lead_details.lead_stage+"\
                          Potential:"+data.lead_details.lead_potential+"\
                          DealValue:"+data.lead_details.deal_value+"\
                          InterestedIn: "+data.lead_details.interested_in+"\
                          Lead Category: "+data.lead_details.lead_category+"\
                          Notes: "+data.lead_details.notes+"\
                          Beat No.: "+data.lead_details.beat_no+"\
                          Beat Name: "+data.lead_details.beat_name+"\
                          Store Level: "+data.lead_details.store_level+"\
                          NextFollowUpDate: "+data.lead_details.next_follow_up_date+"\
                          NextFollowUpTime: "+data.lead_details.next_follow_up_time+"\
                          Last Updated: "+data.lead_details.last_updated+"\
                          Created Date: "+data.lead_details.created_date+"";

        var str_4 = "<div class='row'>\
        <div class='col s12'><a href='#modal3' class='waves-effect modal-trigger modal-3-btn' style='color:black;'><p style='font-size:small;'><span>Edit <i class='material-icons right'>mode_edit</i></p><li class='divider'></li></a></div>\
        </div><div class='row'>\
        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Mobile : </span><br>"+data.lead_details.lead_mobile_no+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Email : </span><br>"+data.lead_details.lead_email+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>City : </span><br>"+data.lead_details.lead_city+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Address : </span><br>"+data.lead_details.lead_address+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Website : </span><br>"+data.lead_details.website+"</p></div>\
          <div class='col s6'><a class=\"waves-effect waves-light btn light-blue lighten-1 btn-small\" href=\"add_quick_lead.html?first_name="+data.lead_details.lead_first_name+"&last_name="+data.lead_details.lead_last_name+"&mobile="+data.lead_details.lead_mobile_no+"&email="+data.lead_details.lead_email+"\">Clone Lead</a></div>\
          <div class='col s6'><a class=\"waves-effect waves-light btn light-blue lighten-1 btn-small modal-trigger\" href=\"#modal4\" >Update <i class='material-icons'>add_location</i></a></div>\
        </div>";

        var str_5 = "<div class='row'>\
        <div class='col s12'><a href='#modal2' class='waves-effect modal-trigger modal-2-btn' style='color:black;'><p style='font-size:small;'><span>Edit <i class='material-icons right'>mode_edit</i></p><li class='divider'></li></a></div>\
        </div><div class='row'>\
        <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Lead Stage : </span><br>"+data.lead_details.lead_stage+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Lead Potential : </span><br>"+data.lead_details.lead_potential+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Deal Size : </span><br>"+data.lead_details.deal_value+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Interested In : </span><br>"+data.lead_details.interested_in+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Lead Category : </span><br>"+data.lead_details.lead_category+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Beat No. : </span><br>"+data.lead_details.beat_no+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Beat Name : </span><br>"+data.lead_details.beat_name+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Store Level : </span><br>"+data.lead_details.store_level+"</p></div>\
          <div class='col s12'><p style='font-size:small;'><span class='light-blue-text text-lighten-1'>Notes : </span><br>"+data.lead_details.notes+"</p></div>\
        </div>";

        var str_7 = "<div class='row'>\
        <div class='col s12'><a href='#modal1' class='waves-effect modal-trigger' style='color:black;'><p style='font-size:small;'><span>Add Lead Activity <i class='material-icons right'>mode_edit</i></p><li class='divider'></li></a></div>\
        </div><div class='row'>";
        if(data.lead_activity.length == 0){
          str_7 +=  "<div class=\"col s12\">\
                        <div class=\"card\">\
                          <div class=\"card-content\">\
                            <span class=\"card-title custom-card-span\">Activity</span>\
                            <p>No activity recorded!</p>\
                          </div>\
                        </div>\
                      </div>";
        }
        else{
          str_7 += "<div class=\"col s12\">\
                      <p style=\"font-weight:bold;\">Activity Count : "+data.lead_activity.length+"</p>\
                    </div>";

          for(var i=0;i<data.lead_activity.length;i++){
            var demo_given = "No";
            if(data.lead_activity[i].demo_given == "1"){
              demo_given = "Yes";
            }

            str_7 +=  "<div class=\"col s12\">\
                        <div class=\"card\">\
                          <div class=\"card-content\">\
                            <span class=\"card-title custom-card-span\" style=\"font-weight:500 !important;\">Activity "+ (data.lead_activity.length-i) +"</span>\
                            <li class='divider'></li>\
                            <p style=\"margin-top:20px;\">"+data.lead_activity[i].activity+"</p><br>\
                            <p>Demo Given : "+demo_given+"</p>\
                          </div>\
                          <div class=\"card-action\" style='padding:10px;'>\
                            <a href=\"#!\" style='font-size:x-small;color: #4fbff1 !important;'>"+data.lead_activity[i].date_time+"</a>\
                          </div>\
                        </div>\
                      </div>";
    
          }
        }

        str_7 += "</div>";

        var str_8 = "<div class='row'>";
        if(data.lead_activity_day_wise.length == 0){
          str_8 +=  "<div class=\"col s12\">\
                        <div class=\"card\">\
                          <div class=\"card-content\">\
                            <span class=\"card-title custom-card-span\">Activity</span>\
                            <p>No activity recorded!</p>\
                          </div>\
                        </div>\
                      </div>";
        }
        else{
          str_8 += "<div class=\"col s12\">\
                      <p style=\"font-weight:bold;\">Activity Count : "+data.lead_activity_day_wise.length+"</p>\
                    </div>";
          for(var i=0;i<data.lead_activity_day_wise.length;i++){
            
            str_8 +=  "<div class=\"col s12\">\
                        <div class=\"card\">\
                          <div class=\"card-content\">\
                            <span class=\"card-title custom-card-span\" style=\"font-weight:500 !important;\">Activity "+ (data.lead_activity_day_wise.length-i) +"</span>\
                            <li class='divider'></li>";
                            var j = 0
                            for(j=0;j<data.lead_activity_day_wise[i].length;j++){
                              str_8 += "<p style=\"margin-top:10px;\">"+data.lead_activity_day_wise[i][j].activity+"</p><br>";
                            } 

            str_8 +=      "</div>\
                          <div class=\"card-action\" style='padding:10px;'>\
                            <a href=\"#!\" style='font-size:x-small;color: #4fbff1 !important;'>"+data.lead_activity_day_wise[i][j-1].day+"</a>\
                          </div>\
                        </div>\
                      </div>";
    
          }
        }

        str_8 += "</div>";

        var str_9 = "<div class=\"col s2 offset-s1\">\
                      <a class=\"btn-floating red\" href=\"#\" phone_no="+data.lead_details.lead_mobile_no+" id=\"Add-Lead-Mobile-Number\"><i class=\"material-icons\">local_phone</i></a>\
                    </div>";

        if(data.lead_details.next_follow_up_date == null || data.lead_details.next_follow_up_date == "" ){
            str_9 += "<div class=\"col s2\">\
                      <a class=\"btn-floating blue\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaSMS('Dear "+data.lead_details.lead_first_name+", Thanks for sparing your valuabletime to see us. It was nice meeting you.Its our endeavour to assist you with our best productsand services. \
                        Regards \
                        "+data.employee_details.employee_name+" \
                        "+data.employee_details.employee_designation+" \
                        TamarindMarks \
                        "+data.employee_details.employee_email+" \
                        "+data.employee_details.employee_mobile+", null , function(msg) {console.log('ok: ' + msg)}, function(msg) {alert('error: ' + msg)})\"><i class=\"material-icons\">message</i></a>\
                    </div>\
                    <div class=\"col s2\">\
                      <a class=\"btn-floating red\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaEmail('Dear "+data.lead_details.lead_first_name+", Thanks for sparing your valuable time to see us. It was nice meeting you. Its our endeavour to assist you with our best products and services.<br><br>\
                        Regards<br><br>\
                        "+data.employee_details.employee_name+"<br><br>\
                        "+data.employee_details.employee_designation+"<br><br>\
                        TamarindMarks<br><br>\
                        "+data.employee_details.employee_email+"<br><br>\
                        "+data.employee_details.employee_mobile+"','Hello There!',['"+data.lead_details.lead_email+"']);\"><i class=\"material-icons\">email</i></a>\
                    </div>\
                    <div class=\"col s2\">\
                      <a class=\"btn-floating pink\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaEmail('Dear "+data.lead_details.lead_first_name+",Please find attached a tentative estimate for our #Product for #QuantityThese products are helping many businesses improvethe productivity of their teams and extract higher yield from existing resources.Please suggest a suitable time to connect with you again to take the association forward.<br><br>\
                        Regards<br><br>\
                        "+data.employee_details.employee_name+"<br><br>\
                        "+data.employee_details.employee_designation+"<br><br>\
                        TamarindMarks<br><br>\
                        "+data.employee_details.employee_email+"<br><br>\
                        "+data.employee_details.employee_mobile+"','Tentative estimate',['"+data.lead_details.lead_email+"']);\"><i class=\"material-icons\">note_add</i></a>\
                    </div>\
                    <div class=\"col s2\">\
                      <a class=\"btn-floating green\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaWhatsApp('Dear "+data.lead_details.lead_first_name+",Thanks for sparing your valuable time to see us.It was nice meeting you.Its our endeavour to assist you with our best products and services. \
                        Regards \
                        "+data.employee_details.employee_name+" \
                        "+data.employee_details.employee_designation+" \
                        TamarindMarks \
                        "+data.employee_details.employee_email+" \
                        "+data.employee_details.employee_mobile+"')\"><i class=\"fa fa-whatsapp\" aria-hidden=\"true\"></i></a>\
                    </div>";
           }
           else{
            str_9 += "<div class=\"col s2\">\
                      <a class=\"btn-floating blue\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaSMS('Dear "+data.lead_details.lead_first_name+", Thanks for sparing your valuabletime to see us.Its our endeavour to assist you with our best products and services.As discussed, look forward to meet you again on "+data.lead_details.next_follow_up_date+" at "+data.lead_details.next_follow_up_time+" \
                        Regards \
                        "+data.employee_details.employee_name+" \
                        "+data.employee_details.employee_designation+" \
                        TamarindMarks \
                        "+data.employee_details.employee_email+" \
                        "+data.employee_details.employee_mobile+"', null , function(msg) {console.log('ok: ' + msg)}, function(msg) {alert('error: ' + msg)})\"><i class=\"material-icons\">message</i></a>\
                    </div>\
                    <div class=\"col s2\">\
                      <a class=\"btn-floating red\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaEmail('Dear "+data.lead_details.lead_first_name+", Thanks for sparing your valuable time to see us. It was nice meeting you. Its our endeavour to assist you with our best products and services. As discussed, look forward to meet you again on "+data.lead_details.next_follow_up_date+" at "+data.lead_details.next_follow_up_time+"<br><br>\
                        Regards<br><br>\
                        "+data.employee_details.employee_name+"<br><br>\
                        "+data.employee_details.employee_designation+"<br><br>\
                        TamarindMarks<br><br>\
                        "+data.employee_details.employee_email+"<br><br>\
                        "+data.employee_details.employee_mobile+"','Hello There!',['"+data.lead_details.lead_email+"']);\"><i class=\"material-icons\">email</i></a>\
                    </div>\
                    <div class=\"col s2\">\
                      <a class=\"btn-floating pink\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaEmail('Dear "+data.lead_details.lead_first_name+",Please find attached a tentative estimate for our #Product for #QuantityThese products are helping many businesses improvethe productivity of their teams and extract higher yield from existing resources.Please suggest a suitable time to connect with you again to take the association forward.<br><br>\
                        Regards<br><br>\
                        "+data.employee_details.employee_name+"<br><br>\
                        "+data.employee_details.employee_designation+"<br><br>\
                        TamarindMarks<br><br>\
                        "+data.employee_details.employee_email+"<br><br>\
                        "+data.employee_details.employee_mobile+"','Tentative estimate',['"+data.lead_details.lead_email+"']);\"><i class=\"material-icons\">note_add</i></a>\
                    </div>\
                    <div class=\"col s2\">\
                      <a class=\"btn-floating green\" href=\"#\"  onclick=\"window.plugins.socialsharing.shareViaWhatsApp('Dear "+data.lead_details.lead_first_name+",Thanks for sparing your valuable time to see us.It was nice meeting you.Its our endeavour to assist you with our best products and services.As discussed, look forward to meet you again on "+data.lead_details.next_follow_up_date+" at "+data.lead_details.next_follow_up_time+" \
                        Regards \
                        "+data.employee_details.employee_name+" \
                        "+data.employee_details.employee_designation+" \
                        TamarindMarks \
                        "+data.employee_details.employee_email+" \
                        "+data.employee_details.employee_mobile+"')\"><i class=\"fa fa-whatsapp\" aria-hidden=\"true\"></i></a>\
                    </div>";
           }
                  
        $("#individual_lead_image").html(str_1);
        $("#individual_lead_name").html(str_2); 
        $("#individual_lead_creation").html(str_3); 
        $("#test1").html(str_4);
        $("#test2").html(str_5);
        $("#test41").html(str_7);
        $("#test42").html(str_8);
        $('.timepicker').timepicker();
        $('.modal').modal();
        $('.lead_id').attr('value',lead_id);
        $("#sharing_icons").html(str_9);
        $('.tabs').tabs();
        if(referer == 'dashboard'){
          $('#referer-icon').attr('href','dashboard.html');
        }
        else if(referer == 'search'){
          $('#referer-icon').attr('href',"search.html?search_term="+search_term+""); 
        }
        else if(referer == 'notification'){
          $('#referer-icon').attr('href',"notification.html"); 
        }
        else if(referer == 'my_team'){
          $('#referer-icon').attr('href',"my_team.html"); 
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

  $("#AddLeadActivity").validate({
      errorElement: "div",
        rules: {
            "activity" : {
                required : true,
            }
        },
        submitHandler: function(form) {
        var formData = $("#AddLeadActivity").serialize(); 
        $.ajax({
          // The URL for the request
          url: "http://tamarindlabs.com/index.php/Employee/AddLeadActivity/",
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
            $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
          }
        });
      }
    });

    $("#UpdateLeadSummary").validate({
      errorElement: "div",
        rules: {
            "deal_value" : {
              number : true
            },
            "lead_category" : {
              required : true
            },
            "beat_no" : {
              number : true
            },
            "beat_name" : {
              maxlength : 50
            },
            "store_level" : {
              maxlength : 50
            },
            "interested_in" : {
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
        var formData = $("#UpdateLeadSummary").serialize(); 
        $.ajax({
            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/EditLeadSummary/",
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
              $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
            }
        });
      }
    });

    $("#UpdateLeadDetails").validate({
        errorElement: "div",
        rules: {
            "lead_email" : {
                required : true,
                maxlength: 100,
                email : true
            },
            "lead_mobile_no" : {
                required : true,
                maxlength: 15 
            },
            "lead_city" : {
                required : true
            }
        },
        submitHandler: function(form) {
        var formData = $("#UpdateLeadDetails").serialize(); 
        $.ajax({
            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/EditLeadDetails/",
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
              $("#modal3").modal('close');
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
              $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
            }
        });
      }
    });

    $("#UpdateLeadCoordinates").validate({
        errorElement: "div",
        rules: {
            "lead_latitude" : {
                required : true
            },
            "lead_longitude" : {
                required : true 
            }
        },
        submitHandler: function(form) {
        var formData = $("#UpdateLeadCoordinates").serialize(); 
        $.ajax({
            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/EditLeadCoordinates/",
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
              $(".feedback").addClass('#e53935 red darken-1').html("").html("<span class=\"white-text\">Something went wrong!</span>");
            }
        });
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
            url: "http://tamarindlabs.com/index.php/Employee/AssignLead/",
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
                      window.location.href = "individual_lead_details.html?lead_id="+lead_id+"&assigned_to="+$("#Lead-Assigned").val()+"&referer="+referer+"";
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

    $("#UpdateFollowupTime").validate({
        errorElement: "div",
        rules: {
            "next_follow_up_date" : {
                required : true
            },
            "next_follow_up_time" : {
                required : true
            }
        },
        submitHandler: function(form) {
        var formData = $("#UpdateFollowupTime").serialize(); 
        $.ajax({
            // The URL for the request
            url: "http://tamarindlabs.com/index.php/Employee/EditFollowUpTime/",
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

    $(document.body).on('click', '.modal-2-btn' ,function(event){
      event.preventDefault();
      this.blur(); // Manually remove focus from clicked link.
      var parameters = {
            "lead_id" : lead_id,
            "admin_id": localStorage.getItem('employee_created_by')
      };
      $.getJSON("http://tamarindlabs.com/index.php/Employee/GetSummaryById", parameters)
        .done(function(data, textStatus, jqXHR) {
            $("#Lead-Stage").val(data.summary.lead_stage);
            $("#Lead-Potential").val(data.summary.lead_potential);
            $("#Lead-Deal-Value").attr('value',data.summary.deal_value);
            $("#Lead-Notes").val(data.summary.notes);
            $("#Lead-Beat-No").attr('value',data.summary.beat_no);
            $("#Lead-Beat-Name").attr('value',data.summary.beat_name);
            //$("#Lead-Store-Level").attr('value',data.summary.store_level);
    
            var products_data = "<option value=\"\" disabled>Choose your option</option>";
            var categories_data = "<option value=\"\" disabled>Choose your option</option>";
            var store_level_data = "<option value=\"\" disabled>Choose your option</option>";
            var products = data.summary.interested_in.split(",");

            for(var i=0;i<data.city_cat_prod.products.length;i++){
                if(products.indexOf(data.city_cat_prod.products[i].product) != -1){
                  products_data += "<option value='"+data.city_cat_prod.products[i].product+"' selected>"+data.city_cat_prod.products[i].product+"</option>";
                }
                else{
                  products_data += "<option value='"+data.city_cat_prod.products[i].product+"'>"+data.city_cat_prod.products[i].product+"</option>";
                }    
            }

            for(var i=0;i<data.city_cat_prod.categories.length;i++){
              if(data.summary.lead_category == data.city_cat_prod.categories[i].category){
                 categories_data += "<option value='"+data.city_cat_prod.categories[i].category+"' selected>"+data.city_cat_prod.categories[i].category+"</option>";
              }
              else{
                categories_data += "<option value='"+data.city_cat_prod.categories[i].category+"'>"+data.city_cat_prod.categories[i].category+"</option>";
              }
            }

            for(var i=0;i<data.city_cat_prod.store_levels.length;i++){
              if(data.summary.store_level == data.city_cat_prod.store_levels[i].store_level){
                 store_level_data += "<option value='"+data.city_cat_prod.store_levels[i].store_level+"' selected>"+data.city_cat_prod.store_levels[i].store_level+"</option>";
              }
              else{
                store_level_data += "<option value='"+data.city_cat_prod.store_levels[i].store_level+"'>"+data.city_cat_prod.store_levels[i].store_level+"</option>";
              }
            }
            
            $("#Lead-Categories").html("").html(categories_data);
            $("#Lead-Products").html("").html(products_data);
            $("#Lead-Store-Level").html("").html(store_level_data);
            $('.select').formSelect();
            M.updateTextFields();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // log error to browser's console
            console.log(errorThrown.toString());
        });
    });

    $(document.body).on('click', '.modal-3-btn' ,function(event){
      event.preventDefault();
      this.blur(); // Manually remove focus from clicked link.
      var parameters = {
            "lead_id" : lead_id,
            "admin_id" : localStorage.getItem('employee_created_by')
      };
      $.getJSON("http://tamarindlabs.com/index.php/Employee/GetSummaryById", parameters)
        .done(function(data, textStatus, jqXHR) {
            $("#Lead-Address").attr("value",data.summary.lead_address);
            $("#Lead-Email").attr("value",data.summary.lead_email);
            $("#Lead-Mobile-Number").attr('value',data.summary.lead_mobile_no);
            $("#Lead-Website").attr('value',data.summary.website);
            $("#Lead-Designation").attr('value',data.summary.lead_designation);
            $("#Lead-Company").attr('value',data.summary.lead_company);
            var cities_data = "<option value=\"\" disabled>Choose your option</option>";
            for(var i=0;i<data.city_cat_prod.cities.length;i++){
              if(data.summary.lead_city == data.city_cat_prod.cities[i].city){
                cities_data += "<option value='"+data.city_cat_prod.cities[i].city+"' selected>"+data.city_cat_prod.cities[i].city+"</option>";
              }
              else{
                cities_data += "<option value='"+data.city_cat_prod.cities[i].city+"'>"+data.city_cat_prod.cities[i].city+"</option>";
              }
            }
            $("#Lead-Cities").html("").html(cities_data);
            $('.select').formSelect();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // log error to browser's console
            console.log(errorThrown.toString());
        });
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
              if(parseInt(assigned_to) == data[i].employee_id){
                temp += "<option value='"+data[i].employee_id+"' selected>"+data[i].employee_name+"</option>";
              }
              else{
                temp += "<option value='"+data[i].employee_id+"'>"+data[i].employee_name+"</option>"; 
              }
            }
            else{
              if(parseInt(assigned_to) == data[i].employee_id){
                temp += "<option value='"+data[i].employee_id+"' selected>"+data[i].employee_name+"</option>";
              }
              else{
                temp += "<option value='"+data[i].employee_id+"' disabled>"+data[i].employee_name+"</option>"; 
              }
            }
          }
          $("#Lead-Assigned").append(temp);
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
