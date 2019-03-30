import { assert } from 'chai'
import Point from './Point'

describe('Point', function() {

  const objectData = {
    id: 1,
    hrm: 120,
    uKey: 2,
    time: 1544000000,
    speed: 10,
    position: [ 10, 20, 30, 40, 50, 60 ],
    prevUKey: 1,
    distanceId: 5
  }

  const arrayData = [ 1, 120, 1544000000, 10, [ 10, 20, 30, 40, 50, 60 ], 5, 2, 1 ]

  it('should recompose point from Object to Array', function () {
    const point = new Point().fromObject(objectData)
    assert.deepStrictEqual(point, arrayData)
  })

  it('should recompose point from Array to Object', function () {
    const point = new Point().fromArray(arrayData)
    assert.deepStrictEqual(point.toObject(), objectData)
  })

  it('should return correct property values', function () {
    const pointFromObject = new Point().fromObject(objectData)
    assert.strictEqual(pointFromObject.id, 1)
    assert.strictEqual(pointFromObject.uKey, 2)
    assert.strictEqual(pointFromObject.hrm, 120)
    assert.strictEqual(pointFromObject.speed, 10)
    assert.strictEqual(pointFromObject.prevUKey, 1)
    assert.strictEqual(pointFromObject.distanceId, 5)
    assert.strictEqual(pointFromObject.time, 1544000000)
    assert.deepStrictEqual(pointFromObject.position, [ 10, 20, 30, 40, 50, 60 ])

    const pointFromArray = new Point().fromArray(arrayData)
    assert.strictEqual(pointFromArray.id, 1)
    assert.strictEqual(pointFromArray.uKey, 2)
    assert.strictEqual(pointFromArray.hrm, 120)
    assert.strictEqual(pointFromArray.speed, 10)
    assert.strictEqual(pointFromArray.prevUKey, 1)
    assert.strictEqual(pointFromArray.distanceId, 5)
    assert.strictEqual(pointFromArray.time, 1544000000)
    assert.deepStrictEqual(pointFromArray.position, [ 10, 20, 30, 40, 50, 60 ])
  })
})