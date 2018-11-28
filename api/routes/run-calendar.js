import { calendarSaveAction, calendarUpdateAction } from '../actions/run-calendar'

export default [
  {
    method: 'post',
    path: '/calendar/save',
    action: calendarSaveAction
  },
  {
    method: 'post',
    path: '/calendar/update',
    action: calendarUpdateAction
  },
]