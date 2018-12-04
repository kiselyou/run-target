
class PointPosition {
  constructor(position) {
    /**
     *
     * @type {{latitude: number, longitude: number}}
     */
    this.coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }

    /**
     * @type {number}
     */
    this.timestamp = position.timestamp
  }
}

export default PointPosition