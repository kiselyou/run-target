import './style.scss'
import Vue from 'vue'
import template from './template.html'
import TabItems from './api/TabItems'

export default Vue.component('Tab', {
  props: {
    tabs: {
      type: [TabItems, Array],
      required: true
    },
    keepAlive: {
      type: Boolean,
      default: false
    },
  },
  beforeMount: function () {
    for (const tab of this.tabs) {
      if (tab.isActive) {
        this.$emit('onTabOpen', tab)
        return
      }
    }
  },
  computed: {
    currentTabComponent: function () {
      for (const tab of this.tabs) {
        if (tab.isActive) {
          return tab.componentName
        }
      }
      return null
    },
    keepAliveComponents: function () {
      const components = []
      for (const tab of this.tabs) {
        if (tab.keep) {
          components.push(tab.componentName)
        }
      }
      return components
    }
  },
  methods: {
    htmlClass: function (tab) {
      return {
        'tab_item__disabled': tab.isDisabled,
        'tab_item__active': tab.isActive,
      }
    },
    onClick(tab) {
      for (const item of this.tabs) {
        item.active(item.componentName === tab.componentName)
      }
      if (!tab.isDisabled) {
        this.$emit('onTabOpen', tab)
      }
    },
  },
  template: template
})