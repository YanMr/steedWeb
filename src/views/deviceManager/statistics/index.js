import React, { useState } from 'react';
import Back from '@/components/Back/index';
import { Select } from 'antd';
import LineChart from './componetns/LineChart';
import BarChart from './componetns/BarChart';
import Pie from './componetns/Pie';
import ElectricTable from './componetns/ElectricTable';

import './index.scss';

const Statistics = () => {
	const [value, setValue] = useState('全部');
	const onChange = e => {
		console.log(e);
		setValue(e);
	};
	return (
		<section className="statistics-page">
			<section className="custom-layout">
				<header className="custom-layout-header">
					<Back />
					<div className="select-input">
						<Select value={value} onChange={onChange}>
							<Select.Option value="全部">全部</Select.Option>
							<Select.Option value="全部1">全部1</Select.Option>
						</Select>
					</div>
				</header>
				<section className="custom-layout-content main">
					<section className="module mb-20">
						<header className="module-title">设备状态</header>
						<LineChart />
					</section>
					<section className="module">
						<header className="module-title">设备使用率</header>
						<div className="module-main">
							<div className="charts-group mb-20">
								<BarChart />
								<div className="pie-box">
									<Pie />
								</div>
							</div>
							<ElectricTable />
						</div>
					</section>
				</section>
			</section>
		</section>
	);
};

export default Statistics;
