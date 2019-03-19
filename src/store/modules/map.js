
export default {
  namespaced: true,
  state: {
    enabled: false,
    points: []
  },
  getters: {

  },
  mutations: {
    /**
     *
     * @param {Object} state
     * @returns {void}
     */
    show(state) {
      state.enabled = true
    },
    /**
     *
     * @param {Object} state
     * @returns {void}
     */
    hide(state) {
      state.enabled = false
    },
    /**
     *
     * @param {Object} state
     * @param {Array} points
     * @returns {void}
     */
    setPoints(state, points) {
      state.points = points
    },
    /**
     *
     * @param {Object} state
     * @returns {void}
     */
    removePoints(state) {
      state.points = []
    }
  },
  actions: {

  }
}