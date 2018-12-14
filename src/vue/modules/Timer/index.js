import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Timer from '@lib/Timer'

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
      timer: new Timer(),
    }
  },
  computed: {
    htmlClass() {
      return {
        'timer__disabled': this.disabled || this.status === 0,
        'timer__pause': !this.disabled && this.status === 2
      }
    },
    time() {
      return this.timer.toStringHours()
    },
  },
  mounted() {
    this.timer.tick((time) => {
      this.$emit('onTick', time)
    })
  },
  methods: {
    start: function () {
      this.$emit('onStart', () => {
        this.status = 1
        this.timer.start()
      })
    },
    stop: function () {
      this.$emit('onStop', () => {
        this.status = 2
        this.timer.stop()
      })
    },
    next: function () {
      this.$emit('onNext', () => {
        this.status = 1
        this.timer.start()
      })
    },
    end: function () {
      this.$emit('onEnd', () => {
        this.status = 0
        this.timer.end()
      })
    },
  },
  template: template
})