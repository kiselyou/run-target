import Distance from './Distance'
import objectPath from 'object-path'

class Geo {
  constructor() {
    /**
     *
     * @type {Array.<Distance>}
     */
    this.distances = []

    /**
     *
     * @type {string|?}
     */
    this.watchID = null

    /**
     *
     * @type {{enableHighAccuracy: boolean, timeout: number}}
     */
    this.options = { enableHighAccuracy: true, timeout: 30000 }

    /**
     *
     * @type {boolean}
     */
    this.signalLevelPause = false
  }

  /**
   * @typedef Layer
   * @property {number} value
   * @property {number} code
   * @property {string} message
   */

  /**
   *
   * @returns {Promise<Layer>}
   */
  detectSignalLevel() {
    let time = Date.now()
    const timeout = 3000
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => {
          const timeDiff = Date.now() - time
          const value = 100 - (timeDiff * 100 / timeout)
          resolve({ value, code: 0, message: 'Success' })
        },
        (error) => {
          resolve({ value: 0, code: error.code, message: error.message })
        },
        { enableHighAccuracy: true, timeout }
      );
    })
  }

  /**
   * @param {Layer} signal
   * @callback signalLevelCallback
   */

  /**
   *
   * @param callback
   */
  listenSignalLevel(callback) {
    if (this.signalLevelPause) {
      setTimeout(() => this.listenSignalLevel(callback), 2000)
      return
    }
    this.detectSignalLevel().then((signal) => {
      callback(signal)
      setTimeout(() => this.listenSignalLevel(callback), 2000)
    })
  }

  /**
   * Скорость объекта на момент добавления точки.
   * Расчитывается между текущей точкой и предыдущей.
   *
   * @returns {number}
   */
  get speed() {
    const distance = this.getCurrentDistance()
    return distance ? distance.speed : 0
  }

  /**
   * Скорость объекта. Расчет по последним 10 точкам
   *
   * @returns {number}
   */
  getAvgSpeed() {
    const distance = this.getCurrentDistance()
    return distance ? distance.getAvgSpeed(10) : 0
  }

  /**
   * Текущий темп.
   *
   * @returns {number}
   */
  getTempo() {
    const speed = this.getAvgSpeed()
    return speed ? 60 / speed : 0
  }

  /**
   * Длина (сумма длин всех) всех дистанций.
   *
   * @returns {number}
   */
  getPathLengthFull() {
    let pathLength = 0
    for (const distance of this.distances) {
      pathLength += distance.pathLength
    }
    return pathLength
  }

  /**
   * Длина текущей дистанции (текущего километра).
   *
   * @returns {number}
   */
  getPathLengthCurrent() {
    const distance = this.getCurrentDistance()
    return distance ? distance.pathLength : 0
  }

  /**
   * Текущая дистанция.
   *
   * @returns {Distance|?}
   */
  getCurrentDistance() {
    return this.distances.length > 0 ? this.distances[this.distances.length - 1] : null
  }

  /**
   * Добавление точки.
   *
   * @param {{lat: number, lng: number, [time]: number}} value
   * @returns {Geo}
   */
  addPosition(value) {
    const distanceNumber = this.getDistanceNumber()
    let distance = this.getDistanceByNumber(distanceNumber)
    if (!distance) {
      distance = new Distance(distanceNumber, this.getCurrentDistance())
      this.distances.push(distance)
    }
    distance.addPosition(value)
    return this
  }

  /**
   *
   * @param {number} distanceNumber
   * @returns {Distance|?}
   */
  getDistanceByNumber(distanceNumber) {
    for (const distances of this.distances) {
      if (distances.distanceNumber === distanceNumber) {
        return distances
      }
    }
    return null
  }

  /**
   * Значение от 0 и выше. Где 0 - это первые километр, 1 - это второй километр и т.д.
   *
   * @returns {number}
   */
  getDistanceNumber() {
    return Math.floor(this.getPathLengthFull() / 1000)
  }

  /**
   * @param {PositionError} error
   * @callback onErrorCallback
   */

  /**
   * @callback onSuccessCallback
   */

  /**
   *
   * @param {onSuccessCallback} onSuccess
   * @param {onErrorCallback} onError
   * @returns {Geo}
   */
  start(onSuccess, onError) {
    if (this.watchID) {
      return this
    }
    let isSuccess = false
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        if (!isSuccess) {
          onSuccess()
          isSuccess = true
        }

        this.addPosition({
          lat: position['coords']['latitude'],
          lng: position['coords']['longitude'],
          speed: position['coords']['speed'],
          time: Date.now()
        })
      },
      (error) => onError(error),
      this.options
    )
    return this
  }

  /**
   *
   * @returns {Geo}
   */
  stop() {
    navigator.geolocation.clearWatch(this.watchID)
    this.watchID = null
    return this
  }

  /**
   *
   * @returns {Geo}
   */
  clear() {
    this.distances.splice(0)
    return this
  }

  /**
   *
   * @returns {Object}
   */
  serialize() {
    const distances = []
    for (const distance of this.distances) {
      distances.push(distance.serialize())
    }
    return {
      distances: distances
    }
  }
}

export default Geo