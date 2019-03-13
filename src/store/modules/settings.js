
export default {
  namespaced: true,
  state: {
    bluetoothDevice: {
      deviceKey: null,
      device: null
    }
  },
  getters: {

  },
  mutations: {
    /**
     *
     * @param {Object} state
     * @param {Object|?} device
     * @returns {void}
     */
    rememberBluetoothDevice(state, device) {
      state.bluetoothDevice.device = device
    },
    /**
     *
     * @param {Object} state
     * @param {number|?} deviceKey
     * @returns {void}
     */
    rememberBluetoothDeviceKey(state, deviceKey) {
      state.bluetoothDevice.deviceKey = deviceKey
    },
  },
  actions: {
    /**
     *
     * @param {Object} state
     * @param {Object|?} device
     */
    rememberBluetoothDevice({ commit }, device) {
      commit('rememberBluetoothDevice', device)
    },
    /**
     *
     * @param {Object} state
     * @param {number|?} deviceKey
     */
    rememberBluetoothDeviceKey({ commit }, deviceKey) {
      commit('rememberBluetoothDeviceKey', deviceKey)
    },
  }
}