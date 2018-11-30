import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '../Day'

export default Vue.component('Month', {
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
  },
  methods: {
    next: function (currentMonth) {
      this.$emit('nextMonth', currentMonth)
    },
    prev: function (currentMonth) {
      this.$emit('prevMonth', currentMonth)
    },
    selectDay: function (day) {
      this.$emit('selectDay', day)
    }
  },
  template: template
})