import React, { useState, useEffect } from 'react';
import { Tree, Tooltip, Modal, message, Input, Form } from 'antd';
import { getPartitionList, getPartitionEdit, getPartitionAdd, getPartitionDel } from '@/server/system/partition';
import IconFont from '@/components/IconFont';
import _ from 'lodash';

const PartitionSetting = (props = {}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalType, setModalType] = useState('');
	const [partitionName, setPartitionName] = useState('')
  const [treeData, setTreeData] = useState([])
	const [treeId, setTreeId] = useState(undefined)
	const [parentId, setParentId] =  useState(undefined)
	const [level, setLevel] =  useState(undefined)

	useEffect(() => {
		getPartitionListFun()
	}, []);

	// 获取分区列表
	const getPartitionListFun = async() => {
		const { placelist } = await getPartitionList()
		let list = [{
			title: () => renderActionIcons(2),
			key: '0-1',
			level: 2,
			children: []
		}]
		placelist.map((item, index) => {
			list[0].children.push({
				title: renderActionIcons(3,item),
				key: `0-1-${item.id}`,
				level: 3,
				children: []
			})
			item.room && item.room.map(flag => {
				list[0].children[index].children.push({
					title: renderActionIcons(3,flag,3),
					level: 3,
					key: `0-1-${item.id}-${flag.id}`,
				})
			})
		})
		setTreeData(list)
	}

	const renderActionIcons = (type, item, gg)  => {
		return (
			<div className="tree-item">
				<div className="item-content">
					<div className="item-name">
						<span className="text">{type === 2 ? '全部' :item.name}</span>
					</div>
					<div className="item-action-buttons">
					  {
							gg !== 3 ? <IconFont type="icon-tianjia1" name="添加" onClick={() => onAddModal(type, item)} />  :''
					  }
						{
							type !== 2 ? <IconFont type="icon-bi" name="修改" onClick={() => onEditModal(type, item)} /> :''
						}
						{
							type !== 2 ? <IconFont type="icon-del" name="删除" onClick={() => onDelRow(type, item)}/>	:''
						}
					</div>
				</div>
			</div>
		);
	};	

// 内容修改
const	partitionNameFun = e => {
	setPartitionName(e.target.value)
}

// 分区添加
const getPartitionAddFun = async () => {
	const data = await getPartitionAdd({
		"place": {
			"parent_id": parentId,
			"level": level,
			"name": partitionName
	 }
	})
	if (_.get(data, 'result.code') === 0) {
		message.success('操作成功')
		getPartitionListFun()
	}
}

	// 分区修改
 const	getPartitionEditFun = async () => {
		const data = await getPartitionEdit({
			"place": {
        "id": treeId,
        "name": partitionName
     }
		})
		if (_.get(data, 'result.code') === 0) {
			message.success('操作成功')
			getPartitionListFun()
		}
	}
	// 分区删除
  const getPartitionDelFun = async (level, item) => {
		const data = await getPartitionDel({
			"place": {
				"id": item.id,
        "level": level
     }
		})
		if (_.get(data, 'result.code') === 0) {
			message.success('删除成功')
			getPartitionListFun()
		}
	}

	const onAddModal = (level, item) => {
		setIsModalVisible(true);
		setModalType('add');
		setLevel(level);
		setPartitionName('')
		setParentId(item?item.id:0);
		setTreeId(undefined);
	};
	const onEditModal = (level, item) => {
		setIsModalVisible(true);
		setModalType('edit');
		setPartitionName(item.name)
		setTreeId(item.id)
	};

	const onDelRow = (level, item) => {
		Modal.confirm({
			title: '提示',
			content: '确认要删除？',
			okText: '确认',
			cancelText: '取消',
			onOk() { getPartitionDelFun(level, item)}
		});
	};

	const handleOk = () => {
		setIsModalVisible(false);
		modalType === 'add' ? getPartitionAddFun() : 	getPartitionEditFun()
	
	};
	const onSelect = (selectedKeys, info) => {
		// console.log('selected', selectedKeys, info);
	};

	const onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
	};

	return (
		<div className="tree-wrapper">
			<header className="page-title">分区设置</header>
			<section className="partition-tree">
				<Tree blockNode onSelect={onSelect} onCheck={onCheck} treeData={treeData} />
			</section>
			<Modal title={modalType === 'add' ? '添加分区' : '修改分区'} cancelText="取消" okText="确定" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
				<Form colon={false} labelAlign="left" wrapperCol={{ span: 12, offset: 1 }} labelCol={{ span: 3 }}>
					<Form.Item label="分区名称">
						<Input placeholder="请输入分区名称" value={partitionName} onChange={partitionNameFun}/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default PartitionSetting;
