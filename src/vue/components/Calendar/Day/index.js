import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Day from '../api/Day'

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
  computed: {
    htmlClass: function () {
      if (this.head) {
        return {
          'day__head': true
        }
      }
      return {
        'day__today': this.day.isNow,
        'day__active': this.day.active,
        'day__hover': this.day.enabled,
        'day__bordered': this.day.enabled,
        'day__disabled': !this.day.enabled,
      }
    },
  },
  methods: {
    click: function () {
      if (this.day.enabled) {
        this.$emit('onClick', this.day)
      }
    }
  },
  template: template
})