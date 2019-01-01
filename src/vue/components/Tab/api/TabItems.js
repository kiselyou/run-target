
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

  /**
   *
   * @param {string} componentName
   */
  openTab(componentName) {
    for (const tab of this) {
      tab.active(tab.componentName === componentName)
    }
  }
}

export default TabItems