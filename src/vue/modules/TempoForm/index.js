import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@vue/Button'
import '@vue/FieldInput'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/FieldSelect'
import { trainingTypes } from '@storage/training-types'

export default Vue.component('TempoForm', {
  props: {
    values: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: function () {
    return {
      timeStart: this.values.timeStart || null,
      timeStop: this.values.timeStop || null,
      pathLength: this.values.pathLength || null,
      elapsedTime: this.values.elapsedTime || null,
      trainingItems: trainingTypes.map((item) => {
        return { value: item.value, label: item.label }
      })
    }
  },
  computed: {
    formData: function () {
      return {
        timeStart: this.timeStart,
        timeStop: this.timeStop,
        pathLength: this.pathLength,
        elapsedTime: this.elapsedTime
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel', this.formData)
    },
    save() {
      this.$emit('save', this.formData)
    },

    timeStartEvent(value) {
      this.timeStart = value
    },

    timeStopEvent(value) {
      this.timeStop = value
    },

    pathLengthEvent(value) {
      this.pathLength = value
    },

    elapsedTimeEvent(value) {
      this.elapsedTime = value
    },
  },
  template: template
})