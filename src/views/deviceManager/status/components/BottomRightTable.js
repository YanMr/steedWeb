import React from 'react';
import {Table} from 'antd';

const BottomRightTable = (props={}) => {
	const li = {
		status: '在线',
    num: '100',
    radio: '50%'
	};
	const tableData = [];
	Array.from(new Array(4)).forEach((item, key) => {
		tableData.push({ ...li, key: key, status: key % 2 === 0 ? 1 : 0 });
  });
  const tableHeader = [
		{
			title: '状态',
			dataIndex: 'status',
      key: 'status',
    },  
		{
			title: '数量',
			dataIndex: 'num',
			key: 'num',
    },
		{
			title: '占比',
			dataIndex: 'radio',
			key: 'radio',
		},            
  ]  
  return (
    <section className="bottom-right-table">
      <header className="table-title">空调总数100台</header>
      <Table dataSource={tableData} columns={tableHeader} pagination={false}/>
    </section>
  )
}

export default BottomRightTable;