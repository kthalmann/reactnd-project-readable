const api = 'http://localhost:3001'

const token = 'loremipsum'

const headers = {
  Authorization: token
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
