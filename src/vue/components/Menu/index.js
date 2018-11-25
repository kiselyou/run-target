import './style.scss'
import Vue from 'vue'
import template from './template.vue'
import '@vue/VueImg'

export default Vue.component('Menu', {
  props: {
    routes: {
      type: Array
    }
  },
  methods: {
    isActive(route) {
      return route['active']
    }
  },
  template: template
})