
import fetch from '@/http'
import { Base64 } from 'js-base64'
/**
 * 登录
 */

export const userLogin = (username, password) => fetch('user/login', {
  username: username,
  password: Base64.encode(password)
})

// 重置密码
export const resetPassWord = (guid, password, newpassword) => fetch('user/change-password', {
  guid: guid,
  original_pwd: Base64.encode(password),
  new_pwd: Base64.encode(newpassword)
})

// 获取个人信息
export const getUserInfo = (guid) => fetch('user/info', {
  guid: guid
})

// 修改个人信息
export const updateUserInfo = (data) => fetch('user/update', data)

// 获取所有科室
export const getalldepartment = (guid, index = 1, size = 100) => fetch('department/pagination', {
  guid: guid,
  index: index,
  size: size
})

// 获取轮转科室
export const userstatistic = (guid, id) => fetch('plan/user-statistic', {
  guid: guid,
  id: id
})

export const demandhandbook = (guid) => fetch('demand/handbook', {
  guid: guid
})

export const getRotateRecord = (guid, userId, departmentId, demandId) => fetch('rotate/getRotateRecord', {
  guid: guid,
  userId: userId,
  departmentId: departmentId,
  demandId: demandId
})
/**
 * 获取轮转要求数据
 * @param {*} guid 
 */
export const getDemandInfo = (guid) => fetch ('demand/infos',{ 
  guid: guid
})

export const getNurseInfo = (guid, role, index, size) => fetch('user/role-pagination', {
  guid: guid,
  role: role,
  index: 1,
  size: 1000000
})
