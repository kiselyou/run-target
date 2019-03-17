import './style.scss'
import Vue from 'vue'
import '@vue/Tab'
import '@module/Activity'
import '@module/Tempo'
import '@module/Details'
import '@module/Target'
import '@module/Settings'

import TabItems from '@vue/Tab/api/TabItems'
import TabItem from '@vue/Tab/api/TabItem'

export default Vue.component('Mobile', {
  data: function () {
    return {
      /**
       * Табы.
       *
       * @type {TabItems}
       */
      tabItems: new TabItems()
        .pushItem(new TabItem('Details', 'Статистика', true).keepAlive())
        .pushItem(new TabItem('Activity', 'Активность').keepAlive())
        .pushItem(new TabItem('Tempo', 'Темп').keepAlive())
        .pushItem(new TabItem('Settings', 'Настройки').keepAlive())
        // .pushItem(new TabItem('Target', 'Цель').keepAlive()),
    }
  },
  methods: {
    forceRerender: function () {
      for (const tab of this.tabItems.items) {
        tab.updateUUID()
      }
    }
  },
  template: `
    <Tab :tabItems="tabItems" @forceRerender="forceRerender" />
  `
})