import { get, post } from '@/axios';

// 系统名称获取
export const getSystemName = (query) => {
  return get('/app/place?cmd=13' , query)
}

// 系统名称修改
export const setSystemName = (query) => {
  return post('/app/place?cmd=11' , query)
}