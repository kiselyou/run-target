import uuid from 'uuid/v4'

class TabItem {
  /**
   *
   * @param {string|?} [name]
   * @param {boolean} [isActive]
   */
  constructor(name = null, isActive = false) {
    /**
     *
     * @type {string|?}
     */
    this.name = name

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
    this.key = uuid()
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
}

export default TabItem