import React, { useState } from 'react';
import IconFont from '@/components/IconFont';
import { Table, Tooltip, Modal, message, Space, Input, Form, Select, Checkbox } from 'antd';
const IotModule = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalType, setModalType] = useState('');
	const onAddModal = () => {
		setIsModalVisible(true);
		setModalType('add');
	};
	const handleOk = () => {
		setIsModalVisible(false);
		const messageText = modalType === 'add' ? '添加成功' : '修改成功';
		message.success(messageText);
		setModalType('');
	};
	const onEditModal = () => {
		setIsModalVisible(true);
		setModalType('edit');
	};
	const onDelRow = () => {
		Modal.confirm({
			title: '提示',
			content: '确认要删除？',
			okText: '确认',
			cancelText: '取消',
			onOk() {
				message.success('删除成功');
			}
		});
	};	
	const RenderHeader = () => {
		return (
			<header className="module-header">
				<div className="module-header-title module-header-iot">
					<div>
						物联设备
						<div className="iot-eq-tip">提醒:物联模块使用前请先配对 , 点击查看模块与端口信息操作说明.</div>
					</div>
					<span>
						<IconFont type="icon-tianjia" className="icon" onClick={onAddModal} />
					</span>
				</div>
			</header>
		);
	};
	const RenderTable = () => {
		const li = {
			name: '投影仪',
			type: '灯光',
			control: '大功率模块',
			port: '端口3',
			mode: '无',
			ip: '192.168.0.1',
			cport: '无',
			brand: '未知品牌',
			startupTimeLinkage: true,
			startupTime: 60,
			shutdownlinkage: false,
			shutdownTime: 60
		};
		const tableData = [];
		Array.from(new Array(30)).forEach((item, key) => {
			tableData.push({ ...li, key: key, status: key % 2 === 0 ? 1 : 0 });
		});
		const tableHeader = [
			{
				title: '名称',
				dataIndex: 'name',
				key: 'name',
				align: 'center',
				textWrap: 'word-break',
				ellipsis: true,
				width: 100
			},
			{
				title: '类型',
				dataIndex: 'type',
				key: 'type',
				width: 100,
				align: 'center',
				textWrap: 'word-break'
			},
			{
				title: '控制模块',
				dataIndex: 'control',
				key: 'control',
				align: 'center',
				width: 100,
				textWrap: 'word-break'
			},
			{
				title: '电源控制端口',
				dataIndex: 'port',
				key: 'port',
				width: 120,
				align: 'center',
				textWrap: 'word-break'
			},
			{
				title: '通讯方式',
				dataIndex: 'mode',
				key: 'mode',
				width: 100,
				align: 'center',
				textWrap: 'word-break'
			},
			{
				title: '通讯控制地址',
				dataIndex: 'ip',
				key: 'ip',
				width: 120,
				align: 'center',
				textWrap: 'word-break'
			},
			{
				title: '通讯控制端口',
				dataIndex: 'cport',
				key: 'cport',
				align: 'center',
				width: 120,
				textWrap: 'word-break'
			},
			{
				title: '品牌',
				dataIndex: 'brand',
				key: 'brand',
				align: 'center',
				width: 100,
				textWrap: 'word-break'
			},
			{
				title: '开机联动',
				dataIndex: 'startupTimeLinkage',
				key: 'startupTimeLinkage',
				align: 'center',
				width: 100,
				textWrap: 'word-break',
				render(val) {
					const icon = val ? 'icon-weiqiyong' : 'icon-danxuankuang';
					return <IconFont type={icon} className="icon-status" />;
				}
			},
			{
				title: '开机时间',
				dataIndex: 'startupTime',
				key: 'startupTime',
				width: 100,
				align: 'center',
				textWrap: 'word-break'
			},
			{
				title: '关机联动',
				dataIndex: 'shutdownlinkage',
				key: 'shutdownlinkage',
				align: 'center',
				width: 100,
				textWrap: 'word-break',
				render(val) {
					const icon = val ? 'icon-weiqiyong' : 'icon-danxuankuang';
					return <IconFont type={icon} className="icon-status" />;
				}
			},
			{
				title: '关机时间',
				dataIndex: 'shutdownTime',
				key: 'shutdownTime',
				align: 'center',
				width: 100,
				textWrap: 'word-break'
			},
			{
				title: '操作',
				align: 'center',
				width: 100,
				textWrap: 'word-break',
				fixed: 'right',
				render: item => {
					return (
						<div className="cell-action-btns">
							<IconFont type="icon-bi" className="icon icon-edit" onClick={item => onEditModal(item)} />
							<IconFont type="icon-del" className="icon icon-del" onClick={item => onDelRow(item)}/>
						</div>
					);
				}
			}
		];
		return (
			<div className="iot-table">
				<Table scroll={{ x: '100%' }} dataSource={tableData} columns={tableHeader} pagination={{ defaultPageSize: 10 }}></Table>
			</div>
		);
	};

	const RenderModal = () => {
		const title = modalType === 'add' ? '物联设备添加' : '物联设备修改';
		return (
			<Modal title={title} cancelText="取消" okText="确定" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
				<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
					<Form.Item label="被控设备名称">
						<Input placeholder="请输入被控设备名称" />
					</Form.Item>
					<Form.Item label="被控设备类型">
						<Input placeholder="请输入被控设备类型" />
					</Form.Item>
					<Form.Item label="控制模块">
						<Input placeholder="请输入控制模块" />
					</Form.Item>
					<Form.Item label="电源控制端口">
						<Input placeholder="请输入电源控制端口" />
					</Form.Item>
					<Form.Item label="作品类型">
						<Select placeholder="选择作品类型">
							<Select.Option value="1">类型1</Select.Option>
							<Select.Option value="2">类型2</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="电源控制端口">
						<Input placeholder="请输入电源控制端口" />
					</Form.Item>
					<Form.Item label="开机关联">
						<Checkbox />
					</Form.Item>
				</Form>
			</Modal>
		);
	};
	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderTable />
			<RenderModal />
		</section>
	);
};

export default IotModule;
