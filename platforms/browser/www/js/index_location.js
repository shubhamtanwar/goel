
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
        setTimeout(function(){
            app.receivedGeoLocation('deviceready');
        },4000);
    },
    receivedGeoLocation : function(id){
        var onSuccess = function(position) {
            
            $("#lead_longitude").attr('value',position.coords.longitude.toFixed(6));
            $("#lead_latitude").attr('value',position.coords.latitude.toFixed(6));
            M.updateTextFields();
        };

        // onError Callback receives a PositionError object
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);  
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};
