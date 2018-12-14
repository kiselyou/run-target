import assert from 'assert'
import Geo from './lib/Geo'
import Point from './lib/Point'
import Distance from './lib/Distance'

import { getDistance } from 'geolib'

describe('GeoRun', function() {
  const firstPosition = {
    timestamp: 1542662430374,
    coords: {
      latitude: 55.456000,
      longitude: 27.567000
    }
  }
  const secondPosition = {
    timestamp: 1542662432931,
    coords: {
      latitude: 55.456245,
      longitude: 27.567345
    }
  }

  const thirdPosition = {
    timestamp: 1542662435588,
    coords: {
      latitude: 55.456645,
      longitude: 27.567645
    }
  }

  const thirdPositionDouble = {
    timestamp: 1542662435588,
    coords: {
      latitude: 55.456645,
      longitude: 27.567645
    }
  }

  // secondPosition.timestamp - firstPosition.timestamp = 2557 milliseconds
  // thirdPosition.timestamp - secondPosition.timestamp = 2657 milliseconds

  describe('Point', function() {
    it('should create first point', function () {

      const measures = 1
      const time = (1544792551773 / 1000) - (1544129223198 / 1000)

      const distance = getDistance(
        {"lat": 53.9180638, "lng": 27.4591375, "timestamp": 1544129223198},
        {"lat": 53.9180833, "lng": 27.4591592, "timestamp": 1544792551773},
        6,
        6
      )

      const mPerHr = (distance / time) * 3600
      const speed = Math.round(mPerHr * measures * 10000) / 10000
      console.log(distance, speed, 1544792551773 - 1544129223198)

      //
      //
      // const point = new Point(firstPosition)
      // assert.equal(point.lat, 55.456000)
      // assert.equal(point.lng, 27.567000)
      // assert.equal(point.time, 1542662430374)
      // assert.equal(point.speed, 0)
      // assert.equal(point.distance, 0)
    })

    it('should create second point', function () {
      const point = new Point(secondPosition, new Point(firstPosition))
      assert.equal(point.lat, 55.456245)
      assert.equal(point.lng, 27.567345)
      assert.equal(point.time, 1542662432931) // milliseconds
      assert.equal(point.speed, 49.2765) // km/h
      assert.equal(point.distance, 35) // meters
    })

    it('should create third point', function () {
      const point = new Point(thirdPositionDouble, new Point(thirdPosition))
      assert.equal(point.lat, 55.456645)
      assert.equal(point.lng, 27.567645)
      assert.equal(point.time, 1542662435588)
      assert.equal(point.speed, 0)
      assert.equal(point.distance, 0)
    })
  })

  describe('Distance', function() {
    it('should create distance and one point', function () {
      const distance = new Distance(0)
      distance.addPosition(firstPosition)
      assert.equal(distance.speed, 0)
      assert.equal(distance.averageSpeed, 0)
      assert.equal(distance.pathLength, 0)
    })

    it('should create distance and two points', function () {
      const distance = new Distance(0)
      distance.addPosition(firstPosition)
      distance.addPosition(secondPosition)
      assert.equal(distance.speed, 49.2765)
      assert.equal(distance.averageSpeed, 49.2765)
      assert.equal(distance.pathLength, 35)
    })

    it('should create distance and three points', function () {
      const distance = new Distance(0)
      distance.addPosition(firstPosition)
      distance.addPosition(secondPosition)
      distance.addPosition(thirdPosition)
      assert.equal(distance.speed, 65.0358)
      assert.equal(distance.averageSpeed, 57.15615)
      assert.equal(distance.pathLength, 83)
    })
  })

  describe('Geo', function() {
    it('should create add point', function () {
      const geo = new Geo()
      geo.addPosition(firstPosition)
      assert.equal(geo.prepareDistanceNumber(), 0)
      assert.equal(geo.speed, 0)
      assert.equal(geo.pathLength, 0)
      assert.equal(geo.lastDistance instanceof Distance, true)
    })

    it('should create add three points', function () {
      const geo = new Geo()
      geo.addPosition(firstPosition)
      geo.addPosition(secondPosition)
      geo.addPosition(thirdPosition)
      assert.equal(geo.prepareDistanceNumber(), 0)
      assert.equal(geo.speed, 65.0358)
      assert.equal(geo.pathLength, 83)
      assert.equal(geo.lastDistance instanceof Distance, true)
    })
  })
})