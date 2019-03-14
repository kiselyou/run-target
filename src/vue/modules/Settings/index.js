import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@vue/Layout'
import '@vue/VueIcon'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/FieldSelect'
import '@vue/Button'
import '@module/Spinner'

import BluetoothModels from '@lib/cordova/bluetooth/BluetoothModels'

import { mapGetters, mapState } from 'vuex'

export default Vue.component('Settings', {
  props: {

  },
  data: function () {
    return {
      bluetooth: new BluetoothModels(),
      errorMessage: null,
      processing: false,
      hrmIsActive: false,
      hrm: 0,
    }
  },
  mounted() {

  },
  activated() {

  },
  deactivated() {

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
    bluetoothDeviceSList() {
      const options = []
      const list = this.bluetooth.modelsList
      for (const key in list) {
        if (!list.hasOwnProperty(key)) {
          continue
        }
        options.push({ value: key, text: list[key] })
      }
      return options
    },
    buttonIsDisabled() {
      return this.bluetoothDeviceKey === null
    },
    heartClass() {
      return {
        settings_hrm__heart: this.bluetoothDevice && this.hrmIsActive
      }
    }
  },
  methods: {
    onSelectDevice(value) {
      this.errorMessage = null
      this.$store.dispatch('settings/rememberBluetoothDeviceKey', value || null)
    },
    detectDevice() {
      if (this.processing) {
        return
      }
      this.processing = true
      this.errorMessage = null
      this.bluetooth.detectDevice(this.bluetoothDeviceKey)
        .then((device) => {
          if (device) {
            this.$store.dispatch('settings/rememberBluetoothDevice', device)
            this.errorMessage = 'Устройство успешно подключено.'
          } else {
            this.errorMessage = 'Ошибка подключения. Попробуйте еще раз.'
          }
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
        .finally(() => {
          this.processing = false
        })
    },
    /**
     * Connect to device and start HRM listener.
     */
    startHRM() {
      console.log(1)
      if (this.hrmIsActive) {
        return
      }
      this.hrmIsActive = true
      console.log(2)
      this.bluetooth.connect(this.bluetoothDeviceKey, this.bluetoothDevice)
        .then((deviceData) => {
          console.log(3)
          this.bluetooth.auth(this.bluetoothDeviceKey, deviceData)
            .then((isAuth) => {
              console.log(4)
              if (isAuth) {
                console.log(5)
                this.bluetooth.startListenHRM(this.bluetoothDeviceKey, deviceData, (rate) => {
                  console.log(6)
                  this.hrm = rate
                })
              }
            })
        })
    },
    /**
     * Strop HRM listener and disconnect device.
     */
    stopHRM() {
      if (!this.hrmIsActive) {
        return
      }
      this.bluetooth.stopListenHRM(this.bluetoothDeviceKey, this.bluetoothDevice, () => {
        this.bluetooth.disconnect(this.bluetoothDevice).then(() => {
          this.hrmIsActive = false
        })
      })
    }
  },
  template: template
})