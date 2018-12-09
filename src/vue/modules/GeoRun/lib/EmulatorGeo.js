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
     * @type {boolean}
     */
    this.emulator = true

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
     * @type {Array.<{lat: number, lng: number, time: number}>}
     */
    this.emulatedPoints = [
      {"lat": 53.9180685, "lng": 27.4590922, "time": 1544129215154, "speed": 0},
      {"lat": 53.9180676, "lng": 27.4590988, "time": 1544129216203, "speed": 0},
      {"lat": 53.9180667, "lng": 27.4591064, "time": 1544129217198, "speed": 0},
      {"lat": 53.9180661, "lng": 27.4591136, "time": 1544129218200, "speed": 0},
      {"lat": 53.9180652, "lng": 27.4591221, "time": 1544129219223, "speed": 0},
      {"lat": 53.9180647, "lng": 27.4591282, "time": 1544129220174, "speed": 0},
      {"lat": 53.9180644, "lng": 27.4591319, "time": 1544129221195, "speed": 0},
      {"lat": 53.9180641, "lng": 27.4591348, "time": 1544129222177, "speed": 0},
      {"lat": 53.9180638, "lng": 27.4591375, "time": 1544129223198, "speed": 0}
    ]

    /**
     *
     * @type {number}
     */
    this.index = 0
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  tick() {
    if (this.emulatedPoints[this.index]) {
      this.addPosition(this.emulatedPoints[this.index])
      this.index++
    } else {
      const lastDistance = this.getCurrentDistance()
      this.addPosition({
        "lat": lastDistance.lastPoint.position.lat + 0.0000195,
        "lng": lastDistance.lastPoint.position.lng + 0.0000217,
        "time": lastDistance.lastPoint.position.time + 1000,
        "speed": 0
      })
    }
    return this
  }

  /**
   *
   * @param {onErrorCallback} onError
   * @returns {EmulatorGeo}
   */
  start(onError) {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(() => this.tick(), this.timeInterval)
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  stop() {
    this.index = 0
    clearInterval(this.intervalId)
    return this
  }
}

export default EmulatorGeo