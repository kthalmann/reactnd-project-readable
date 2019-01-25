import { _getCategories, _getPosts } from '../utils/api'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'
import { setPostSortMethod } from './postSorting'

export const DEFAULT_POST_SORT_METHOD = 'age'

export function handleInitialData() {
  return dispatch => {
    return Promise.all([_getCategories(), _getPosts()]).then(
      ([categories, posts]) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
        dispatch(setPostSortMethod(DEFAULT_POST_SORT_METHOD))
      }
    )
  }
}
