import React, { useState } from 'react';
import Back from '@/components/Back/index';
import { Select } from "antd";
import LineChart from "./componetns/LineChart";

import "./index.scss";

const Statistics = () => {
  const [value, setValue] = useState('全部');
  const onChange = (e) => {
    console.log(e);
    setValue(e);
  }
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
          <LineChart />
				</section>
			</section>
    </section>
  )
}

export default Statistics;