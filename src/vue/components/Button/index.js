import './style.scss'
import Vue from 'vue'
import template from './template.html'

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
      type: [Number, String]
    }
  },
  data: function () {
    return {
      iconName: this.icon ? `oi oi-${this.icon}` : null
    }
  },
  computed: {
    htmlWidth: function() {
      return {
        'min-width': this.width
      }
    },
    htmlClass: function() {
      return {
        'mx-1': this.mx === 1,
        'mx-2': this.mx === 2,
        'mx-3': this.mx === 3,
        'mx-4': this.mx === 4,
        'my-1': this.my === 1,
        'my-2': this.my === 2,
        'my-3': this.my === 3,
        'my-4': this.my === 4,
        'button__red': this.skin === 'red',
        'button__green': this.skin === 'green',
        'button__orange': this.skin === 'orange',
        'button__blue': this.skin === 'blue',
        'button__white': this.skin === 'white',
        'button__disabled': this.disabled,
      }
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