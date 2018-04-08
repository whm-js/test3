
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

// 护士申请出科
export const submitPersonSummary = (guid, serialId, summaryInfo) => fetch('rotate/submitPersonSummary', {
  guid: guid,
  serialId: serialId,
  summaryInfo: summaryInfo
})

// 护士出科详情
export const getExitCourse = (guid, serialId) => fetch('rotate/getExitCourse', {
  guid: guid,
  serialId: serialId
})

// 轮转手册
export const demandhandbook = (guid) => fetch('demand/handbook', {
  guid: guid
})

// 添加轮转记录
// guid: guid,
// userId: userId,
// demandId: demandId,
// departmentId: departmentId,
// trainingId: trainingId,
// trainingContent: trainingContent,
// duration: duration,
// trainingDate: trainingDate,
// appraise: appraise,
// remark: remark,
// speaker: speaker
export const addRotateRecord = (data) => fetch('rotate/addRotateRecord', data)

// 修改轮转记录
// guid: guid,
// serialId: serialId,
// trainingContent: trainingContent,
// duration: duration,
// trainingDate: trainingDate,
// appraise: appraise,
// remark: remark,
// speaker: speaker
export const setRotateRecord = (data) => fetch('rotate/setRotateRecord', data)

// 删除轮转记录
export const delRotateRecord = (guid, serialId) => fetch('rotate/delRotateRecord', {
  guid: guid,
  serialId: serialId
})

// 获取轮转记录
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
export const getDemandInfo = (guid) => fetch('demand/infos', {
  guid: guid
})
/**
 * 获取护士/导师信息
 * @param {*} guid
 * @param {*} role
 * @param {*} index
 * @param {*} size
 */
export const getNurseInfo = (guid, role, index, size) => fetch('user/role-pagination', {
  guid: guid,
  role: role,
  index: 1,
  size: 1000000
})
/**
 * 获取轮转计划信息--出科/入科信息
 * @param {*} guid
 * @param {*} planstartdate 计划入科时间--获取出科数据时可不传
 * @param {*} planenddate 计划出科时间--获取入科数据时可不传
 * @param {*} realityenddate 实际出科时间--获取出科数据时可不传
 * @param {*} rotatestatus 轮转状态
 * 100:未申请出科
 * 101:导师未审核
 * 102:导师审核不通过
 * 103:护士长未审核
 * 104:护士长审核不通过
 * 200:已出科
 * 0:未入科
 * （传1000，返回“未入科”以外的数据）
 * （传1001，返回“未入科”，“未申请出科”，“导师未审核”，“导师审核不通过”，“护士长审核不通过”的数据）
 * （传1002，返回 已入科但未出科的数据）
 * @param {*} wheredepartmentname--科室名称精准查询
 * @param {*} likedepartmentname--科室名称模糊查询
 * @param {*} nurserealname--护士名字
 * @param {*} pageindex
 * @param {*} pagesize
 */
export const getRotatePlanInfo = (guid, planstartdate, planenddate, rotatestatus, realityenddate) => fetch('rotate/getRotatePlanInfo', {
  guid: guid,
  planStartDate: planstartdate,
  planEndDate: planenddate,
  rotateStatus: rotatestatus,
  realityEndDate: realityenddate
})
/**
 * 获取护士的带教导师信息
 * @param {*} guid
 * @param {*} departmentId 科室ID
 * @param {*} planstartdate 计划入科时间
 * @param {*} userid 护士userid
 */
export const getNurseTeacher = (guid, departmentId, planstartdate, userid) => fetch('rotate/getNurseTeacher', {
  guid: guid,
  departmentId: departmentId,
  planStartDate: planstartdate,
  userId: userid
})
/**
 * 护士长批准入科接口
 * @param {*} guid
 * @param {*} departmentId 科室ID
 * @param {*} userId 护士的userid
 * @param {*} planstartdate 计划入科时间
 * @param {*} realityStartdate 实际入科时间
 * @param {*} coachingId 导师ID
 * @param {*} coahingname 导师名称
 */
export const setRotateEntry = (guid, departmentId, userId, planstartdate, realityStartdate, coachingId, coahingname) => fetch('rotate/setRotateEntry', {
  guid: guid,
  departmentId: departmentId,
  userId: userId,
  planStartDate: planstartdate,
  realityStartdate: realityStartdate,
  coachingId: coachingId,
  coachingName: coahingname
})
/**
 * 获取个人信息
 * @param {*} guid 当前登录用户id
 * @param {*} userId 当前选择查看的用户id
 */
export const getUserInfos = (guid, userId) => fetch('user', {
  guid: guid,
  id: userId
})
/**
 * 导师获取轮转手册信息
 * @param {*} guid 当前登录用户id
 * @param {*} userId 当前选择查看的用户id
 */
export const getRotateRecordForTutor = (guid, userId) => fetch('rotate/getRotateRecordForTutor', {
  guid: guid,
  userId: userId
})
