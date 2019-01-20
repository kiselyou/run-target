import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('FieldInput', {
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
    },
  },
  data: function () {
    return {
      modelValue: this.value
    }
  },
  computed: {
    inputId: function () {
      return this.id || this.name
    }
  },
  methods: {
    onChangeEvent: function (event) {
      this.$emit('onChange', this.modelValue,  event)
    },
  },
  template: template
})