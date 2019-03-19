import './style.scss'
import Vue from 'vue'
import '@vue/Tab'
import '@module/Activity'
import '@module/Tempo'
import '@module/Details'
import '@module/Target'
import '@module/Settings'
import '@module/Map'

import TabItems from '@vue/Tab/api/TabItems'
import TabItem from '@vue/Tab/api/TabItem'

import { mapGetters, mapState } from 'vuex'

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
  computed: {
    ...mapState({
      /**
       *
       * @param {Object} state
       * @returns {Object|?}
       */
      mapIsEnabled: (state) => {
        return state.map.enabled
      },
      /**
       *
       * @param {Object} state
       * @returns {Object|?}
       */
      mapIsDisabled: (state) => {
        return !state.map.enabled
      },
      /**
       *
       * @param {Object} state
       * @returns {Array}
       */
      mapPoints: (state) => {
        return state.map.points
      },
    })
  },
  methods: {
    forceRerender: function () {
      for (const tab of this.tabItems.items) {
        tab.updateUUID()
      }
    },
    active(component) {
      switch (component) {
        case 'Tab':
          return this.mapIsDisabled ? component : null
        case 'Map':
          return this.mapIsEnabled ? component : null
      }
    }
  },
  template: `
    <div class="mobile-container">
      <keep-alive :include="['Tab']">
        <Tab :tabItems="tabItems" @forceRerender="forceRerender" :is="active('Tab')" />
        <Map :points="mapPoints" :is="active('Map')" />
      </keep-alive>
    </div>
  `
})