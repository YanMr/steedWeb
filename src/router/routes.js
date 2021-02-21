/**
 * @ Description:权限控制，permission 1==超级管理员，其它为普通用户
 */


import Dashboard from '../views/dashboard/Index'; // 首页
import Energy from '../views/deviceManager/Energy'; // 能耗统计
import DeviceList from '../views/deviceManager/list'; // 设备列表
import DeviceSetting from '../views/deviceManager/deviceSetting'; // 设备设置
import Statistical from '../views/deviceManager/Statistical'; // 设备统计
import Error404 from '../views/error/Error404'; // 404
import Error500 from '../views/error/Error500'; // 500
import Intercept from '../views/permission/Intercept'; // 路由拦截
import Toggle from '../views/permission/Toggle'; // 权限切换
import Scene from '../views/sceneManager/Index'; // 场景管理
import System  from '../views/systemManager/Index'; // 系统与安全
import User  from '../views/systemManager/User'; // 用户管理
import Device  from '../views/systemManager/Device'; // 物联设备管理
import UserSystem  from '../views/userSystem/Index'; // 个人中心

export const routes = [
	{ path: '/dashboard', component: Dashboard },
	{ path: '/device/energy', component: Energy },
	{ path: '/device/list', component: DeviceList },
	{ path: '/device/setting', component: DeviceSetting },
	{ path: '/device/statistical', component: Statistical },
	{ path: '/sevice', component: Scene },
	{ path: '/userSystem', component: UserSystem },
	{ path: '/system/index', component: System },
	{ path: '/system/user', component: User },
	{ path: '/system/device', component: Device },
	{ path: '/permission/toggle', component: Toggle, permission:1 },
	{ path: '/permission/intercept', component: Intercept },
	{ path: '/error/404', component: Error404 },
	{ path: '/error/500', component: Error500 },
];
