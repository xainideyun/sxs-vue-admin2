import Mock from 'mockjs'
import { baseURL } from '../config'
import { login, getUserinfo, getRole } from './response/user'

Mock.mock(`${baseURL}/api/login`, login)
Mock.mock(`${baseURL}/api/user`, getUserinfo)
Mock.mock(`${baseURL}/api/role`, getRole)


export default Mock
