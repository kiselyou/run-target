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
     * @type {{enableHighAccuracy: boolean, timeout: number}}
     */
    this.options = { enableHighAccuracy: true, timeout: 30000 }
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
   * Текущий темп.
   *
   * @returns {number}
   */
  get tempo() {
    const speed = this.speed
    return speed ? 60 / speed : 0
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
        this.addPosition(position)
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
  end() {
    this.stop()
    this.distances.splice(0)
    return this
  }
}

export default Geo