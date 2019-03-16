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
      selectedDeviceKey: null,
      processing: false,
      hrmIsActive: false,
      message: null,
      hrm: 0,
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
    disableDetectButton() {
      const selectedKey = this.selectedDeviceKey
      if (selectedKey === null) {
        return true
      }

      return selectedKey === this.bluetoothDeviceKey
    },
    renderButtonName() {
      const device = this.bluetoothDevice
      const selectedKey = this.selectedDeviceKey
      if (selectedKey === null && device) {
        return device.name
      }

      if (selectedKey === this.bluetoothDeviceKey && device) {
        return device.name
      }
      return 'Подключить устройство'
    },
    title() {
      return this.bluetoothDevice ? this.bluetoothDevice.name : 'Устройство не подключено'
    },
    heartClass() {
      return {
        settings_hrm__heart: this.hrmIsActive && this.processing === false
      }
    }
  },
  methods: {
    onSelectDevice(value) {
      this.selectedDeviceKey = value || null
    },
    detectDevice() {
      if (this.processing) {
        return
      }

      this.processing = true
      this.bluetooth.detectDevice(this.selectedDeviceKey)
        .then((device) => {
          if (device) {
            this.message = 'Устройство подключено.'
            this.$store.dispatch('settings/rememberBluetoothDevice', device)
            this.$store.dispatch('settings/rememberBluetoothDeviceKey', this.selectedDeviceKey)
          } else {
            this.message = 'Не удалось определить устройство. Попробуйте еще раз.'
          }
        })
        .catch((error) => {
          this.message = error.message
        })
        .finally(() => {
          this.processing = false
        })
    },
    /**
     * Connect to device and start HRM listener.
     */
    startHRM() {
      if (this.hrmIsActive) {
        return
      }

      this.processing = true
      this.hrmIsActive = true
      this.bluetooth.connectAndStartListenHRM(
        this.bluetoothDeviceKey,
        this.bluetoothDevice,
        (rate) => {
          this.hrm = rate
          this.processing = false
        },
        () => {
          this.processing = false
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

      this.processing = true
      this.bluetooth.disconnectAndStopListenHRM(
        this.bluetoothDeviceKey,
        this.bluetoothDevice,
        () => {
          this.hrm = 0
          this.processing = false
          this.hrmIsActive = false
        },
        () => {
          this.processing = false
        }
      )
    }
  },
  template: template
})