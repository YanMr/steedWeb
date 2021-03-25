import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Checkbox, Tooltip, Modal, message, Form, Select, Space, Radio, Switch } from 'antd';
import IconFont from '@/components/IconFont';
import { deviceSettingCopy, deviceSettingReplce, postDeviceDel, postDeviceBatchControl } from '@/server/device';
import _ from 'lodash';

const DeviceTable = (props = {}) => {
	const [rowSelection, setRowSelection] = useState({});
	const [rowIds, setRowIds] = useState([]); // 勾选选择的设备 教室数组
	const [isCheckAll, setCheckAll] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [radio1, setRadio1] = useState('');
	const [radio2, setRadio2] = useState([]);
	const [selecedPlace, setSelecedPlace] = useState([]);
	const [currentDeviceId, setCurrentDeviceId] = useState('');
	const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
	const [batchList, setBatchList] = useState([]); //批量控制项列表 用于展示
	const [batchListBak, setBatchListBak] = useState([]); //批量控制项列表 用于展示(备份数据用于还原switch)
	const checkedBatchIds = useRef([]); //批量控制 弹窗离的选择项
	const source = props.data || []; //table 数据
	const placeList = props.placeList || []; //目标接口位置 列表
	const history = useHistory();

	useEffect(() => {
		const { showCheckBox } = props;
		if (showCheckBox) {
			setRowSelection({
				onChange,
				selectedRowKeys: []
			});
		} else {
			setRowSelection(null);
		}
	}, [props]);

	useEffect(() => {
		const controlOptions = props.controlOptions || [];
		setBatchList(controlOptions);
		setBatchListBak(controlOptions);
	}, [props.controlOptions]);

	const onChange = ids => {
		setRowIds(ids);
		setRowSelection({
			onChange,
			selectedRowKeys: ids
		});
	};
	const checkAll = () => {
		const allKeys = _.map(source, item => item.id);

		const isAllChecked = rowIds.length === source.length;
		const checkedList = isAllChecked ? [] : allKeys;
		setRowSelection({
			onChange,
			selectedRowKeys: checkedList
		});
		setCheckAll(!isCheckAll);
		setRowIds(checkedList);
	};
	const onCancel = () => {
		props.onCancel();
		setRowIds([]);
	};
	const getIotType = type => {
		const iotTypes = {
			0: 'icon-guanbi',
			1: 'icon-diandeng-shouye',
			2: 'icon-kongtiao-shouye',
			3: 'icon-shexiangji',
			4: 'icon-fengshan-shouye',
			5: 'icon-tongyongleiyihuamian', //幕布
			6: 'icon-yitiji',
			7: 'icon-zuoce-anfangmenjin',
			8: 'icon-chuanglian-shouye',
			9: 'icon-xiaochengxutubiao-19',
			10: 'icon-qita' //其他
		};
		return iotTypes[type] || '';
	};
	const tableHeader = [
		{
			title: () => (
				<div className="device-name-th">
					<IconFont type="icon-0-62" className="icon-equipment" />
					设备
				</div>
			),
			key: 'cell_1',
			textWrap: 'word-break',
			render(item) {
				return (
					<div className="device-name" onClick={e => onPlaceNameClick(e, item)}>
						{item.place}
					</div>
				);
			}
		},
		{
			title: () => (
				<div>
					<IconFont type="icon-jilu" className="icon-base-info" />
					基本信息
				</div>
			),
			dataIndex: 'ip',
			key: 'cell_2',
			textWrap: 'word-break'
		},
		{
			title: () => (
				<div>
					<IconFont type="icon-shebei" className="icon-status" />
					设备状态
				</div>
			),
			textWrap: 'word-break',
			key: 'cell_3',
			render(row) {
				const status = _.get(row, 'device_iot_state.device_state', 0);
				const icon = +status === 1 ? 'icon-duigou' : 'icon-cha1';
				let text = '';
				if (status == 0) {
					text = '关机';
				} else if (status == 1) {
					text = '开机';
				} else if (status == 2) {
					text = '离线';
				}
				const className = +status === 1 ? 'light' : 'disabled';
				return (
					<div className="status-icon-box">
						<IconFont type={icon} className={className} />
						{text}
					</div>
				);
			}
		},
		{
			title: () => (
				<div>
					<IconFont type="icon-lianjiezhuangtai" className="icon-wl-status" />
					物联状态
				</div>
			),
			textWrap: 'word-break',
			width: 440,
			key: 'cell_4',
			render(row) {
				const iotState = _.get(row, 'device_iot_state.iot_state', []);
				const device_state = _.get(row, 'device_iot_state.device_state', []);
				return (
					<div className="wl-status-btns">
						{_.map(iotState, (li, key) => {
							return (
								<div className={`item ${device_state == 2 && 'disbaled'}`} key={key}>
									<IconFont type={getIotType(li.type)} className="icon font-16" />
									<div className="name">{li.name}</div>
								</div>
							);
						})}
					</div>
				);
			}
		},
		{
			title: () => {
				return (
					<div>
						<IconFont type="icon-peizhiguanli" className="icon-wl-status" />
						操作
					</div>
				);
			},
			key: 'cell_5',
			fixed: 'right',
			align: 'center',
			render: item => {
				return (
					<div className="cell-action-btns">
						<Tooltip title="设备设置">
							<IconFont type="icon-xitong1" className="font-16" onClick={() => toSettingPage(item)} />
						</Tooltip>
						<Tooltip title="设备替换/参数复制">
							<IconFont type="icon-view" className="font-16" onClick={() => onEditClick(item)} />
						</Tooltip>
					</div>
				);
			}
		}
	];

	const { showCheckBox } = props;
	const onPlaceNameClick = (e, item) => {
		e.stopPropagation();
		props.onItemClick(item.id);
	};
	const toSettingPage = item => {
		const state = _.get(item, 'device_iot_state.device_state');
		if (state == 2) {
			message.error('设备离线，不可操作');
		} else {
			history.push(`/device/setting?id=${item.id}`);
		}
	};
	const onEditClick = item => {
		console.log('当前设备', item);
		const state = _.get(item, 'device_iot_state.device_state');
		if (state == 2) {
			message.error('设备离线，不可操作');
		} else {
			setCurrentDeviceId(item.id);
			setIsModalVisible(true);
		}
	};
	const onDel = () => {
		if (!rowIds.length) {
			message.error('请选择设备');
			return;
		}
		Modal.confirm({
			title: '提示',
			content: '确认要删除？',
			okText: '确认',
			cancelText: '取消',
			async onOk() {
				try {
					const deviceIdArr = _.map(rowIds, item => {
						return {
							id: item
						};
					});
					console.log('deviceIdArr', deviceIdArr);
					const res = await postDeviceDel({
						device: deviceIdArr
					});
					if (_.get(res, 'result.code') === 0) {
						message.success('删除成功');
						props.refreshList(); // 触发设备列表接口刷新
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};
	const pageSizeChange = e => {
		const { current } = e;
		props.onPageSizeChange(current);
	};
	/** 选择目标位置(班级id) */
	const onSeleceChange = placeId => {
		console.log(placeId);
		if (radio1 == 1) {
			setSelecedPlace(placeId);
		} else {
			setSelecedPlace([placeId]);
		}
	};
	/* 选择参数 高级设置 或 网络设置*/
	const onRadio1Change = e => {
		const value = _.get(e, 'target.value');
		console.log(value);
		setRadio1(value);
		setSelecedPlace([]);
	};
	/** 重置操作radio和选中的设备位置 */
	const resetRadioAndSelecedPlace = () => {
		setRadio1('');
		setRadio2([]);
		setSelecedPlace([]);
	};
	/** 关闭复制弹窗 */
	const onModalCancel = () => {
		setIsModalVisible(false);
		resetRadioAndSelecedPlace();
	};
	const onModalConfirm = async () => {
		if (!radio1) {
			message.error('请选择操作类型');
			return;
		}
		if (!radio2) {
			message.error('请选择参数');
			return;
		}
		if (!selecedPlace.length) {
			message.error('请选择目标设备位置');
			return;
		}
		let res = {};
		if (radio1 === 1) {
			// 设备复制
			res = await deviceCopy();
		} else if (radio1 === 2) {
			// 设备替换
			res = await deviceReplace();
		}
		if (_.get(res, 'result.code') === 0) {
			message.success(_.get(res, 'result.text'));
			setIsModalVisible(false);
			resetRadioAndSelecedPlace();
			// props.refreshList();//操作完成后 刷新设备列表
		}
	};
	/** 设备复制请求 */
	const deviceCopy = async () => {
		const res = await deviceSettingCopy({
			device_id: currentDeviceId,
			place_id: selecedPlace,
			menu_ids: radio2
		});
		return res;
	};
	/** 设备替换请求 */
	const deviceReplace = async () => {
		const res = await deviceSettingReplce({
			device_id: currentDeviceId,
			place_id: selecedPlace[0],
			menu_ids: radio2
		});
		return res;
	};
	const openBatchModal = () => {
		if (!rowIds.length) {
			message.error('请选择设备');
			return;
		}
		setIsBatchModalVisible(true);
	};
	/** 批量控制弹窗 点击确认 */
	const onBatchModalConfirm = async () => {
		if (_.size(checkedBatchIds.current) === 0) {
			message.error('请选择设备');
			return;
		}
		const selectArr = _.filter(batchList, item => {
			return _.includes(checkedBatchIds.current, item.type);
		});
		const res = await postDeviceBatchControl({
			device_ids: rowIds,
			batch_control_item: selectArr
		});
		if (_.get(res, 'result.code') === 0) {
			message.success(_.get(res, 'result.text'));
			setIsBatchModalVisible(false);
			props.refreshList(); //操作完成后 刷新设备列表
		}
	};
	/** 批量控制弹窗 点击取消 */
	const onBacthModalCancel = () => {
		setIsBatchModalVisible(false);
		console.log('批量 qu');
		setBatchList([...batchListBak]);
	};
	const onSwitchChange = (e, item) => {
		console.log(e, item);
		const index = _.findIndex(batchList, { ...item });
		batchList.splice(index, 1, { ...item, value: e ? 1 : 0 });
	};
	const batchHeader = [
		{
			title: '设备',
			dataIndex: 'name'
		},
		{
			title: '选择',
			render(item) {
				return <Switch defaultChecked={item.value === 1 ? true : false} checkedChildren="开启" unCheckedChildren="关闭" onChange={e => onSwitchChange(e, item)} />;
			}
		}
	];

	const batchRowSection = {
		type: 'checkbox',
		onChange(ids) {
			console.log(ids);
			checkedBatchIds.current = ids;
			console.log('checkedBatchIds', checkedBatchIds.current);
		}
	};
	return (
		<div className="table-wrap">
			<Table
				scroll={{ x: 1000 }}
				selectedRowKeys={[]}
				rowSelection={rowSelection}
				dataSource={source}
				columns={tableHeader}
				pagination={{
					defaultPageSize: 10,
					hideOnSinglePage: true,
					total: props.total,
					current: props.current
				}}
				onChange={pageSizeChange}
				rowKey={item => item.id}
				className="table"
			/>
			{showCheckBox && (
				<div className="table-bottom-footer">
					<div className="check-all">
						<Checkbox onChange={checkAll} checked={rowIds.length === source.length}>
							全选
						</Checkbox>
					</div>
					<div className="check-total">已选{rowIds.length}项</div>
					<div className="action-item">
						<IconFont type="icon-ziyuan" className="icon-tiaojie" />
					</div>
					<div className="action-item">
						<IconFont type="icon-del" className="icon-del" onClick={onDel} />
					</div>
					<div className="action-item">
						<IconFont type="icon-set" className="icon-set" onClick={openBatchModal} />
					</div>
					<div className="cancel">
						<button className="cancel-button" onClick={onCancel}>
							取消
						</button>
					</div>
				</div>
			)}
			<Modal title="设备替换/参数复制" cancelText="取消" okText="确定" visible={isModalVisible} onOk={onModalConfirm} onCancel={onModalCancel}>
				<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
					<Form.Item label="设备">
						<Space>
							<Radio.Group value={radio1} onChange={onRadio1Change}>
								<Radio value={1}>参数复制</Radio>
								<Radio value={2}>设备替换</Radio>
							</Radio.Group>
						</Space>
					</Form.Item>
					<Form.Item label="目标设备">
						<Select mode={radio1 == 1 ? 'multiple' : ''} value={selecedPlace} filterOption={false} placeholder="选择目标设备" onChange={onSeleceChange}>
							{_.map(placeList, (item, key) => {
								return (
									<Select.OptGroup label={item.name} key={key + '_' + item.id + 'classes'}>
										{_.map(item.room, (item2, key2) => {
											return (
												<Select.Option value={item2.id} key={key2 + '_' + item.id + 'childern'}>
													{item2.name}
												</Select.Option>
											);
										})}
									</Select.OptGroup>
								);
							})}
						</Select>
					</Form.Item>
				</Form>
			</Modal>

			<Modal title="批量控制" cancelText="取消" okText="确定" visible={isBatchModalVisible} onOk={onBatchModalConfirm} onCancel={onBacthModalCancel}>
				<Table dataSource={batchList} columns={batchHeader} rowKey={item => item.type} pagination={false} rowSelection={batchRowSection} bordered className="batch-table"></Table>
			</Modal>
		</div>
	);
};

export default DeviceTable;
