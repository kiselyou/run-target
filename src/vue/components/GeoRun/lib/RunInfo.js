import Point from './Point'
import Distance from './Distance'

class RunInfo {
  constructor() {
    /**
     *
     * @type {Array.<Distance>}
     */
    this.distances = []

    /**
     *
     * @type {number}
     */
    this.totalDistance = 0

    /**
     *
     * @type {number}
     */
    this.currentSpeed = 0
  }

  /**
   *
   * @param {Object} value
   * @returns {RunInfo}
   */
  addPosition(value) {
    const distanceNumber = this.distanceNumber
    let distance = this.getDistanceByNumber(distanceNumber)
    if (!distance) {
      distance = new Distance(distanceNumber, this.lastDistance)
    }

    distance.addPosition(value)
    this.currentSpeed = distance.speed
    this.totalDistance += distance.distance
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
   *
   * @returns {Point|?}
   */
  get lastDistance() {
    const distances = this.distances
    return distances.length > 0 ? distances[distances.length - 1] : null
  }

  /**
   *
   * @returns {number}
   */
  get distanceNumber() {
    return Math.floor(this.totalDistance / 1000)
  }
}

export default RunInfo