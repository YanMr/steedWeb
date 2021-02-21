import React from 'react';
import IconFont from '@/components/IconFont';
import { Table } from 'antd';

const RenderHeader = () => {
	return (
		<header className="module-header">
			<div className="module-header-title module-header-iot">
        <span>物联模块</span>
        <span>
          <IconFont type='icon-tianjia' className='icon'/>  
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
		status: '11-11-03',
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
      title: '操作',
      align: 'center',
			render: () => {
				return (
					<div className="cell-action-btns">
						<IconFont type="icon-bi" className="icon icon-edit" />
						<IconFont type="icon-shezhi" className="icon icon-setting" />
						<IconFont type="icon-del" className="icon icon-del" />
					</div>
				);
			}                       			
		}
	];  
	return (
		<div className="iot-table">
      <Table dataSource={tableData} columns={tableHeader} pagination={{ defaultPageSize: 10 }}></Table>
		</div>
	);
};
const IotModule = () => {
	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderTable />
		</section>
	);
};

export default IotModule;
