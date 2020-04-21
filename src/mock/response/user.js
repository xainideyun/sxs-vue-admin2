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
    'a|boolean': true,
    'b|boolean': true,
    'c|boolean': true,
    'd|boolean': true,
    'e|boolean': true,
    'f|boolean': true,
    'g|boolean': true,
    'h|boolean': true
  })
}
