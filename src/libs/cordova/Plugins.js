import BgMode from './BgMode'

const debug = false
let bgMode = null

class Plugins {

  /**
   *
   * @returns {BgMode}
   */
  static get bgMode() {
    return bgMode || (bgMode = new BgMode(debug))
  }
}

export default Plugins