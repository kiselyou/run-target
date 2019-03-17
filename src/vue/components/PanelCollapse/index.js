import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('PanelCollapse', {
  props: {
    title: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      isOpened: this.open
    }
  },
  computed: {

  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened
    }
  },
  template: template
})