
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
			 		//var iconBase = 'http://maps.google.com/mapfiles/kml/paddle/';
			 		var v_icon = '';
			 		if (stationDetails[station].available_bikes > 20){
			 		v_icon = '..//static/images/bike green.png';
			 		}
			 		else if (stationDetails[station].available_bikes < 20 && stationDetails[station].available_bikes > 10){
			 		v_icon = '..//static/images/bike yellow.png';
			 		}
			 		else{
			 		v_icon = '..//static/images/bike red.png'
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
$.getJSON("forecast", null, function(data) {
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

$(document).ready(function(){
  load_json_data('StationIName')

    function load_json_data(StationName){
var html_code = '';
$.getJSON("stationDetails", function(data) {
    var stationList = data;
    var option = document.getElementById('StationIName');
    var j = 1;
	for(var i=0; i<stationList.length; i++){
	j++;
	option[j] = new Option(stationList[i].name, stationList[i].Station_ID);
}
    });
    
};
    });
 $(document).ready(function(){ 
 $("select").change(function(){
        alert("Change Read");
         //document.getElementById("demo").innerHTML = "Hello World";
    }); 
 }); 