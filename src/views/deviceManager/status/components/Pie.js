import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Pie = props => {
	const color = props.color;
	const renderChart = () => {
		var chartDom = document.getElementById(props.id);
		var myChart = echarts.init(
			chartDom,
			{},
			{
				devicePixelRatio: 1,
				width: chartDom.clientWidth,
				height: chartDom.clientHeight
			}
		);
		var option;
		option = {
			tooltip: {
				trigger: 'item'
			},

			series: [
				{
					name: '设备利用率',
					type: 'pie',
					radius: ['30%', '45%'],
					color,
					data: [
						{ value: 50, name: '在线' },
						{ value: 60, name: '离线' }
					],
					hoverAnimation: false,
					label: {
						formatter: '{c}%'
					},
					emphasis: {
						itemStyle: {
							shadowBlur: 1,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0,0,0,.5)'
						}
					}
				}
			]
		};

		option && myChart.setOption(option);
	};
	useEffect(() => {
		setTimeout(() => {
			renderChart();
		}, 50);
	}, []);
	return (
		<div className="pie-wrap">
			<div className="pie" id={props.id}></div>
			<div className="pie-legend">
				<div className="item on" style={{ color: color[0] }}>
					在线
				</div>
				<div className="item off" style={{ color: color[1] }}>
					离线
				</div>
			</div>
		</div>
	);
};

export default Pie;
