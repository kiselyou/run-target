import BluetoothMiBand from './BluetoothMiBand'

class BluetoothModels {
  constructor() {
    /**
     *
     * @type {BluetoothMiBand}
     */
    this.miBand = new BluetoothMiBand()

    /**
     *
     * @type {{ [p: string]: string, [p: number]: string }}
     */
    this.modelsList = {
      [BluetoothModels.KEY_MI_BAND]: this.miBand.name
    }
  }

  /**
   *
   * @param {number} deviceKey
   * @returns {Promise<Object|?>}
   */
  async detectDevice(deviceKey) {
    switch (Number(deviceKey)) {
      case BluetoothModels.KEY_MI_BAND:
        return this.miBand.detectDevice(this.miBand.name)
      default:
        throw new Error('Model is not supported')
    }
  }

  /**
   *
   * @param {number} deviceKey
   * @param {Object} device
   * @returns {Promise<Object>}
   */
  async connect(deviceKey, device) {
    switch (Number(deviceKey)) {
      case BluetoothModels.KEY_MI_BAND:
        return this.miBand.connect(device)
      default:
        throw new Error('Model is not supported')
    }
  }

  /**
   * @param {number} deviceKey
   * @param {Object} device
   * @returns {Promise<boolean>}
   */
  async auth(deviceKey, device) {
    switch (Number(deviceKey)) {
      case BluetoothModels.KEY_MI_BAND:
        return this.miBand.auth(device)
      default:
        throw new Error('Model is not supported')
    }
  }

  /**
   * @param {number} deviceKey
   * @param {Object} device
   * @param {Function} onSuccess
   * @param {Function} [onError]
   * @returns {void}
   */
  startListenHRM(deviceKey, device, onSuccess, onError) {
    switch (Number(deviceKey)) {
      case BluetoothModels.KEY_MI_BAND:
        this.miBand.startListenHRM(device, onSuccess, onError)
        break
      default:
        throw new Error('Model is not supported')
    }
  }

  static get KEY_MI_BAND() {
    return 1
  }
}

export default BluetoothModels