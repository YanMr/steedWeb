import React from 'react';
import { Button, Select, Form, Input, Radio } from 'antd';
import { useState } from 'react';

const RenderHeader = () => {
	const [isBinding, setBinding] = useState(false);
	return (
		<header className="module-header">
			<div className="module-header-title">设备位置</div>
			<div className="module-header-content">
				<div className="left disabled">未绑定</div>
				<div className="right">
					{!isBinding && (
						<Button type="primary" className="mini-button" onClick={() => setBinding(true)}>
							绑定
						</Button>
					)}
					{isBinding && (
						<div className="bind-box">
							<Select placeholder="请选择位置" className="select">
								<Select.Option>请选择位置</Select.Option>
								<Select.Option>教学楼123</Select.Option>
								<Select.Option>教学楼123</Select.Option>
								<Select.Option>教学楼123</Select.Option>
							</Select>
							<Button type="primary" className="mini-button">
								确认
							</Button>
							<Button className="mini-button cancel" onClick={() => setBinding(false)}>
								取消
							</Button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
const RenderForm = () => {
	const [radio, setRadio] = useState(1);
	const onChange = e => {
		console.log('radio checked', e.target.value);
		setRadio(e.target.value);
	};
	return (
		<div className="form-wrap">
			<Form labelAlign="left">
				<Form.Item label="磁控锁开锁延迟(S)">
					<Input placeholder="请输入磁控锁开锁延迟(S)"></Input>
				</Form.Item>
				<Form.Item label="磁控锁开锁电平">
					<Radio.Group value={radio} onChange={onChange}>
						<Radio value={1}>高电平</Radio>
						<Radio value={2}>低电平</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="LCD待机息延迟(S)">
					<Input placeholder="请输LCD待机息延迟(S)"></Input>
				</Form.Item>
        <div className="submit-button-box">
          <Button className='submit-button' type='primary'>保存</Button>
        </div>
			</Form>
		</div>
	);
};
const AdvancedSetting = () => {
	return (
		<section className="AdvancedSetting">
			<RenderHeader />
			<RenderForm />
		</section>
	);
};

export default AdvancedSetting;
