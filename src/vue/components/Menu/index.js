import './style.scss'
import Vue from 'vue'
import template from './template.vue'

export default Vue.component('Menu', {
  props: {
    routes: {
      type: Array
    }
  },
  methods: {
    log: (data) => {
      console.log(data)
    },
    isActive(route) {
      return route['active']
    }
  },
  template: template
})