import React, { useEffect, useRef, useState } from 'react';
import IconFont from '@/components/IconFont';
import { Table, Tooltip, Modal, message, Space, Input, Form, Select } from 'antd';
import { getDeviceModuleList, postDeviceRename, postDeviceModuleDel } from '@/server/device';
import { getQuery } from '../../../../utils';
import _, { values } from 'lodash';

const IotModule = () => {
	const id = getQuery('id');
	const [isMoalAddVisible, setIsMoalAddVisible] = useState(false); //添加模块 modal
	const [isMoalEditVisible, setIsMoalEditVisible] = useState(false); //配置模块 modal
	const [isMoalUpdateNameVisible, setIsMoalUpdateNameVisible] = useState(false); //修改模块名 modal
	const [moduleList, setModuleList] = useState([]);
	const [currentModule, setCurrentModule] = useState(''); //模块id 点击修改缓存的id
	const [renamefrom] = Form.useForm();
	const [renameDefaultValues, setRenameDefaultValues] = useState({
		new_name: ''
	});
	const modalAddonOk = () => {
		message.success('添加成功');
		setIsMoalAddVisible(false);
	};
	const modalEditonOk = () => {
		message.success('配置成功');
		setIsMoalAddVisible(false);
	};
	const onOpenEditModal = item => {
		setCurrentModule(item);
		setIsMoalEditVisible(true);
	};
	/** 点击修改模块名称的按钮 */
	const onOpenUpdateNameModal = async item => {
		console.log('item', item);
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
	const fetchModuleList = async () => {
		const res = await getDeviceModuleList({ device_id: +id });
		if (_.get(res, 'result.code') === 0) {
			const list = _.get(res, 'iot_module_list', []);
			setModuleList(list);
		}
	};
	useEffect(() => {
		fetchModuleList();
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
				<Table dataSource={moduleList} columns={tableHeader} pagination={false}></Table>
			</div>
		);
	};

	/** 添加物联模块的弹窗 */
	const RenderAddModal = () => {
		return (
			<Modal title="添加物联模块" cancelText="取消" okText="确定" visible={isMoalAddVisible} onOk={modalAddonOk} onCancel={() => setIsMoalAddVisible(false)}>
				<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
					<Form.Item label="名称">
						<Input placeholder="请输入名称" />
					</Form.Item>
					<Form.Item label="模块类型">
						<Select placeholder="请选择模块类型">
							<Select.Option value="1">类型1</Select.Option>
							<Select.Option value="2">类型2</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="模块系列号">
						<Input placeholder="请输入模块系列号" />
					</Form.Item>
				</Form>
			</Modal>
		);
	};

	/** 配置物联模块的弹窗 */
	const RenderEditModal = () => {
		const li = {
			port: '8081',
			bt: '11522222',
			bit: '8',
			stop: '2',
			check: 'NONE'
		};
		const tableData = [];
		Array.from(new Array(5)).forEach((item, key) => {
			tableData.push({ ...li, key: key, status: key % 2 === 0 ? 1 : 0 });
		});
		const tableHeader = [
			{
				title: '端口',
				dataIndex: 'port',
				key: 'port',
				align: 'center'
			},
			{
				title: '波特率',
				dataIndex: 'bt',
				key: 'bt',
				align: 'center',
				render(item) {
					return (
						<Select bordered={false} disabled={item.disabled} defaultValue="1">
							<Select.Option value="1">88888</Select.Option>
							<Select.Option value="2">99999</Select.Option>
						</Select>
					);
				}
			},
			{
				title: '数据位',
				dataIndex: 'bit',
				key: 'bit',
				align: 'center'
			},
			{
				title: '停止位',
				dataIndex: 'stop',
				key: 'stop',
				align: 'center'
			},
			{
				title: '奇偶校验',
				dataIndex: 'check',
				key: 'check',
				align: 'center',
				render(item) {
					return (
						<Select bordered={false} disabled={item.disabled} defaultValue="1">
							<Select.Option value="1">YES</Select.Option>
							<Select.Option value="2">NO</Select.Option>
						</Select>
					);
				}
			},
			{
				title: '操作',
				align: 'center',
				render: item => {
					return (
						<div>
							{!item.inEdit && (
								<Space className="edit-modal-actions">
									<Tooltip title="修改">
										<IconFont type="icon-bi" className="font-16 icon icon-edit" onClick={() => onEdit(item)} />
									</Tooltip>
								</Space>
							)}
							{item.inEdit && (
								<Space className="edit-modal-actions">
									<Tooltip title="保存">
										<IconFont type="icon-duigou1" className="font-20 icon icon-ok" />
									</Tooltip>
									<Tooltip title="取消">
										<IconFont type="icon-delete" className=" font-16 icon icon-del" />
									</Tooltip>
								</Space>
							)}
						</div>
					);
				}
			}
		];
		const onEdit = item => {
			console.log('edit', item);
		};
		return (
			<Modal title="物联模块配置" cancelText="取消" okText="确定" visible={isMoalEditVisible} onOk={modalEditonOk} onCancel={() => setIsMoalEditVisible(false)}>
				<Table bordered dataSource={tableData} columns={tableHeader} pagination={false}></Table>
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
