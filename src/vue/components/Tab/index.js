import './style.scss'
import Vue from 'vue'
import template from './template.html'
import TabItems from './api/TabItems'

export default Vue.component('Tab', {
  props: {
    items: {
      type: [TabItems, Array],
      required: true
    },
  },
  data: function () {
    return {}
  },
  methods: {
    itemHtmlClass: function (tabItem) {
      return {
        'tab_item__disabled': tabItem.isDisabled,
        'tab_item__active': tabItem.isActive,
      }
    },
    onClick(tabItem) {
      for (const item of this.items) {
        item.active(item.slotName === tabItem.slotName)
      }
      this.$emit('onClick', tabItem)
    }
  },
  template: template
})