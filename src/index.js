import './scss/index.scss'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import crypto from 'browserify-aes'
import BluetoothMiBand from '@lib/cordova/bluetooth/BluetoothMiBand'

import arrayBufferToString from 'arraybuffer-to-string'

Vue.use(Vuex)

import './vue/layouts/Mobile'
// import './vue/layouts/Watch'

const renderView = () => {
  new Vue({
    store,
    el: '#app-container',
    template: `<Mobile/>`
    // template: `<Watch/>`
  })
}

const DEVICE_KEY = 1

const app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
    // testBLE()
    // miBand().then(() => {
    //   console.log('++++++++++++++++++')
    // }).catch((e) => {
    //   console.log('-----------------')
    //   console.log(e)
    // })
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
    renderView()
  }
};

app.initialize();

if (process.env.NODE_ENV === 'development') {
  renderView()
}




const AB = function() {
  let args = [...arguments];

  // Convert all arrays to buffers
  args = args.map(function(i) {
    if (i instanceof Array) {
      return Buffer.from(i);
    }
    return i;
  })

  // Merge into a single buffer
  let buf = Buffer.concat(args);

  // Convert into ArrayBuffer
  let ab = new ArrayBuffer(buf.length);
  let view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}


const UUID_BASE = (x) => `0000${x}-0000-3512-2118-0009af100700`

async function miBand() {
  const mi = new BluetoothMiBand()

  const device = await mi.detectDevice('MI Band 2')

  console.log('device', device)

  if (device) {

    // await mi.writeUserInfo(device, {
    //   gender: 0,
    //   height: 170,
    //   weight: 79,
    //   id: 12312312,
    //   date: {
    //     year: 1987,
    //     month: 4,
    //     day: 25
    //   }
    // })

    console.log('dsadasssssssssssss')
    const deviceData = await mi.connect(device)
    console.log('deviceData', deviceData)
    const auth = await mi.auth(deviceData)
    console.log('auth', auth)
    if (auth) {
      mi.startListenHRM(deviceData, (rate) => {
        console.log('rate', rate)
      })
    }

  }
}

function testBLE() {

  window.ble.isEnabled(() => {
    console.log(`Блютус включен`)
  }, () => {
    console.log(`Блютус выключен`)
  });

// TODO: minor
  window.ble.startScan([], function(device) {
    // console.log('Сканирование нашло устройство', device);


    // 'Polar H10 2F093623'
    // 'fenix 3'
    // MI Band 2
    if (['MI Band 2'].includes(device.name)) {
      console.log('Сканирование нашло устройство', device);

      // https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.service.heart_rate.xml
      // https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.characteristic.heart_rate_measurement.xml
      const connectTime = Date.now()
      window.ble.connect(device.id, (data) => {
        console.log(`Успешное соединение с ${device.name}`, data)



        // TODO WORK
        /*getBatteryInfo(device.id)
          .then((batt) => {
            console.log('batt', batt)
          })
          .catch((error) => {
            console.log('batt-error', error)
          })

        getTime(device.id)
          .then((time) => {
            console.log('time', time)
          })
          .catch((error) => {
            console.log('time-error', error)
          })

        getSerial(device.id)
          .then((serial) => {
            console.log('serial', serial)
          })
          .catch((error) => {
            console.log('serial-error', error)
          })

        getHwRevision(device.id)
          .then((serial) => {
            console.log('HwRevision', serial)
          })
          .catch((error) => {
            console.log('HwRevision-error', error)
          })

        getSwRevision(device.id)
          .then((serial) => {
            console.log('SwRevision', serial)
          })
          .catch((error) => {
            console.log('SwRevision-error', error)
          })*/

        // TODO WORK
       /* setTimeout(() => {
          write(device.id, '1802', '2a06', AB([0x01]))
            .then((message) => {
              console.log('message', message)

            })
            .catch((e) => {
              console.log('message-error', e)
            })
        }, 5000)

        setTimeout(() => {
          write(device.id, '1802', '2a06', AB([0x02]))
            .then((message) => {
              console.log('phone', message)

            })
            .catch((e) => {
              console.log('phone-error', e)
            })
        }, 10000)

        setTimeout(() => {
          write(device.id, '1802', '2a06', AB([0x03]))
            .then((message) => {
              console.log('vibrate', message)

            })
            .catch((e) => {
              console.log('vibrate-error', e)
            })
        }, 15000)
        */

        writeUserInfo(device.id)
          .then((writeUserInfoRes) => {
            console.log('+++writeUserInfo+++', writeUserInfoRes)

          })
          .catch((e) => {
            console.log('---writeUserInfo---', e)
          })

        auth(device.id)
          .then((authRes) => {
            console.log('+++auth+++', authRes)

            rawStart(device.id)
              .then(() => {
                console.log('rawStart')


                // TODO WORK
                /*getPedometerStats(device.id)
                  .then((stats) => {
                    console.log('pedometer-stats', stats)
                  })
                  .catch((error) => {
                    console.log('pedometer-stats-error', error)
                  })*/

                window.ble.startNotification(device.id, '180d', '2a37',
                  (buffer) => {
                    const value = Buffer.from(buffer)
                    let rate = value.readUInt16BE(0)
                  console.log('+++hrm_data+++', rate)
                  },
                  (err) => console.log('---hrm_data-error---', err)
                );

                // TODO; READ WORK
             /*   hrmRead(device.id)
                  .then((v) => {
                    console.log('v', v)
                  })
                  .catch((e) => {
                    console.log('e', e)
                  })

                setInterval(() => {
                 window.ble.read(device.id, '180d', '2a39',
                    (buffer) => {
                      const value = Buffer.from(buffer)
                      let rate = value.readUInt16BE(0)
                      console.log('+++read_hrm_data+++', rate)
                    },
                    (err) => console.log('---read_hrm_data-error---', err)
                  );

                }, 10000)*/

                // TODO WORK
                /*window.ble.startNotification(device.id, 'fee0', UUID_BASE('0010'),
                  (buffer) => {
                    const value = Buffer.from(buffer)
                    const cmd = value.toString('hex')
                    console.log('+++event+++', cmd, value)
                  },
                  (err) => console.log('---event-error---', err)
                );*/

                // TODO DO NOT WORK DECODE
                /*window.ble.startNotification(device.id, 'fee0', UUID_BASE('0002'),
                  (buffer) => {
                    console.log(buffer)
                  },
                  (err) => console.log('---raw_data-error---', err)
                );*/

              })
              .catch((error) => {
                console.log('rawStart-error', error)
              })


          })
          .catch((e) => {
            console.log('---auth---', e)
          })



      }, (error) => {
        console.log('Ошибка соединения', Date.now() - connectTime, error)
      });

      window.ble.stopScan(() => {
        console.log('Сканирование остановлено успешно')
      }, () => {
        console.log('Ошибка остановки сканирования')
      })

      // setInterval(() => {
      //
      //   window.ble.isConnected(device.id, () => {
      //     console.log(`Устройство подключено ${device.name}`)
      //   }, () => {
      //     console.log(`Устройство не подключено ${device.name}`)
      //   });
      //
      // }, 5000)

    }

  }, function (error) {
    console.log('Ошибка сканирования', error);
  });

  console.log('[BLE]', window.ble)
}

async function hrmRead(deviceId) {
  await write(deviceId, '180d', '2a39', AB([0x15, 0x01, 0x00]))
  await write(deviceId, '180d', '2a39', AB([0x15, 0x02, 0x00]))
  await write(deviceId, '180d', '2a39', AB([0x15, 0x02, 0x01]))

  return new Promise((resolve, reject) => {
    window.ble.read(deviceId, '180d', '2a39',
      (buffer) => {
        const value = Buffer.from(buffer)
        let rate = value.readUInt16BE(0)
        console.log('+++hrmRead+++', rate)
        resolve(rate)
      },
      (err) => console.log('---hrmRead-error---', err)
    );
  })
}

async function rawStart(deviceId) {

  // To turn off the current heart monitor measurement.
  await write(deviceId, '180d', '2a39', AB([0x15, 0x02, 0x00]))
  await write(deviceId, '180d', '2a39', AB([0x15, 0x01, 0x00]))

  // Enabling Gyroscope and Heart raw data by sending a command to SENS
  await writeWithoutResponse(deviceId, 'fee0', UUID_BASE('0001'), AB([0x01, 0x03, 0x19]))

  // Start continuous heart measurements by sending a request to HMC
  await write(deviceId, '180d', '2a39', AB([0x15, 0x01, 0x01]))

  // Sending command to SENS \x02 (don’t know why this is need)
  await writeWithoutResponse(deviceId, 'fee0', UUID_BASE('0001'), AB([0x02]))

  // Then while getting notifications, every 12 seconds we need to send a ping with the value \x16 to the HCM
  setInterval(async () => {
    console.log('Pinging HRM')
    await write(deviceId, '180d', '2a39', AB([0x16]))
  },12000)
}

function writeWithoutResponse(deviceId, serviceId, charId, value) {
  return new Promise((resolve, reject) => {
    window.ble.writeWithoutResponse(deviceId, serviceId, charId, value, resolve, reject);
  })
}

function write(deviceId, serviceId, charId, value) {
  return new Promise((resolve, reject) => {
    window.ble.write(deviceId, serviceId, charId, value, resolve, reject);
  })
}

function auth(deviceId) {
  return new Promise((resolve, reject) => {

    const key = new Buffer('30313233343536373839404142434445', 'hex')

    window.ble.startNotification(deviceId, 'fee1', UUID_BASE('0009'),
      (buffer) => {
        const value = Buffer.from(buffer)
        const cmd = value.slice(0,3).toString('hex');
        console.log('auth-notification CMD', cmd)
        switch (cmd) {
          case '100201':
            let rdn = value.slice(3)
            const cipher = crypto.createCipheriv('aes-128-ecb', key, '').setAutoPadding(false)
            const encrypted = Buffer.concat([cipher.update(rdn), cipher.final()])
            window.ble.writeWithoutResponse(deviceId, 'fee1', UUID_BASE('0009'), AB([0x03, 0x08], encrypted), undefined, reject)
            console.log('auth-notification RND', rdn)
            break
          case '100301':
            console.log('Authenticated')
            resolve()
            break
          case '100304':
            console.log('Encryption Key Auth Fail, sending new key...')
            window.ble.writeWithoutResponse(deviceId, 'fee1', UUID_BASE('0009'), AB([0x01, 0x08], key), undefined, reject)
            break
          default:
            reject(value, cmd)
        }
      },
      (err) => console.log('auth-notification-error', err)
    );


    window.ble.writeWithoutResponse(deviceId, 'fee1', UUID_BASE('0009'), AB([0x02, 0x08]), undefined, reject)
    //
    // // требует подтверждения
    // window.ble.writeWithoutResponse(deviceId, 'fee1', UUID_BASE('0009'), AB([0x01, 0x08], key), resolve, reject);
    //
    // const rdn = Buffer.from([ 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45 ])
    // const cipher = crypto.createCipheriv('aes-128-ecb', key, '').setAutoPadding(false)
    // const encrypted = Buffer.concat([cipher.update(rdn), cipher.final()])
    // window.ble.writeWithoutResponse(deviceId, 'fee1', UUID_BASE('0009'), AB([0x03, 0x08], encrypted), resolve, reject)
  })
}

function writeUserInfo(deviceId) {
  return new Promise((resolve, reject) => {
    const data = new Buffer(16)
    data.writeUInt8(0x4f, 0)

    data.writeUInt16LE(1987, 3)
    data.writeUInt8(4, 5)
    data.writeUInt8(25, 6)
    data.writeUInt8(0, 7) // 0 - male, 1 - female, 2 - ?

    data.writeUInt16LE(170, 8) // cm
    data.writeUInt16LE(79, 10) // kg
    data.writeUInt32LE(20111111, 12) // id

    window.ble.write(deviceId, 'fee0', UUID_BASE('0008'), AB(data), resolve, reject);
  })
}

function getHwRevision(deviceId) {
  return new Promise((resolve, reject) => {
    window.ble.read(deviceId, '180a', '2a27', (buffer) => {
      const textDec = new TextDecoder()
      const data = textDec.decode(buffer)
      if (data.startsWith('V') || data.startsWith('v')) {
        resolve(data.substring(1))
      }
      resolve(data)
    }, reject)
  })
}

function getSwRevision(deviceId) {
  return new Promise((resolve, reject) => {
    window.ble.read(deviceId, '180a', '2a28', (buffer) => {
      const textDec = new TextDecoder()
      const data = textDec.decode(buffer)
      if (data.startsWith('V') || data.startsWith('v')) {
        resolve(data.substring(1))
      }
      resolve(data)
    }, reject)
  })
}

function getSerial(deviceId) {
  return new Promise((resolve, reject) => {
    window.ble.read(deviceId, '180a', '2a25', (buffer) => {
      const textDec = new TextDecoder()
      resolve(textDec.decode(buffer))
    }, reject)
  })
}

function getTime(deviceId) {
  return new Promise((resolve, reject) => {
    window.ble.read(deviceId, 'fee0', '2a2b', (buffer) => {
      const data = Buffer.from(buffer)
      resolve(parseDate(data))
    }, reject)
  })
}

function getBatteryInfo(deviceId) {
  return new Promise((resolve, reject) => {
    window.ble.read(deviceId, 'fee0', UUID_BASE('0006'), (buffer) => {
        const data = Buffer.from(buffer)
        if (data.length <= 2) {
          resolve('unknown')
        }

        let result = {}
        result.level = data[1]
        result.charging = !!data[2]
        result.off_date = parseDate(data.slice(3, 10))
        result.charge_date = parseDate(data.slice(11, 18))
        result.charge_level = data[19]
        resolve(result)
      },
      reject
    )
  })
}

function getPedometerStats(deviceId) {
  return new Promise((resolve, reject) => {
    window.ble.read(deviceId, 'fee0', UUID_BASE('0007'), (buffer) => {
        const data = Buffer.from(buffer)
        let result = { steps: null, distance: null, calories: null }
        result.steps = data.readUInt16LE(1)
        if (data.length >= 8) {
          result.distance = data.readUInt32LE(5)
        }
        if (data.length >= 12) {
          result.calories = data.readUInt32LE(9)
        }
        resolve(result)
      },
      reject
    )
  })
}

function parseDate(buff) {
  let year = buff.readUInt16LE(0),
    mon = buff[2]-1,
    day = buff[3],
    hrs = buff[4],
    min = buff[5],
    sec = buff[6],
    msec = buff[8] * 1000 / 256;
  return new Date(year, mon, day, hrs, min, sec)
}