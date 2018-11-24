import './style.scss'
import Vue from 'vue'
import template from './template.vue'

export default Vue.component('RunProcess', {
  props: {
    start: {
      type: Number,
      default: 0
    },
    finish: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    digits: {
      type: Number,
      default: 3
    },
    label: {
      type: String,
    }
  },
  data: function () {
    let percent = 0
    if (this.finish > 0) {
      percent = Number(this.value / this.finish * 100).toFixed(this.digits)
    }
    if (percent > 100) {
      percent = 100
    }

    return {
      percent,
    }
  },
  methods: {
    unit: function (value) {
      return value < 1000 ? 'м' : 'км'
    }
  },
  template: template
})