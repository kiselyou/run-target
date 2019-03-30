import { assert } from 'chai'
import Point from './Point'
import Distance from './Distance'

describe('Distance', function() {

  const pointObjectData = {
    id: 1,
    hrm: 120,
    uKey: 2,
    time: 1544000000,
    speed: 10,
    position: [ 10, 20, 30, 40, 50, 60 ],
    prevUKey: 1,
    distanceId: 5
  }

  const objectData = {
    id: 1,
    uKey: 2,
    number: 10,
    avgHRM: 120,
    prevUKey: 1,
    avgSpeed: 10,
    activityId: 100,
    elapsedTime: 10000,
    pathLength: 5000,
    points: [ Object.assign({}, pointObjectData) ],
  }

  const arrayData = [ 1, 10, 120, 10, 100, 10000, 5000, 2, 1, [
    // Points
    [ 1, 120, 1544000000, 10, [ 10, 20, 30, 40, 50, 60 ], 5, 2, 1]
  ]
]

  it('should recompose distance from Object to Array', function () {
    const distance = new Distance().fromObject(objectData)
    assert.deepStrictEqual(distance, arrayData)
  })

  it('should recompose distance from Array to Object', function () {
    const distance = new Distance().fromArray(arrayData)
    assert.deepStrictEqual(distance.toObject(), objectData)
  })

  it('should return correct property values', function () {
    const distanceFromObject = new Distance().fromObject(objectData)
    assert.strictEqual(distanceFromObject.id, 1)
    assert.strictEqual(distanceFromObject.uKey, 2)
    assert.strictEqual(distanceFromObject.number, 10)
    assert.strictEqual(distanceFromObject.avgHRM, 120)
    assert.strictEqual(distanceFromObject.prevUKey, 1)
    assert.strictEqual(distanceFromObject.avgSpeed, 10)
    assert.strictEqual(distanceFromObject.activityId, 100)
    assert.strictEqual(distanceFromObject.elapsedTime, 10000)
    assert.strictEqual(distanceFromObject.pathLength, 5000)
    assert.strictEqual(distanceFromObject.points[0] instanceof Point, true)

    const distanceFromArray = new Distance().fromArray(arrayData)
    assert.strictEqual(distanceFromArray.id, 1)
    assert.strictEqual(distanceFromArray.uKey, 2)
    assert.strictEqual(distanceFromArray.number, 10)
    assert.strictEqual(distanceFromArray.avgHRM, 120)
    assert.strictEqual(distanceFromArray.prevUKey, 1)
    assert.strictEqual(distanceFromArray.avgSpeed, 10)
    assert.strictEqual(distanceFromArray.activityId, 100)
    assert.strictEqual(distanceFromArray.elapsedTime, 10000)
    assert.strictEqual(distanceFromArray.pathLength, 5000)
    assert.strictEqual(distanceFromArray.points[0] instanceof Point, true)
  })
})