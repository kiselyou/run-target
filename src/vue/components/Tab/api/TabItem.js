import uuid from 'uuid/v4'

class TabItem {
  /**
   *
   * @param {string|number|?} componentName
   * @param {string|?} [name]
   * @param {boolean} [isActive]
   */
  constructor(componentName, name = null, isActive = false) {
    /**
     * @type {string|number|?}
     */
    this.componentName = componentName

    /**
     *
     * @type {string}
     */
    this.name = name || this.componentName

    /**
     *
     * @type {boolean}
     */
    this.isActive = isActive

    /**
     *
     * @type {boolean}
     */
    this.isDisabled = false

    /**
     * @type {string}
     */
    this.uuid = uuid()

    /**
     *
     * @type {boolean}
     */
    this.keep = false
  }

  /**
   *
   * @param {boolean} [value]
   * @returns {TabItem}
   */
  keepAlive(value = true) {
    this.keep = value
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {TabItem}
   */
  disable(value) {
    this.isDisabled = value
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {TabItem}
   */
  active(value) {
    this.isActive = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {TabItem}
   */
  setName(value) {
    this.name = value
    return this
  }

  /**
   *
   * @returns {TabItem}
   */
  updateUUID() {
    this.uuid = uuid()
    return this
  }
}

export default TabItem