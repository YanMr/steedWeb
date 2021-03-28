import React, { useState, useEffect } from 'react';
import { getDeviceSettingDetail } from '@/server/device';
import _ from 'lodash';
import { getQuery } from '@/utils';
const DeviceDetail = () => {
	const [detail, setDetail] = useState({});
	/** 获取设备详情 */
	const getDetailData = async () => {
		const id = getQuery('id');
		const res = await getDeviceSettingDetail({ device_id: +id });
		const detailInfo = _.get(res, 'basis_info', {});
		setDetail(detailInfo);
	};
	useEffect(() => {
		getDetailData();
	}, []);

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
					<span className="val">{detail.sn}</span>
				</div>
				<div className="item">
					<span className="key">MAC 地址:</span>
					<span className="val">{detail.mac_address}</span>
				</div>
				<div className="item">
					<span className="key">软件版本:</span>
					<span className="val">{detail.hardware_version}</span>
				</div>
				<div className="item">
					<span className="key">硬件版本:</span>
					<span className="val">{detail.firmware_version}</span>
				</div>
			</section>
		);
	};

	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderDetailContent />
		</section>
	);
};

export default DeviceDetail;
