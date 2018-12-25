import assert from 'assert'
import Point from '../Point'

describe('Point', function() {

  const positionA = {
    "coords": {
      "speed": 1.3303383588790894,
      "heading": 5,
      "accuracy": 3,
      "altitude": 257,
      "latitude": 53.9158529,
      "longitude": 27.4951925,
      "altitudeAccuracy": null
    },
    "timestamp": 1545636358000
  }

  const positionB = {
    "coords": {
      "speed": 1.2319902181625366,
      "heading": 15,
      "accuracy": 3,
      "altitude": 257,
      "latitude": 53.915863,
      "longitude": 27.4952011,
      "altitudeAccuracy": null
    },
    "timestamp": 1545636359000,
    "pauseTime": 450
  }

  it('should return correct data', function () {
    const pointA = new Point(positionA, null)
    assert.strictEqual(pointA.time, 0, 'time')
    assert.strictEqual(pointA.speed, 0, 'speed')
    assert.strictEqual(pointA.distance, 0, 'distance')

    const pointB = new Point(positionB, pointA)
    assert.strictEqual(pointB.time, 0.55, 'time')// - 450 milliseconds of pause
    assert.strictEqual(pointB.speed, 8.2355, 'speed')
    assert.strictEqual(pointB.distance, 1.2582, 'distance')

    const serialize = {
      id: null,
      uKey: 2,
      time: 0.55,
      speed: 8.2355,
      distance: 1.2582,
      position: [ 1545636359000, 53.915863, 27.4952011, 3, 257, null, 450 ],
      prevUKey: 1
    }
    assert.deepStrictEqual(pointB.serialize(), serialize, 'serialize')

  })
})