var geoMap = function(store, category) {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {
    startPos = position;
    $('#geoPos').attr("latitude", startPos.coords.latitude);
    $('#geoPos').attr("longitude", startPos.coords.longitude);
    geoInit(store, category);
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};

//=======map canvas==========
function geoInit(storeKeyword, category) {
  var lat = document.getElementById('geoPos').getAttribute("latitude");
  var lng = document.getElementById('geoPos').getAttribute("longitude");
  var place = new google.maps.LatLng(lat, lng);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: place,
    zoom: 12
  });

  var request = {
    location: place,
    radius: 10000,
    keyword: storeKeyword,
    types: category
  };

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
//=======map canvas==========
