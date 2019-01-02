import {
  viewDetailsAction
} from '../action-details'

export default [
  {
    method: 'post',
    path: '/details/view/:timestamp',
    action: viewDetailsAction
  },
]