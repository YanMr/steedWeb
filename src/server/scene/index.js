import { get, post } from '@/axios';

// 场景添加和修改
export const setTaskScene = (query) => {
  return post('/app/task/scene?source=4&cmd=3' , query)
}

// 接收成员--位置获取(场景/批量控制)
export const getScenePlace = (query) => {
  return post(`/app/place?source=4&cmd=1` , query)
}

// 场景列表获取
export const getSceneList = (query) => {
  return post(`/app/task/scene?source=4&cmd=1` , query)
}

// 场景详情获取
export const getSceneDetails = (query) => {
  return post(`/app/task/scene?source=4&cmd=2` , query)
}

// 场景状态设置
export const getSceneStatus = (query) => {
  return post(`/app/task/scene?source=4&cmd=6` , query)
}

// 场景删除
export const setDelScene = (query) => {
  return post(`/app/task/scene?source=4&cmd=5` , query)
}

// 任务列表获取
export const getTaskList = (query) => {
  return post(`/app/task?source=4&cmd=10` , query)
}

// 任务执行
export const setTaskExecution = (query) => {
  return post(`/app/task?source=4&cmd=7` , query)
}

// 任务控制项获取
export const getAiControl = (query) => {
  return post(`/app/task?source=4&cmd=20` , query)
}

// 任务添加和修改
export const getTaskAdd = (query) => {
  return post(`/app/task?source=4&cmd=1` , query)
}

// 任务详情获取
export const getTaskDetails = (query) => {
  return post(`/app/task?source=4&cmd=7` , query)
}

// 任务删除
export const getTaskDel = (query) => {
  return post(`/app/task?source=4&cmd=4` , query)
}

// 任务状态更新
export const getTaskState = (query) => {
  return post(`/app/task?source=4&cmd=9` , query)
}