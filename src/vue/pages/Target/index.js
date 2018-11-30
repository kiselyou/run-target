import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@module/GeoRun'
import '@module/Spinner'

Vue.component('Target', function (resolve, reject) {
  setTimeout(function () {
    resolve(
      {
        mounted: function () {
          this.$emit('onMounted')
        },
        template: template
      }
    )
  }, 1000)
})

export default {
  data: function () {
    return {
      loading: true
    }
  },
  methods: {
    onMounted: function () {
      this.loading = false
    }
  },
  template: `
    <div>
      <Spinner :loading="loading"/>
      <Target @onMounted="onMounted" />
    </div>
  `
}

