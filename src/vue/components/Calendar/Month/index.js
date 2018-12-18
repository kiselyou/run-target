import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '../Day'
import '@vue/VueIcon'

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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    htmlClass() {
      return {
        'month_disabled': this.disabled
      }
    }
  },
  methods: {
    next: function (currentMonth) {
      if (this.disabled) {
        return
      }
      this.$emit('nextMonth', currentMonth)
    },
    prev: function (currentMonth) {
      if (this.disabled) {
        return
      }
      this.$emit('prevMonth', currentMonth)
    },
    selectDay: function (day) {
      if (this.disabled) {
        return
      }
      this.$emit('selectDay', day)
    }
  },
  template: template
})