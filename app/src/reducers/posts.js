import { RECEIVE_POSTS, SET_POST_SORT_METHOD } from '../actions/posts'

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
    default:
      return state
  }
}
