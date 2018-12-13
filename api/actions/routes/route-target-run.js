import {
  saveCalendarAction,
  viewCalendarAction,
  viewPointsAction,
  saveActivityAction,
  viewActivitiesAction
} from '../action-target-run'

export default [
  {
    method: 'post',
    path: '/run/save/calendar',
    action: saveCalendarAction
  },
  {
    method: 'post',
    path: '/run/save/activity/:dayId',
    action: saveActivityAction
  },
  {
    method: 'get',
    path: '/run/view/activity/:dayId',
    action: viewActivitiesAction
  },
  {
    method: 'get',
    path: '/run/view/calendar/:targetId',
    action: viewCalendarAction
  },
  {
    method: 'get',
    path: '/run/view/points/:distanceId',
    action: viewPointsAction
  },
]