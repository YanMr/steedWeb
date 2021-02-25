import React, { useState } from 'react';
import Back from '@/components/Back/index';
import { Button } from 'antd';
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
						 <Button className="expot-button" type='primary'>数据导出</Button>
					</div>
				</header>
				<section className="custom-layout-content main">
					<section className="module mb-20">
						<header className="module-title">设备状态</header>
						<div className="module-main">
							<div className="flex-box">
								<BarChart />
								<ElectricTable />
							</div>
						</div>
					</section>

					<section className="module">
						<header className="module-title">设备使用率</header>
						<div className="module-main">
							<div className="charts-group">
								<div className="pie-box pie-box2">
									<Pie id="pie1" />
								</div>
								<div className="pie-box pie-box2">
									<Pie id="pie2" />
								</div>
							</div>
						</div>
					</section>
				</section>
			</section>
		</section>
	);
};

export default Statistics;
