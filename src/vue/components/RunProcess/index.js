import './style.scss'
import Vue from 'vue'
import template from './template.vue'

export default Vue.component('RunProcess', {
  props: {
    start: {
      type: Number,
      default: 0
    },
    finishDistance: {
      type: Number,
      required: true
    },
    currentDistance: {
      type: Number,
      required: true
    },
    digits: {
      type: Number,
      default: 3
    },
    label: {
      type: [Function, null],
      /**
       *
       * @returns {string}
       */
      default: function () {
        const remainder = this.finishDistance - this.currentDistance
        if (this.finishDistance === 0) {
          return `Цель не установлена`
        }
        if (remainder === 0) {
          return `Цель выполнена ${this.unit(remainder)}`
        }
        if (remainder < 0) {
          return `Цель выполнена ${this.unit(this.finishDistance)}`
        }
        return `Осталось ${this.unit(remainder)}`
      }
    }
  },
  data: function () {
    return {

    }
  },
  methods: {
    /**
     *
     * @param {number} value
     * @returns {string}
     */
    unit: function (value) {
      if (value === 0) {
        return '0'
      }
      return `${(value / 1000).toFixed(3)} км`
    },

    /**
     *
     * @returns {number}
     */
    percent() {
      let percent = 0
      if (this.finishDistance > 0) {
        percent = Number(this.currentDistance / this.finishDistance * 100).toFixed(this.digits)
      }
      if (percent > 100) {
        percent = 100
      }
      return percent
    },

    /**
     *
     * @returns {number}
     */
    remainder() {
      return this.finishDistance - this.currentDistance
    }
  },
  template: template
})