import './style.scss'
import Vue from 'vue'
import '@vue/Calendar/components/Day'
import Day from '@vue/Calendar/lib/Day'
import template from './template.vue'

export default Vue.component('DayRun', {
  props: {
    day: {
      type: [Day],
      required: true
    },
  },
  methods: {
    log: (data) => {
      console.log(data)
    },
  },
  template: template
})