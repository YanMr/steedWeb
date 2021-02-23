import React, { useState } from 'react';
import Back from '@/components/Back/index';
import { Select, Space, Button, Row, Col, Card } from 'antd';
import Proportion from './components/Proportion';
import TopLeftTable from './components/TopLeftTable';
import ContrastBar from './components/ContrastBar';
import BottomRightTable from './components/BottomRightTable';
import Pie from './components/Pie';
import './index.scss';

const Status = () => {
	const [value, setValue] = useState('全部');
	const onChange = e => {
		console.log(e);
		setValue(e);
	};
	return (
		<section className="status-page">
			<section className="custom-layout">
				<header className="custom-layout-header">
					<Back />
					<Space>
						<div className="select-input">
							<Select value={value} onChange={onChange}>
								<Select.Option value="全部">全部</Select.Option>
								<Select.Option value="全部1">全部1</Select.Option>
							</Select>
						</div>
						<Button className="mini-button green-button">物联使用情况</Button>
						<Button type="primary" className="mini-button">
							数据导出
						</Button>
					</Space>
				</header>
				<section className="custom-layout-content main">
					<Row gutter={30} className="mb-30">
						<Col span={12}>
							<Card className="number-radio-card">
								<Proportion />
								<TopLeftTable />
							</Card>
						</Col>
						<Col span={12}>
							<Card className="utilization">
								<div className="header-title">设备利用率</div>
								<div className="utilization-pies">
									<Pie id='radioPie1' color={['#4FB956', '#e1e1e1']}/>
									<Pie id='radioPie2' color={['#FF564C', '#FFA200']}/>
								</div>
							</Card>
						</Col>
					</Row>
					<Card className="status-page-bottom-card">
						<header className="bottom-card-header">
							<div className="header-title">物联状态</div>
							<div className="status-types">
								<div className="item item-1">在线</div>
								<div className="item item-2">离线</div>
								<div className="item item-3">关线</div>
								<div className="item item-4">禁用</div>
							</div>
						</header>
						<Row gutter={30} className='tow-charts'>
							<Col span="12">
								<ContrastBar />
							</Col>
							<Col span="12">
								<BottomRightTable />
							</Col>
						</Row>
					</Card>
				</section>
			</section>
		</section>
	);
};

export default Status;
