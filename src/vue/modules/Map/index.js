import template from './template.html'
import './style.scss'
import Vue from 'vue'

import '@vue/Button'
import Map from '@lib/cordova/map/Map'

export default Vue.component('Map', {
  props: {
    points: {
      type: Array,
      required: true
    },
  },
  mounted: function () {
    if (this.points.length > 0) {
      new Map(`#${this.mapId}`).init(this.points, () => {
        this.allowClose = true
      })
    }
  },
  data: function () {
    return {
      mapId: 'map-content',
      allowClose: false
    }
  },
  methods: {
    closeMap() {
      this.$store.commit('map/removePoints')
      this.$store.commit('map/hide')
    }
  },
  template: template
})