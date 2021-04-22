import { get, post } from '@/axios';

// 网络信息获取
export const getNetworkMess = (query) => {
  return get('/app/server?cmd=16' , query)
}

// 网络信息设置
export const setNetworkMess = (query) => {
  return post('/app/server?cmd=19' , query)
}

// 接收人员获取
export const getUserList = (query) => {
  return post('/app/user?cmd=19' , query)
}

// 日志获取
export const getLogList = (query) => {
  return post('/app/server?cmd=21' , query)
}