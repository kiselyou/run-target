import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('RunProcess', {
  props: {
    start: {
      type: Number,
      default: 0
    },
    target: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    digits: {
      type: Number,
      default: 3
    },
    unitName: {
      type: String,
      default: 'км'
    },
    unitValue: {
      type: Number,
      default: 1000
    },
    label: {
      type: String
    }
  },
  computed: {
    percent: function () {
      let percent = 0
      if (this.target > 0) {
        const target = this.target - this.start
        const value = this.value - this.start
        console.log(target, value)
        percent = Number(value / target * 100).toFixed(this.digits)
      }
      // console.log(percent, this.target, this.value, this.start)
      if (percent > 100) {
        percent = 100
      }

      return percent
    }
  },
  methods: {
    /**
     *
     * @param {number} value
     * @returns {string}
     */
    unit: function (value) {
      const unitValue = this.unitValue < 1 ? 1 : this.unitValue
      return value === 0 ? '0' : `${(value / unitValue).toFixed(this.digits)} ${this.unitName}`
    },
  },
  template: template
})