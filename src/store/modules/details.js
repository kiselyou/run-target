import Storage from '@lib/Storage'
import Ajax from '@lib/Ajax'

export default {
  namespaced: true,
  state: {
    loading: false,
    totalDistance: Storage.getStorageItem('totalDistance') || 0,
    totalWeekDistance: Storage.getStorageItem('totalWeekDistance') || 0,
    totalMonthDistance: Storage.getStorageItem('totalMonthDistance') || 0,
  },
  getters: {
    totalPath: (state) => {
      return Number((state.totalDistance / 1000).toFixed(3))
    },
    totalWeekPath: (state) => {
      return Number((state.totalWeekDistance / 1000).toFixed(3))
    },
    totalMonthPath: (state) => {
      return Number((state.totalMonthDistance / 1000).toFixed(3))
    }
  },
  mutations: {
    /**
     *
     * @param {Object} state
     * @param {number} value
     * @returns {void}
     */
    setTotalDistance(state, value) {
      state.totalDistance = value
    },
    /**
     *
     * @param {Object} state
     * @param {number} value
     * @returns {void}
     */
    setTotalWeekDistance(state, value) {
      state.totalWeekDistance = value
    },
    /**
     *
     * @param {Object} state
     * @param {number} value
     * @returns {void}
     */
    setTotalMonthDistance(state, value) {
      state.totalMonthDistance = value
    },
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
    }
  },
  actions: {
    /**
     *
     * @param {Object} state
     * @returns {void}
     */
    update({ commit }) {
      commit('startLoading')
      const timestamp = new Date().getTime()
      Ajax.post(`details/view/${timestamp}`)
        .then((details) => {
          const totalDistance = details['totalDistance']
          commit('setTotalDistance', totalDistance)
          Storage.encodeStorageItem('totalDistance', totalDistance)

          const totalWeekDistance = details['totalWeekDistance']
          commit('setTotalWeekDistance', totalWeekDistance)
          Storage.encodeStorageItem('totalWeekDistance', totalWeekDistance)

          const totalMonthDistance = details['totalMonthDistance']
          commit('setTotalMonthDistance', totalMonthDistance)
          Storage.encodeStorageItem('totalMonthDistance', totalMonthDistance)
        })
        .finally(() => {
          commit('stopLoading')
        })
    },
  }
}