import assert from 'assert'
import GeoLocation from '../GeoLocation'

describe('GeoLocation', function() {

  it('should emulate point', async function () {
    const geo = new GeoLocation(true)
    geo
      .emulatorOptions({ interval: 1000 / 60 })
      .setDesiredAccuracy(10)

    geo.addEventListener('onTick', (position) => {
      if (position['accuracy'] > 13) {
        assert.isAbove(position['accuracy'], 13, 'Position accuracy is greater than 13')
      }
    })

    geo.addEventListener('onError', (error) => {
      assert.ifError(error)
      geo.stop()
    })

    geo.start()

    setTimeout(() => geo.stop(), 3000)
  })
})