import React, { useState } from 'react';
import BreadCrumb from '@/views/layout/BreadCrumb';
import TabHeader from './components/TabHeader';
import PartitionSetting from './components/PartitionSetting';
import ControlCode from './components/ControlCode';

import './index.scss';
const tabList = [
	{
		id: 1,
		name: '分区设置'
	},
	{
		id: 2,
		name: '控制码管理'
	}
];
const Partition = () => {
	const [currentTabId, setCurrentTabId] = useState(tabList[1].id);
	const onTabClick = id => {
		setCurrentTabId(id);
	};
	return (
		<section className="partition-page">
			<section className="custom-layout">
				<header className="custom-layout-header">
					<BreadCrumb />
				</header>
				<section className="custom-layout-content main">
					<section className="partition-main">
						<TabHeader currentTabId={currentTabId} tabList={tabList} setCurrentTabId={onTabClick} />
						<div className="container-box">
							{currentTabId == tabList[0].id && <PartitionSetting />}
							{currentTabId == tabList[1].id && <ControlCode />}
						</div>
					</section>
				</section>
			</section>
		</section>
	);
};

export default Partition;
