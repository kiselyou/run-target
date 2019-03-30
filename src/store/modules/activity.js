import Ajax from '@lib/Ajax'
import { loadDayActivitiesFromDB, updateDayActivitiesInDB, updateAllActivitiesInDB } from '@api/activity'

export default {
  namespaced: true,
  state: {
    loading: false,
    dayActivities: []
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
     * @param {Array.<Object>} activities
     */
    setDayActivities(state, activities) {
      state.dayActivities = activities
    },
  },
  actions: {
    save({ dispatch, commit }, data) {
      commit('startLoading')
      Ajax.post(`activity/save`, data)
        .finally(() => {
          dispatch('details/update', null, { root: true })
          commit('stopLoading')
        })
    },

    /**
     *
     * @param {Object} state
     * @param {Date|string|number} date
     * @returns {void}
     */
    async update({ commit }, date) {
      commit('startLoading')
      await updateDayActivitiesInDB(date)
      commit('stopLoading')
    },

    /**
     *
     * @param {Object} state
     * @param {Date|string|number} date
     * @returns {Array.<Object>}
     */
    async load({ commit }, date) {
      commit('startLoading')
      const activities = await loadDayActivitiesFromDB(date)
      commit('setDayActivities', activities)
      commit('stopLoading')
    },

    /**
     *
     * @param {Object} state
     * @returns {void}
     */
    async synchronize({ commit }) {
      commit('startLoading')
      await updateAllActivitiesInDB()
      commit('stopLoading')
    },
  }
}