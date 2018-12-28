import BgMode from './BgMode'
import Diagnostic from './Diagnostic'
import BgGeoLocation from './BgGeoLocation'

const debug = false
let bgMode = null
let diagnostic = null
let bgGeoLocation = null

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

  /**
   *
   * @returns {BgGeoLocation}
   */
  static get bgGeoLocation() {
    return bgGeoLocation || (bgGeoLocation = new BgGeoLocation(debug))
  }
}

export default Plugins