//Displays modal, weather, map, station details when page is loaded
$(document).ready(function() {
	$('#myModal').modal('show');
	displayWeather()
	displayMap()
	populateFindStationDropdown('StationIName')
	populateJourneyPlannerDropdown('start')
	populateJourneyPlannerDropdown('end')
	document.getElementById("weather").style.textTransform = "capitalize";
});


//Displays occupancy on stands available
$(document).on("click", "#stands", function() {
	$('#myModal').modal('hide');
	changeMarkers();
});


//Displays occupancy based on bikes available
$(document).on("click", "#bikes", function() {
	$('#myModal').modal('hide');
	displayMarkers();
});


//Populates the dropdown list to Search stations using ID value
function populateFindStationDropdown(StationName) {
	var html_code = '';
	$.getJSON("stations", function(StationListName) {
		var stationList = StationListName;
		var option = document.getElementById('StationIName');
		var j = 0;
		for (var i = 0; i < stationList.length; i++) {
			j++;
			option[j] = new Option(stationList[i].StationIName, stationList[i].Station_ID);
		}
	});
};


//Populate the dropdown list to Plan a Journey using coordinate value
function populateJourneyPlannerDropdown(StationAddress) {
	var html_code = '';
	$.getJSON("stations", function(StationListName) {
		var stationList = StationListName;
		var option = document.getElementById(StationAddress);
		var j = 0;
		for (var i = 0; i < stationList.length; i++) {
			j++;
			var coord = [stationList[i].Latitude, stationList[i].Longitude]
			option[j] = new Option(stationList[i].StationIName, coord);
		}
	});
};


//When Station in 'Select a Station' dropdown is selected the displayRealTimeInfo and displayforecast functions are called
$(document).ready(function() {
	$("select").change(function() {
		displayRealTimeInfo();
		displayForecast();
	});
});


//Displays a simple map of dublin with no markers
function displayMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 53.3498053,
			lng: -6.260309699999993
		},
		zoom: 13,
	})
};
var map;


//Displays markers on the map focusing on available bikes
function displayMarkers() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 53.3498053,
			lng: -6.260309699999993
		},
		zoom: 13,
	});
	var infoWindow = new google.maps.InfoWindow()
	$.getJSON("stations", function(StationData) {
		$.getJSON("stationDetails", function(stationData) {
			var DynamicDetails = stationData;
			var stationDetails = StationData;
			$.each(stationDetails, function(station) {
				var v_icon = '';
				var x = DynamicDetails[station].available_bikes;
				var y = DynamicDetails[station].available_bike_stands;
				if (x > y + 5) {
					v_icon = '..//static/images/marker_green.png';
				} else if (y > x + 5) {
					v_icon = '..//static/images/marker_red.png'
				} else {
					v_icon = '..//static/images/marker_orange.png';
				}
				var marker = new google.maps.Marker({
					position: {
						lat: parseFloat(stationDetails[station].Latitude),
						lng: parseFloat(stationDetails[station].Longitude)
					},
					map: map,
					title: stationDetails[station].StationIName,
					station_number: stationDetails[station].Station_ID,
					icon: v_icon
				});
				marker.metadata = {
					type: "point",
					title: stationDetails[station].StationIName
				};
				google.maps.event.addListener(marker, 'click', (function(marker, stationDetails) {
					return function() {
						var content = "<b>" + DynamicDetails[station].name + "</b>: " + DynamicDetails[station].last_update.slice(5, 22) + "<br>&emsp;&emsp;&emsp;<b>Bikes:</b> " + DynamicDetails[station].available_bike_stands + "&emsp; &emsp; &emsp;<b>Stands: </b>" + DynamicDetails[station].available_bikes;
						infoWindow.setContent(content)
						infoWindow.open(map, marker);
					}
				})(marker, stationDetails));
				marker.addListener('click', function() {
					map.setZoom(16);
					map.setCenter(marker.getPosition());
				});
				marker.addListener('dblclick', function() {
					map.setZoom(13);
					map.setCenter({
						lat: 53.3498053,
						lng: -6.260309699999993
					});
				});
			})
		});
	});
}


//Displays markers on the map focusing on available stands
function changeMarkers() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 53.3498053,
			lng: -6.260309699999993
		},
		zoom: 13,
	});
	var infoWindow = new google.maps.InfoWindow()
	$.getJSON("stations", function(StationData) {
		$.getJSON("stationDetails", function(stationData) {
			var DynamicDetails = stationData;
			var stationDetails = StationData;
			$.each(stationDetails, function(station) {
				var v_icon = '';
				var y = DynamicDetails[station].available_bikes;
				var x = DynamicDetails[station].available_bike_stands;
				if (x > y + 5) {
					v_icon = '..//static/images/marker_green.png';
				} else if (y > x + 5) {
					v_icon = '..//static/images/marker_red.png'
				} else {
					v_icon = '..//static/images/marker_orange.png';
				}
				var marker = new google.maps.Marker({
					position: {
						lat: parseFloat(stationDetails[station].Latitude),
						lng: parseFloat(stationDetails[station].Longitude)
					},
					map: map,
					title: stationDetails[station].StationIName,
					station_number: stationDetails[station].Station_ID,
					icon: v_icon
				});
				marker.metadata = {
					type: "point",
					title: stationDetails[station].StationIName
				};
				google.maps.event.addListener(marker, 'click', (function(marker, DynamicDetails) {
					return function() {
						var content = "<b>" + DynamicDetails[station].name + "</b>: " + DynamicDetails[station].last_update.slice(5, 22) + "<br>&emsp; &emsp; &emsp;<b>Stands: </b>" + DynamicDetails[station].available_bikes + "&emsp;&emsp;&emsp;<b>Bikes:</b> " + DynamicDetails[station].available_bike_stands;
						infoWindow.setContent(content)
						infoWindow.open(map, marker);
					}
				})(marker, stationDetails));
				marker.addListener('click', function() {
					map.setZoom(15);
					map.setCenter(marker.getPosition());
				});
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
		document.getElementById("weather").innerHTML = weather;
	});
};


//Display station markers and real time information for occupancy
function displayRealTimeInfo() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 53.3498053,
			lng: -6.260309699999993
		},
		zoom: 13,
	});
	var dropdown = document.getElementById("StationIName");
	var index = dropdown.selectedIndex;
	var stationName = dropdown.options[index].text;
	$.getJSON("stationDetails", null, function(data) {
		var stationDetails = data;
		var heading = "<p id = heading><b> Station Name: </b>" + stationName + "<br>";
		var RealTimeTable = "<table class ='StationTable'>";
		RealTimeTable += "<tr><th>Bikes Available</th><th>Stands Available</th><th>Last Update</th></tr>";
		var latitude;
		var longitude;
		var icon;
		$.each(stationDetails, function(station) {
			if (stationName == stationDetails[station].StationIName) {
				var id = "<b>Station ID: </b>" + stationDetails[station].Station_ID
				var availableBikes = stationDetails[station].available_bikes;
				var availableStands = stationDetails[station].available_bike_stands;
				var update = stationDetails[station].last_update;
				latitude = parseFloat(stationDetails[station].latitude);
				longitude = parseFloat(stationDetails[station].longitude);
				RealTimeTable += "<tr><td>" + availableBikes + "</td><td>" + availableStands + "</td><td>" + update + "</td></tr>";
				heading += id + "</p>";
				if (availableBikes > availableStands + 5) {
					icon = '..//static/images/marker_green.png';
				} else if (availableStands > availableBikes + 5) {
					icon = '..//static/images/marker_red.png'
				} else {
					icon = '..//static/images/marker_orange.png';
				}
				var marker = new google.maps.Marker({
					position: {
						lat: latitude,
						lng: longitude
					},
					map: map,
					icon: icon
				});
				map.setZoom(16);
				map.setCenter({
					lat: latitude,
					lng: longitude
				});
			}
		})
		RealTimeTable += "</table>"
		document.getElementById("stationInfo").innerHTML = heading + RealTimeTable;
		document.getElementById("map").innerHTML;
		showChart();
	});
}


//Display weather Forecast
function displayForecast() {
	$.getJSON("forecast", null, function(data) {
		var weather = data;
		var heading = "<p id=heading><b>Forecast 24hrs<b></p>"
		var detailedTable = "<table class='weatherTable'>";
		var i = 0;
		while (i < 8) {
			var initTime = weather[i].dt_txt;
			var split = initTime.split(" ")
			var time = split[1].slice(0, 5);
			var descrip = weather[i].description;
			var icon = weather[i].icon;
			var temp = weather[i].temp;
			detailedTable += "<tr><td><b>" + time + "</b></td><td>" + descrip + "  <img class='icons' src='http://openweathermap.org/img/w/" + icon + ".png'/></td><td>" + temp + "&#8451;</td><tr>";
			i++
		}
		detailedTable += "</table>";
		document.getElementById("weatherInfo").innerHTML = detailedTable;
	});
};


//Get directions from one station to another using dropdown list
$(document).ready(function() {
	$("#directionDropdown").change(function() {
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
$(document).on("click", "#findStationsNearby", function() {
	var StationDiv = document.getElementById("nearbyStations");
	var Userlat;
	var UserLng;
	getLocation();
	//Getting geolocation of user
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(findNearbyStations);
		} else {
			StationDiv.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
});

function findNearbyStations(position) {
	var list = [];
	var stationList = [];
	var Userlat = position.coords.latitude;
	var UserLng = position.coords.longitude;
	var userCord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var infoWindow = new google.maps.InfoWindow()
	$.getJSON("stations", null, function(data) {
		$.getJSON('stationDetails', null, function(stationData) {
			var stationLocation = data;
			var stationRealTime = stationData;
			$.each(stationLocation, function(findStation) {
				var name = stationLocation[findStation].StationIName;
				var lat = parseFloat(stationLocation[findStation].Latitude);
				var lng = parseFloat(stationLocation[findStation].Longitude);
				var availableBikes = stationRealTime[findStation].available_bikes;
				var availableStands = stationRealTime[findStation].available_bike_stands;
				var update = stationRealTime[findStation].last_update;
				var stationCord = new google.maps.LatLng(lat, lng);
				var dist = (google.maps.geometry.spherical.computeDistanceBetween(stationCord, userCord) / 1000);
				list.push({
					Dist: dist,
					Name: name,
					AvailableBike: availableBikes,
					AvailableStand: availableStands,
					LastUpdate: update.slice(5, 22),
					Lat: lat,
					Lng: lng
				});
			});
			list.sort(function(a, b) {
				return a['Dist'] - b['Dist']
			});
			stationList = list.slice(0, 5);
			var NearbyTable = "<table class ='NearbyStationTable'><tr><th>Station</th><th>Bikes Available</th><th>Stands Available</th><th>Last Update</th></tr>";
			map = new google.maps.Map(document.getElementById('map'), {
				center: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				zoom: 13,
			});
			var UserLocation = new google.maps.Marker({
				position: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				map: map,
				icon: '..//static/images/marker_blue.png'
			});
			google.maps.event.addListener(UserLocation, 'click', (function(UserLocation, stationList) {
				return function() {
					var content = "<b> Current Location</b>";
					infoWindow.setContent(content)
					infoWindow.open(map, UserLocation);
				}
			})(UserLocation, stationList));
			for (i = 0; i < 5; i++) {
				NearbyTable += "<tr><td>" + stationList[i]['Name'] + "</td><td>" + stationList[i]['AvailableBike'] + "</td><td>" + stationList[i]['AvailableStand'] + "</td><td>" + stationList[i]['LastUpdate'] + "</td></tr>";
				var marker = new google.maps.Marker({
					position: {
						lat: stationList[i]['Lat'],
						lng: stationList[i]['Lng']
					},
					map: map,
					title: stationList[i]['Name'],
					icon: '..//static/images/marker_green.png'
				});
				marker.metadata = {
					type: "point",
					title: stationList[i]['Name']
				};
				google.maps.event.addListener(marker, 'click', (function(marker, stationList) {
					return function() {
						for (i = 0; i < 5; i++) {
							if (stationList[i]['Name'] == marker.metadata.title) {
								var content = "<b>" + stationList[i]['Name'] + "</b>: " + stationList[i]['LastUpdate'] + "<br><b>Stands: </b>" + stationList[i]['AvailableBike'] + "<br><b>Bikes:</b> " + stationList[i]['AvailableStand'] + "<br><b>Distance: </b>" + stationList[i]['Dist'].toFixed(2) + "km";
								infoWindow.setContent(content)
								infoWindow.open(map, marker);
							}
						}
					}
				})(marker, stationList));
			};
			NearbyTable += "</table>"
			document.getElementById("nearbyStations").innerHTML = NearbyTable;
		})
	})
}


//Show directions from start to finish
function showDirectionsMap(startLat, startLong, endLat, endLong) {
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: {
			lat: 53.3498053,
			lng: -6.260309699999993
		}
	});
	var lat = [startLat, endLat];
	var long = [startLong, endLong];
	for (var i = 0; i < 2; i++) {
		var journeyMarker = new google.maps.Marker({
			position: {
				lat: parseFloat(lat[i]),
				lng: parseFloat(long[i])
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
		origin: {
			lat: parseFloat(origin[0]),
			lng: parseFloat(origin[1])
		},
		destination: {
			lat: parseFloat(destination[0]),
			lng: parseFloat(destination[1])
		},
		travelMode: 'BICYCLING'
	}, function(response, status) {
		document.getElementById('direction-panel').innerHTML = "";
		directionsDisplay.setDirections(response);
		directionsDisplay.setPanel(document.getElementById('direction-panel'));
	});
}


//Show elevation of the path selected by user. 
function showElevation(origin, destination) {
	var path = [{
		lat: parseFloat(origin[0]),
		lng: parseFloat(origin[1])
	}, {
		lat: parseFloat(destination[0]),
		lng: parseFloat(destination[1])
	}];
	var elevator = new google.maps.ElevationService;
	elevator.getElevationAlongPath({
		'path': path,
		'samples': 300
	}, plotElevation);
}

function plotElevation(elevations, status) {
	var chartDiv = document.getElementById('elevation_chart');
	if (status !== 'OK') {
		chartDiv.innerHTML = 'Cannot show elevation: request failed because ' + status;
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


//Pull station info from JSON file to display in chart
function showChart() {
	var d = new Date();
	var n = d.getDay();
	var dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var dropdown = document.getElementById("StationIName");
	var index = dropdown.selectedIndex;
	var stationName = dropdown.options[index].text;
	var stationList = [];
	$.getJSON("json", function(data) {
		for (i = 0; i < data.length; i++) {
			if (stationName == data[i][0] && dayList[n] == data[i][1]) {
				stationList.push(data[i])
			}
		};
		var data = stationList.map(function(e) {
			return e[4];
		});
		var labels = stationList.map(function(e) {
			return e[2];
		})
		var ctx = document.getElementById('myChart').getContext('2d');
		var chart = new Chart(ctx, {
			// The type of chart we want to create
			type: 'bar',
			// The data for our dataset
			data: {
				labels: labels,
				datasets: [{
					label: "Bike Availability",
					backgroundColor: 'rgba(42, 109, 252, 0.2)',
					borderColor: 'rgb(3, 70, 214)',
					data: data
				}]
			},
			// Configuration options go here
			options : {
                scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Average Available Bikes'
                  }
                }]
              }
            }
		});
	});
};