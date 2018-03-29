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

    
 async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcyz8h9qZSpDhYObypaZ3NF29BQWDrlUw&callback=initMap"
  
