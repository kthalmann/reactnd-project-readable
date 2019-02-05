import { _voteOnPost, _addPost, _deletePost, _updatePost } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

function upvotePost(id) {
  return {
    type: UPVOTE_POST,
    id
  }
}

function downvotePost(id) {
  return {
    type: DOWNVOTE_POST,
    id
  }
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function updatePost(id, title, body) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  }
}

export function handleAddPost(post, cb) {
  return dispatch => {
    _addPost(post)
      .then(res => {
        dispatch(addPost(res))
      })
      .then(() => cb(post.id))
      .catch(e => {
        // dispatch(deletePost(post.id))
        alert(
          'An error occurred during creating post. Please refresh the page.'
        )
      })
  }
}

export function handleDeletePost(id, cb) {
  return dispatch => {
    _deletePost(id)
      .then(() => cb())
      .then(e => {
        dispatch(deletePost(id))
      })
      .catch(_ =>
        alert(
          'An error occurred during creating post. Please refresh the page.'
        )
      )
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

export function handleDownvotePost(id) {
  return dispatch => {
    dispatch(downvotePost(id))

    _voteOnPost(id, false).catch(e => {
      dispatch(upvotePost(id))
      alert('An error occurred during voting. Please refresh the page.')
    })
  }
}

export function handleUpdatePost(postId, title, body, cb) {
  return dispatch => {
    _updatePost(postId, title, body)
      .then(res => {
        dispatch(updatePost(postId, title, body))
      })
      .then(() => cb(postId))
      .catch(e => {
        alert(
          'An error occurred during creating post. Please refresh the page.'
        )
      })
  }
}
