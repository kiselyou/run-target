import objectPath from 'object-path'

// const webUUID = '62aa612c-a452-4695-b028-313d11dfb53b'
const webUUID = '44aa993fb613c0b6'

class Device {
  constructor() {
    /**
     * @type {Object}
     */
    this.mode = objectPath.get(window, ['device'], null)
  }

  /**
   *
   * @returns {string|?}
   */
  get uuid() {
    return this.mode ? this.mode.uuid : webUUID
  }
}

export default Device