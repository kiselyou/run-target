import './style.scss'
import Vue from 'vue'
import '@vue/Calendar/Day'
import Day from '@vue/Calendar/api/Day'
import template from './template.html'

export default Vue.component('DayRun', {
  props: {
    day: {
      type: [Day],
      required: true
    },
  },
  methods: {
    onClick: function () {
      if (this.day.enabled) {
        this.$emit('onClick', this.day)
      }
    }
  },
  template: template
})