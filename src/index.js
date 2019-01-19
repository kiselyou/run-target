import './scss/index.scss'
import Vue from 'vue'

import './vue/layouts/Mobile'
// import './vue/layouts/Watch'

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









// TODO: minor
// window.ble.startScan([], function(device) {
//   console.log('scan', device);
//   console.log(parseAdvertisingData(device.advertising))
//
//   if (device.name === 'Polar H10 2F093623') {
//     window.ble.connect(device.id, (data) => {
//       console.log(data, 'data connect')
//
//
//       // ArrayBuffer(2) {}[[Int8Array]]: Int8Array(2) [0, 88][[Int16Array]]: Int16Array [22528][[Uint8Array]]: Uint8Array(2) [0, 88]byteLength: (...)__proto__: ArrayBuffer "180d" "2a37" "good startNotification"
//
//       for (const item of data.characteristics) {
//         window.ble.startNotification(
//           data.id,
//           item.service,
//           item.characteristic,
//           (buffer) => {
//             var d = null
//             if (buffer.byteLength === 4) {
//               d = new Float32Array(buffer);
//             }
//             if (buffer.byteLength === 8) {
//               d = new Float64Array(buffer);
//             }
//
//             console.log(
//               buffer,
//               d,
//               item.service,
//               item.characteristic,
//               'good startNotification'
//             )
//           },
//           (err) => {
//             console.log(
//               err,
//               item.service,
//               item.characteristic,
//               'err startNotification'
//             )
//           }
//         );
//
//         // read the initial value
//         window.ble.read(
//           data.id,
//           item.service,
//           item.characteristic,
//           (buffer) => {
//             var d = null
//             if (buffer.byteLength === 4) {
//               d = new Float32Array(buffer);
//             }
//             if (buffer.byteLength === 8) {
//               d = new Float64Array(buffer);
//             }
//             console.log(
//               buffer,
//               d,
//               item.service,
//               item.characteristic,
//               'good read'
//             )
//           },
//           (err) => {
//             console.log(
//               err,
//               item.service,
//               item.characteristic,
//               'err read'
//             )
//           }
//         );
//       }
//
//
//
//
//
//     }, (error) => {
//       console.log(error, 'error connect')
//     });
//   }
//
// }, function (error) {
//   console.log(error, 'scan error');
// });
//
//
//
// console.log(window.ble)
//
//
//
//
// function asHexString(i) {
//   var hex;
//
//   hex = i.toString(16);
//
//   // zero padding
//   if (hex.length === 1) {
//     hex = "0" + hex;
//   }
//
//   return "0x" + hex;
// }
//
// function parseAdvertisingData(buffer) {
//   var length, type, data, i = 0, advertisementData = {};
//   var bytes = new Uint8Array(buffer);
//
//   while (length !== 0) {
//
//     length = bytes[i] & 0xFF;
//     i++;
//
//     // decode type constants from https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile
//     type = bytes[i] & 0xFF;
//     i++;
//
//     data = bytes.slice(i, i + length - 1).buffer; // length includes type byte, but not length byte
//     i += length - 2;  // move to end of data
//     i++;
//
//     advertisementData[asHexString(type)] = data;
//   }
//
//   return advertisementData;
// }