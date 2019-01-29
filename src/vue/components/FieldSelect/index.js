import './style.scss'
import Vue from 'vue'
import template from './template.html'
import { ModelListSelect } from 'vue-search-select'
Vue.component('ModelListSelect', ModelListSelect)

export default Vue.component('FieldSelect', {
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
    items: {
      type: Array,
      default: () => []
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