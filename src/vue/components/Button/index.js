import './style.scss'
import Vue from 'vue'
import template from './template.vue'

export default Vue.component('Button', {
  props: {
    text: {
      type: String
    },
    icon: {
      type: String
    },
    show: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    skin: {
      type: String,
    },
    mx: {
      type: [String, Number],
    },
    my: {
      type: [String, Number],
    },
    width: {
      type: Number
    }
  },
  data: function () {
    return {
      iconName: this.icon ? `oi oi-${this.icon}` : null
    }
  },
  methods: {
    clickEvent: function (e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  },
  template: template
})