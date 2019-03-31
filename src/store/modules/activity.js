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
    /**
     *
     * @param {Function} commit
     * @param {Object} data
     * @returns {Promise<void>}
     */
    async save({ commit }, data) {
      commit('startLoading')
      return Ajax.post(`activity/save`, data)
        .finally(() => commit('stopLoading'))
    },
    /**
     *
     * @param {Function} commit
     * @param {Object} data
     * @returns {Promise<void>}
     */
    async saveCustom({ commit }, data) {
      commit('startLoading')
      return Ajax.post(`activity/save/custom`, data)
        .finally(() => commit('stopLoading'))
    },
    /**
     *
     * @param {Function} commit
     * @param {number} activityId
     * @returns {Promise<void>}
     */
    async remove({ commit }, activityId) {
      commit('startLoading')
      return Ajax.post(`activity/remove`, { activityId })
        .finally(() => commit('stopLoading'))
    },

    /**
     *
     * @param {Function} commit
     * @param {Date|string|number} date
     * @returns {Promise.<void>}
     */
    async update({ commit }, date) {
      commit('startLoading')
      return updateDayActivitiesInDB(date)
        .finally(() => commit('stopLoading'))
    },

    /**
     *
     * @param {Function} commit
     * @param {Date|string|number} date
     * @returns {Promise.<void>}
     */
    async load({ commit }, date) {
      commit('startLoading')
      return loadDayActivitiesFromDB(date)
        .then((activities) => {
          commit('setDayActivities', activities)
        })
        .finally(() => commit('stopLoading'))
    },

    /**
     *
     * @param {Function} commit
     * @returns {Promise.<void>}
     */
    async synchronize({ commit }) {
      commit('startLoading')
      return updateAllActivitiesInDB()
        .finally(() => commit('stopLoading'))
    },
  }
}