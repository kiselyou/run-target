
class Week {
  constructor() {
    /**
     *
     * @type {Array.<DayRun>}
     */
    this.days = []
  }

  /**
   *
   * @param {DayRun} day
   * @returns {Week}
   */
  addDay(day) {
    this.days.push(day)
    return this
  }

  /**
   *
   * @returns {Date|?}
   */
  get lastDate() {
    return this.days[6] ? this.days[6]['date'] : null
  }
}

export default Week