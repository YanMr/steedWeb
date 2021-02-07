import React, { useState, useEffect } from 'react';
import { Tag, Button, Table, Checkbox } from 'antd';
import IconFont from '@/components/IconFont';

import '@/assets/css/device-list';
const DeviceTable = (props = {}) => {
  const [pageSize, setPageSize] = useState(10);
  const [rowSelection, setRowSelection] = useState({});
  const [isCheckAll, setCheckAll] = useState(false);
	useEffect(() => {
		const { showCheckBox } = props;
		if (showCheckBox) {
			setRowSelection({
				onChange,
				selectedRowKeys: [1, 5],
			});
		} else {
			setRowSelection(null);
		}
  }, [props]);
  const onChange = item => {
    console.log(item);
    setRowSelection({
      onChange,
      selectedRowKeys: item,
    });    
  };
  const checkAll = () => {
    const keys = [];
    tableData.forEach(item => {
      keys.push(item.key)
    });
    setRowSelection({
      onChange,
      selectedRowKeys: isCheckAll ? keys : [],
    });   
    setCheckAll(!isCheckAll);
  }
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
			key: 'ip'
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
			render(text) {
				return text;
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
	return (
		<div className="table-wrap">
			<Table selectedRowKeys={[1]} rowSelection={rowSelection} rowClassName={setRowClass} dataSource={tableData} columns={tableHeader} pagination={{ defaultPageSize: 10 }} className="table" />
			<div className="table-bottom-footer">
				<div className="check-all">
					<Checkbox onChange={checkAll}>全选</Checkbox>
				</div>
        <div className="check-total">已选08项</div>
        <div className="action-item"><IconFont type='icon-ziyuan' className="icon-tiaojie"/></div>
        <div className="action-item"><IconFont type='icon-del' className="icon-del"/></div>
        <div className="action-item"><IconFont type='icon-set' className="icon-set"/></div>
        <div className="cancel"><button className="cancel-button">取消</button></div>
			</div>
		</div>
	);
};

export default DeviceTable;
