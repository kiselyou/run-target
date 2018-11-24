import './style.scss'
import Vue from 'vue'
import template from './template.vue'
import TimerControls from './lib/TimerControls'

import '@vue/Button'

export default Vue.component('Timer', {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      status: 0, // 0 - выкл., 1 - бег, 2 - пауза
      timer: new TimerControls(),
    }
  },
  methods: {
    log: (data) => {
      console.log(data)
    },
    time() {
      return this.timer.toStringHours()
    },
    start: function () {
      this.status = 1
      this.timer.start()
    },
    stop: function () {
      this.status = 2
      this.timer.stop()
    },
    end: function () {
      this.status = 0
      this.timer.end()
    },
  },
  template: template
})