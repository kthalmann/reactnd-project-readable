import {
  RECEIVE_POSTS,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_POST,
  DELETE_POST
} from '../actions/posts'
import { removeProperty } from '../utils/index'

export function posts(state = null, action) {
  const { type, post, posts } = action

  switch (type) {
    case RECEIVE_POSTS:
      if (posts) {
        return posts.reduce((obj, post) => {
          obj[post.id] = post
          return obj
        }, {})
      }
      return state
    case ADD_POST:
      return {
        ...state,
        [post.id]: post
      }
    case DELETE_POST:
      return removeProperty(state, action.id)
    case UPVOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore + 1
        }
      }
    case DOWNVOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore - 1
        }
      }
    default:
      return state
  }
}
