$(document).ready(function () {
        $('#myModal').modal('show');
    });

 $(document).on("click", "#stands", function(){
 	$('#myModal').modal('hide');
    changeMarkers();
});

 $(document).on("click", "#bikes", function(){
 	$('#myModal').modal('hide');
    displayMarkers();
});


$(document).ready(function(){
    displayWeather()
    displayMap()
    document.getElementById("weather").style.textTransform = "capitalize";
});


$(document).ready(function(){
  load_json_data('StationIName')

function load_json_data(StationName){
        //this function populates a dropdown menu with the station names
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
     //when item is slected the following functions are called
$("select").change(function(){
    displayRealTimeInfo();
});
     
$("select").change(function(){
    
    //recentreMap();
});
 }); 


function displayMap() {
    //this function displays a simple map of dublin with no markers
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.3498053, lng: -6.260309699999993},
    zoom: 13,
    })
};
    
var map;
function displayMarkers() {
    //this function displays markers on the map focusing on available bikes
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
			 v_icon = '..//static/images/iconGreen.png';
			 }
        else if (y > x + 5){
			 v_icon = '..//static/images/iconRed.png'
			 }
        else {
			 v_icon = '..//static/images/iconOrange.png';
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
        
        marker.addListener('click', function(){
            map.setZoom(16);
            map.setCenter(marker.getPosition());
        });
        

 			})
	 	});
      }
      
 function changeMarkers() {
     //this function displays markers on the map focusing on available stands
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
        var y = stationDetails[station].available_bikes;
        var x = stationDetails[station].available_bike_stands;
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
                 var content = "Station name: " + stationDetails[station].name + "<br>" + "Available Stands: " + stationDetails[station].available_bike_stands + "<br>" + "Available Bikes: " + stationDetails[station].available_bikes;
                  infoWindow.setContent(content)
                    infoWindow.open(map, marker);
                        }
                    }) (marker, stationDetails));
        
                marker.addListener('click', function(){
                    map.setZoom(16);
                    map.setCenter(marker.getPosition());
            
 			})
        
        });
        
	 	});
      }     
  

function displayWeather() {
    //this function displays the current weather
    $.getJSON("weather", null, function(data) {
            var deetdays = data;
            var descrip = deetdays[0].description;
            var temp = deetdays[0].temp;
            var icon2 = deetdays[0].icon;
            
            var weather = "Current Weather: " + descrip + "<img src='http://openweathermap.org/img/w/" + icon2 + ".png'/>" + temp + "&#8451</p>";

            document.getElementById("weather").innerHTML =  weather;
                });
            };

function displayRealTimeInfo(){
    //document.open("text/html","replace");
    //this function displays the realtime info for a station when selected
    var x = document.getElementById("StationIName");
    var i = x.selectedIndex;
    var stName = x.options[i].text;
    $.getJSON ("stationDetails", null, function(data){
        var stationDetails = data;
        var headingI = "<p id = heading> Showing Info for " + stName + "</p>"
        var rTimeTable = "<table class = 'table'>";
        rTimeTable += "<tr><th>Bikes Available</th><th>Stands Available</th><th>last update</th></tr>";
        var lat;
        var lng;
        $.each(stationDetails, function(station){
            console.log("entering if statement")
            if (stName == stationDetails[station].StationIName){
                console.log("If statement passed")
                var id = "Station ID: " + stationDetails[station].Station_ID
                var availableBikes = stationDetails[station].available_bikes;
                var availableStands = stationDetails[station].available_bike_stands;
                var update = stationDetails[station].last_update;
                lat = parseFloat(stationDetails[station].latitude);
                lng = parseFloat(stationDetails[station].longitude);

                rTimeTable += "<tr><td>" + availableBikes + "</td><td>" + availableStands +"</td><td>"+ update + "</td></tr>";
                headingI += "<p>" + id + "</p>"; 

            }  
        })
        rTimeTable += "</table>"    
        document.getElementById("infoBox").innerHTML =  headingI + rTimeTable;
        document.getElementById("map").innerHTML
        map.setCenter({lat:lat, lng: lng});
        map.setZoom(16);

    })
}

   $(document).ready(function(){
  load_json_data('start')
    function load_json_data(StationAddress){
        var html_code = '';
        $.getJSON("stationDetails", function(data) {
        var stationList = data;
        var option = document.getElementById('start');
        var j = 1;
            var myLocation = navigator.geolocation.getCurrentPosition(showPosition)
            option[j] = new Option('CURRENT LOCATION', myLocation);
	   for(var i=0; i<stationList.length; i++){
	   j++;
            var coord = [stationList[i].latitude, stationList[i].longitude]
	   option[j] = new Option(stationList[i].StationIName, coord);
       }
    });
    
};
    });
        
$(document).ready(function(){
  load_json_data('end')
    function load_json_data(StationAddress){
        var html_code = '';
        $.getJSON("stationDetails", function(data) {
        var stationList = data;
        var option = document.getElementById('end');
        var j = 0;
	   for(var i=0; i<stationList.length; i++){
	   j++;
           var coord = [stationList[i].latitude, stationList[i].longitude]
	   option[j] = new Option(stationList[i].StationIName, coord);
       }
    });
    
};
    });

$(document).ready(function(){
$("#directionDropdown").change(function(){
    var start = document.getElementById('start').value,
     end = document.getElementById('end').value,
    startList = start.split(","),
    endList = end.split(","),
    startLat = startList[0],
     startLong = startList[1],
     endLat = endList[0],
     endLong = endList[1];
    
  showDirectionsMap(startLat, startLong, endLat, endLong)
    document.getElementById('elevationChartName').innerHTML = "Elevation along this Route (m)"
});
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}      
function showPosition(position) {
    var latlon = [position.coords.latitude, position.coords.longitude];
    return latlon;
}

function showDirectionsMap(startLat, startLong, endLat, endLong) {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 53.3498053, lng: -6.260309699999993}
         });
    var lat = [startLat, endLat];
    var long = [startLong, endLong];
    for(var i=0; i<2; i++){
        var marker = new google.maps.Marker({
 			position : {
	 			lat : parseFloat(lat[i]),
	 			lng : parseFloat(long[i])
	 					},
        });
        directionsDisplay.setMap(map);
        //directionsDisplay.setPanel(document.getElementById('direction-panel'));
        var origin = [startLat, startLong],
         destination = [endLat, endLong];
         calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);
        showElevation(origin, destination)
        };
        
      }
    
    function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
        directionsService.route({
          origin: {lat: parseFloat(origin[0]), lng: parseFloat(origin[1])},
          destination: {lat: parseFloat(destination[0]), lng: parseFloat(destination[1])},
          travelMode: 'BICYCLING'
        }, function(response, status) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(document.getElementById('direction-panel'));
        });
        }


function showElevation(origin, destination) {
        // The following path marks a path from Mt. Whitney, the highest point in the
        // continental United States to Badwater, Death Valley, the lowest point.
        var path = [
           {lat: parseFloat(origin[0]), lng: parseFloat(origin[1])}, 
           {lat: parseFloat(destination[0]), lng: parseFloat(destination[1])}];

        // Create an ElevationService.
        var elevator = new google.maps.ElevationService;

        // Create a PathElevationRequest object using this array.
        // Ask for 100 samples along that path.
        // Initiate the path request.
        elevator.getElevationAlongPath({
          'path': path,
          'samples': 300
        }, plotElevation);
      }

      // Takes an array of ElevationResult objects, draws the path on the map
      // and plots the elevation profile on a Visualization API ColumnChart.
      function plotElevation(elevations, status) {
        var chartDiv = document.getElementById('elevation_chart');
        if (status !== 'OK') {
          // Show the error code inside the chartDiv.
          chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
              status;
          return;
        }
        // Create a new chart in the elevation_chart DIV.
        var chart = new google.visualization.ColumnChart(chartDiv);

        // Extract the data from which to populate the chart.
        // Because the samples are equidistant, the 'Sample'
        // column here does double duty as distance along the
        // X axis.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (var i = 0; i < elevations.length; i++) {
          data.addRow(['', elevations[i].elevation]);
        }

        // Draw the chart using the data within its DIV.
        chart.draw(data, {
          height: 200,
          legend: 'none'
        });
      }

