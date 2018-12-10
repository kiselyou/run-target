import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'

export default Vue.component('Tempo', {
  props: {
    distances: {
      type: Array,
    },
    avgLabel: {
      type: String,
      default: 'Средний темп'
    },
    upperLabel: {
      type: String,
      default: 'Самый быстрый'
    },
    lowerLabel: {
      type: String,
      default: 'Самый медленный'
    }
  },
  data: function () {
    return {}
  },
  computed: {
    avgValue: function () {
      return 0
    },
    upperValue: function () {
      return 0
    },
    lowerValue: function () {
      return 0
    }
  },
  methods: {

  },
  template: template
})