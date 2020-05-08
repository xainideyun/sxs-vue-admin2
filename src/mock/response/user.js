import Mock from 'mockjs'

export function login()  {
  return Mock.mock({
    code: 200,
    token: 'token'
  })
}

export const getUserinfo = () => {
  return Mock.mock({
    name: '@name',
    'age|18-60': 0,
    email: '@email'
  })
}

export function getRole() {
  return Mock.mock({
    'home': true,
    'about|1': true,
    'good|1': true,
    'goodList|1': true,
    'goodDetail|1': true,
    'settings|1': true,
    'sys|1': true,
    'user|1': true
  })
}
