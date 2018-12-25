import { assert } from 'chai'
import Distance from '../Distance'

describe('Distance', function() {

  it('should find last points', function () {
    const distanceA = new Distance(1, null)
    const pointsA = renderPointsA()
    for (let point of pointsA) {
      distanceA.addPosition(point)
    }

    const lastPointsA = distanceA.findLastPoints(6)
    assert.isArray(lastPointsA)
    assert.lengthOf(lastPointsA, 4)

    const distanceB = new Distance(2, distanceA)
    const pointsB = renderPointsB()
    for (let point of pointsB) {
      distanceB.addPosition(point)
    }

    const lastPointsB = distanceB.findLastPoints(6)
    assert.isArray(lastPointsB)
    assert.lengthOf(lastPointsB, 6)
  })

  it('should calculate avg speed', function () {
    let sum = 0
    const distanceA = new Distance(1, null)
    const pointsA = renderPointsA()

    distanceA.addPosition(pointsA[0])
    assert.strictEqual(distanceA.lastPoint.speed, 0)
    assert.strictEqual(distanceA.avgSpeed, 0)

    distanceA.addPosition(pointsA[1])
    assert.strictEqual(distanceA.lastPoint.speed, 2.2945)
    assert.strictEqual(distanceA.avgSpeed, 2.2945)

    distanceA.addPosition(pointsA[2])
    assert.strictEqual(distanceA.lastPoint.speed, 4.2141)
    assert.strictEqual(distanceA.avgSpeed, 3.2543)

    distanceA.addPosition(pointsA[3])
    assert.strictEqual(distanceA.lastPoint.speed, 3.3495)
    assert.strictEqual(distanceA.avgSpeed, 3.2860333333333336)

    sum = (2.2945 + 4.2141 + 3.3495)
    assert.strictEqual(sum / 3, 3.2860333333333336)

    const distanceB = new Distance(2, distanceA)
    const pointsB = renderPointsB()

    distanceB.addPosition(pointsB[0])
    assert.strictEqual(distanceB.lastPoint.speed, 3.8723)
    assert.strictEqual(distanceB.avgSpeed, 3.4326)

    distanceB.addPosition(pointsB[1])
    assert.strictEqual(distanceB.lastPoint.speed, 4.6545)
    assert.strictEqual(distanceB.avgSpeed, 3.6769799999999995)

    distanceB.addPosition(pointsB[2])
    assert.strictEqual(distanceB.lastPoint.speed, 6.5377)
    assert.strictEqual(distanceB.avgSpeed, 4.153766666666667)

    distanceB.addPosition(pointsB[3])
    assert.strictEqual(distanceB.lastPoint.speed, 4.5295)
    assert.strictEqual(distanceB.avgSpeed, 4.207442857142857)

    sum += 3.8723 + 4.6545 + 6.5377 + 4.5295
    assert.strictEqual(sum / 7, 4.207442857142857)
  })

  it('should has correct calculated property', function () {
    const distanceA = new Distance(1, null)
    const pointsA = renderPointsA()
    for (let point of pointsA) {
      distanceA.addPosition(point)
    }
    assert.strictEqual(distanceA.pathLength, 2.738358)
    assert.strictEqual(distanceA.elapsedTime, 3)

    const distanceB = new Distance(2, distanceA)
    const pointsB = renderPointsB()
    for (let point of pointsB) {
      distanceB.addPosition(point)
    }
    assert.strictEqual(distanceB.pathLength, 5.442767999999999)
    assert.strictEqual(distanceB.elapsedTime, 4)
  })
})

function renderPointsA() {
  return [
    {"coords": {"speed": 1.1603878736495972, "heading": 349, "accuracy": 3, "altitude": 257, "latitude": 53.9157932, "longitude": 27.4952067, "altitudeAccuracy": null}, "timestamp": 1545636352000},
    {"coords": {"speed": 1.2106610536575315, "heading": 358, "accuracy": 3, "altitude": 257, "latitude": 53.9157987, "longitude": 27.495204, "altitudeAccuracy": null}, "timestamp": 1545636353000},
    {"coords": {"speed": 1.3191285133361816, "heading": 0, "accuracy": 3, "altitude": 256, "latitude": 53.915809, "longitude": 27.4952076, "altitudeAccuracy": null}, "timestamp": 1545636354000},
    {"coords": {"speed": 1.2567417621612549, "heading": 2, "accuracy": 3, "altitude": 256, "latitude": 53.9158171, "longitude": 27.4952041, "altitudeAccuracy": null}, "timestamp": 1545636355000}
  ]
}

function renderPointsB() {
  return [
    {"coords": {"speed": 1.3600000143051147, "heading": 358, "accuracy": 3, "altitude": 256, "latitude": 53.9158265, "longitude": 27.4952079, "altitudeAccuracy": null}, "timestamp": 1545636356000},
    {"coords": {"speed": 1.3203409910202026, "heading": 357, "accuracy": 3, "altitude": 257, "latitude": 53.9158376, "longitude": 27.4952021, "altitudeAccuracy": null}, "timestamp": 1545636357000},
    {"coords": {"speed": 1.3303383588790894, "heading": 5, "accuracy": 3, "altitude": 257, "latitude": 53.9158529, "longitude": 27.4951925, "altitudeAccuracy": null}, "timestamp": 1545636358000},
    {"coords": {"speed": 1.2319902181625366, "heading": 15, "accuracy": 3, "altitude": 257, "latitude": 53.915863, "longitude": 27.4952011, "altitudeAccuracy": null}, "timestamp": 1545636359000}
  ]
}