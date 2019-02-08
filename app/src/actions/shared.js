import { _getCategories, _getPosts } from '../utils/api';
import { receiveCategories } from './categories';
import { receivePosts } from './posts';
import { setPostSortMethod } from './postSorting';
import { showLoading, hideLoading } from 'react-redux-loading';

export const DEFAULT_POST_SORT_METHOD = 'timestamp';

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return Promise.all([_getCategories(), _getPosts()]).then(
      ([categories, posts]) => {
        dispatch(setPostSortMethod(DEFAULT_POST_SORT_METHOD));
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
        dispatch(hideLoading());
      }
    );
  };
}
