<<<<<<< HEAD
 var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
<<<<<<< HEAD
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
	 
	
=======
            center: {
                lat: 53.355122,
                lng: -6.24922
            },
            zoom: 12
        })
        marker = new google.maps.Marker ({
            map: map,
            position: new google.maps.LatLng(53.3498053,-6.260309699999993)});
    }
=======
var map;
 //$( document ).ready(showStationMarkers());
 	function showStationMarkers(data) {
>>>>>>> branch 'master' of https://github.com/rosannahanly/Group8Project.git

<<<<<<< HEAD
  
function showStationMarkers(data) {
		var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(53.3438, -6.2546),
    });
 		$.getJSON("http://dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com:3306/stations", null, function(data) {
 		if ('stations' in data) {
 			var stations = data.stations;
 			console.log('stations', stations);
		 	_.forEach(stations, function(station) {
 				// console.log(station.name, station.number);
				var marker = new google.maps.Marker({
 					position : {
 						lat : station.position_lat,
 						lng : station.position_lng
 					},
 					map : map,
 					title : station.name,
 					station_number : station.number
 				});
 				marker.addListener("click", function() {
 					//drawStationCharts(this);
 					drawStationChartsWeekly(this);
				});
 			})
 		}
 	});
 }
>>>>>>> branch 'master' of https://github.com/rosannahanly/Group8Project.git
=======
		var map;
      	
			console.log("Ready");
			map = google.maps.Map(document.getElementById('map'));
	 		$.getJSON("stations", function(data) {
	 		console.log(data);
 	 		//if ('StationIName' in data) {
 	 			var stations = data;
 	 			//console.log('stations', stations);

			 	$.each(stations, function(station) {
 	 				// console.log(station.name, station.number);
 					var marker = new google.maps.Marker({
 	 					position : {
	 						lat : parseFloat(station.Latitude),
	 						lng : parseFloat(station.Longitude)
 	 					},
 	 					map : map,
 	 					title : station.StationIName,
@@ -26,4 +25,4 @@
 	 	});
 	 }
 	 
>>>>>>> branch 'master' of https://github.com/rosannahanly/Group8Project.git
