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

export default Vue.component('Settings', {
  props: {

  },
  data: function () {
    return {
      bluetooth: new BluetoothModels(),
      selectedModels: null,
      errorMessage: null,
      successMessage: null,
      failureMessage: null,
      processing: false,
      device: null,
      hrm: null,
      isTestRunning: false
    }
  },
  mounted() {

  },
  activated() {

  },
  deactivated() {

  },
  computed: {
    modelsList() {
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
      return this.selectedModels === null
    },
  },
  methods: {
    onSelectModel(value) {
      this.clearMessages()
      this.selectedModels = value || null
    },
    detectDevice() {
      if (this.processing) {
        return
      }
      this.clearMessages()
      this.processing = true
      this.bluetooth.detectDevice(this.selectedModels)
        .then((device) => {
          if (device) {
            this.successMessage = 'Устройство успешно подключено.'
            this.device = device
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
      this.bluetooth.connect(this.selectedModels, this.device)
        .then((deviceData) => {
          this.bluetooth.auth(this.selectedModels, deviceData)
            .then((isAuth) => {
              if (isAuth) {
                this.bluetooth.startListenHRM(this.selectedModels, deviceData, (rate) => {
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