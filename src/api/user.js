import axios from './index'

export function login(data) {
  return axios.request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export const getUserinfo = () => {
  return axios.request({
    url: '/api/user'
  })
}

export function getRole() {
  return axios.request({
    url: '/api/role'
  })
}
