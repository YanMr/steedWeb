import { get, post } from '@/axios';

/** 设备列表获取 */
export const getDeviceManage = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=1`, query);
};

/** 设备详情 */
export const getDeviceDetail = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=10`, query);
};

/** 单个设备控制 */
export const setDeviceControl = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=2`, query);
};

/** 设备筛选 位置获取 */
export const getDevicePlace = (query = {}) => {
	return post(`/app/place?source=4&cmd=15`, query);
};

/** 接收成员--位置获取(场景/批量控制) */
export const getDevicePlaceCmd1 = (query = {}) => {
	return post(`/app/place?source=4&cmd=1`, query);
};

/** 设备设置-详情 */
export const getDeviceSettingDetail = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=20`, query);
};

/** 设备设置-复制 */
export const deviceSettingCopy = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=11`, query);
};

/** 设备设置-替换 */
export const deviceSettingReplce = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=12`, query);
};

/** 设备批量控制项获取 */
export const getDeviceControlOption = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=4`, query);
};

/** 设备删除(单个或批量删除) */
export const postDeviceDel = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=18`, query);
};

/** 设备批量控制 */
export const postDeviceBatchControl = (query = {}) => {
	return post(`/app/device-manage?source=4&cmd=8`, query);
};
