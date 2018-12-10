import uuid from 'uuid/v4'

class TabItem {
  /**
   *
   * @param {string|number} slotName
   * @param {string|?} [name]
   * @param {boolean} [isActive]
   */
  constructor(slotName, name = null, isActive = false) {
    /**
     * @type {string}
     */
    this.slotName = slotName || uuid()

    /**
     *
     * @type {string}
     */
    this.name = name || this.slotName

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