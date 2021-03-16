import { get, post } from '@/axios';

// 验证码获取
export const getShortmessage = (query) => {
  return post('/app/shortmessage?source=4&cmd=1' , query, false)
}

// 用户短信验证码登录
export const setCloudserver = (query) => {
  return post('/app/cloudserver?source=4&cmd=3' , query, false)
}

// 服务器列表获取
export const getCloudserver = (query) => {
  return post('/app/cloudserver?source=4&cmd=4' , query, false)
}

// 用户登录本地服务器
export const setLocalServer = (query) => {
  return post('/app/cloudserver?source=4&cmd=1' , query, false)
}