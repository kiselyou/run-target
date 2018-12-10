
class TabItems extends Array {
  constructor() {
    super()
  }

  /**
   *
   * @param {TabItem} value
   * @returns {TabItems}
   */
  pushItem(value) {
    this.push(value)
    return this
  }
}

export default TabItems