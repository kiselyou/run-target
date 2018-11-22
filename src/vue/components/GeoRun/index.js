import './style.scss'
import Vue from 'vue'
import Geo from './lib/Geo'
import './components/RunProcess'
import template from './template.vue'

export default Vue.component('GeoRun', {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      status: 0, // 0 - выкл., 1 - бег, 2 - пауза
      geo: new Geo(),
    }
  },
  methods: {
    pathLength: function () {
      return this.geo.pathLength
    },
    speed: function () {
      return this.geo.speed
    },
    start: function () {
      //
      // const def = {
      //   timestamp: 1542662430374,
      //   coords: {
      //     latitude: 55.456000,
      //     longitude: 27.567000
      //   }
      // }
      //
      // setInterval(() => {
      //
      //   def.coords.latitude += 0.0000545
      //   def.coords.longitude += 0.00005567
      //
      //   const position = {
      //     timestamp: 1542662430374,
      //     coords: {
      //       latitude: 55.456000,
      //       longitude: 27.567000
      //     }
      //   }
      //   position.timestamp = Date.now()
      //   position.coords.latitude = def.coords.latitude
      //   position.coords.longitude = def.coords.longitude
      //   this.geo.addPosition(position)
      //   // console.log(this.geo.speed, firstPosition.coords.latitude, firstPosition.coords.longitude)
      // }, 30)

      // this.geo.start()
      this.status = 1
    },
    pause: function () {
      // this.geo.stop()
      this.status = 2
    },
    run: function () {
      // this.geo.stop()
      this.status = 1
    },
    end: function () {
      // this.geo.clear()
      this.status = 0

    },
  },
  template: template
})