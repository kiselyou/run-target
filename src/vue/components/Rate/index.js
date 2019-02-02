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
    skin: {
      type: [String],
      default: 'success'
    }
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
        'rate_cell__active': this.value > 0,
        'rate_skin__success': this.skin === 'success',
        'rate_skin__warning': this.skin === 'warning',
        'rate_skin__disabled': this.skin === 'disabled'
      }
    },

  },
  template: template
})