import './style.scss'
import Vue from 'vue'
import template from './template.html'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

export default Vue.component('Tooltip', {
  props: {
    content: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    autoHide: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'auto'
    },
    trigger: {
      type: String,
      default: 'hover'
    }
  },
  computed: {
    options: function () {
      return {
        show: this.show,
        trigger: this.trigger,
        content: this.content,
        autoHide: this.autoHide,
        placement: this.placement
      }
    }
  },
  template: template
})