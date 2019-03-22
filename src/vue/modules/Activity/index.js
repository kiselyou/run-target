import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@module/Spinner'
import '@module/ActivityState'
import '@module/ActivityControls'

import GeoControls from '@lib/location/GeoControls'
import Timer from '@lib/Timer'
import Plugins from '@lib/cordova/Plugins'
import Signal from '@lib/location/Signal'

import BluetoothModels from '@lib/cordova/bluetooth/BluetoothModels'
import { mapGetters, mapState } from 'vuex'

const timer = new Timer()

export default Vue.component('Activity', {
  props: {
    debug: {
      type: Boolean,
      default: true,
    }
  },
  data: function () {
    return {
      /**
       * @type {BluetoothModels}
       */
      bluetooth: new BluetoothModels(),
      /**
       * @type {GeoControls}
       */
      geo: new GeoControls(this.debug),
      /**
       * @type {Signal}
       */
      signal: new Signal(),
      /**
       * @type {boolean}
       */
      pause: false,
      /**
       * @type {boolean}
       */
      loading: false,
      /**
       * @type {boolean}
       */
      hrmIsActive: false,
      /**
       * @type {number}
       */
      hrm: 0
    }
  },
  mounted() {
    this.geo.addEventListener('change-distance', (distance) => {
      if (distance.number > 0) {
        Plugins.vibration.call([1500, 1000, 1500, 1000, 1500])
      }
    })
    this.geo.addGeoListener((position) => {
      this.signal.update(position)
    })
  },
  activated() {
    // Если геолокация выключена то включить ее.
    if (this.geo.isDisabledGeoLocation()) {
      this.geo.enableGeoLocation()
    }
  },
  deactivated() {
    // Если слушатель выключен то выключить и геолокацию.
    if (this.geo.isDisabledGeoListener()) {
      this.geo.disableGeoLocation()
    }
  },
  computed: {
    ...mapState({
      /**
       *
       * @param {Object} state
       * @returns {Object|?}
       */
      bluetoothDevice: (state) => {
        return state.settings.bluetoothDevice.device
      },
      /**
       *
       * @param {Object} state
       * @returns {string|?}
       */
      bluetoothDeviceKey: (state) => {
        return state.settings.bluetoothDevice.deviceKey
      }
    }),
    path: function () {
      return this.geo.getPathLength()
    },
    speed: function () {
      return this.geo.avgSpeed
    },
    tempo: function () {
      return timer.setTime(this.geo.getTempo()).toNumberMinutes()
    },
    targetDistance: function () {
      return 1000
    },
    time: function () {
      return this.geo.timer.toStringHours()
    },
    signalValue: function () {
      return this.signal.value
    }
  },
  methods: {
    startRun: function () {
      this.startHRM()
      this.geo.startGeoListener()
    },
    stopRun: function () {
      this.geo.stopGeoListener()
      this.pause = true
    },
    nextRun: function () {
      this.geo.startGeoListener()
      this.pause = false
    },
    endRun: function () {
      this.stopHRM()
      this.geo.stopGeoListener()
      this.pause = false
      this.$store.dispatch('activity/save', { activity: this.geo.serialize() })
      this.geo.clearGeoListener()
    },
    /**
     * Connect to device and start HRM listener.
     */
    startHRM() {
      if (this.hrmIsActive) {
        return
      }

      this.hrmIsActive = true
      this.bluetooth.connectAndStartListenHRM(
        this.bluetoothDeviceKey,
        this.bluetoothDevice,
        (rate) => {
          this.hrm = rate
          this.geo.setHRMValue(rate)
        },
        () => {
          this.hrmIsActive = false
        }
      )
    },
    /**
     * Strop HRM listener and disconnect device.
     */
    stopHRM() {
      if (!this.hrmIsActive) {
        return
      }

      this.bluetooth.disconnectAndStopListenHRM(
        this.bluetoothDeviceKey,
        this.bluetoothDevice,
        () => {
          this.hrm = 0
          this.hrmIsActive = false
        },
        () => {
          this.hrm = 0
          this.hrmIsActive = false
        }
      )
    }
  },
  template: template
})