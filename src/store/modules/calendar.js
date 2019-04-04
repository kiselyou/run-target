import Storage from '@lib/Storage'
import Ajax from '@lib/Ajax'
import { dayTimestamp } from '@lib/helpers/date-helper'
import {updateDayActivitiesInDB} from "@api/activity";

export default {
  namespaced: true,
  state: {
    loading: false,
    selectedDay: null,
    calendarActivity: Storage.decodeStorageItem('calendarActivity') || {}
  },
  getters: {

  },
  mutations: {
    /**
     *
     * @param {Object} state
     */
    startLoading(state) {
      state.loading = true
    },
    /**
     *
     * @param {Object} state
     */
    stopLoading(state) {
      state.loading = false
    },
    /**
     *
     * @param {Object} state
     * @param {Object} data
     */
    addCalendarActivity(state, data) {
      state.calendarActivity = data
      Storage.encodeStorageItem('calendarActivity', state.calendarActivity)
    },
    /**
     *
     * @param {Object} state
     * @param {Day} day
     */
    setSelectedDay(state, day) {
      state.selectedDay = day
    }
  },
  actions: {
    /**
     * TODO: put on IndexedDB
     *
     * @param {Object} state
     */
    async update({ commit }) {
      commit('startLoading')
      return Ajax.get(`/calendar/view/tempo`)
        .then((activities) => {
          if (!activities) {
            return
          }
          commit('addCalendarActivity', activities)
        })
        .finally(() => commit('stopLoading'))
    },
  }
}