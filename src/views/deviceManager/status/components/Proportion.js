import React from 'react';
import Gauge from './Gauge';

const types = [
	{
		type: 1,
		name: '在线'
	},
	{
		type: 2,
		name: '离线'
	},
	{
		type: 3,
		name: '关机'
	},
	{
		type: 4,
		name: '禁用'
	}
];
const Proportion = (props = {}) => {
	return (
		<section className="proportion">
			<header className="prop-header">
				<span className="prop-title">数占比</span>
				<div className="type-list">
					{types.map(item => (
						<div className={`item item-type-${item.type}`} key={item.type}>
							{item.name}
						</div>
					))}
				</div>
			</header>
			<section className="gauge-list">
				<Gauge value={98} id="gague1" color="#64D755" />
				<Gauge value={68} id="gague2" color="#828282" />
				<Gauge value={38} id="gague3" color="#FF564C" />
				<Gauge value={38} id="gague4" color="#FFA200" />
			</section>
		</section>
	);
};

export default Proportion;
