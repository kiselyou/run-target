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