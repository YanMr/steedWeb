import React from 'react';
import IconFont from '@/components/IconFont';
import { Table } from 'antd';

const RenderHeader = () => {
	return (
		<header className="module-header">
			<div className="module-header-title module-header-iot">
        <div>物联设备
					<div className="iot-eq-tip">提醒:物联模块使用前请先配对 , 点击查看模块与端口信息操作说明.</div>
				</div>
        <span>
          <IconFont type='icon-tianjia' className='icon'/>  
        </span>
      </div>
		</header>
	);
};
const RenderTable = () => {
  const li = {
		name: '投影仪',
		type: '灯光',
		control: '大功率模块',
		port: '端口3',
		mode: '无',
		ip: '192.168.0.1',
		cport: '无',
		brand: '未知品牌',
		startupTimeLinkage: true,
		startupTime: 60,
		shutdownlinkage: false,
		shutdownTime: 60,
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
			align: 'center',
			textWrap: 'word-break',
			ellipsis: true,
			width: 100
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			width: 100,
			align: 'center',
			textWrap: 'word-break',		
		},
		{
			title: '控制模块',
			dataIndex: 'control',
			key: 'control',
			align: 'center',
			width: 100,
			textWrap: 'word-break',
		},
		{
			title: '电源控制端口',
			dataIndex: 'port',
			key: 'port',
			width: 120,
			align: 'center',
			textWrap: 'word-break',		
		},
		{
			title: '通讯方式',
			dataIndex: 'mode',
			key: 'mode',
			width: 100,
			align: 'center',
			textWrap: 'word-break',		
		},
		{
			title: '通讯控制地址',
			dataIndex: 'ip',
			key: 'ip',
			width: 120,
			align: 'center',
			textWrap: 'word-break',		
		},
		{
			title: '通讯控制端口',
			dataIndex: 'cport',
			key: 'cport',
			align: 'center',
			width: 120,
			textWrap: 'word-break',
		},
		{
			title: '品牌',
			dataIndex: 'brand',
			key: 'brand',
			align: 'center',
			width: 100,
			textWrap: 'word-break',
		},
		{
			title: '开机联动',
			dataIndex: 'startupTimeLinkage',
			key: 'startupTimeLinkage',
			align: 'center',
			width: 100,
			textWrap: 'word-break',
			render(val) {
				const icon = val ? 'icon-weiqiyong' : 'icon-danxuankuang';
				return <IconFont type={icon} className='icon-status'/>
			}
		},	
		{
			title: '开机时间',
			dataIndex: 'startupTime',
			key: 'startupTime',
			width: 100,
			align: 'center',
			textWrap: 'word-break',	
		},
		{
			title: '关机联动',
			dataIndex: 'shutdownlinkage',
			key: 'shutdownlinkage',
			align: 'center',
			width: 100,	
			textWrap: 'word-break',
			render(val) {
				const icon = val ? 'icon-weiqiyong' : 'icon-danxuankuang';
				return <IconFont type={icon} className='icon-status'/>
			}
		},	
		{
			title: '关机时间',
			dataIndex: 'shutdownTime',
			key: 'shutdownTime',
			align: 'center',
			width: 100,
			textWrap: 'word-break',
		},	
		{
			title: '操作',
			align: 'center',
			width: 100,
			textWrap: 'word-break',
			fixed: 'right',
			render: () => {
				return (
					<div className="cell-action-btns">
						<IconFont type="icon-bi" className="icon icon-edit" />
						<IconFont type="icon-del" className="icon icon-del" />
					</div>
				);
			} 			
		},
	];  
	return (
		<div className="iot-table">
      <Table scroll={{x: '100%'}} dataSource={tableData} columns={tableHeader} pagination={{ defaultPageSize: 10 }}></Table>
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
