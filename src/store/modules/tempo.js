import Storage from '@lib/Storage'
import Ajax from '@lib/Ajax'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    loading: false,
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
  },
  actions: {

  }
}