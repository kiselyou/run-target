import './style.scss'
import Vue from 'vue'
import template from './template.html'
import TabItems from './api/TabItems'

export default Vue.component('Tab', {
  props: {
    tabItems: {
      type: [TabItems],
      required: true
    },
    keepAlive: {
      type: Boolean,
      default: false
    },
  },
  beforeMount: function () {
    for (const tab of this.tabItems.items) {
      if (tab.isActive) {
        this.$emit('onTabOpen', tab)
        return
      }
    }
  },
  computed: {
    currentTabComponent: function () {
      const tab = this.tabItems.getActiveTab()
      return tab ? tab.componentName : null
    },
    keyRerender: function () {
      const tab = this.tabItems.getActiveTab()
      return tab ? tab.uuid : null
    },
    keepAliveComponents: function () {
      const components = []
      for (const tab of this.tabItems.items) {
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
      for (const item of this.tabItems.items) {
        item.active(item.componentName === tab.componentName)
      }
      if (!tab.isDisabled) {
        this.$emit('onTabOpen', tab)
      }
    },
    forceRerender(component) {
      this.$emit('forceRerender', component)
    }
  },
  template: template
})