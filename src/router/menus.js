/**
 * @ Description:权限控制，permission 1==超级管理员，其它为普通用户
 */

export const menus = [
	{
		path: '/dashboard',
		title: '首页',
		icon: 'icon-zhuye'
	},
	{
		path: '/device',
		title: '设备管理',
		icon: 'icon-shebeiguanli-xuanzhong',
		children: [
			{
				path: '/device/list',
				title: '设备列表',
			},		
			{
				path: '/device/energy',
				title: '能耗统计',
			},
			{
				path: '/device/statistics',
				title: '设备统计',
			}
		]
	},
	{
		path: '/sevice/sevice',
		title: '场景管理',
		icon: 'icon-changjingguanli-xuanzhong',
	},
	{
		path: '/system',
		title: '系统管理',
		icon: 'icon-xitong1',
		children: [
			{
				path: '/system/index',
				title: '系统与安全',
			},
			{
				path: '/system/user',
				title: '用户管理',
			},
			{
				path: '/system/device',
				title: '物联设备管理',
			}
		]
	},
	{
		path: '/userSystem',
		title: '个人中心',
		icon: 'icon-gerenzhongxin-xuanzhong'
	},
	// {
	// 	path: '/permission',
	// 	title: '权限测试',
	// 	icon: 'icon-shouyepiliangguanli',
	// 	children: [
	// 		{
	// 			path: '/permission/toggle',
	// 			title: '权限切换',
	// 			permission: 1
	// 		},
	// 		{
	// 			path: '/permission/intercept',
	// 			title: '路由拦截'
	// 		}
	// 	]
	// },
];
