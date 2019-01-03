import BgMode from './BgMode'
import Device from './Device'
import Diagnostic from './Diagnostic'
import BgGeoLocation from './BgGeoLocation'

const debug = false
let bgMode = null
let device = null
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

  /**
   *
   * @returns {Device}
   */
  static get device() {
    return device || (device = new Device(debug))
  }
}

export default Plugins