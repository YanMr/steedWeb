import { get, post } from '@/axios';

/** 设备列表获取 */
export const getDeviceManage = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=1`, query);
};

/** 设备详情 */
export const getDeviceDetail = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=10`, query);
};

/** 设备筛选 位置获取 */
export const getDevicePlace = (query = {}) => {
	return post(`/app/place?source=4&cmd=15`, query);
};
