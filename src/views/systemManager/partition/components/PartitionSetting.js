import React, { useState } from 'react';
import { Tree } from 'antd';
import IconFont from '@/components/IconFont';
import _ from 'lodash';

const treeData = [
	{
		title: () => {
			return (
				<div className="tree-item">
					<div className="item-content">
						<div className="item-name">
							<span className="text">全部</span>
						</div>
						<div className="item-action-buttons">
							<IconFont type="icon-tianjia1" name="添加" />
							<IconFont type="icon-jianshao" name="减少" />
							<IconFont type="icon-del" name="删除" />
						</div>
					</div>
				</div>
			);
		},
		key: '0-0',
		children: [
			{
				key: '0-0-0',
				title: () => {
					return (
						<div className="tree-item">
							<div className="item-content">
								<div className="item-name">
									<span className="text">高一年级</span>
								</div>
								<div className="item-action-buttons">
									<IconFont type="icon-tianjia1" name="添加" />
									<IconFont type="icon-jianshao" name="减少" />
									<IconFont type="icon-del" name="删除" />
								</div>
							</div>
						</div>
					);
				},				
				children: [
					{
						key: '0-0-0-0',
						title: () => {
							return (
								<div className="tree-item">
									<div className="item-content">
										<div className="item-name">
											<span className="text">高一（1）班</span>
										</div>
										<div className="item-action-buttons">
											<IconFont type="icon-jianshao" name="减少" />
											<IconFont type="icon-del" name="删除" />
										</div>
									</div>
								</div>
							);
						},						
					},
					{
						key: '0-0-0-1',
						title: () => {
							return (
								<div className="tree-item">
									<div className="item-content">
										<div className="item-name">
											<span className="text">高一（2）班</span>
										</div>
										<div className="item-action-buttons">
											<IconFont type="icon-jianshao" name="减少" />
											<IconFont type="icon-del" name="删除" />
										</div>
									</div>
								</div>
							);
						},						
					}
				]
			},
			{
				key: '0-0-2',
				title: () => {
					return (
						<div className="tree-item">
							<div className="item-content">
								<div className="item-name">
									<span className="text">高二年级</span>
								</div>
								<div className="item-action-buttons">
									<IconFont type="icon-tianjia1" name="添加" />
									<IconFont type="icon-jianshao" name="减少" />
									<IconFont type="icon-del" name="删除" />
								</div>
							</div>
						</div>
					);
				},				
				children: [
					{
						key: '0-0-2-1',
						title: () => {
							return (
								<div className="tree-item">
									<div className="item-content">
										<div className="item-name">
											<span className="text">高二（1）班</span>
										</div>
										<div className="item-action-buttons">
											<IconFont type="icon-jianshao" name="减少" />
											<IconFont type="icon-del" name="删除" />
										</div>
									</div>
								</div>
							);
						},						
					},
					{
						key: '0-0-2-1',
						title: () => {
							return (
								<div className="tree-item">
									<div className="item-content">
										<div className="item-name">
											<span className="text">高二（2）班</span>
										</div>
										<div className="item-action-buttons">
											<IconFont type="icon-jianshao" name="减少" />
											<IconFont type="icon-del" name="删除" />
										</div>
									</div>
								</div>
							);
						},						
					}
				]
			}			
		]
	}
];
const iconArrowDown = 'icon-sanjiaoxing';
const iconArrowUp = 'icon-sanjiaoxing1';
const iconArrow = iconArrowDown;
const PartitionSetting = (props = {}) => {
	const onSelect = (selectedKeys, info) => {
		console.log('selected', selectedKeys, info);
	};

	const onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
	};

	return (
		<section className="partition-tree">
			<Tree defaultExpandedKeys={['0-0', '0-0-0']} defaultSelectedKeys={['0-0']} defaultCheckedKeys={['0-0-0', '0-0-1']} onSelect={onSelect} onCheck={onCheck} treeData={treeData} />
		</section>
	);
};

export default PartitionSetting;
