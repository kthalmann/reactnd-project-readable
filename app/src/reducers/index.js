import { combineReducers } from 'redux'
import { categories } from './categories'
import { posts } from './posts'
import { postSorting } from './postSorting'

export default combineReducers({
  categories,
  posts,
  postSorting
})
