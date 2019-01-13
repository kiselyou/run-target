import './style.scss'
import Vue from 'vue'
import '@vue/VueIcon'
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
      default: 'white'
    },
    mx: {
      type: [String, Number],
    },
    my: {
      type: [String, Number],
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    size: {
      type: [Number, String]
    },
    shape: {
      type: String,
    }
  },
  computed: {
    htmlWidth: function() {
      return {
        'min-width': this.width,
        'width': this.size || this.width,
        'height': this.size || this.height
      }
    },
    htmlClass: function() {
      return {
        'mx-1': Number(this.mx) === 1,
        'mx-2': Number(this.mx) === 2,
        'mx-3': Number(this.mx) === 3,
        'mx-4': Number(this.mx) === 4,
        'my-1': Number(this.my) === 1,
        'my-2': Number(this.my) === 2,
        'my-3': Number(this.my) === 3,
        'my-4': Number(this.my) === 4,
        'button__red': this.skin === 'red',
        'button__green': this.skin === 'green',
        'button__orange': this.skin === 'orange',
        'button__blue': this.skin === 'blue',
        'button__white': this.skin === 'white',
        'button__black': this.skin === 'black',
        'button__gray': this.skin === 'gray',
        'button__disabled': this.disabled,
        'button_shape__round': this.shape === 'round',
        'button_shape__square': this.shape === 'square',
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