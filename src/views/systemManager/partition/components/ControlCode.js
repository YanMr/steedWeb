import React, { useState } from 'react';
import IconFont from '@/components/IconFont';
import { Table, Form, Input, Button } from 'antd';

const category = [
	{
		id: 1,
		name: '投影仪'
	},
	{
		id: 2,
		name: '大屏一体机'
	},
	{
		id: 3,
		name: '空调'
	},
	{
		id: 4,
		name: '自定义设备'
	}
];
const ControlCode = (props = {}) => {
	const [currentCategoryId, setCurrentCategoryId] = useState(category[0].id);
	const onChange = ({ id }) => {
		setCurrentCategoryId(id);
	};

	const li = {
		name: '空调',
		lastTime: '2020-02-21 23：45：01'
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
			title: '操作',
			align: 'center',
			render: () => {
				return (
					<div className="cell-action-btns">
						<IconFont type="icon-bi" className="icon icon-edit" />
						<IconFont type="icon-delete" className="icon icon-del" />
					</div>
				);
			}
		}
	];

	return (
		<div className="control-code-wrapper">
			<header className="page-title">设备设置</header>
			<section className="control-code-main">
				<section className="control-code-category">
					{category.map(item => {
						return (
							<div className={`item ${item.id === currentCategoryId && 'active'}`} key={item.id} onClick={() => onChange(item)}>
								{item.name}
							</div>
						);
					})}
				</section>
				<div className="control-container">
					<section className="control-left">
						<div className="left-header">
							<IconFont type="icon-add1" name="添加" className="icon-btn" />
							<IconFont type="icon-sousuo" name="搜索" className="icon-btn" />
						</div>
						<div className="control-table">
							<Table scroll={{ y: 400 }} bordered dataSource={tableData} columns={tableHeader} pagination={false} />
						</div>
					</section>
					<section className="control-right">
						<Form>
							<Form.Item label="名称">
								<Input />
							</Form.Item>
							<Form.Item label="波特率">
								<Input />
							</Form.Item>
							<Form.Item label="开机码">
								<Input />
							</Form.Item>
							<Form.Item label="关机码">
								<Input />
							</Form.Item>
							<div className="group-name">信号源</div>
							<Form.Item label="HDMI1">
								<Input />
							</Form.Item>
							<Form.Item label="HDMI2">
								<Input />
							</Form.Item>
							<Form.Item label="VGA">
								<Input />
							</Form.Item>
							<Form.Item label="DVI">
								<Input />
							</Form.Item>
						</Form>
					</section>
				</div>
			</section>
		</div>
	);
};

export default ControlCode;
