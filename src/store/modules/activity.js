import Storage from '@lib/Storage'
import Ajax from '@lib/Ajax'

export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    save({ dispatch }, data) {
      Ajax.post(`activity/save`, data)
        .finally(() => {
          dispatch('details/update', null, { root: true })
        })
    }
  }
}