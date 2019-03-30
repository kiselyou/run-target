import { assert } from 'chai'
import Distance from './Distance'
import Activity from './Activity'

describe('Activity', function() {

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

  const distanceObjectData = {
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

  const objectData = {
    dateTimeStart: '2018-12-31T21:00:00.000Z',
    dateTimeStop: '2018-12-31T22:00:00.000Z',
    deviceId: 19,
    distances: [ Object.assign({}, distanceObjectData) ],
    date: '2018-12-31T21:00:00.000Z',
    type: 1,
    id: 5
  }

  const arrayData = [
    // activity
    '2018-12-31T21:00:00.000Z', '2018-12-31T22:00:00.000Z', 19, '2018-12-31T21:00:00.000Z', 1, 5, [
      // distances
      [ 1, 10, 120, 10, 100, 10000, 5000, 2, 1, [
        // points
        [ 1, 120, 1544000000, 10, [ 10, 20, 30, 40, 50, 60 ], 5, 2, 1]
      ]]
    ]
  ]

  it('should recompose activity from Object to Array', function () {
    const activity = new Activity().fromObject(objectData)
    assert.deepStrictEqual(activity, arrayData)
  })

  it('should recompose activity from Array to Object', function () {
    const activity = new Activity().fromArray(arrayData)
    assert.deepStrictEqual(activity.toObject(), objectData)
  })

  it('should return correct property values', function () {
    const activityFromObject = new Activity().fromObject(objectData)
    assert.strictEqual(activityFromObject.dateTimeStart, '2018-12-31T21:00:00.000Z')
    assert.strictEqual(activityFromObject.dateTimeStop, '2018-12-31T22:00:00.000Z')
    assert.strictEqual(activityFromObject.deviceId, 19)
    assert.strictEqual(activityFromObject.date, '2018-12-31T21:00:00.000Z')
    assert.strictEqual(activityFromObject.type, 1)
    assert.strictEqual(activityFromObject.id, 5)
    assert.strictEqual(activityFromObject.distances[0] instanceof Distance, true)

    const activityFromArray = new Activity().fromArray(arrayData)
    assert.strictEqual(activityFromArray.dateTimeStart, '2018-12-31T21:00:00.000Z')
    assert.strictEqual(activityFromArray.dateTimeStop, '2018-12-31T22:00:00.000Z')
    assert.strictEqual(activityFromArray.deviceId, 19)
    assert.strictEqual(activityFromArray.date, '2018-12-31T21:00:00.000Z')
    assert.strictEqual(activityFromArray.type, 1)
    assert.strictEqual(activityFromArray.id, 5)
    assert.strictEqual(activityFromArray.distances[0] instanceof Distance, true)
  })
})