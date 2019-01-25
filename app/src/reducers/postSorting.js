import { SET_POST_SORT_METHOD } from '../actions/postSorting'

export function postSorting(state = null, action) {
  switch (action.type) {
    case SET_POST_SORT_METHOD:
      return action.sortMethod
    default:
      return state
  }
}
