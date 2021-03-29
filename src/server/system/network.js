import { get, post } from '@/axios';

// 网络信息获取
export const getNetworkMess = (query) => {
  return get('/app/server?source=4&cmd=16' , query)
}

// 网络信息设置
export const setNetworkMess = (query) => {
  return post('/app/server?source=4&cmd=15' , query)
}