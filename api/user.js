import { request } from '@/plugins/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data,
  })
}

export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data,
  })
}

export const update = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data,
  })
}

export const profile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}

export const follow = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}

export const unfollow = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}
