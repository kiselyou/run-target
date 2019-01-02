import Timer from '../Timer'
import Distance from './Distance'
import GeoLocation from './GeoLocation'

class Geo {
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
    this.pauseTimeData = { timeStart: 0, timeEnd: 0 }
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
    return Math.floor(this.getPathLength() / 1000)
  }

  /**
   *
   * @returns {Geo}
   */
  listen() {
    this.geoLocation.addEventListener('onTick', (position) => {
      let pauseTime = this.pauseTimeData.timeEnd - this.pauseTimeData.timeStart
      if (pauseTime > 0) {
        this.pauseTimeData.timeStart = 0
        this.pauseTimeData.timeEnd = 0
      } else {
        pauseTime = 0
      }
      this.addPosition({
        pauseTime: pauseTime,
        time: position.time,
        latitude: position.latitude,
        longitude: position.longitude,
        accuracy: position.accuracy,
        altitude: position.altitude,
      })
    })
    return this
  }

  /**
   *
   * @returns {Geo}
   */
  start() {
    if (this.pauseTimeData.timeStart > 0) {
      this.pauseTimeData.timeEnd = Date.now()
    }
    this.timer.start()
    this.geoLocation.start()
    return this
  }

  /**
   *
   * @returns {Geo}
   */
  stop() {
    this.pauseTimeData.timeStart = Date.now()
    this.timer.stop()
    this.geoLocation.pause()
    return this
  }

  /**
   *
   * @returns {Geo}
   */
  clear() {
    this.timer.clear()
    this.geoLocation.stop()
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
      dateTimeStart: this.dateTimeStart,
      dateTimeStop: this.dateTimeStop,
      distances: distances,
    }
  }
}

export default Geo