import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Button'
import '@vue/VueIcon'

export default Vue.component('Timer', {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    pause: {
      type: Boolean,
      default: false
    },
    time: {
      type: String,
      required: true
    },
  },
  computed: {
    htmlClass() {
      return {
        'timer__disabled': this.disabled,
        'timer__pause': !this.disabled && this.pause
      }
    },
  },
  template: template
})