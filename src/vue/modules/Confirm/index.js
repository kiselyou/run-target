import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Button'
import '@vue/VueIcon'

export default Vue.component('Confirm', {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
    },
    icon: {
      type: String,
      default: 'warning'
    },
    btnNo: {
      type: String,
      default: 'Отмена'
    },
    btnYes: {
      type: String,
      default: 'Продолжить'
    },
    btnNoSkin: {
      type: String,
      default: 'white'
    },
    btnYesSkin: {
      type: String,
      default: 'white'
    },
    btnNoDisabled: {
      type: Boolean,
      default: false
    },
    btnYesDisabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      enabled: this.show
    }
  },
  methods: {
    eventNo: function (e) {
      this.enabled = false
      this.$emit('clickNo', e)
    },
    eventYes: function (e) {
      this.enabled = false
      this.$emit('clickYes', e)
    }
  },
  template: template
})