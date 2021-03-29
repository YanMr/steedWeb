import React, { useEffect, useRef, useState } from 'react';
import IconFont from '@/components/IconFont';
import { Table, Tooltip, Modal, message, Space, Input, Form, Select } from 'antd';
import { getIotListOptions, getDeviceModuleList, postDeviceRename, postDeviceModuleDel, postDeviceModuleAdd, getDeviceModuleDetail, postDeviceModulePort } from '@/server/device';
import { getQuery } from '../../../../utils';
import _ from 'lodash';

const IotModule = () => {
	const id = getQuery('id');
	const [isMoalAddVisible, setIsMoalAddVisible] = useState(false); //添加模块 modal
	const [isMoalEditVisible, setIsMoalEditVisible] = useState(false); //配置模块 modal
	const [isMoalUpdateNameVisible, setIsMoalUpdateNameVisible] = useState(false); //修改模块名 modal
	const [moduleList, setModuleList] = useState([]);
	const [iotOptios, setIotOptios] = useState([]); // 可选参数
	const [moduleDetail, setModuleDetail] = useState([]); //模块信息
	const [currentModule, setCurrentModule] = useState({}); //模块id 点击修改缓存的id
	const [renamefrom] = Form.useForm();
	const [renameDefaultValues, setRenameDefaultValues] = useState({
		new_name: ''
	});
	const [addModuleForm] = Form.useForm();
	const [addModuleDefaultValues, setAddModuleDefaultValues] = useState({
		device_id: '',
		type: undefined,
		name: '',
		module_sn: ''
	});
	const [btList] = useState([256000, 230400, 128000, 115200, 76800, 57600, 43000, 38400, 19200, 14400, 9600, 4800, 2400]); //波特率列表
	/** 添加模块的弹窗 确认 */
	const modalAddonOk = async () => {
		try {
			const values = await addModuleForm.validateFields();
			const res = await postDeviceModuleAdd({
				device_module: {
					device_id: +id,
					name: values.name,
					type: +values.type,
					sn: +values.module_sn
				}
			});
			if (_.get(res, 'result.code') === 0) {
				message.success('操作成功');
				fetchModuleList();
				setIsMoalAddVisible(false);
				addModuleForm.resetFields();
			}
		} catch (error) {}
	};
	/** 添加模块的弹窗 取消 */
	const modalAddonCancel = () => {
		setIsMoalAddVisible(false);
		addModuleForm.resetFields();
	};
	const modalEditonOk = () => {
		message.success('配置成功');
		setIsMoalAddVisible(false);
	};
	/** 点击编辑模块按钮 */
	const onOpenEditModal = async item => {
		console.log('编辑', item);
		await fetchModuleDetail(item.id);
		setIsMoalEditVisible(true);
	};
	/** 点击修改模块名称的按钮 */
	const onOpenUpdateNameModal = async item => {
		setCurrentModule(item);
		setIsMoalUpdateNameVisible(true);
		setRenameDefaultValues({ new_name: item.name });
		renamefrom.setFieldsValue({ new_name: item.name });
	};
	/** 确认修改模块名称 */
	const modalUpdateNameonOk = async () => {
		try {
			const renamefromData = await renamefrom.validateFields();
			const res = await postDeviceRename({
				device_module: {
					device_id: +id,
					module_id: +currentModule.id,
					new_name: renamefromData.new_name
				}
			});
			if (_.get(res, 'result.code') === 0) {
				message.success('操作成功');
				fetchModuleList();
				setIsMoalUpdateNameVisible(false);
				renamefrom.resetFields();
			}
		} catch (error) {
			console.log('error', error);
		}
	};
	const onDelRow = item => {
		Modal.confirm({
			title: '提示',
			content: '确认要删除？',
			okText: '确认',
			cancelText: '取消',
			async onOk() {
				const res = await postDeviceModuleDel({
					device_id: +id,
					module_id: +item.id,
					panid: +item.panid
				});

				if (_.get(res, 'result.code') === 0) {
					message.success('操作成功');
					fetchModuleList();
				}
			}
		});
	};
	/** 获取可选参数 */
	const fetchIotOptions = async () => {
		const res = await getIotListOptions({ device_id: +id });
		console.log('可选参数', res);
		setIotOptios(res);
	};
	/** 物联模块列表 */
	const fetchModuleList = async () => {
		const res = await getDeviceModuleList({ device_id: +id });
		if (_.get(res, 'result.code') === 0) {
			const list = _.get(res, 'iot_module_list', []);
			setModuleList(list);
		}
	};

	/** 获取模块详情 */
	const fetchModuleDetail = async id => {
		console.log('currentModule', currentModule);
		const res = await getDeviceModuleDetail({ module_id: +id });
		console.log('模块详情', res);
		if (_.get(res, 'result.code') === 0) {
			const uartInfo = _.get(res, 'uart_info', []);
			const data = _.map(uartInfo, item => {
				return {
					...item,
					edit: false
				};
			});
			setModuleDetail(data);
		}
	};

	useEffect(() => {
		fetchModuleList();
		fetchIotOptions();
	}, []);
	const RenderHeader = () => {
		return (
			<header className="module-header">
				<div className="module-header-title module-header-iot">
					<span>物联模块</span>
					<span>
						<Tooltip title="添加物联模块">
							<IconFont type="icon-tianjia" className="icon" onClick={() => setIsMoalAddVisible(true)} />
						</Tooltip>
					</span>
				</div>
			</header>
		);
	};
	const RenderTable = () => {
		const li = {
			name: 'Minnie Ford',
			type: 'asddasas',
			serial: '0000001x0005', //1在线 0 离线
			status: '11-11-03'
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
				align: 'center'
			},
			{
				title: '类型',
				dataIndex: 'type',
				key: 'type',
				align: 'center'
			},
			{
				title: '系列号',
				dataIndex: 'serial',
				key: 'serial',
				align: 'center'
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				align: 'center'
			},
			{
				title: '软件版本',
				dataIndex: 'module_version',
				key: 'module_version',
				align: 'center'
			},
			{
				title: '操作',
				align: 'center',
				render: item => {
					return (
						<div className="cell-action-btns">
							<Tooltip title="物联模块配置">
								<IconFont type="icon-bi" className="icon icon-edit" onClick={() => onOpenEditModal(item)} />
							</Tooltip>
							<Tooltip title="模块名称修改">
								<IconFont type="icon-shezhi" className="icon icon-setting" onClick={() => onOpenUpdateNameModal(item)} />
							</Tooltip>
							<Tooltip title="删除">
								<IconFont type="icon-del" className="icon icon-del" onClick={() => onDelRow(item)} />
							</Tooltip>
						</div>
					);
				}
			}
		];
		return (
			<div className="iot-table">
				<Table rowKey={item => item.id + '_'} dataSource={moduleList} columns={tableHeader} pagination={false}></Table>
			</div>
		);
	};

	/** 添加物联模块的弹窗 */
	const RenderAddModal = () => {
		return (
			<Modal destroyOnClose title="添加物联模块" cancelText="取消" okText="确定" visible={isMoalAddVisible} onOk={modalAddonOk} onCancel={modalAddonCancel}>
				<Form form={addModuleForm} initialValues={addModuleDefaultValues} colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 5 }}>
					<Form.Item
						label="模块名称"
						name="name"
						rules={[
							{
								required: true,
								message: '请输入模块名称'
							}
						]}
					>
						<Input placeholder="请输入模块名称" />
					</Form.Item>
					<Form.Item
						label="模块类型"
						name="type"
						rules={[
							{
								required: true,
								message: '请选择模块类型'
							}
						]}
					>
						<Select placeholder="请选择模块类型">
							{_.map(iotOptios.iot_module_types, (item, key) => {
								return (
									<Select.Option value={item.id} key={key}>
										{item.name}
									</Select.Option>
								);
							})}
						</Select>
					</Form.Item>
					<Form.Item
						label="模块系列号"
						name="module_sn"
						rules={[
							{
								required: true,
								message: '请输入模块系列号'
							}
						]}
					>
						<Input placeholder="请输入模块系列号" />
					</Form.Item>
				</Form>
			</Modal>
		);
	};

	/** 物联模块配置 点编辑 */
	const onPortEditOpen = item => {
		const index = _.findIndex(moduleDetail, { id: item.id });
		moduleDetail.splice(index, 1, { ...item, edit: true });
		setModuleDetail([...moduleDetail]);
		console.log(moduleDetail);
	};

	/** 物联模块配置 取消编辑 */
	const onPortEditClose = item => {
		const index = _.findIndex(moduleDetail, { id: item.id });
		moduleDetail.splice(index, 1, { ...item, edit: false });
		setModuleDetail([...moduleDetail]);
	};

	/*物联模块配置 字段更新*/
	const onModuleFiledChange = (v, index, name) => {
		console.log('typeof', typeof v === 'object');
		if (typeof v === 'object') {
			v.persist();
			v.stopPropagation();
			moduleDetail[index][name] = +_.get(v, 'target.value');
		} else {
			moduleDetail[index][name] = +v;
		}
		console.log(v, index, name);
		console.log(moduleDetail);
	};
	const onPortEditOk = async ({edit, ...item}, index) => {
		if (!item.port) {
			message.error('请选择端口');
			return;
		}
		if (!item.baudrate) {
			message.error('请选择波特率');
			return;
		}
		if (!item.databits) {
			message.error('请选择数据位');
			return;
		}
		if (!item.stopbits) {
			message.error('请选择停止位');
			return;
		}
		if (item.parity != 0 && item.parity != 1 && item.parity != 2) {
			message.error('奇偶校验');
			return;
		}
		const res = await postDeviceModulePort({
			uart_info: item
		})
	};
	/** 配置物联模块的弹窗 */
	const RenderEditModal = () => {
		return (
			<Modal transitionName="" maskTransitionName="" forceRender={true} title="物联模块配置" width="700px" footer={false} cancelText="取消" okText="确定" visible={isMoalEditVisible} onOk={modalEditonOk} onCancel={() => setIsMoalEditVisible(false)}>
				<section className="m-row">
					<div className="m-row-item">端口</div>
					<div className="m-row-item">波特率</div>
					<div className="m-row-item">数据位</div>
					<div className="m-row-item">停止位</div>
					<div className="m-row-item">奇偶校验</div>
					<div className="m-row-item">操作</div>
				</section>
				{_.map(moduleDetail, (item, index) => {
					const disabled = !item.edit;
					return (
						<section className="m-row" key={index}>
							<div className="m-row-item" namporte="端口">
								<Select defaultValue={item.port} onChange={v => onModuleFiledChange(v, index, 'port')} disabled={disabled}>
									{_.map(iotOptios.comm_port, (item, key) => {
										return (
											<Select.Option value={item.name} key={key}>
												{item.name}
											</Select.Option>
										);
									})}
								</Select>
							</div>
							<div className="m-row-item" name="波特率">
								<Select defaultValue={item.baudrate} disabled={disabled} onChange={v => onModuleFiledChange(v, index, 'baudrate')}>
									{_.map(btList, (item, key) => {
										return (
											<Select.Option value={item} key={key}>
												{item}
											</Select.Option>
										);
									})}
								</Select>
							</div>
							<div className="m-row-item" name="数据位">
								<Input defaultValue={item.databits} disabled={disabled} onChange={v => onModuleFiledChange(v, index, 'databits')}></Input>
							</div>
							<div className="m-row-item" name="停止位">
								<Input defaultValue={item.stopbits} disabled={disabled} onChange={v => onModuleFiledChange(v, index, 'stopbits')}></Input>
							</div>
							<div className="m-row-item" name="奇偶校验">
								<Select defaultValue={item.parity} disabled={disabled} onChange={v => onModuleFiledChange(v, index, 'parity')}>
									{_.map(
										[
											{ name: 'NONE', value: 0 },
											{ name: 'ODD', value: 1 },
											{
												name: 'EVEN',
												value: 2
											}
										],
										(item, key) => {
											return (
												<Select.Option value={item.value} key={key}>
													{item.name}
												</Select.Option>
											);
										}
									)}
								</Select>
							</div>
							<div className="m-row-item" name="操作">
								<div className="m-row-actions">
									{item.edit && (
										<React.Fragment>
											<Space size={8}>
												<IconFont onClick={() => onPortEditOk(item, index)} type="icon-duigou1" className="icon font-20 icon1"></IconFont>
											</Space>
											<Space size={8}>
												<IconFont onClick={() => onPortEditClose(item)} type="icon-delete" className="icon icon2 font-18"></IconFont>
											</Space>
										</React.Fragment>
									)}
									{!item.edit && (
										<Space>
											<IconFont onClick={() => onPortEditOpen(item)} type="icon-bi" className="icon font-18"></IconFont>
										</Space>
									)}
								</div>
							</div>
						</section>
					);
				})}
			</Modal>
		);
	};

	/** 修改模块名的弹窗 */
	const RenderUpdateNameModal = () => {
		return (
			<React.Fragment>
				{isMoalUpdateNameVisible && (
					<Modal title="模块名称修改" cancelText="取消" okText="确定" visible={isMoalUpdateNameVisible} onOk={modalUpdateNameonOk} onCancel={() => setIsMoalUpdateNameVisible(false)}>
						<Form form={renamefrom} colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }} initialValues={renameDefaultValues}>
							<Form.Item
								label="模块名称"
								name="new_name"
								rules={[
									{
										required: true,
										message: '请填写服务器地址'
									}
								]}
							>
								<Input placeholder="请输入模块名称" />
							</Form.Item>
						</Form>
					</Modal>
				)}
			</React.Fragment>
		);
	};
	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderTable />
			<RenderAddModal />
			<RenderEditModal />
			<RenderUpdateNameModal />
		</section>
	);
};

export default IotModule;
