var map;
var infowindow;

navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
    //  mapa con las coordenadas actuales
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var latLng = {lat, lng};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat, lng},
    zoom: 15
  });
  
  infowindow = new google.maps.InfoWindow();
  //Creamos el servicio PlaceService y enviamos la petición
   var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
     //  localización, el radio y el tipo de lugar a obtener 
    location: latLng,
    radius: 500,
    // types le pasamos un array con los tipos de búsqueda que queremos hacer
    type: ['restaurant']
  }, callback);


  function callback(results, status) {
    
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
       /* var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
        
      }
      
    });*/
    //console.log(marker)
        createMarker(results[i]); 
       // console.log(results);
       
       showInformationPlaces(results[i]);

      }

    }
  }
  function showInformationPlaces(place){

    const photo = place.photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350});
    
    const containerInfo = document.getElementById('infoPhoto');
    containerInfo.innerHTML += `<img src='${photo}'></img>` 
    const name = place.name;
    const address = place.vicinity; 

    //console.log(place.icon[place.id])
    const modalcont = document.getElementById('modalCont'); 
    modalcont.innerHTML += `<h4>${name}</h4><p>${address}</p>` 
    //console.log(name);

    //console.log(photo);
}

  // marcador
  function createMarker(place) {
    
   
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    //el evento click del marcador
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      
      infowindow.open(map, this);

     
    });
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(latLng));
    
    var input = document.getElementById('inputRest');
    
    var searchBox = new google.maps.places.SearchBox(input, {
      bounds: defaultBounds
    })


  }
    
  }
  


// clave de geolocalizacion AIzaSyB63wqnjhhT8rjhZmq6ej3YF7pU4XSq0-Q

/*var map;
var infowindow;

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['restaurants']
  }, callback);
}*/

/*function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
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
}*/