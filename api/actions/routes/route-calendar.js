import {
  saveCalendarAction,
  viewCalendarAction,
  viewPointsAction,
} from '../action-calendar'

export default [
  {
    method: 'post',
    path: '/calendar/save',
    action: saveCalendarAction
  },
  {
    method: 'get',
    path: '/calendar/view/:targetId',
    action: viewCalendarAction
  },
  {
    method: 'get',
    path: '/points/view/:distanceId',
    action: viewPointsAction
  },
]