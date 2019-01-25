import {
  RECEIVE_POSTS,
  UPVOTE_POST,
  DOWNVOTE_POST,
  SET_POST_SORT_METHOD
} from '../actions/posts'

export function posts(state = {}, action) {
  const { type, posts } = action

  switch (type) {
    case RECEIVE_POSTS:
      if (posts) {
        return posts.reduce((obj, post) => {
          obj[post.id] = post
          return obj
        }, {})
      }
      return state
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
