import moment from 'moment/moment'

/**
 *
 * @param {string|Date} date
 * @param {string} time - time in format 'HH:mm'
 * @returns {*|moment.Moment}
 */
export function joinDateAndTime(date, time) {
  const dateMoment = moment(date)
  const timeMoment = moment(time, 'HH:mm')
  dateMoment.set({hour: timeMoment.get('hour'), minute: timeMoment.get('minute'), second: timeMoment.get('second')})
  return dateMoment
}

/**
 *
 * @param {string|Date} date
 * @returns {number}
 */
export function dayTimestamp(date) {
  const dayDate = new Date(date)
  dayDate.setHours(0, 0, 0, 0)
  return dayDate.getTime()
}