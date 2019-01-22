const api = 'http://localhost:3001'

const token = 'loremipsum'

const headers = {
  Authorization: token
}

export const _getCategories = _ => {
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const _getPosts = _ => {
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
}
