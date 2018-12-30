import './style.scss'
import Vue from 'vue'
import '@vue/Tab'
import '@module/Menu'
import '@module/Activity'
import '@module/ActivityControls'

import TabItems from '@vue/Tab/api/TabItems'
import TabItem from '@vue/Tab/api/TabItem'

import Geo from '@lib/geo-location/Geo'
import Timer from '@lib/Timer'
import Ajax from '@lib/Ajax'

const debug = false
const timer = new Timer()

export default Vue.component('Mobile', {
  data: function () {
    return {
      /**
       * @type {Geo}
       */
      geo: new Geo(debug),
      /**
       * Табы.
       *
       * @type {TabItems}
       */
      tabItems: new TabItems()
        .pushItem(new TabItem('content-activity', 'Активность', true))
        .pushItem(new TabItem('content-tempo', 'Темп')),

      pause: false
    }
  },
  computed: {
    path: function () {
      return this.geo.getPathLength()
    },
    speed: function () {
      return this.geo.avgSpeed
    },
    tempo: function () {
      return timer.setTime(this.geo.getTempo()).toNumberMinutes()
    },
    targetDistance: function () {
      // TODO: вытянуть данные из сервера для текущего дня
      return 0
    },
    time: function () {
      return this.geo.timer.toStringHours()
    },
  },
  methods: {
    startRun: function () {
      this.geo.start((error) => {
        this.error = error.message
      })
    },
    stopRun: function () {
      this.geo.stop()
      this.pause = true
    },
    nextRun: function () {
      this.pause = false
      this.geo.start((error) => {
        this.error = error.message
      })
    },
    endRun: function () {
      this.geo.stop()
      Ajax.post(`run/save/activity/${881}`, { geo: this.geo.serialize() })
        .catch(console.error)
      this.geo.clear()
    }
  },
  template: `
    <!--<GeoRun />-->
    <!--<div>
      <Menu :routes="routes"/>
      <router-view class="view"></router-view>
    </div>-->
    
    <Tab :items="tabItems">
      <template slot="content-activity">
        <Activity :pause="pause" :tempo="tempo" :speed="speed" :time="time" :path="path" :target="targetDistance">
          <ActivityControls @startRun="startRun" @stopRun="stopRun" @nextRun="nextRun" @endRun="endRun"/>
        </Activity>
      </template>
      <template slot="content-tempo">
        tempo
      </template>
    </Tab>
    
  `
})