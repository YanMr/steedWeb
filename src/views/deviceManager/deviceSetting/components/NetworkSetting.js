import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import IconFont from '@/components/IconFont';

const RenderHeader = () => {
	return (
		<header className="module-header">
			<div className="module-header-title">网络设置</div>
		</header>
	);
};
const RenderForm = () => {
	const [autoSelect, setAutoSelect] = useState(false);
	const toggleStatus = () => {
		setAutoSelect(!autoSelect);
	};
	return (
		<div className="form-wrap">
			<Form labelAlign="left">
				<Form.Item label="IP地址">
					<Input placeholder="请输入IP地址"></Input>
				</Form.Item>
				<Form.Item label="默认网关">
					<Input placeholder="请输入默认网关"></Input>
				</Form.Item>
				<Form.Item label="子网掩码">
					<Input placeholder="请输入子网掩码"></Input>
				</Form.Item>
				<Form.Item label="服务器地址">
					<Input placeholder="服务器地址"></Input>
					<button className={`auto-select-service ${autoSelect && 'active'}`} onClick={toggleStatus}>
						<span className="text">自动查找服务器</span>
						{autoSelect && <IconFont type="icon-duigou" />}
					</button>
				</Form.Item>
				<div className="submit-button-box">
					<Button className="submit-button" type="primary">
						保存
					</Button>
				</div>
			</Form>
		</div>
	);
};
const AdvancedSetting = () => {
	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderForm />
		</section>
	);
};

export default AdvancedSetting;
