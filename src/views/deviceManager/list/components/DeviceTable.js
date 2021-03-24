import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Checkbox, Tooltip, Modal, message, Form, Select, Space, Radio } from 'antd';
import IconFont from '@/components/IconFont';
import { deviceSettingCopy, deviceSettingReplce } from '@/server/device';
import _ from 'lodash';

const DeviceTable = (props = {}) => {
	const [rowSelection, setRowSelection] = useState({});
	const [isCheckAll, setCheckAll] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [radio1, setRadio1] = useState('');
	const [radio2, setRadio2] = useState([]);
	const [selecedPlace, setSelecedPlace] = useState([]);
	const placeList = props.placeList || [];
	const [currentDeviceId, setCurrentDeviceId] = useState('');
	const history = useHistory();
	useEffect(() => {
		const { showCheckBox } = props;
		if (showCheckBox) {
			setRowSelection({
				onChange,
				selectedRowKeys: [1, 5]
			});
		} else {
			setRowSelection(null);
		}
	}, [props]);
	const onChange = item => {
		setRowSelection({
			onChange,
			selectedRowKeys: item
		});
	};
	const checkAll = () => {
		const keys = [];
		setRowSelection({
			onChange,
			selectedRowKeys: isCheckAll ? keys : []
		});
		setCheckAll(!isCheckAll);
	};
	const onCancel = () => {
		props.onCancel();
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
	/* 选择参数 高级设置 或 网络设置*/
	const onRadio2Change = e => {
		console.log(e);
		setRadio2(e);
		setSelecedPlace([]);
	};
	/** 重置操作radio和选中的设备位置 */
	const resetRadioAndSelecedPlace = () => {
		setRadio1('');
		setRadio2([]);
		setSelecedPlace([]);
	};
	/** 关闭复制弹窗 */
	const closeModal = () => {
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
	return (
		<div className="table-wrap">
			<Table
				scroll={{ x: 1000 }}
				selectedRowKeys={[1]}
				rowSelection={rowSelection}
				dataSource={props.data}
				columns={tableHeader}
				pagination={{
					defaultPageSize: 10,
					hideOnSinglePage: true,
					total: props.total,
					current: props.current
				}}
				onChange={pageSizeChange}
				rowKey={item => `row${item.id}`}
				className="table"
			/>
			{showCheckBox && (
				<div className="table-bottom-footer">
					<div className="check-all">
						<Checkbox onChange={checkAll}>全选</Checkbox>
					</div>
					<div className="check-total">已选08项</div>
					<div className="action-item">
						<IconFont type="icon-ziyuan" className="icon-tiaojie" />
					</div>
					<div className="action-item">
						<IconFont type="icon-del" className="icon-del" onClick={onDel} />
					</div>
					<div className="action-item">
						<IconFont type="icon-set" className="icon-set" />
					</div>
					<div className="cancel">
						<button className="cancel-button" onClick={onCancel}>
							取消
						</button>
					</div>
				</div>
			)}
			<Modal title="设备替换/参数复制" cancelText="取消" okText="确定" visible={isModalVisible} onOk={onModalConfirm} onCancel={closeModal}>
				<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
					<Form.Item label="操作">
						<Space>
							<Radio.Group value={radio1} onChange={onRadio1Change}>
								<Radio value={1}>参数复制</Radio>
								<Radio value={2}>设备替换</Radio>
							</Radio.Group>
						</Space>
					</Form.Item>
					<Form.Item label="参数">
						<Space>
							<Checkbox.Group value={radio2} onChange={onRadio2Change}>
								<Checkbox value={1}>高级设置</Checkbox>
								<Checkbox value={2}>网络设置</Checkbox>
							</Checkbox.Group>
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
		</div>
	);
};

export default DeviceTable;
