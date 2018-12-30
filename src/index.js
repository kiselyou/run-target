import 'bootstrap'
import './scss/index.scss'
import Vue from 'vue'

import './vue/layouts/Mobile'
import './vue/layouts/Watch'

const renderView = () => {
  new Vue({
    el: '#app-container',
    template: `<Mobile/>`
    // template: `<Watch/>`
  })
}

const DEVICE_KEY = 1

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
    renderView()
  }
};

app.initialize();

if (process.env.NODE_ENV === 'development') {
  renderView()
}