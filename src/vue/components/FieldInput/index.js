import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('FieldInput', {
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: 'text'
    },
  },
  computed: {
    inputId: function () {
      return this.id || this.name
    }
  },
  template: template
})