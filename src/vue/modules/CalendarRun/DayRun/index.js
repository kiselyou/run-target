import './style.scss'
import Vue from 'vue'
import '@vue/Calendar/Day'
import Day from '@vue/Calendar/api/Day'
import template from './template.html'

export default Vue.component('DayRun', {
  props: {
    day: {
      type: [ Day ],
      required: true
    },
    unit: {
      type: String,
      default: 'км'
    }
  },
  computed: {
    hasDistance () {
      const distance = this.day.getOption('expectDistance')
      return distance && distance > 0
    },
    resultDistance () {
      return this.day.getOption('resultDistance')
    },
    expectDistance () {
      return this.day.getOption('expectDistance')
    }
  },
  methods: {
    onClick () {
      if (this.day.enabled) {
        this.$emit('onClick', this.day)
      }
    },
  },
  template: template
})