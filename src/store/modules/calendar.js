import Storage from '@lib/Storage'
import Ajax from '@lib/Ajax'

export default {
  namespaced: true,
  state: {
    loading: false,
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
      state.calendarActivity = Object.assign({}, this.calendarActivity, data)
      Storage.encodeStorageItem('calendarActivity', state.calendarActivity)
    },
  },
  actions: {
    /**
     * @param {Object} state
     */
    updateCalendarActivity({ commit }) {
      commit('startLoading')
      Ajax.get(`/calendar/view/tempo`)
        .then((data) => {
          commit('addCalendarActivity', data)
        })
        .finally(() => {
          commit('stopLoading')
        })
    },
  }
}