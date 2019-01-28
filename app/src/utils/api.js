const api = 'http://localhost:3001'

const token = 'loremipsum'

const headers = {
  Authorization: token,
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const _getCategories = _ => {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}

export const _getPosts = _ => {
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const _getCommentsForPost = postId => {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const _voteOnComment = (commentId, isUpvote) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: isUpvote ? 'upVote' : 'downVote' })
  }).then(res => res.json())
}
