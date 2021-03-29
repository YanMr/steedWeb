import { get, post } from '@/axios';

// 系统名称获取
export const getSystemName = (query) => {
  return get('/app/place?source=4&cmd=13' , query)
}

// 系统名称修改
export const setSystemName = (query) => {
  return post('/app/place?source=4&cmd=11' , query)
}