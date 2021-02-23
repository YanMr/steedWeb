import React, { useEffect } from 'react';
import * as echarts from 'echarts';
let myChart = null;
const Gauge = (props = {}) => {
	const { id, color } = props;

	const renderChart = () => {
		var chartDom = document.getElementById(id);
		var myChart = echarts.init(chartDom);
		var option;

		option = {
			series: [
				{
					type: 'gauge',
					startAngle: -180,
					endAngle: 180,
					color,
					radius: '80%',
					pointer: {
						show: false
					},
					progress: {
						show: true,
						overlap: false,
						roundCap: false,
						clip: false,
						itemStyle: {
							borderWidth: 1
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							width: 10
						}
					},
					splitLine: {
						show: false,
						distance: 0,
						length: 10
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false,
						distance: 50
					},
					data: [
						{
							value: 80,
							name: '斤斤计较',
							title: {
								show: false,
								offsetCenter: ['0%', '-30%']
							},
							detail: {
								offsetCenter: ['0%', '0%']
							},
							splitLine: {
								show: false
							}
						}
					],
					detail: {
						fontSize: 14,
						color: id === 'gague2' ? '#e1e1e1' : 'auto',
						formatter: '{value}%'
					}
				}
			]
		};

		myChart.setOption(option, true);

		option && myChart.setOption(option);
	};
	useEffect(() => {
		setTimeout(() => {
			renderChart();
		}, 100);
		// return () => (myChart = null);
	}, []);
	return (
		<div className="gauge-box">
			<div className="gauge" id={id}></div>
		</div>
	);
};

export default Gauge;
