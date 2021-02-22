import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Pie = () => {
	const renderChart = () => {
		var chartDom = document.getElementById('pie');
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
					name: '访问来源',
					type: 'pie',
					radius: ['30%', '50%'],
					color: ['#4FB956', '#e1e1e1'],
					data: [
						{ value: 484, name: '联盟广告' },
						{ value: 300, name: '视频广告' }
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
		}, 50);
	}, []);
	return (
		<div className="pie-wrap">
			<div id="pie" className="pie"></div>
			<div className="pie-legend">
				<div className="item on">在线</div>
				<div className="item off">离线</div>
			</div>
		</div>
	);
};

export default Pie;
