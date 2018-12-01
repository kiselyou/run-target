import { saveAction, updateAction, viewAction } from '../action-target-run'

export default [
  {
    method: 'post',
    path: '/target/run/save',
    action: saveAction
  },
  {
    method: 'post',
    path: '/target/run/update',
    action: updateAction
  },
  {
    method: 'get',
    path: '/target/run/:targetId',
    action: viewAction
  },
]