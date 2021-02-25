import React, { useState } from 'react';
import Back from '@/components/Back/index';
import TabHeader from './components/TabHeader';
import AdvancedSetting from './components/AdvancedSetting';
import IotModule from './components/IotModule';
import IotEquipment from './components/IotEquipment';
import NetworkSetting from './components/NetworkSetting';
import DeviceDetail from './components/DeviceDetail';

import './index.scss';
const tabList = [
	{
		id: 1,
		name: '高级设置'
	},
	{
		id: 2,
		name: '物联模块'
	},
	{
		id: 3,
		name: '物联设备'
	},
	{
		id: 4,
		name: '网络设置'
	},
	{
		id: 5,
		name: '设备详情'
	}
];
const DeviceSetting = () => {
	const [currentTabId, setCurrentTabId] = useState(tabList[4].id);
	const onTabClick = id => {
		setCurrentTabId(id);
	};
	return (
		<section className="device-setting-page">
			<section className="custom-layout">
				<header className="custom-layout-header">
					<Back />
					<div className="current-location">
						<span className="location-title">位置：</span>
						<span className="location-desc">教学楼045</span>
					</div>
				</header>
				<section className="custom-layout-content">
					<TabHeader currentTabId={currentTabId} tabList={tabList} setCurrentTabId={onTabClick} />
					<section className="module-wrap">
						<div className="module-main">
							{currentTabId === tabList[0].id && <AdvancedSetting name="高级设置" />}
							{currentTabId === tabList[1].id && <IotModule name="物联模块" />}
							{currentTabId === tabList[2].id && <IotEquipment name="物联设备" />}
							{currentTabId === tabList[3].id && <NetworkSetting name="网络设置" />}
							{currentTabId === tabList[4].id && <DeviceDetail name="设备详情" />}
						</div>
					</section>
				</section>
			</section>
		</section>
	);
};

export default DeviceSetting;
