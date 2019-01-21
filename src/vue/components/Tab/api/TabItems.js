
class TabItems {
  constructor() {
    this.items = []
  }

  /**
   *
   * @param {TabItem} value
   * @returns {TabItems}
   */
  pushItem(value) {
    this.items.push(value)
    return this
  }

  /**
   *
   * @param {string} componentName
   * @returns {TabItems}
   */
  openTab(componentName) {
    for (const tab of this.items) {
      tab.active(tab.componentName === componentName)
    }
    return this
  }

  /**
   *
   * @returns {TabItem|?}
   */
  getActiveTab() {
    for (const tab of this.items) {
      if (tab.isActive) {
        return tab
      }
    }
    return null
  }
}

export default TabItems