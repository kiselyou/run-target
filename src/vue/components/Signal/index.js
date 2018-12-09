import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Signal', {
  props: {
    value: {
      type: Number,
      default: 100
    },
    size: {
      type: Number,
      default: 16
    },
    label: {
      type: String,
      default: 'GPS'
    },
    off: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    htmlClassLabel: function () {
      return {
        'signal_label__disabled': this.value < 50,
        'signal_label__off': this.off
      }
    }
  },
  methods: {
    barClass(index) {
      return {
        'signal_bar__active': (this.value / 20) >= index
      }
    },
  },
  template: template
})