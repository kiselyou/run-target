import './style.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import template from './template.vue'

import '@vue/Menu'
import Target from '@page/Target'

Vue.use(VueRouter)

const Home = { template: '<div><h2>Home</h2></div>' }

export default Vue.component('App', {
  router: new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', name: 'target', text: 'Моя цель', component: Target },
      { path: '/profile', name: 'profile', text: 'Профиль', component: Home },
      { path: '/settings', name: 'settings', text: 'Настройки', component: Home },
    ]
  }),
  data: function () {
    return {
      routes: this.$router.options.routes
    }
  },
  template: `
    <div>
      <Menu :routes="routes" />
      <router-view class="view"></router-view>
    </div>
  `
})