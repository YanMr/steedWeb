import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Checkbox, Tooltip, Modal, message, Form, Select, Space, Radio } from 'antd';
import IconFont from '@/components/IconFont';
const DeviceTable = (props = {}) => {
	const [pageSize, setPageSize] = useState(10);
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
		tableData.forEach(item => {
			keys.push(item.key);
		});
		setRowSelection({
			onChange,
			selectedRowKeys: isCheckAll ? keys : []
		});
		setCheckAll(!isCheckAll);
	};
	const onCancel = () => {
		props.onCancel();
	};
	const tableHeader = [
		{
			title: () => (
				<div className="device-name-th">
					<IconFont type="icon-0-62" className="icon-equipment" />
					设备
				</div>
			),
			dataIndex: 'equipment',
			key: 'equipment',
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
			key: 'ip',
			textWrap: 'word-break'
		},
		{
			title: () => (
				<div>
					<IconFont type="icon-shebei" className="icon-status" />
					设备状态
				</div>
			),
			dataIndex: 'status',
			key: 'status',
			textWrap: 'word-break',
			render(status) {
				const icon = +status === 1 ? 'icon-duigou' : 'icon-cha1';
				const text = +status === 1 ? '在线' : '离线';
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
			dataIndex: 'wlStatus',
			key: 'wlStatus',
			textWrap: 'word-break',
			width: 440,
			render(text) {
				return (
					<div className="wl-status-btns">
						<div className="item">
							<IconFont type="icon-guanbi" className="font-16" />
							<div className="name">总开关</div>
						</div>
						<div className="item">
							<IconFont type="icon-yitiji" className="font-16" />
							<div className="name">一体机</div>
						</div>
						<div className="item">
							<IconFont type="icon-shexiangji" className="font-16" />
							<div className="name">投影仪</div>
						</div>
						<div className="item">
							<IconFont type="icon-xiaochengxutubiao-19" className="font-16" />
							<div className="name">显示器</div>
						</div>
						<div className="item">
							<IconFont type="icon-zuoce-anfangmenjin" className="font-16" />
							<div className="name">门禁</div>
						</div>
						<div className="item">
							<IconFont type="icon-chuanglian-shouye" className="font-16" />
							<div className="name">窗帘</div>
						</div>
						<div className="item">
							<IconFont type="icon-diandeng-shouye" className="font-16" />
							<div className="name">灯光</div>
						</div>
						<div className="item warn">
							<IconFont type="icon-fengshan-shouye" className="font-16" />
							<div className="name">风扇</div>
						</div>
						<div className="item danger">
							<IconFont type="icon-kongtiao-shouye" className="font-16" />
							<div className="name">空调</div>
						</div>
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
			key: 'key',
			fixed: 'right',
			align: 'center',
			render: v => {
				return (
					<div className="cell-action-btns">
						<Tooltip title="设备设置">
							<IconFont type="icon-xitong1" className="font-16" onClick={() => toSettingPage(v)} />
						</Tooltip>
						<Tooltip title="设备替换/参数复制">
							<IconFont type="icon-view" className="font-16" onClick={() => setIsModalVisible(true)} />
						</Tooltip>
					</div>
				);
			}
		}
	];
	const li = {
		equipment: '教学楼1',
		ip: '192.168.1.002,192.168.1.005',
		status: '0', //1在线 0 离线
		wlStatus: '1111',
		key: 0
	};
	const tableData = [];
	Array.from(new Array(30)).forEach((item, key) => {
		tableData.push({ ...li, key: key, status: key % 2 === 0 ? 1 : 0 });
	});

	const setRowClass = item => {
		return item.status === 0 ? 'disabled' : '';
	};
	const { showCheckBox } = props;
	const toSettingPage = item => {
		history.push(`/device/setting?id=${item.key}`);
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
	}
	return (
		<div className="table-wrap">
			<Table scroll={{ x: 1000 }} selectedRowKeys={[1]} rowSelection={rowSelection} rowClassName={setRowClass} dataSource={tableData} columns={tableHeader} pagination={{ defaultPageSize: 10 }} className="table" />
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
						<IconFont type="icon-del" className="icon-del" onClick={onDel}/>
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
				<Form colon={false} labelAlign='left' wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
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
						<Select placeholder='选择目标设备'>
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
