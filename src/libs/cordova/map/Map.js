import objectPath from 'object-path'

class Map {
  constructor(elementId) {
    /**
     *
     * @type {HTMLElement}
     */
    this.element = document.body.querySelector(elementId)
  }

  init(points, onDone) {
    const lib = objectPath.get(window, ['plugin', 'google', 'maps', 'Map'])
    if (!lib) {
      return
    }

    if (!lib) {
      console.warn('Map is not supported here.')
      return
    }

    const cameraOptions = {
      target: points,
      zoom: 10,
      tilt: 10,
      bearing: 140,
      duration: 2500
    }
    const map = lib.getMap(this.element)
    map.animateCamera(cameraOptions, (status) => {
      if (onDone) {
        onDone(status)
      }
    })

    map.addPolyline({
      points,
      color : '#0099FF',
      width: 3,
      geodesic: true,
    })
  }
}

export default Map