import {Component} from './lib/components'
// import Home from './views/home' const render = (Template) => {   const
// Component = new Template();   const renderedCompoent = Component.render()
// return renderedCompoent }

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      test: ' app '
    }

  }

  ComponentisMounted = () => {
    document.addEventListener('deviceready', this.initializeMap, false);
    document.addEventListener('deviceready', this.initializeBgGeo, false);

  }

  initializeMap = () => {
    const mapCanvas = document.getElementById('map-canvas');
    const bgGeo = window.BackgroundGeolocation;

    const map = window
      .plugin
      .google
      .maps
      .Map
      .getMap(mapCanvas);

    map.one(window.plugin.google.maps.event.MAP_READY, this.getLocation);

    this.getLocationEvent(map, bgGeo)
  }

  onbgGeoReady = (bgGeo) => {
    const option = {
      // Geolocation config
      desiredAccuracy: 0,
      distanceFilter: 10,
      stationaryRadius: 25,
      // Activity Recognition config
      activityRecognitionInterval: 10000,
      stopTimeout: 5,
      // Application config
      debug: true, // <-- Debug sounds & notifications.
      stopOnTerminate: false,
      startOnBoot: true,
      // HTTP / SQLite config
      url: "http://your.server.com/locations",
      method: "POST",
      autoSync: true,
      maxDaysToPersist: 3,
      headers: { // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: { // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }

    bgGeo.ready(option, (state) => {
      console.log("BackgroundGeolocation ready: ", state);
      if (!state.enabled) {
        bgGeo.start();
      }
    });

    this.bgMethodEvent(bgGeo)
  }

  bgMethodEvent = (bgGeo) => {

    // Fired whenever state changes from moving->stationary or vice-versa.
    bgGeo
      .on('motionchange', function (isMoving) {
        console.log('- onMotionChange: ', isMoving);
      });
    // Fired whenever a geofence transition occurs.
    bgGeo.on('geofence', function (geofence) {
      console.log('- onGeofence: ', geofence.identifier, geofence.location);
    });
    // Fired whenever an HTTP response is received from your server.
    bgGeo.on('http', function (response) {
      console.log('http success: ', response.responseText);
    }, function (response) {
      console.log('http failure: ', response.status);
    });

  }

  getLocationEvent = (map, bgGeo) => {
    const onSuccess = function (location) {
      let coords = location.coords;
      let lat = coords.latitude;
      let lng = coords.longitude;
      console.log('- Location: ', JSON.stringify(location));
    };

    const onFailure = function (errorCode) {
      console.warn('- BackgroundGeoLocation error: ', errorCode);
    }
    bgGeo.on('location', onSuccess, onFailure);

    this.watchPosition(map, bgGeo)
  }

  watchPosition = (map, bgGeo) => {
    const onSucces = (location) => {
      const { latitude,longitude} = location.coords
      const Coord = {lat:latitude,lng:longitude}
      map.moveCamera({
        target: Coord,
        zoom: 17,
        tilt: 0,
        bearing: 0,
        duration: 1
      },  () => {
        map.addMarker({position: Coord, title:'', animation: window.plugin.google.maps.Animation.BOUNCE})
      })
      console.log("- Watch position :", location);
    }
  
    const onFailure = (errorCode) => {
      alert('An location error occurred: ' + errorCode);
    }

    const option = {
      interval: 1000, // <-- retrieve a location every 5s.
      persist: false, // <-- default is true
    }

    bgGeo.watchPosition(onSucces, onFailure, option);
  }

  getLocation = (map) => {

    const onSuccess = (location) => this.displayMarker(map, location);
    const onError = (msg) => alert(JSON.stringify(msg));

    map.getMyLocation(onSuccess, onError);

  }

  displayMarker = (map, location) => {

    const msg = [
      "Current your location:\n", "latitude:" + location.latLng.lat,
      "longitude:" + location.latLng.lng,
      "speed:" + location.speed,
      "time:" + location.time,
      "bearing:" + location.bearing
    ].join("\n");

    // Add a maker
    var marker = map.addMarker({position: location.latLng, title: msg, animation: window.plugin.google.maps.Animation.BOUNCE});

    map.moveCamera({
      target: location.latLng,
      zoom: 17,
      tilt: 0,
      bearing: 0,
      duration: 1
    }, function () {
      marker.showInfoWindow();
    });

    map.on(window.plugin.google.maps.event.MAP_CLICK, function (latLng) {
      alert(latLng + " is clicked!");
    })
    // Catch the click event
    marker.on(window.plugin.google.maps.event.INFO_CLICK, function () {

      // To do something...
      alert("Hello world!");

    });
  }

  render() {

    return (`
      <div class="app">
      <div id="map-canvas"></div>
      </div>
  `)
  }

}
