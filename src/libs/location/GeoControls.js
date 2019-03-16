import Timer from '../Timer'
import Distance from './Distance'
import GeoLocation from './GeoLocation'

class GeoControls {
  /**
   *
   * @param {boolean} debug
   */
  constructor(debug = false) {

    /**
     *
     * @type {Array.<Distance>}
     */
    this.distances = []

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
     * @type {Timer}
     */
    this.timer = new Timer()

    /**
     *
     * @type {GeoLocation}
     */
    this.geoLocation = new GeoLocation(debug)

    /**
     *
     * @type {{timeStart: number, timeEnd: number}}
     */
    this.pauseGeoLocation = { timeStart: 0, timeEnd: 0 }

    /**
     *
     * @type {string}
     */
    this.status = GeoControls.STATUS_DISABLED

    /**
     *
     * @type {Object}
     * @private
     */
    this._events = { changeDistance: [] }

    /**
     *
     * @type {{geoListener: Function|?}}
     * @private
     */
    this._cache = { geoListener: null }

    /**
     *
     * @type {number}
     * @private
     */
    this._hrm = 0
  }

  /**
   *
   * @param {number} rate
   * @returns {GeoControls}
   */
  setHRMValue(rate) {
    this._hrm = rate
    return this
  }

  /**
   *
   * @param {string} eventName
   * @param {Function} callback
   * @returns {GeoControls}
   */
  addEventListener(eventName, callback) {
    switch (eventName) {
      case 'change-distance':
        this._events.changeDistance.push(callback)
        break;
    }
    return this
  }

  /**
   *
   * @param {string} eventName
   * @param {Function} callback
   * @returns {GeoControls}
   */
  deleteEventListener(eventName, callback) {
    let events = []
    switch (eventName) {
      case 'change-distance':
        events = this._events.changeDistance
        break;
    }
    for (let i = 0; i < events.length; i++) {
      if (events[i] === callback) {
        events.splice(i, 1)
        break
      }
    }
    return this
  }

  /**
   * Avg speed by 10 last points.
   *
   * @returns {number}
   */
  get avgSpeed() {
    const distance = this.getCurrentDistance()
    return distance ? distance.avgSpeed : 0
  }

  /**
   * Get current speed. Calculate by (n) last points.
   *
   * @returns {number}
   */
  getAvgSpeed(pointsCount) {
    const distance = this.getCurrentDistance()
    return distance ? distance.getAvgSpeed(pointsCount) : 0
  }

  /**
   *
   * @returns {number}
   */
  getTempo() {
    const distance = this.getCurrentDistance()
    if (distance && distance.pathLength > 0) {
      return distance.elapsedTime / distance.pathLength * 1000
    }
    return 0
  }

  /**
   * Длина (сумма длин всех) всех дистанций.
   *
   * @returns {number}
   */
  getPathLength() {
    let pathLength = 0
    for (const distance of this.distances) {
      pathLength += distance.pathLength
    }
    return pathLength
  }

  /**
   *
   * @returns {Distance|?}
   */
  getCurrentDistance() {
    return this.distances.length > 0 ? this.distances[this.distances.length - 1] : null
  }

  /**
   *
   * @param {{lat: number, lng: number, elapsedTime: number}} value
   * @returns {GeoControls}
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
      for (const callback of this._events.changeDistance) {
        callback(distance, this.distances)
      }
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
    return Math.floor(this.getPathLength() / 1000)
  }

  /**
   * @param {Object} position
   * @callback geoListener
   */

  /**
   * Добавить событие для получение координат геолокации.
   *
   * @param {geoListener} callback
   * @returns {GeoControls}
   */
  addGeoListener(callback) {
    this.geoLocation.addEventListener('onTick', callback)
    return this
  }

  /**
   * Удалить событие получения координат геолокации.
   *
   * @param {geoListener} callback
   * @returns {GeoControls}
   */
  deleteGeoListener(callback) {
    this.geoLocation.deleteEventListener('onTick', callback)
    return this
  }

  /**
   * Запустить геолокацию и добавить слушатель.
   *
   * @returns {GeoControls}
   */
  enableGeoLocation() {
    if (this._cache.geoListener) {
      return this
    }
    this._cache.geoListener = (position) => {
      if ([GeoControls.STATUS_PAUSED, GeoControls.STATUS_DISABLED].includes(this.status)) {
        return
      }
      let pauseTime = this.pauseGeoLocation.timeEnd - this.pauseGeoLocation.timeStart
      if (pauseTime > 0) {
        this.pauseGeoLocation.timeStart = 0
        this.pauseGeoLocation.timeEnd = 0
      } else {
        pauseTime = 0
      }
      this.addPosition({
        hrm: this._hrm,
        pauseTime: pauseTime,
        time: position.time,
        latitude: position.latitude,
        longitude: position.longitude,
        accuracy: position.accuracy,
        altitude: position.altitude,
      })
    }
    this.addGeoListener(this._cache.geoListener)
    this.geoLocation.start()
    return this
  }

  /**
   * Остоновить геолокацию и удалить слушатель.
   *
   * @returns {GeoControls}
   */
  disableGeoLocation() {
    if (this._cache.geoListener) {
      this.deleteGeoListener(this._cache.geoListener)
      this._cache.geoListener = null
      this.geoLocation.stop()
    }
    return this
  }

  /**
   *
   * @returns {boolean}
   */
  isDisabledGeoLocation() {
    return this.geoLocation.isDisabled()
  }

  /**
   * Запустить слушатель.
   *
   * @returns {GeoControls}
   */
  startGeoListener() {
    if (this.isDisabledGeoLocation()) {
      throw new Error('Before call "startGeoListener()" you should call the method startGeoLocation().')
    }
    this.status = GeoControls.STATUS_PROCESS
    if (this.pauseGeoLocation.timeStart > 0) {
      this.pauseGeoLocation.timeEnd = Date.now()
    }
    this.timer.start()
    return this
  }

  /**
   * Остановить слушатель. (пауза)
   *
   * @returns {GeoControls}
   */
  stopGeoListener() {
    if (this.isDisabledGeoLocation()) {
      throw new Error('You should have enabled GeoLocation before call method "stopGeoListener".')
    }
    this.status = GeoControls.STATUS_PAUSED
    this.pauseGeoLocation.timeStart = Date.now()
    this.timer.stop()
    return this
  }

  /**
   * Остановить слушатель и сбросить в значения по умолчанию. При этом геолокация остается вкючена.
   *
   * @returns {GeoControls}
   */
  clearGeoListener() {
    if (this.isDisabledGeoLocation()) {
      throw new Error('You should have enabled GeoLocation before call method "clearGeoControls". ')
    }
    this.timer.clear()
    this.distances.splice(0)
    this.status = GeoControls.STATUS_DISABLED
    return this
  }

  /**
   *
   * @returns {boolean}
   */
  isDisabledGeoListener() {
    return this.status === GeoControls.STATUS_DISABLED
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

  /**
   *
   * @returns {string}
   */
  static get STATUS_PROCESS() {
    return 'STATUS_PROCESS'
  }

  /**
   *
   * @returns {string}
   */
  static get STATUS_PAUSED() {
    return 'STATUS_PAUSED'
  }

  /**
   *
   * @returns {string}
   */
  static get STATUS_DISABLED() {
    return 'STATUS_DISABLED'
  }
}

export default GeoControls