import React, { useState } from 'react';
import BreadCrumb from '@/views/layout/BreadCrumb';
import TabHeader from './components/TabHeader';
import PartitionSetting from './components/PartitionSetting';

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
	const [currentTabId, setCurrentTabId] = useState(tabList[0].id);
	const onTabClick = id => {
		setCurrentTabId(id);
	};
	return (
		<section className="partition-page">
			<BreadCrumb />
			<section className="partition-main">
				<TabHeader currentTabId={currentTabId} tabList={tabList} setCurrentTabId={onTabClick} />
				<div className="container-box">
					<div className="tree-wrapper">
            <header className="page-title">分区设置</header>
            <PartitionSetting />
          </div>
				</div>
			</section>
		</section>
	);
};

export default Partition;
