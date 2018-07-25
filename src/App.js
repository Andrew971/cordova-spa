import {Component} from './lib/components'
import Home from './views/home'

// const render = (Template) => {
//   const Component = new Template();
//   const renderedCompoent = Component.render()

//   return renderedCompoent

// }

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      test: ' app '
    }

  }

  ComponentisMounted = () => {
    document.addEventListener('deviceready', this.initializeMap, false);
    console.log('object')
  }
  

  initializeMap = () => {
    const mapCanvas = document.getElementById('map-canvas');
    console.log(mapCanvas)
    const map = window
      .plugin
      .google
      .maps
      .Map
      .getMap(mapCanvas);

    map.one(window.plugin.google.maps.event.MAP_READY, this.getLocation);
  }

  getLocation = (map) => {
    console.log('okg')

    const onSuccess = (location) => this.displayMarker(map, location);
    const onError = (msg) => alert(JSON.stringify(msg));

    map.getMyLocation(onSuccess, onError);

  }

  displayMarker = (map, location) => {
    console.log('okd')

    const msg = [
      "Current your location:\n", "latitude:" + location.latLng.lat,
      "longitude:" + location.latLng.lng,
      "speed:" + location.speed,
      "time:" + location.time,
      "bearing:" + location.bearing
    ].join("\n");

    // Add a maker
    var marker = map.addMarker({
      position: location.latLng,
      title: msg,
      animation: window.plugin.google.maps.Animation.BOUNCE
    });

    map.moveCamera({
      target: location.latLng,
      zoom: 17,
      tilt: 0,
      bearing: 0,
      duration: 1
    }, function () {
      marker.showInfoWindow();
    });

    map.on(window.plugin.google.maps.event.MAP_CLICK, function(latLng) {
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
