import Geo from './Geo'

class EmulatorGeo extends Geo {
  /**
   *
   * @param {number} [timeInterval]
   */
  constructor(timeInterval = 1000) {
    super()

    /**
     *
     * @type {number}
     */
    this.timeInterval = timeInterval

    /**
     *
     * @type {null}
     */
    this.intervalId = null

    /**
     *
     * @type {{timestamp: number, coords: {latitude: number, longitude: number}}}
     */
    this.startOptions = {
      timestamp: 1542662430374,
      coords: {
        latitude: 55.456000,
        longitude: 27.567000
      }
    }
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  tick() {
    this.startOptions.coords.latitude += 0.0000195
    this.startOptions.coords.longitude += 0.0000217
    this.addPosition({
      timestamp: Date.now(),
      coords: {
        latitude: this.startOptions.coords.latitude,
        longitude: this.startOptions.coords.longitude
      }
    })
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  clear() {
    clearInterval(this.intervalId)
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  start() {
    this.clear()
    this.intervalId = setInterval(() => this.tick(), this.timeInterval)
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  stop() {
    this.clear()
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  end() {
    this.clear()
    this.distances.splice(0)
    return this
  }
}

export default EmulatorGeo