import Distance from './Distance'
import Signal from './Signal'
import Timer from '@lib/Timer'

class Geo {
  constructor() {
    /**
     *
     * @type {Array.<Distance>}
     */
    this.distances = []

    /**
     *
     * @type {{enableHighAccuracy: boolean, timeout: number}}
     */
    this.options = { enableHighAccuracy: true, timeout: 30000 }

    /**
     *
     * @type {Signal}
     */
    this.signal = new Signal()

    /**
     *
     * @type {number}
     */
    this.dateTimeStart = 0

    /**
     *
     * @type {number}
     */
    this.dateTimeStop = 0

    /**
     *
     * @type {string|?}
     * @private
     */
    this._watchID = null

    /**
     *
     * @type {Timer}
     */
    this.timer = new Timer()
  }

  /**
   * Скорость объекта. Расчет по длине всей дистанции.
   *
   * @returns {number}
   */
  get avgSpeed() {
    const distance = this.getCurrentDistance()
    return distance ? distance.avgSpeed : 0
  }

  /**
   * Скорость объекта. Расчет по последним n точкам
   *
   * @returns {number}
   */
  getAvgSpeedByLastPoints(pointsCount) {
    const distance = this.getCurrentDistance()
    return distance ? distance.getAvgSpeedByLastPoints(pointsCount) : 0
  }

  /**
   * Текущий темп.
   *
   * @returns {number}
   */
  getTempo() {
    const distance = this.getCurrentDistance()
    if (distance && distance.pathLength > 0) {
      return distance.time / distance.pathLength * 1000
    }
    return 0
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
   * @param {{lat: number, lng: number, elapsedTime: number}} value
   * @returns {Geo}
   */
  addPosition(value) {
    if (this.distances.length === 0) {
      this.dateTimeStart = Date.now()
    }
    this.dateTimeStop = Date.now()
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
      if (distances.number === distanceNumber) {
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
   * @param {onErrorCallback} [onError]
   * @returns {Geo}
   */
  start(onError) {
    if (this._watchID) {
      return this
    }

    this.timer.start()
    this._watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.addPosition({
          lat: position['coords']['latitude'],
          lng: position['coords']['longitude'],
          elapsedTime: this.timer.time,
          position: {
            timestamp: position['timestamp'],
            coords: {
              latitude: position['coords']['latitude'],
              longitude: position['coords']['longitude'],
              altitude: position['coords']['altitude'],
              accuracy: position['coords']['accuracy'],
              altitudeAccuracy: position['coords']['altitudeAccuracy'],
              heading : position['coords']['heading'],
              speed : position['coords']['speed']
            }
          },
        })
      },
      (error) => {
        this.stop()
        if (error) {
          onError(error)
        }
      },
      this.options
    )
    return this
  }

  /**
   *
   * @returns {Geo}
   */
  stop() {
    this.timer.stop()
    navigator.geolocation.clearWatch(this._watchID)
    this._watchID = null
    return this
  }

  /**
   *
   * @returns {Geo}
   */
  clear() {
    this.timer.clear()
    this.distances.splice(0)
    this._watchID = null
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
      dateTimeStart: this.dateTimeStart,
      dateTimeStop: this.dateTimeStop,
      distances: distances,
    }
  }
}

export default Geo