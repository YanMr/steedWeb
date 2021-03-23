import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Checkbox, Tooltip, Modal, message, Form, Select, Space, Radio } from 'antd';
import IconFont from '@/components/IconFont';
import _ from 'lodash';

const DeviceTable = (props = {}) => {
	const [rowSelection, setRowSelection] = useState({});
	const [isCheckAll, setCheckAll] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
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
		console.log(item);
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
			dataIndex: 'place',
			key: 'cell_1',
			textWrap: 'word-break',
			render(str) {
				return <div className="device-name">{str}</div>;
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
				const device_state =  _.get(row, 'device_iot_state.device_state', []);
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
	const toSettingPage = item => {
		console.log('item', item);
		const state = _.get(item, 'device_iot_state.device_state');
		if (state == 2) {
			message.error('设备离线，不可操作');
		} else {
			history.push(`/device/setting?id=${item.id}`);
		}
	};
	const onEditClick = item => {
		const state = _.get(item, 'device_iot_state.device_state');
		if (state == 2) {
			message.error('设备离线，不可操作');
		} else {
			setIsModalVisible(true);
		}
	};
	const handleOk = () => {
		setIsModalVisible(false);
		message.success('保存成功');
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
		console.log(e);
		const { current } = e;
		props.onPageSizeChange(current);
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
				onRow={item => {
					return {
						onClick() {
							props.onItemClick(item.id);
						}
					};
				}}
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
			<Modal title="设备替换/参数复制" cancelText="取消" okText="确定" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
				<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
					<Form.Item label="操作">
						<Space>
							<Radio.Group>
								<Radio value="radio1">参数复制</Radio>
								<Radio value="radio2">设备替换</Radio>
							</Radio.Group>
						</Space>
					</Form.Item>
					<Form.Item label="参数">
						<Space>
							<Radio.Group>
								<Radio value="radio1">高级设置</Radio>
								<Radio value="radio2">网络设置</Radio>
							</Radio.Group>
						</Space>
					</Form.Item>
					<Form.Item label="目标设备">
						<Select placeholder="选择目标设备">
							<Select.Option value="1">目标设备1</Select.Option>
							<Select.Option value="2">目标设备2</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default DeviceTable;
