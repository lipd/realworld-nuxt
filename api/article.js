import { request } from '@/plugins/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params,
  })
}

export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    headers: {
      Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTM4MDQ4LCJ1c2VybmFtZSI6ImxpcGQwNjMiLCJleHAiOjE2MTcyNjg1NzF9.0iqiRY83A7uOWy5jqG9y5onGAsJgA7o8o16DFb2HmDU`,
    },
  })
}

export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `api/articles/${slug}/favorite`,
  })
}

export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `api/articles/${slug}/favorite`,
  })
}

export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `api/articles/${slug}`,
  })
}

export const createArticle = data => {
  return request({
    method: 'POST',
    url: `api/articles`,
    data,
  })
}

export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `api/articles/${slug}`,
  })
}

export const updateArticle = ({ slug, data }) => {
  return request({
    method: 'PUT',
    url: `api/articles/${slug}`,
    data,
  })
}

export const getComments = slug => {
  return request({
    method: 'GET',
    url: `api/articles/${slug}/comments`,
  })
}
