import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Signal', {
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: 'GPS'
    },
  },
  computed: {
    htmlClassLabel: function () {
      return {
        'signal_label__success': [4,5].includes(this.value),
        'signal_label__warning': [3].includes(this.value),
        'signal_label__danger': this.off || [0,1,2].includes(this.value),
      }
    }
  },
  methods: {
    barClass(index) {
      return {
        'signal_bar__success': this.value >= index && [4,5].includes(this.value),
        'signal_bar__warning': this.value >= index && [3].includes(this.value),
        'signal_bar__danger': this.value >= index && [1,2].includes(this.value)
      }
    },
  },
  template: template
})