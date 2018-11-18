import './style.scss'
import Vue from 'vue'
import template from './template.vue'
import Day from '@vue/Calendar/lib/Day'

export default Vue.component('Day', {
  props: {
    day: {
      type: [Day],
      required: true
    },
    head: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    log: (data) => {
      console.log(data)
    },
    htmlClass: function () {
      if (this.head) {
        return {}
      }
      return {
        'day__today': this.day.isNow,
        'day__hover': this.day.enabled,
        'day__bordered': this.day.enabled,
        'day__disabled': !this.day.enabled,
      }
    }
  },
  template: template
})