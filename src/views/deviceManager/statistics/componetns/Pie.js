import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Pie = (props) => {
	const renderChart = () => {
		var chartDom = document.getElementById(props.id);
		var myChart = echarts.init(
			chartDom,
			{},
			{
				devicePixelRatio: 1,
				width: chartDom.clientWidth,
				height: chartDom.clientHeight,
			}
		);
		var option;
		option = {
			tooltip: {
				trigger: 'item'
			},

			series: [
				{
					name: '空调1利用率',
					type: 'pie',
					radius: ['30%', '50%'],
					color: ['#4FB956', '#e1e1e1'],
					data: [
						{ value: 484222, name: '联盟广告' },
						{ value: 300222, name: '视频广告' }
					],
					hoverAnimation: false,
					label: {
						formatter: '{c}',
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
		}, 150);
	}, []);
	return (
		<div className="pie-wrap">
			<div className="pie-title">空调1利用率</div>
			<div className="pie pie2" id={props.id}></div>
			<div className="pie-legend">
				<div className="item on">在线</div>
				<div className="item off">离线</div>
			</div>
		</div>
	);
};

export default Pie;
