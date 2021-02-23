import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const BarChart = () => {
	const renderChart = () => {
		var chartDom = document.getElementById('BarChart');
		console.log('chartDom.clientWidth', chartDom.clientWidth);
		var myChart = echarts.init(
			chartDom,
			{},
			{
				devicePixelRatio: 1,
				width: chartDom.clientWidth
			}
		);
		var option;
		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				top: 20,
				bottom: 0,
				left: 0,
				right: 20,
				containLabel: true,
				borderWidth: 0
			},
			toolbox: {
				feature: {}
			},
			xAxis: {
				type: 'category',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				axisTick: {
					alignWithLabel: true,
					length: 5
				},

				splitLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				splitLine: {
					show: false
				},
				axisLine: {
					show: true
				},
				axisTick: {
					show: true
				}				
			},
			series: [
				{
					name: '直接访问',
					type: 'bar',
					barWidth: '40%',
					data: [10, 52, 200, 334, 390, 330, 220],
					color: '#4164F0'
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
		<section className="bar-chart-wrapper">
			<div className="chart-title">积累使用时间</div>
			<div id="BarChart" className="BarChart BarChart2"></div>
		</section>
	);
};

export default BarChart;
