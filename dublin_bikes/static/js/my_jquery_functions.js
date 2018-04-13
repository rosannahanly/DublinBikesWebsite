//Display modal when user first visits the page
$(document).ready(function () {
        $('#myModal').modal('show');
    });

//Displays occupancy on stands available
 $(document).on("click", "#stands", function(){
 	$('#myModal').modal('hide');
    changeMarkers();
});

//Displays occupancy based on bikes available
 $(document).on("click", "#bikes", function(){
 	$('#myModal').modal('hide');
    displayMarkers();
});

//Displays weather, map when page is loaded
$(document).ready(function(){
    displayWeather()
    displayMap()
    document.getElementById("weather").style.textTransform = "capitalize";
});

//Loads station details data from database
$(document).ready(function(){
  load_json_data('StationIName')

//Populates a dropdown menu with the station names
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

//When item is slected the following functions are called
 $(document).ready(function(){
$("select").change(function(){
    displayRealTimeInfo();
    displayForecast();
});
 }); 


//Displays a simple map of dublin with no markers
function displayMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.3498053, lng: -6.260309699999993},
    zoom: 13,
    })
};
    
var map;

 //Displays markers on the map focusing on available bikes
function displayMarkers() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.3498053, lng: -6.260309699999993},
    zoom: 13,
    });
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
                var content = "<b>" + stationDetails[station].name + "</b>: "+ stationDetails[station].last_update.slice(5,22)+ "<br>&emsp;&emsp;&emsp;<b>Bikes:</b> " + stationDetails[station].available_bike_stands + "&emsp; &emsp; &emsp;<b>Stands: </b>" + stationDetails[station].available_bikes;
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
 
 //Displays markers on the map focusing on available stands
 function changeMarkers() {
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
                 var content = "<b>" + stationDetails[station].name + "</b>: "+ stationDetails[station].last_update.slice(5,22)+"<br>&emsp; &emsp; &emsp;<b>Stands: </b>" + stationDetails[station].available_bikes+ "&emsp;&emsp;&emsp;<b>Bikes:</b> " + stationDetails[station].available_bike_stands;
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
  
//Display Current weather
function displayWeather() {
    $.getJSON("weather", null, function(data) {
            var deetdays = data;
            var descrip = deetdays[0].description;
            var temp = deetdays[0].temp;
            var icon2 = deetdays[0].icon;
            
            var weather = "Current Weather: " + descrip + "<img src='http://openweathermap.org/img/w/" + icon2 + ".png'/>" + temp + "&#8451</p>";

            document.getElementById("weather").innerHTML =  weather;
                });
            };

//Display station markers and real time information for occupancy
function displayRealTimeInfo(){
    var x = document.getElementById("StationIName");
    var i = x.selectedIndex;
    var stName = x.options[i].text;
    $.getJSON ("stationDetails", null, function(data){
        var stationDetails = data;
        var headingI = "<p id = heading><b> Station Name: </b>" + stName+ "<br>";
        var rTimeTable = "<table class ='StationTable'>";
        rTimeTable += "<tr><th>Bikes Available</th><th>Stands Available</th><th>Last Update</th></tr>";
        var lat;
        var lng;
        $.each(stationDetails, function(station){
            if (stName == stationDetails[station].StationIName){
                var id = "<b>Station ID: </b>" + stationDetails[station].Station_ID
                var availableBikes = stationDetails[station].available_bikes;
                var availableStands = stationDetails[station].available_bike_stands;
                var update = stationDetails[station].last_update;
                lat = parseFloat(stationDetails[station].latitude);
                lng = parseFloat(stationDetails[station].longitude);

                rTimeTable += "<tr><td>" + availableBikes + "</td><td>" + availableStands +"</td><td>"+ update + "</td></tr>";
                headingI += id + "</p>"; 
                
            }  
        })
        rTimeTable += "</table>"    
        document.getElementById("stationInfo").innerHTML =  headingI + rTimeTable;
        document.getElementById("map").innerHTML
        map.setCenter({lat:lat, lng: lng});
        map.setZoom(16);

    })
}

//Display weather Forecast
function displayForecast() {
    $.getJSON("forecast", null, function(data) {
            var weather = data;
            var heading = "<p id=heading><b>Forecast 24hrs<b></p>"
            var detailedTable = "<table class='weatherTable'>";
            var i=0;
            while (i < 8){   
                var initTime = weather[i].dt_txt;
                var split = initTime.split(" ")
                var time = split[1].slice(0, 5);
                var descrip = weather[i].description;
                var icon = weather[i].icon;
                var temp = weather[i].temp;
            detailedTable += "<tr><td><b>" + time +"</b></td><td>" + descrip + "  <img class='icons' src='http://openweathermap.org/img/w/" + icon + ".png'/></td><td>" + temp + "&#8451;</td><tr>";
             i++
         }
         detailedTable += "</table>";
            document.getElementById("weatherInfo").innerHTML =  detailedTable;
                });
            };


//Populate the start dropdown list
$(document).ready(function(){
  load_json_data('start')
    function load_json_data(StationAddress){
        var html_code = '';
        $.getJSON("stationDetails", function(data) {
        var stationList = data;
        var option = document.getElementById('start');
        var j = 0;
	   for(var i=0; i<stationList.length; i++){
	   j++;
            var coord = [stationList[i].latitude, stationList[i].longitude]
	   option[j] = new Option(stationList[i].StationIName, coord);
       }
    });
    
};
    });

//Populate the end dropdown list
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

//Get directions from one station to another using dropdown list
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


//Find stations nearby
 $(document).on("click", "#findStationsNearby", function(){
     var x = document.getElementById("nearbyStations");
     var Userlat;
     var UserLng;
     getLocation();
    //Getting geolocation of user
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(findNearbyStations);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
      });
function findNearbyStations(position) {
    console.log('here')
    var list = [];
    var stationList = [];
    var Userlat = position.coords.latitude;
    var UserLng = position.coords.longitude;
    var userCord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $.getJSON ("stationDetails", null, function(data){
        var stationLocation = data;
          $.each(stationLocation, function(findStation){
            var name = stationLocation[findStation].StationIName;
            var lat = parseFloat(stationLocation[findStation].latitude);
            var lng = parseFloat(stationLocation[findStation].longitude);
            var availableBikes = stationLocation[findStation].available_bikes;
            var availableStands = stationLocation[findStation].available_bike_stands;
            var update = stationLocation[findStation].last_update;
            var stationCord = new google.maps.LatLng(lat, lng);
            var dist = (google.maps.geometry.spherical.computeDistanceBetween(stationCord, userCord)/1000);
            list.push({Dist:dist,Name:name, AvailableBike:availableBikes, AvailableStand:availableStands, LastUpdate:update.slice(5,22), Lat:lat, Lng:lng});
        });
        list.sort(function(a, b){return a['Dist'] - b['Dist']});
        stationList = list.slice(0,5);
        var NearbyTable = "<table class ='NearbyStationTable'><tr><th>Station</th><th>Bikes Available</th><th>Stands Available</th><th>Last Update</th></tr>";
            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 12,
    });
        var marker = new google.maps.Marker({
 			position : {
                lat: position.coords.latitude,
                lng:position.coords.longitude
            },
	 		map : map,
       		icon: '..//static/images/bike green.png'
	 				});
       for (i = 0; i < 5; i++){
            NearbyTable += "<tr><td>" + stationList[i]['Name'] + "</td><td>" + stationList[i]['AvailableBike'] + "</td><td>" + stationList[i]['AvailableStand'] +"</td><td>"+ stationList[i]['LastUpdate'] + "</td></tr>";
        
        var marker = new google.maps.Marker({
 			position : {
	 			lat : stationList[i]['Lat'],
	 			lng :stationList[i]['Lng']
	 					},
	 		map : map,
	 		title : stationList[i]['Name'],
       		icon: '..//static/images/bike yellow.png'
	 				});
        
         marker.metadata = {type: "point", title: stationList[i]['Name']};
           
                    marker.addListener('click', function(){
                    map.setZoom(16);
                    map.setCenter(marker.getPosition());
                 } );     
        };
        NearbyTable += "</table>" 
        document.getElementById("nearbyStations").innerHTML= NearbyTable;
            
 			})
    
    }

//Show directions from start to finish
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

//Show elevation of the path selected by user. 
function showElevation(origin, destination) {
        var path = [
           {lat: parseFloat(origin[0]), lng: parseFloat(origin[1])}, 
           {lat: parseFloat(destination[0]), lng: parseFloat(destination[1])}];

        var elevator = new google.maps.ElevationService;
    
        elevator.getElevationAlongPath({
          'path': path,
          'samples': 300
        }, plotElevation);
      }

      function plotElevation(elevations, status) {
        var chartDiv = document.getElementById('elevation_chart');
        if (status !== 'OK') {
          // Show the error code inside the chartDiv.
          chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
              status;
          return;
        }
        var chart = new google.visualization.ColumnChart(chartDiv);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (var i = 0; i < elevations.length; i++) {
          data.addRow(['', elevations[i].elevation]);
        }

        chart.draw(data, {
          height: 200,
          legend: 'none'
        });
      }

