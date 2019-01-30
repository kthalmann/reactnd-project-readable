import { _voteOnPost } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

function upvotePost(id) {
  return {
    type: UPVOTE_POST,
    id
  }
}

export function handleUpvotePost(id) {
  return dispatch => {
    dispatch(upvotePost(id))

    _voteOnPost(id, true).catch(e => {
      dispatch(downvotePost(id))
      alert('An error occurred during voting. Please refresh the page.')
    })
  }
}

function downvotePost(id) {
  return {
    type: DOWNVOTE_POST,
    id
  }
}

export function handleDownvotePost(id) {
  return dispatch => {
    dispatch(downvotePost(id))

    _voteOnPost(id, false).catch(e => {
      dispatch(upvotePost(id))
      alert('An error occurred during voting. Please refresh the page.')
    })
  }
}
