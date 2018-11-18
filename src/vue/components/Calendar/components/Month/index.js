import './style.scss'
import Vue from 'vue'
import template from './template.vue'
import '@vue/Calendar/components/Day'

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
    log: (data) => {
      console.log(data)
    },
    next: function (currentMonth) {
      this.$emit('nextMonth', currentMonth)
    },
    prev: function (currentMonth) {
      this.$emit('prevMonth', currentMonth)
    }
  },
  template: template
})