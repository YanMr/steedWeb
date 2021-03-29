import { get, post } from '@/axios';

// 角色与部门获取
export const setRoleDepartment = (query) => {
  return get('/app/login?source=4&cmd=6' , query)
}

// 角色添加或修改
export const setRoleAddEdit = (query) => {
  return post('/app/login?source=4&cmd=10' , query)
}

// 部门添加或修改
export const setClassAddEdit = (query) => {
  return post('/app/login?source=4&cmd=12' , query)
}

// 部门删除
export const setClassDel = (query) => {
  return post('/app/login?source=4&cmd=5' , query)
}

// 角色删除
export const setRoleDel = (query) => {
  return post('/app/login?source=4&cmd=11' , query)
}

// 用户信息添加
export const setAddUserMessage = (query) => {
  return post('/app/login?source=4&cmd=3' , query)
}

// 用户列表获取
export const getUserList= (query) => {
  return post('/app/login?source=4&cmd=7' , query)
}

// 用户批量删除
export const setBatchDel= (query) => {
  return post('/app/login?source=4&cmd=21' , query)
}

// 用户删除
export const setUserDel= (query) => {
  return post('/app/login?source=4&cmd=9' , query)
}

// 用户详情获取
export const getUserDetails= (query) => {
  return post('/app/login?source=4&cmd=20' , query)
}