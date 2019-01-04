import BgMode from './BgMode'
import Device from './Device'
import Vibration from './Vibration'
import Diagnostic from './Diagnostic'
import BgGeoLocation from './BgGeoLocation'

const debug = false
let bgMode = null
let device = null
let vibration = null
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

  /**
   *
   * @returns {Vibration}
   */
  static get vibration() {
    return vibration || (vibration = new Vibration(debug))
  }
}

export default Plugins