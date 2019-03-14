import crypto from 'browserify-aes'
import Bluetooth from './Bluetooth'

class BluetoothMiBand extends Bluetooth {
  constructor() {
    super()

    /**
     *
     * @type {Buffer}
     */
    this.key = new Buffer('30313233343536373839404142434445', 'hex')

    /**
     *
     * @type {string}
     */
    this.name = 'MI Band 2'

    /**
     *
     * @type {number}
     */
    this.waitApproveMax = 15000
  }

  /**
   *
   * @param {string} x
   * @returns {string}
   */
  uuidBase(x) {
    return `0000${x}-0000-3512-2118-0009af100700`
  }

  /**
   *
   * @returns {ArrayBuffer}
   */
  toArrayBuffer() {
    let args = [...arguments]

    // Convert all arrays to buffers
    args = args.map(function(i) {
      if (i instanceof Array) {
        return Buffer.from(i)
      }
      return i
    })

    // Merge into a single buffer
    let buf = Buffer.concat(args)

    // Convert into ArrayBuffer
    let ab = new ArrayBuffer(buf.length)
    let view = new Uint8Array(ab)
    for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i]
    }
    return ab
  }

  /**
   *
   * @param {Object} device
   * @param {{ gender: (0|1|2), height: number, weight: number, id: number, date: { year: number, month: number, day: number } }} userInfo
   * @returns {Promise<any>}
   */
  writeUserInfo(device, userInfo) {
    return new Promise((resolve, reject) => {
      const data = new Buffer(16)
      data.writeUInt8(0x4f, 0)

      data.writeUInt16LE(userInfo.date.year, 3)
      data.writeUInt8(userInfo.date.month, 5)
      data.writeUInt8(userInfo.date.day, 6)
      data.writeUInt8(userInfo.gender, 7)
      data.writeUInt16LE(userInfo.height, 8)
      data.writeUInt16LE(userInfo.weight, 10)
      data.writeUInt32LE(userInfo.id, 12)

      this.write(device, 'fee0', this.uuidBase('0008'), this.toArrayBuffer(data))
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   *
   * @param {string} name - UUID or MAC address of the peripheral
   * @returns {Promise<Object|?>}
   */
  async detectDevice(name) {
    const devices = await this.startScan()
    const filteredDevices = this.filterDevices(devices, name)
    for (const device of filteredDevices) {
      const deviceData = await this.connect(device)
      const isApproved = await this.approveDevice(deviceData)
      await this.disconnect(device)
      if (isApproved) {
        return device
      }
    }
    return null
  }

  /**
   *
   * @param {Object} deviceData
   * @returns {Promise<boolean>}
   */
  approveDevice(deviceData) {
    return new Promise(async (resolve, reject) => {
      this.startNotification(deviceData, 'fee1', this.uuidBase('0009'),
        async (buffer) => {
          const value = Buffer.from(buffer)
          const cmd = value.slice(0, 3).toString('hex')
          console.log('----', cmd)
          switch (cmd) {
            case '100101':
              resolve(true)
              break
            default:
              reject(new Error('Unhandled auth response'))
          }
        },
        reject
      )

      this.writeWithoutResponse(deviceData, 'fee1', this.uuidBase('0009'), this.toArrayBuffer([0x01, 0x08], this.key))
        .catch(reject)

      setTimeout(() => resolve(false), this.waitApproveMax)
    })
  }

  /**
   *
   * @param {Array} devices
   * @param {string} name
   * @returns {Array}
   */
  filterDevices(devices, name) {
    return devices.filter((device) => {
      return device.name === name || device.id === name
    })
  }

  /**
   *
   * @param {Object} device
   * @returns {Promise<boolean>}
   */
  auth(device) {
    return new Promise((resolve, reject) => {
      this.startNotification(device, 'fee1', this.uuidBase('0009'),
        (buffer) => {
          const value = Buffer.from(buffer)
          const cmd = value.slice(0,3).toString('hex')
          console.log('++++', cmd)
          switch (cmd) {
            case '100201':
              let rdn = value.slice(3)
              const cipher = crypto.createCipheriv('aes-128-ecb', this.key, '').setAutoPadding(false)
              const encrypted = Buffer.concat([cipher.update(rdn), cipher.final()])
              this.writeWithoutResponse(device, 'fee1', this.uuidBase('0009'), this.toArrayBuffer([0x03, 0x08], encrypted))
                .catch(reject)
              break
            case '100301':
              resolve(true)
              break
            case '100304':
              this.writeWithoutResponse(device, 'fee1', this.uuidBase('0009'), this.toArrayBuffer([0x01, 0x08], this.key))
                .catch(reject)
              break
            default:
              reject(new Error('Unhandled auth response'))
          }
        },
        reject
      )
console.log(1111)
      this.writeWithoutResponse(device, 'fee1', this.uuidBase('0009'), this.toArrayBuffer([0x02, 0x08]))
        .catch(reject)
      console.log(2222)
    })
  }

  /**
   *
   * @param {Object} device
   * @param {Function} onSuccess
   * @param {Function} [onError]
   * @returns {void}
   */
  startListenHRM(device, onSuccess, onError) {
    this._prepareListenHRM(device).then(() => {
      this.startNotification(device, '180d', '2a37',
        (buffer) => {
          const value = Buffer.from(buffer)
          let rate = value.readUInt16BE(0)
          onSuccess(rate)
        },
        onError
      )
    })
  }

  /**
   *
   * @param {Object} device
   * @param {Function} onSuccess
   * @param {Function} [onError]
   * @returns {void}
   */
  stoptListenHRM(device, onSuccess, onError) {
    this.stopNotification(device).then(onSuccess).catch(onError)
  }

  /**
   *
   * @param {Object} device
   * @returns {Promise<void>}
   * @private
   */
  async _prepareListenHRM(device) {
    // To turn off the current heart monitor measurement.
    await this.write(device, '180d', '2a39', this.toArrayBuffer([0x15, 0x02, 0x00]))
    await this.write(device, '180d', '2a39', this.toArrayBuffer([0x15, 0x01, 0x00]))

    // Enabling Gyroscope and Heart raw data by sending a command to SENS
    await this.writeWithoutResponse(device, 'fee0', this.uuidBase('0001'), this.toArrayBuffer([0x01, 0x03, 0x19]))

    // Start continuous heart measurements by sending a request to HMC
    await this.write(device, '180d', '2a39', this.toArrayBuffer([0x15, 0x01, 0x01]))

    // Sending command to SENS \x02 (don’t know why this is need)
    await this.writeWithoutResponse(device, 'fee0', this.uuidBase('0001'), this.toArrayBuffer([0x02]))

    // Then while getting notifications, every 12 seconds we need to send a ping with the value \x16 to the HCM
    this._pingHRM(device)
  }

  /**
   *
   * @param {Object} device
   * @returns {void}
   * @private
   */
  _pingHRM(device) {
    const intervalId = setInterval(() => {
      if (this.isConnected) {
        this.write(device, '180d', '2a39', this.toArrayBuffer([0x16]))
          .catch(console.error)
        return
      }
      clearInterval(intervalId)
    }, 12000)
  }
}

export default BluetoothMiBand