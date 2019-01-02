import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Layout', {
  props: {
    showCorner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    footHtmlClass: function () {
      return {
        'layout_foot__corner': this.showCorner
      }
    }
  },
  template: template
})