import React from 'react';
import { Table } from 'antd';

const ElectricTable = () => {
	const li = {
		type: '开机',
		times: '3',
		lastTime: '2020-02-21 23：45：01'
	};
	const tableData = [];
	Array.from(new Array(4)).forEach((item, key) => {
		tableData.push({ ...li, key: key, status: key % 2 === 0 ? 1 : 0 });
	});
	const tableHeader = [
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			align: 'center'
		},
		{
			title: '使用次数',
			dataIndex: 'times',
			key: 'times',
			align: 'center'
		},
		{
			title: '最后使用时间',
			dataIndex: 'lastTime',
			key: 'lastTime',
			align: 'center'
		}
	];
	return (
		<section className="electric-table-wrapper2" style={{ width: '45%' }}>
			<Table className="electric-table2" dataSource={tableData} columns={tableHeader} pagination={false}></Table>
		</section>
	);
};

export default ElectricTable;
