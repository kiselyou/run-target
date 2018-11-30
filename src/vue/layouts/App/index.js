import './style.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Target from '@page/Target'
import '@module/Menu'

Vue.use(VueRouter)

export default Vue.component('App', {
  router: new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      {
        path: '/',
        name: 'target',
        text: 'Цель',
        component: Target
      },
    ]
  }),
  data: function () {
    return {
      routes: this.$router.options.routes,
    }
  },
  template: `
    <div>
      <Menu :routes="routes"/>
      <router-view class="view"></router-view>
    </div>
  `
})