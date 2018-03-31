 var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
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