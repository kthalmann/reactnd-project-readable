import { _getCategories, _getPosts } from '../utils/api'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'

export function handleInitialData() {
  return dispatch => {
    return Promise.all([_getCategories(), _getPosts()]).then(
      ([categories, posts]) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
      }
    )
  }
}
