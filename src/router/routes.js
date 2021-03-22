/**
 * @ Description:权限控制，permission 1==超级管理员，其它为普通用户
 */


import Dashboard from '../views/dashboard/Index'; // 首页
import Energy from '../views/deviceManager/energy/Index'; // 能耗统计
import DeviceList from '../views/deviceManager/list/Index'; // 设备列表
import DeviceSetting from '../views/deviceManager/deviceSetting'; // 设备设置
import Statistics from '../views/deviceManager/statistics'; // 设备统计
import Status from '../views/deviceManager/status/Index'; // 物联状态
import Error404 from '../views/error/Error404'; // 404
import Error500 from '../views/error/Error500'; // 500
import Intercept from '../views/permission/Intercept'; // 路由拦截
import Toggle from '../views/permission/Toggle'; // 权限切换
import Scene from '../views/sceneManager/Index'; // 场景管理
import System  from '../views/systemManager/Index'; // 系统与安全
import User  from '../views/systemManager/User'; // 用户管理
import Device  from '../views/systemManager/Device'; // 物联设备管理
import UserSystem  from '../views/userSystem/Index'; // 个人中心
import Partition  from '../views/systemManager/partition/Index'; // 物联设备管理
import NewTask  from '../views/sceneManager/newTask/Index'; // 新建任务

export const routes = [
	{ path: '/dashboard', component: Dashboard },
	{ path: '/device/energy', component: Energy },
	{ path: '/device/list', component: DeviceList },
	{ path: '/device/setting', component: DeviceSetting },
	{ path: '/device/statistics', component: Statistics },
	{ path: '/device/status', component: Status },
	{ path: '/sevice/sevice', component: Scene },
	{ path: '/sevice/newtask', component: NewTask },
	{ path: '/userSystem', component: UserSystem },
	{ path: '/system/index', component: System },
	{ path: '/system/user', component: User },
	{ path: '/system/device', component: Device },
	{ path: '/system/partition', component: Partition },
	{ path: '/permission/toggle', component: Toggle, permission:1 },
	{ path: '/permission/intercept', component: Intercept },
	{ path: '/error/404', component: Error404 },
	{ path: '/error/500', component: Error500 },
];
