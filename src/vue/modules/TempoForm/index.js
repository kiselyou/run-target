import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Ajax from '@lib/Ajax'

import '@vue/Button'

export default Vue.component('TempoForm', {
  props: {
    title: {
      type: String
    }
  },
  data: function () {
    return {

    }
  },
  beforeMount: function () {

  },
  computed: {

  },
  methods: {
    cancelSave() {
      this.$emit('cancel')
    },

    save() {
      this.$emit('save')
    }
  },
  template: template
})