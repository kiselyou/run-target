import 'bootstrap'
import './scss/index.scss'
import Vue from 'vue'
import './vue/components/GeoRun'
import './vue/components/Calendar'
import './vue/components/CalendarRun'

const app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
  }
};

app.initialize();

new Vue({
  el: '#app-slot',
  data: {
    startDate: '2018-11-11',
  },
  methods: {
    log: (data) => {
      console.log(data)
    }
  },
  template: `
    <div class="container">
      <div class="row">
       <!-- <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 p-1">
          <Calendar :startDate="startDate" />    
        </div>-->
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 p-1">
          <CalendarRun :startDate="startDate" />   
        </div>
      </div>
      +++++++++++++++++++++++++++
      <GeoRun />
    </div>
  `
})




// function onSuccess(position) {
//   console.log('onSuccess', position)
//   app.onError = ''
//   app.onSuccess = `
//     Latitude: ${position.coords.latitude} <br/>
//     Longitude: ${position.coords.longitude}
//     Speed: ${position.coords.speed}
//     Altitude: ${position.coords.altitude}
//   `
// }
//
// function onError(error) {
//   console.log('onError', error)
//   app.onSuccess = ''
//   app.onError = `
//     Error:
//     Code: ${error.code} <br/>
//     Message: ${error.message}
//   `;
// }
//
// var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });