
 var map;
	function showStationMarkers(data) {
			map = new google.maps.Map(document.getElementById('map'), {
		        zoom: 13,
		        center: new google.maps.LatLng(53.3438, -6.26030)
		    });
		    
	 		$.getJSON("127.0.0.1:5000/stations", null, function(data) {
	 		//if ('StationIName' in data) {
	 			var stations = data;
	 			//console.log('stations', stations);
			 	_.forEach(stations, function(station) {
	 				// console.log(station.name, station.number);
					var marker = new google.maps.Marker({
	 					position : {
	 						lat : station.Latitude,
	 						lng : station.Longitude
	 					},
	 					map : map,
	 					title : station.StationIName,
	 					station_number : station.Station_ID
	 				});
	 			})
	 		//}
	 	});
	 }
	 
	 showStationMarkers();