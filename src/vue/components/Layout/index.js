import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Layout', {
  props: {
    showCorner: {
      type: Boolean,
      default: false
    },
    showBody: {
      type: Boolean,
      default: true
    },
    showFoot: {
      type: Boolean,
      default: true
    },
    bodyCenter: {
      type: Boolean,
      default: false
    },
    footCenter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bodyHtmlClass: function () {
      return {
        'layout_align': this.bodyCenter,
        'layout_align__center': this.bodyCenter,
      }
    },
    footHtmlClass: function () {
      return {
        'layout_align': this.footCenter,
        'layout_align__center': this.footCenter,
        'layout_foot__corner': this.showCorner,
      }
    }
  },
  template: template
})