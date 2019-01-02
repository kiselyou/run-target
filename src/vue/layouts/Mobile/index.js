import './style.scss'
import Vue from 'vue'
import '@vue/Tab'
import '@module/Activity'
import '@module/Tempo'
import '@module/Details'

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
      tabs: new TabItems()
        .pushItem(new TabItem('Details', 'Статистика', true).keepAlive())
        .pushItem(new TabItem('Activity', 'Активность').keepAlive())
        .pushItem(new TabItem('Tempo', 'Темп')),
    }
  },
  template: `
    <Tab :tabs="tabs" />
  `
})