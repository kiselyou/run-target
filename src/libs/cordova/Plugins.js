import BgMode from './BgMode'
import Diagnostic from './Diagnostic'

const debug = false
let bgMode = null
let diagnostic = null

class Plugins {

  /**
   *
   * @returns {BgMode}
   */
  static get bgMode() {
    return bgMode || (bgMode = new BgMode(debug))
  }

  /**
   *
   * @returns {Diagnostic}
   */
  static get diagnostic() {
    return diagnostic || (diagnostic = new Diagnostic(debug))
  }
}

export default Plugins