import { assert } from 'chai'
import moment from 'moment'

describe('Distance', function() {
  it('should find last points', function () {

    var now  = "02/09/2013 15:00:00";
    var then = "02/09/2013 14:20:00";

    var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
    console.log(ms / 1000)
    // var d = moment.duration(ms);
    // console.log(d)


  })
})