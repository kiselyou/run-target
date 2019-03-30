import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Calendar/Month'
import '../DayRun'
import Day from '@vue/Calendar/api/Day'

export default Vue.component('MonthRun', {
  props: {
    month: {
      type: Object,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedDay: {
      type: [Day, null],
      default: null
    },
  },
  methods: {
    isSelected(day) {
      return this.selectedDay && this.selectedDay.date === day.date
    },
    next: function (date) {
      if (this.disabled) {
        return
      }
      this.$emit('nextMonth', date)
    },
    prev: function (date) {
      if (this.disabled) {
        return
      }
      this.$emit('prevMonth', date)
    },
    selectDay: function (day) {
      if (this.disabled) {
        return
      }
      this.$emit('selectDay', day)
    },
  },
  template: template
})