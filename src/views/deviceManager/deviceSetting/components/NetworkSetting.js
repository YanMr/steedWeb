import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import IconFont from '@/components/IconFont';
import { getDeviceSettingNetworkInfo, postDeviceSettingNetworkInfo } from '@/server/device';
import { getQuery } from '../../../../utils';
import _ from 'lodash';

const AdvancedSetting = props => {
	const id = getQuery('id');
	const [data, setData] = useState({});
	const [form] = Form.useForm();
	/** 获取网络信息 */
	const getNetWorkInfo = async () => {
		const res = await getDeviceSettingNetworkInfo({ device_id: +id });
		if (_.get(res, 'result.code') == 0) {
			const data = _.get(res, 'network_config', {});
			setData(data);
		}
	};

	/** 是否自动获取服务器地址 */
	const toggleAutoFind = () => {
		const autoFindServer = !data.find_server_auto;
		setData({
			...data,
			find_server_auto: autoFindServer
		});
		form.setFieldsValue({ find_server_auto: autoFindServer });
	};
	/** 设置网络信息 */
	const postDeviceNetWork = async (params = {}) => {
		const res = await postDeviceSettingNetworkInfo({
			device_id: +id,
			network_config: params
		});
		if (_.get(res, 'result.code') === 0) {
			message.success('操作成功');
			getNetWorkInfo();
		}
	};
	/** 提交表单 */
	const onSunbmit = async () => {
		try {
			const values = await form.validateFields();
			console.log('Success:', values);
			const params = {
				...values,
				bms_ip: values.find_server_auto ? '' : values.bms_ip
			};
			postDeviceNetWork(params);
		} catch (errorInfo) {
			console.log('Failed:', errorInfo);
		}
	};
	useEffect(() => {
		getNetWorkInfo();
	}, []);
	const RenderHeader = () => {
		return (
			<header className="module-header">
				<div className="module-header-title">网络设置</div>
			</header>
		);
	};
	const RenderForm = () => {
		return (
			<div className="form-wrap">
				<Form form={form} labelAlign="left" initialValues={data}>
					<Form.Item
						label="IP地址"
						name="ip"
						rules={[
							{
								required: true,
								message: '请填写ip地址'
							}
						]}
					>
						<Input placeholder="请输入IP地址"></Input>
					</Form.Item>
					<Form.Item
						label="默认网关"
						name="gateway"
						rules={[
							{
								required: true,
								message: '请填写网关'
							}
						]}
					>
						<Input placeholder="请输入默认网关"></Input>
					</Form.Item>
					<Form.Item
						label="子网掩码"
						name="netmask"
						rules={[
							{
								required: true,
								message: '请填写子网掩码'
							}
						]}
					>
						<Input placeholder="请输入子网掩码"></Input>
					</Form.Item>
					<Form.Item
						label="服务器地址"
						name="bms_ip"
						rules={[
							{
								required: true,
								message: '请填写服务器地址'
							}
						]}
					>
						<Input placeholder="服务器地址"></Input>
					</Form.Item>
					<Form.Item label="" name="find_server_auto">
						<button className={`auto-select-service ${data.find_server_auto && 'active'}`} onClick={toggleAutoFind}>
							<span className="text">自动查找服务器</span>
							{data.find_server_auto && <IconFont type="icon-duigou" />}
						</button>
					</Form.Item>
					<div className="submit-button-box">
						<Button className="submit-button" type="primary" onClick={onSunbmit}>
							保存
						</Button>
					</div>
				</Form>
			</div>
		);
	};
	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderForm />
		</section>
	);
};

export default AdvancedSetting;
