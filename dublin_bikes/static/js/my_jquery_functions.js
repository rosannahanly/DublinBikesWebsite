 //$( document ).ready(showStationMarkers());
      
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
	 			})
	 		//}
	 	});
      }
	 
	