
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 53.3498053, lng: -6.260309699999993},
          zoom: 13,
        });
        console.log("Ready");
		var infoWindow = new google.maps.InfoWindow()	
 		$.getJSON("stationDetails", function(data) {
 		//if ('StationIName' in data) {
	 			var stationDetails = data;
			 	$.each(stationDetails, function(station) {
			 		var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
					var marker = new google.maps.Marker({
 					position : {
	 						lat : parseFloat(stationDetails[station].latitude),
	 						lng : parseFloat(stationDetails[station].longitude)
	 					},
	 					map : map,
	 					title : stationDetails[station].name,
	 					station_number : stationDetails[station].Station_ID,
       					icon: iconBase + 'parking_lot_maps.png'   
	 				});
                    marker.metadata = {type: "point", title: stationDetails[station].name};
                    google.maps.event.addListener(marker, 'click', (function(marker, stationDetails)                                               
                    {
                        return function(){
                            var content = "Station name: " + stationDetails[station].name + "<br>" + "Available Bikes: " + stationDetails[station].available_bikes + "<br>" + "Available Stands: " + stationDetails[station].available_bike_stands;
                            infoWindow.setContent(content)
                            infoWindow.open(map, marker);
                        }
                    }) (marker, stationDetails));
 			})
	 		//}
	 	});
      }
  
	 
function displayForecast(){
$.getJSON("http://dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com:3306/forecast", null, function(data) {
        var deetdays = obj.list;
        var heading = "<p id=heading>Today's Forecast</p>"
        var detailedTable = "<table class='weatherTable'>";
        detailedTable += "<tr><th>Day</th><th>Summary</th><th></th><th>Temp</th><th>Pressure</th><th>Humidity</th><th>Wind Speed</th></tr>";

        while (i < 8){   
            var time = deetdays[i].dt_txt;
            var descrip = deetdays[i].description;
            var icon2 = deetdays[i].icon;
            var temp = deetdays[i].temp;
            var windspeed = deetdays[i].wind_speed;

        detailedTable += "<tr><td>" + time +"</td><td id='description'>" + descrip + "</td><td><img class='icons' src='http://openweathermap.org/img/w/" + icon2 + ".png'/></td><td>" + temp + "&#8451;</td><td>"+ windspeed + " meter/sec </td></tr>";
            i++
        }
        detailedTable += "</table>";
        document.getElementById("detailedForecast").innerHTML =  heading + detailedTable;
 			})
 		}

