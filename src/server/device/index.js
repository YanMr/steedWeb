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

/** 设备设置 网络设置信息获取 */
export const getDeviceSettingNetworkInfo = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=18`, query);
};
/** 设备设置 网络设置信息获取 */
export const postDeviceSettingNetworkInfo = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=19`, query);
};

/** 设备设置 物联设备列表获取 */
export const getIotList = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=13`, query);
};

/** 设备设置 物联设备参数获取 */
export const getIotListOptions = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=15`, query);
};

/** 设备设置 物联设备添加 */
export const postAddIot = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=16`, query);
};

/** 设备设置 物联模块列表获取 */
export const getDeviceModuleList = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=5`, query);
};

/** 设备设置 物联模块配置信息获取 */
export const getDeviceModuleDetail = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=9`, query);
};

/** 设备设置 物联模块修改名称 */
export const postDeviceRename = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=8`, query);
};

/** 设备设置 物联模块删除 */
export const postDeviceModuleDel = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=7`, query);
};

/** 设备设置 物联模块添加 */
export const postDeviceModuleAdd = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=6`, query);
};

/** 设备设置 物联模块串口信息设置 */
export const postDeviceModulePort = (query = {}) => {
	return post(`/app/device-setting?source=4&cmd=10`, query);
};