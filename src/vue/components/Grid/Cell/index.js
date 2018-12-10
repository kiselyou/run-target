import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Cell', {
  props: {
    label: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
    },
    size: {
      type: String,
      default: 'lg'
    },
    bold: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    htmlClass: function () {
      return {
        'grid-cell_value__xs': this.size === 'xs',
        'grid-cell_value__sm': this.size === 'sm',
        'grid-cell_value__md': this.size === 'md',
        'grid-cell_value__lg': this.size === 'lg',
        'grid-cell_value__bold': this.bold,
      }
    }
  },
  template: template
})