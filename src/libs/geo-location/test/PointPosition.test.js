import assert from 'assert'
import PointPosition from '../PointPosition'

describe('PointPosition', function() {

  const position = {
    "coords": {
      "speed": 1.2319902181625366,
      "heading": 15,
      "accuracy": 3,
      "altitude": 257,
      "latitude": 53.915863,
      "longitude": 27.4952011,
      "altitudeAccuracy": null
    },
    "timestamp": 1545636359000 // This value is not using. Set second argument in class PointPosition instead.
  }

  it('should return correct property values', function () {
    const point = new PointPosition(position)
    validationProperties(point)
  })

  it('should restore from JSON string', function () {
    const point = new PointPosition(position)
    const strJSON = point.toJSON()

    const restoredPoint = new PointPosition().fromJSON(strJSON)
    validationProperties(restoredPoint)
  })
})

function validationProperties(point) {
  assert.strictEqual(point.timestamp, 1545636359000)
  assert.strictEqual(point.accuracy, 3)

  assert.strictEqual(point.latitude, 53.915863)
  assert.strictEqual(point.lat, 53.915863)

  assert.strictEqual(point.longitude, 27.4952011)
  assert.strictEqual(point.lng, 27.4952011)

  assert.strictEqual(point.altitude, 257)
  assert.strictEqual(point.altitudeAccuracy, null)

  assert.strictEqual(point.pauseTime, 0)
}