import Distance from './Distance'

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
     * @type {Error|?}
     */
    this.error = null

    /**
     *
     * @type {{enableHighAccuracy: boolean, maximumAge: number, timeout: number}}
     */
    this.options = { enableHighAccuracy: true, maximumAge: 3000, timeout: 30000 }
  }

  /**
   * Текущая скорость.
   *
   * @returns {number}
   */
  get speed() {
    const distance = this.lastDistance
    if (distance) {
      return distance.speed
    }
    return 0
  }

  /**
   * Длина всей дистанции.
   *
   * @returns {number}
   */
  get pathLength() {
    let pathLength = 0
    for (const distance of this.distances) {
      pathLength += distance.pathLength
    }
    return pathLength
  }

  /**
   * Дистанция это объект который содеожит информацию за один километр.
   *
   * @returns {Distance|?}
   */
  get lastDistance() {
    return this.distances.length > 0 ? this.distances[this.distances.length - 1] : null
  }

  /**
   * Добавление точки.
   *
   * @param {Object} value
   * @returns {Geo}
   */
  addPosition(value) {
    const distanceNumber = this.prepareDistanceNumber()
    let distance = this.getDistanceByNumber(distanceNumber)
    if (!distance) {
      distance = new Distance(distanceNumber, this.lastDistance)
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
  prepareDistanceNumber() {
    return Math.floor(this.pathLength / 1000)
  }

  /**
   *
   * @param {Error} error
   * @returns {void}
   */
  onError(error) {
    this.error = error
  }

  /**
   *
   * @returns {Geo}
   */
  start() {
    this.watchID = navigator.geolocation.watchPosition(this.addPosition, this.onError, this.options)
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
    this.stop()
    this.distances.splice(0)
    return this
  }

  /**
   *
   * @returns {boolean}
   */
  isEnabled() {
    return Boolean(this.watchID)
  }
}

export default Geo