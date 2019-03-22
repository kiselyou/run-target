import Storage from '@lib/Storage'
import Ajax from '@lib/Ajax'

export default {
  namespaced: true,
  state: {
    bluetoothDevice: {
      deviceKey: Storage.getStorageItem('bluetoothDeviceKey') || null,
      device: Storage.decodeStorageItem('bluetoothDevice') || null
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
      Storage.encodeStorageItem('bluetoothDevice', device)
    },
    /**
     *
     * @param {Object} state
     * @param {number|?} deviceKey
     */
    rememberBluetoothDeviceKey({ commit }, deviceKey) {
      commit('rememberBluetoothDeviceKey', deviceKey)
      Storage.setStorageItem('bluetoothDeviceKey', deviceKey)
    },
  }
}