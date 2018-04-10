
  //$(window).on('load',function(){
  
$(document).ready(function(){
        $('#myModal').modal('show');
    });

$(document).ready(function(){
    displayWeather()
});


$(document).ready(function(){
  load_json_data('StationIName')

    function load_json_data(StationName){
        var html_code = '';
$.getJSON("stationDetails", function(data) {
    var stationList = data;
    var option = document.getElementById('StationIName');
    var j = 0;
	for(var i=0; i<stationList.length; i++){
	j++;
	option[j] = new Option(stationList[i].name, stationList[i].Station_ID);
}
    });
    
};
    });

 $(document).ready(function(){ 
$("select").change(function(){
    displayRealTimeInfo()
})
 }); 


$(document).ready(function(){
    $("select").change(function(){
        
    })
})
    
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.3498053, lng: -6.260309699999993},
    zoom: 13,
    });
    console.log("Ready");
    var infoWindow = new google.maps.InfoWindow()	
    $.getJSON("stationDetails", function(data) {
    var stationDetails = data;
    $.each(stationDetails, function(station) {
        var v_icon = '';
        var x = stationDetails[station].available_bikes;
        var y = stationDetails[station].available_bike_stands;
        if (x > y + 5){
			 v_icon = '..//static/images/bike green.png';
			 }
        else if (y > x + 5){
			 v_icon = '..//static/images/bike red.png'
			 }
        else {
			 v_icon = '..//static/images/bike yellow.png';
			 }
        var marker = new google.maps.Marker({
 			position : {
	 			lat : parseFloat(stationDetails[station].latitude),
	 			lng : parseFloat(stationDetails[station].longitude)
	 					},
	 		map : map,
	 		title : stationDetails[station].name,
	 		station_number : stationDetails[station].Station_ID,
       		icon: v_icon
	 				});
        
         marker.metadata = {type: "point", title: stationDetails[station].name};
         google.maps.event.addListener(marker, 'click', (function(marker, stationDetails)                    {
             return function(){
                 var content = "Station name: " + stationDetails[station].name + "<br>" + "Available Bikes: " + stationDetails[station].available_bikes + "<br>" + "Available Stands: " + stationDetails[station].available_bike_stands;
                  infoWindow.setContent(content)
                    infoWindow.open(map, marker);
                        }
                    }) (marker, stationDetails));
 			})
	 	});
      }
  

function displayWeather() {
    $.getJSON("weather", null, function(data) {
        console.log("sophie")
            var deetdays = data;
            var descrip = deetdays[0].description;
            var temp = deetdays[0].temp;
            var icon2 = deetdays[0].icon;
            
            var weather = "Dublin " + descrip + "<img src='http://openweathermap.org/img/w/" + icon2 + ".png'/>" + temp + "&#8451</p>";

            document.getElementById("weather").innerHTML =  weather;
                });
            };

function displayRealTimeInfo(){
  var x = document.getElementById("StationIName");
  var i = x.selectedIndex;
    var stName = x.options[i].text;
    $.getJSON ("stationDetails", null, function(data){
        var stationDetails = data;
        var headingI = "<p id = heading> Showing Info for " + stName + "</p>"
        var rTimeTable = "<table class = 'table'>";
        rTimeTable += "<tr><th>Bikes Available</th><th>Stands Available</th><th>last update</th></tr>";
        $.each(stationDetails, function(station){
            console.log("entering if statement")
            if (stName == stationDetails[station].StationIName){
                console.log("If statement passed")
                var id = "Station ID: " + stationDetails[station].Station_ID
                var availableBikes = stationDetails[station].available_bikes;
                var availableStands = stationDetails[station].available_bike_stands;
                var update = stationDetails[station].last_update;
            
            rTimeTable += "<tr><td>" + availableBikes + "</td><td>" + availableStands +"</td><td>"+ update + "</td></tr>";
            headingI += "<p>" + id + "</p>"; 
                }  
        })
        rTimeTable += "</table>"    
        document.getElementById("infoBox").innerHTML =  headingI + rTimeTable;
                   })
    }