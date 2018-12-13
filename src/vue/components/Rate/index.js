import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Rate', {
  props: {
    value: {
      type: Number,
      require: true
    },
    min: {
      type: Number,
      require: true
    },
    max: {
      type: Number,
      require: true
    },
    before: {
      type: [String, Number]
    },
    after: {
      type: [String, Number]
    },
  },
  computed: {
    percent: function () {
      let percent = 0
      if (this.max > 0) {
        const max = this.max - this.min
        const value = this.value - this.min
        percent = Number(value / max * 100)
      }

      return percent > 100 ? 100 : percent
    },
    styleProcess: function () {
      return {
        width: `${this.percent}%`
      }
    },
    classProcess: function () {
      return {
        'rate_cell__active': this.value > 0
      }
    },

  },
  template: template
})