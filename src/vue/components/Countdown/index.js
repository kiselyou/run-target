import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Countdown', {
  props: {
    time: {
      type: Number,
      default: 3
    },
    revert: {
      type: Boolean,
      default: true
    },
    enabled: {
      type: Boolean,
      required: true
    },
    onRun: {
      type: Function,
      required: true
    },
  },
  computed: {
    timeValue: function () {
      if (this.revert) {
        return (this.time - this.number) + 1
      }
      return this.number
    }
  },
  data: function () {
    return {
      number: 1,
      timerId: null
    }
  },
  updated: function() {
    if (!this.enabled || this.number > 1) {
      return
    }

    clearInterval(this.timerId)
    this.timerId = setInterval(() => {
      if (this.number >= this.time) {
        clearInterval(this.timerId)
        this.number = 1
        this.onRun()
        return
      }
      this.number++
    }, 1000)
  },
  template: template
})