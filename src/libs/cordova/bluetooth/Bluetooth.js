
class Bluetooth {
  constructor() {
    /**
     *
     * @type {number}
     */
    this.scaningMaxTime = 30000

    /**
     *
     * @type {number}
     */
    this.attemptCountToConnect = 30

    /**
     *
     * @type {boolean}
     */
    this.isConnected = false
  }

  /**
   *
   * @param {Object} device
   * @returns {Promise<Object>}
   */
  connect(device) {
    let attemptNumber = 0
    return new Promise((resolve, reject) => {
      const onConnect = (data) => {
        this.isConnected = true
        resolve(data)
      }

      const attemptConnectOnError = (error) => {
        if (attemptNumber < this.attemptCountToConnect) {
          attemptNumber++
          window.ble.connect(device.id, onConnect, attemptConnectOnError)
        } else {
          this.isConnected = false
          reject(error)
        }
      }

      attemptNumber++
      window.ble.connect(device.id, onConnect, attemptConnectOnError)
    })
  }

  /**
   *
   * @param {Object} device
   * @returns {Promise<any>}
   */
  disconnect(device) {
    return new Promise((resolve, reject) => {
      window.ble.disconnect(
        device.id,
        (data) => {
          this.isConnected = false
          resolve(data)
        },
        (error) => {
          this.isConnected = false
          reject(error)
        })
    })
  }

  /**
   *
   * @returns {Promise<Array>}
   */
  startScan() {
    return new Promise((resolve, reject) => {
      const devices = []
      window.ble.startScan([], (device) => devices.push(device), reject)

      setTimeout(() => {
        this.stopScan().then(() => resolve(devices))
      }, this.scaningMaxTime)
    })
  }

  /**
   *
   * @returns {Promise<any>}
   */
  stopScan() {
    return new Promise((resolve, reject) => {
      window.ble.stopScan(resolve, reject)
    })
  }

  /**
   *
   * @returns {Promise<boolean>}
   */
  isEnabled() {
    return new Promise((resolve) => {
      window.ble.isEnabled(() => resolve(true), () => resolve(false))
    })
  }

  /**
   *
   * @param {Object} device
   * @param {string} serviceId
   * @param {string} charId
   * @param {ArrayBuffer} value
   * @returns {Promise<any>}
   */
  writeWithoutResponse(device, serviceId, charId, value) {
    return new Promise((resolve, reject) => {
      window.ble.writeWithoutResponse(device.id, serviceId, charId, value, resolve, reject)
    })
  }

  /**
   *
   * @param {Object} device
   * @param {string} serviceId
   * @param {string} charId
   * @param {ArrayBuffer} value
   * @returns {Promise<any>}
   */
  write(device, serviceId, charId, value) {
    return new Promise((resolve, reject) => {
      window.ble.write(device.id, serviceId, charId, value, resolve, reject)
    })
  }

  /**
   *
   * @param {Object} device
   * @param {string} serviceId
   * @param {string} charId
   * @param {Function} success
   * @param {Function} [failure]
   * @returns {void}
   */
  startNotification(device, serviceId, charId, success, failure) {
    window.ble.startNotification(device.id, serviceId, charId, success, failure)
  }

  /**
   *
   * @param {Object} device
   * @param {string} serviceId
   * @param {string} charId
   * @returns {Promise<any>}
   */
  stopNotification(device, serviceId, charId) {
    return new Promise((resolve, reject) => {
      window.ble.stopNotification(device.id, serviceId, charId, resolve, reject)
    })
  }
}

export default Bluetooth