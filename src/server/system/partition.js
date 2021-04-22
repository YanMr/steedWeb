import { get, post } from '@/axios';

// 分区列表获取
export const getPartitionList = (query) => {
  return get('/app/place?cmd=10' , query)
}

// 分区修改
export const getPartitionEdit = (query) => {
  return post('/app/place?cmd=3' , query)
}

// 分区添加
export const getPartitionAdd = (query) => {
  return post('/app/place?cmd=2' , query)
}

// 分区删除
export const getPartitionDel = (query) => {
  return post('/app/place?cmd=4' , query)
}