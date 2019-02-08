import { combineReducers } from 'redux';
import { categories } from './categories';
import { posts } from './posts';
import { postSorting } from './postSorting';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  categories,
  posts,
  postSorting,
  loadingBar: loadingBarReducer
});
