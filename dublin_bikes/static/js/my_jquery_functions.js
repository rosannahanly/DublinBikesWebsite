 //$( document ).ready(showStationMarkers());
	function showStationMarkers(data) {
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
	 					station_number : station.Station_ID
	 				});
	 			})
	 		//}
	 	});
	 }
	 
	