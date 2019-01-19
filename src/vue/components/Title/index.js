import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Title', {
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  computed: {
    htmlClass: function () {
      return {
        'title_bordered': this.bordered
      }
    }
  },
  template: template
})