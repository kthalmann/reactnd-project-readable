import { combineReducers } from 'redux'
import { categories } from './categories'
import { posts } from './posts'
// import { comments } from './comments'
import { postSorting } from './postSorting'

export default combineReducers({
  categories,
  posts,
  // comments,
  postSorting
})
