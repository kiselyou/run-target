import './style.scss'
import Vue from 'vue'
import template from './template.vue'

const images = {
  logo: './img/logo.png'
}

export default Vue.component('VueImg', {
  props: {
    name: {
      type: String,
      require: true
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    }
  },
  data: function () {
    return {
      path: images[this.name] || ''
    }
  },
  template: template
})