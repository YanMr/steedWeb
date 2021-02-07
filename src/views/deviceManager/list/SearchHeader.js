import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import IconFont from '@/components/IconFont';
const { Option } = Select;
/** 设备列表页 头部搜索 */
const SearchHeader = () => {
	return (
		<header className="search-header">
			<Form layout="inline" className="searh-header-form">
				<Form.Item label="位置：" className="item">
        <Select defaultValue="全部">
						<Select.Option value="全部">全部</Select.Option>
						<Select.Option>全部1</Select.Option>
						<Select.Option>全部2</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="设备状态：" className="item">
        <Select defaultValue="全部">
						<Select.Option value="全部">全部</Select.Option>
						<Select.Option>全部1</Select.Option>
						<Select.Option>全部2</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="设备状态：" className="item">
					<Select defaultValue="全部">
						<Select.Option value="全部">全部</Select.Option>
						<Select.Option>全部1</Select.Option>
						<Select.Option>全部2</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item className="item">
					<Button type="primary">
						<IconFont type="icon-sousuo" />
						搜索
					</Button>
				</Form.Item>
			</Form>
		</header>
	);
};

export default SearchHeader;
