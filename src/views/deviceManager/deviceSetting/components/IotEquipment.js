import React, { useEffect, useRef, useState } from 'react';
import IconFont from '@/components/IconFont';
import { Table, Tooltip, TimePicker, Modal, message, Space, Input, Form, Select, Checkbox } from 'antd';
import { getQuery } from '../../../../utils';
import { getIotList, getIotListOptions, postAddIot } from '@/server/device';
import _ from 'lodash';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
const IotModule = () => {
	const id = getQuery('id');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalType, setModalType] = useState('');
	const [iotList, setIotList] = useState([]); // 物联设备列表
	const [iotOptios, setIotOptios] = useState([]); // 添加物联设备时的可选参数
	const [brandList, setBrandList] = useState([]); //品牌列表
	const [addForm] = Form.useForm();
	const [addIotFormData] = useState({
		device_id: +id,
		name: '', //物联设备名称
		type: '', //物联设备类型
		port1: '', //物联设备电源控制端口1
		port2: '', //物联设备电源控制端口2
		panid: '', //物联模块物联ID
		boot_time: null, //物联设备开机时间
		off_time: '', //物联设备关机时间
		boot_sync: false, //物联设备开机同步
		off_sync: false, //物联设备关机同步
		send_code_times: '', //物联设备发码次数
		send_code_interval: '', //物联设备发码间隔
		comm_type: '', //物联设备通信控制方式
		comm_port: '', //物联设备通信控制端口
		brand_id: '', //物联设备品牌ID
		comm_address: '' //物联设备通信控制地址
	});

	const onAddModal = () => {
		setIsModalVisible(true);
		setModalType('add');
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
	/** 获取物联设备可选参数 用于添加物联设备 */
	const fetchIotOptions = async () => {
		const res = await getIotListOptions({ device_id: +id });
		console.log('可选参数', res);
		setIotOptios(res);
	};
	/** 获取物联设备列表 */
	const fetchIotList = async () => {
		const res = await getIotList({ device_id: +id });
	};

	// 选择设备类型 找到对应的品牌字段
	// 6 一体机  ： aiopc_brand
	// 3 投影仪 ： projector_brand
	// 2 空调 ： hvac_brand
	// 自定义 user_define_brand
	const chooseType = value => {
		// 0:总开关，1：灯光，2：空调 3：投影仪
		// 4:风扇 6:一体机 7:磁控锁/门禁 8:窗帘 9:电脑 10:其它
		addForm.setFieldsValue({ brand_id: '' });
		const brandKeys = {
			6: 'aiopc_brand',
			3: 'projector_brand',
			2: 'hvac_brand',
			10: 'user_define_brand'
		};
		if (!brandKeys[value]) {
			setBrandList([]);
		} else {
			const key = brandKeys[value] || '';
			const newBrandList = iotOptios[key] || '';
			console.log('newBrandList', newBrandList);
			setBrandList(newBrandList);
		}
	};

	/** 添加物联设备 */
	const handleOk = async () => {
		const messageText = modalType === 'add' ? '添加成功' : '修改成功';
		try {
			const values = await addForm.validateFields();
			console.log('success', values);
			setIsModalVisible(false);
			setModalType('');
			const res = await postAddIot({
				device_unit_info: {
					device_id: +id,
					name: values.name, //物联设备名称
					type: values.type, //物联设备类型
					port1: values.port1, //物联设备电源控制端口1
					port2: values.port2, //物联设备电源控制端口2
					panid: values.panid, //物联模块物联ID
					boot_time: moment(values.boot_time).format('hh:mm:ss'), //物联设备开机时间
					off_time: moment(values.off_time).format('hh:mm:ss'), //物联设备关机时间
					boot_sync: values.boot_sync, //物联设备开机同步
					off_sync: values.off_sync, //物联设备关机同步
					send_code_times: +values.send_code_times, //物联设备发码次数
					send_code_interval: +values.send_code_interval, //物联设备发码间隔
					comm_type: values.comm_type, //物联设备通信控制方式
					comm_port: +values.comm_port, //物联设备通信控制端口
					brand_id: +values.brand_id, //物联设备品牌ID
					comm_address: values.comm_address //物联设备通信控制地址
				}
			});
			if (_.get(res, 'result.code') === 0) {
				message.success(messageText);
				addForm.resetFields();
			}
		} catch (error) {
			console.log('error ', error);
		}
	};

	/** 弹窗关闭 */
	const onModalCancel = () => {
		addForm.resetFields();
		setIsModalVisible(false);
	};
	useEffect(() => {
		fetchIotList();
		fetchIotOptions();
	}, []);

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
							<IconFont type="icon-del" className="icon icon-del" onClick={item => onDelRow(item)} />
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
			<div>
				<Modal transitionName="" maskTransitionName="" forceRender={true} destroyOnClose preserve={false} title={title} cancelText="取消" okText="确定" visible={isModalVisible} onOk={handleOk} onCancel={() => onModalCancel(false)}>
					<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 7 }} initialValues={addIotFormData} form={addForm}>
						<Form.Item
							label="被控设备名称"
							name="name"
							rules={[
								{
									required: true,
									message: '请填写设备名称'
								}
							]}
						>
							<Input placeholder="请输入被控设备名称" />
						</Form.Item>
						<Form.Item
							label="被控设备类型"
							name="type"
							rules={[
								{
									required: true,
									message: '请选择设备类型'
								}
							]}
						>
							<Select placeholder="请选择被控设备类型" onChange={chooseType}>
								{_.map(iotOptios.iot_device_type, (item, key) => {
									return (
										<Select.Option value={item.id} key={key + '_' + item.id + 'iot_device_type'}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item label="物联设备品牌" name="brand_id">
							<Select placeholder="请选择物联设备品牌">
								{_.map(brandList, (item, key) => {
									return (
										<Select.Option value={item.id} key={key + '_' + item.id + 'brand_id'}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>

						<Form.Item
							label="电源控制端口1"
							name="port1"
							rules={[
								{
									required: true,
									message: '请选择电源端口'
								}
							]}
						>
							<Select placeholder="请选择电源控制端口">
								{_.map(iotOptios.power_output_port, (item, key) => {
									return (
										<Select.Option value={item.id} key={key + '_' + item.id + 'port1'}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							label="电源控制端口2"
							name="port2"
							rules={[
								{
									required: true,
									message: '请选择电源端口'
								}
							]}
						>
							<Select placeholder="请选择电源控制端口">
								{_.map(iotOptios.power_output_port, (item, key) => {
									return (
										<Select.Option value={item.id} key={key + '_' + item.id + 'port2'}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item label="物联模块类型" name="panid">
							<Select
								placeholder="请选择物联模块类型"
								rules={[
									{
										required: true,
										message: '请选择物联模块类型'
									}
								]}
							>
								{_.map(iotOptios.iot_module, (item, key) => {
									return (
										<Select.Option value={item.id} key={key + '_' + item.id + 'port2'}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>

						<Form.Item
							label="物联设备开机时间"
							name="boot_time"
							rules={[
								{
									required: true,
									message: '请选择设备开机时间'
								}
							]}
						>
							<TimePicker locale={locale} />
						</Form.Item>
						<Form.Item
							label="物联设备关机时间"
							name="off_time"
							rules={[
								{
									required: true,
									message: '请选择设备关机时间'
								}
							]}
						>
							<TimePicker locale={locale} />
						</Form.Item>
						<Form.Item
							label="物联设备发码次数"
							name="send_code_times"
							rules={[
								{
									required: true,
									message: '请填写发码次数'
								}
							]}
						>
							<Input placeholder="请输入发码次数" />
						</Form.Item>
						<Form.Item
							label="物联设备发码间隔"
							name="send_code_interval"
							rules={[
								{
									required: true,
									message: '请填写发码间隔'
								}
							]}
						>
							<Input placeholder="请输入发码间隔" />
						</Form.Item>

						<Form.Item label="通信方式" name="comm_type">
							<Select
								placeholder="请选择通信方式"
								rules={[
									{
										required: true,
										message: '请选择通信方式'
									}
								]}
							>
								{_.map(iotOptios.udfc_transmit_mode, (item, key) => {
									return (
										<Select.Option value={item.id} key={key + '_' + item.id + 'udfc_transmit_mode'}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>

						<Form.Item label="通信控制端口" name="comm_port">
							<Select
								placeholder="请选择通信控制端口"
								rules={[
									{
										required: true,
										message: '请选择通信控制端口'
									}
								]}
							>
								{_.map(iotOptios.comm_port, (item, key) => {
									return (
										<Select.Option value={item.id} key={key + '_' + item.id + 'udfc_transmit_mode'}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>

						<Form.Item
							label="通信控制地址"
							name="comm_address"
							rules={[
								{
									required: true,
									message: '请填写通信控制地址'
								}
							]}
						>
							<Input placeholder="请填写通信控制地址" />
						</Form.Item>

						<Form.Item label="物联设备开机同步" name="boot_sync" valuePropName="checked">
							<Checkbox />
						</Form.Item>
						<Form.Item label="物联设备关机同步" name="off_sync" valuePropName="checked">
							<Checkbox />
						</Form.Item>
					</Form>
				</Modal>
			</div>
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
