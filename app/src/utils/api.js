const api = 'http://localhost:3001';

const token = 'loremipsum';

const headers = {
  Authorization: token,
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const _getCategories = _ => {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
};

export const _getPosts = _ => {
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);
};

export const _getCommentsForPost = postId => {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);
};

export const _voteOnPost = (postId, isUpvote) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: isUpvote ? 'upVote' : 'downVote' })
  }).then(res => res.json());
};

export const _addPost = post => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post)
  }).then(res => res.json());
};

export const _deletePost = postId => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
};

export const _updatePost = (postId, title, body) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ title, body })
  }).then(res => res.json());
};

export const _voteOnComment = (commentId, isUpvote) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: isUpvote ? 'upVote' : 'downVote' })
  }).then(res => res.json());
};

export const _addComment = comment => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment)
  }).then(res => res.json());
};

export const _deleteComment = commentId => {
  return fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
};

export const _updateComment = (commentId, timestamp, body) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ timestamp, body })
  }).then(res => res.json());
};
