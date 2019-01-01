import GeoLocation from '@lib/location/GeoLocation';

class Signal {
  /**
   *
   * @param {boolean} [debug]
   */
  constructor(debug = false) {
    /**
     * The value from 0 to 100. Then more value then better.
     *
     * @type {number}
     */
    this.value = 0

    /**
     *
     * @type {GeoLocation}
     */
    this.geoLocation = new GeoLocation(debug)

    /**
     *
     * @type {Array}
     */
    this.accuracyPercent = [[5, 0, 4], [4, 4, 10], [3, 10, 15], [2, 15, 20], [1, 20, 40]]
  }

  /**
   *
   * @returns {void}
   */
  listen() {
    this.geoLocation.addEventListener('onTick', (position) => {
      for (const item of this.accuracyPercent) {
        if (position.accuracy >= item[1] && position.accuracy < item[2]) {
          this.value = item[0]
          return
        }
      }
      this.value = 0
    })
    this.geoLocation.addEventListener('onError', () => {
      this.value = 0
    })
    this.geoLocation.start()
  }
}

export default Signal