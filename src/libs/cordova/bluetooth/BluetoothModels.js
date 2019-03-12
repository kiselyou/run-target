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
   * @param {number} modelKey
   * @returns {Promise<Object|?>}
   */
  async detectDevice(modelKey) {
    switch (Number(modelKey)) {
      case BluetoothModels.KEY_MI_BAND:
        return this.miBand.detectDevice(this.miBand.name)
      default:
        throw new Error('Model is not supported')
    }
  }

  /**
   *
   * @param {number} modelKey
   * @param {Object} device
   * @returns {Promise<Object>}
   */
  async connect(modelKey, device) {
    switch (Number(modelKey)) {
      case BluetoothModels.KEY_MI_BAND:
        return this.miBand.connect(device)
      default:
        throw new Error('Model is not supported')
    }
  }

  /**
   * @param {number} modelKey
   * @param {Object} device
   * @returns {Promise<boolean>}
   */
  async auth(modelKey, device) {
    switch (Number(modelKey)) {
      case BluetoothModels.KEY_MI_BAND:
        return this.miBand.auth(device)
      default:
        throw new Error('Model is not supported')
    }
  }

  /**
   * @param {number} modelKey
   * @param {Object} device
   * @param {Function} onSuccess
   * @param {Function} [onError]
   * @returns {void}
   */
  startListenHRM(modelKey, device, onSuccess, onError) {
    switch (Number(modelKey)) {
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