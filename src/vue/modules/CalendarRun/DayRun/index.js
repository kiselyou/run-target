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
    hasDistance() {
      return this.day.getNumberOption('expectDistance') > 0
    },
    resultDistance() {
      return this.day.getNumberOption('resultDistance').toFixed(3)
    },
    expectDistance() {
      return this.day.getNumberOption('expectDistance').toFixed(3)
    },
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