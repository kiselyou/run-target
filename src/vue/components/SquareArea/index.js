import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('SquareArea', {
  props: {
    alignVertical: {
      type: String
    },
    alignHorizontal: {
      type: String
    },
    breakLine: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    htmlClass: function () {
      return {
        'square-area_v-position__center': this.alignVertical === 'center',
        'square-area_h-position__center': this.alignHorizontal === 'center',
        'square-area_break-line': this.breakLine
      }
    }
  },
  template: template
})