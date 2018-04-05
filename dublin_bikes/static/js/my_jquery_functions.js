var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 53.3498053, lng: -6.260309699999993},
          zoom: 13
        });
        console.log("Ready");
			
	 		$.getJSON("stations", function(data) {
	 		//console.log(data);
	 		//if ('StationIName' in data) {
	 			var stations = data;
	 			//console.log('stations', stations);
			 	$.each(stations, function(station) {
	 				 console.log(station);
					var marker = new google.maps.Marker({
	 					position : {
	 						lat : parseFloat(stations[station].Latitude),
	 						lng : parseFloat(stations[station].Longitude)
	 					},
	 					map : map,
	 					title : stations[station].StationIName,
	 					station_number : stations[station].Station_ID
	 				});
	 				marker.addListener("click", function()){
	 				});
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

