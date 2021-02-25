import React, { useState } from 'react';
import { Tree, Tooltip, Modal, message, Input, Form } from 'antd';
import IconFont from '@/components/IconFont';
import _ from 'lodash';
const PartitionSetting = (props = {}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalType, setModalType] = useState('');
	const onAddModal = item => {
		setIsModalVisible(true);
		setModalType('add');
		console.log(item);
	};
	const onEditModal = item => {
		setIsModalVisible(true);
		setModalType('edit');
	};
	const handleOk = () => {
		setIsModalVisible(false);
		const messageText = modalType === 'add' ? '添加成功' : '修改成功';
		message.success(messageText);
	};
	const onSelect = (selectedKeys, info) => {
		// console.log('selected', selectedKeys, info);
	};

	const onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
	};

	const onDelRow = () => {
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

	const renderActionIcons = item => {
		return (
			<div className="tree-item">
				<div className="item-content">
					<div className="item-name">
						<span className="text">全部</span>
					</div>
					<div className="item-action-buttons">
						<IconFont type="icon-tianjia1" name="添加" onClick={item => onAddModal(item)} />
						<IconFont type="icon-jianshao" name="减少" onClick={item => onEditModal(item)} />
						<IconFont type="icon-del" name="删除" onClick={onDelRow}/>
					</div>
				</div>
			</div>
		);
	};
	const treeData = [
		{
			title: () => renderActionIcons(),
			key: '0-0',
			children: [
				{
					key: '0-0-0',
					title: () => renderActionIcons(),
					children: [
						{
							key: '0-0-0-0',
							title: () => renderActionIcons()
						},
						{
							key: '0-0-0-1',
							title: () => renderActionIcons()
						}
					]
				},
				{
					key: '0-0-2',
					title: () => renderActionIcons(),
					children: [
						{
							key: '0-0-2-1',
							title: () => renderActionIcons()
						},
						{
							key: '0-0-2-2',
							title: () => renderActionIcons()
						}
					]
				}
			]
		}
	];

	const RenderModal = () => {
		const title = modalType === 'add' ? '添加分区' : '修改分区';
		return (
			<Modal title={title} cancelText="取消" okText="确定" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
				<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
					<Form.Item label="分区名称">
						<Input placeholder="请输入分区名称" />
					</Form.Item>
				</Form>
			</Modal>
		);
	};
	return (
		<div className="tree-wrapper">
			<header className="page-title">分区设置</header>
			<section className="partition-tree">
				<Tree blockNode defaultExpandedKeys={['0-0', '0-0-0']} defaultCheckedKeys={['0-0-0', '0-0-1']} key="key" onSelect={onSelect} onCheck={onCheck} treeData={treeData} />
			</section>
			<RenderModal />
		</div>
	);
};

export default PartitionSetting;
