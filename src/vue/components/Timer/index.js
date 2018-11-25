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
    time() {
      return this.timer.toStringHours()
    },
    start: function () {
      this.status = 1
      this.timer.start()
      this.$emit('onStart', this.timer)
    },
    stop: function () {
      this.status = 2
      this.timer.stop()
      this.$emit('onStop', this.timer)
    },
    end: function () {
      this.status = 0
      this.timer.end()
      this.$emit('onEnd', this.timer)
    },
  },
  template: template
})