import './style.scss'
import Vue from 'vue'
import template from './template.html'
import { ModelSelect } from 'vue-search-select'
Vue.component('ModelSelect', ModelSelect)

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
    options: {
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
    fieldId: function () {
      return this.id || this.name
    },
  },
  methods: {
    onSelect: function (event) {
      this.$emit('onSelect', this.modelValue || null,  event)
    },
  },
  template: template
})