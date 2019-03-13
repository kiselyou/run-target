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
      successMessage: null,
      failureMessage: null,
      processing: false,
      hrm: null,
      isTestRunning: false,
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
       * @returns {number|?}
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
  },
  methods: {
    onSelectDevice(value) {
      this.clearMessages()
      this.$store.dispatch('settings/rememberBluetoothDeviceKey', value || null)
    },
    detectDevice() {
      if (this.processing) {
        return
      }
      this.clearMessages()
      this.processing = true
      this.bluetooth.detectDevice(this.bluetoothDeviceKey)
        .then((device) => {
          if (device) {
            this.$store.dispatch('settings/rememberBluetoothDeviceKey', device)
            this.successMessage = 'Устройство успешно подключено.'
          } else {
            this.failureMessage = 'Ошибка подключения. Попробуйте еще раз.'
          }
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
        .finally(() => {
          this.processing = false
        })
    },
    runHRM() {
      if (this.isTestRunning) {
        return
      }
      this.isTestRunning = true
      this.bluetooth.connect(this.bluetoothDeviceKey, this.bluetoothDevice)
        .then((deviceData) => {
          this.bluetooth.auth(this.bluetoothDeviceKey, deviceData)
            .then((isAuth) => {
              if (isAuth) {
                this.bluetooth.startListenHRM(this.bluetoothDeviceKey, deviceData, (rate) => {
                  this.hrm = rate
                })
              }
            })
        })
    },
    clearMessages() {
      this.successMessage = null
      this.failureMessage = null
      this.errorMessage = null
    }
  },
  template: template
})