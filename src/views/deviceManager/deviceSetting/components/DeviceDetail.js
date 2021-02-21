import React from 'react';
import IconFont from '@/components/IconFont';
import { Table } from 'antd';

const RenderHeader = () => {
	return (
		<header className="module-header">
			<div className="module-header-title module-header-iot">
        <span>设备详情</span>
      </div>
		</header>
	);
};

const RenderDetailContent = () => {
	return (
		<section className="device-detail">
			<div className="item">
				<span className="key">系列号：</span>
				<span className="val">T11907251187</span>
			</div>
			<div className="item">
				<span className="key">MAC 地址:</span>
				<span className="val">7EF0985E5863</span>
			</div>
			<div className="item">
				<span className="key">软件版本:</span>
				<span className="val">SSE:2.0.8.15-HiSi-Beta-Sep 25 2019 10:46:18 MCU-SW:2.30</span>
			</div>
			<div className="item">
				<span className="key">硬件版本:</span>
				<span className="val">FH:1.0.0 MCU-HW:1.02</span>
			</div>									
		</section>
	)
};
const DeviceDetail = () => {
	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderDetailContent />
		</section>
	);
};

export default DeviceDetail;
