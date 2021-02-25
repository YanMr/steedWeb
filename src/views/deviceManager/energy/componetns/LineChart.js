import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';
import _ from 'lodash';

let myChart = null;
const LineChart = props => {
	const isCollapsed = useSelector(state => state.collapse.isCollapsed);
	console.log('isCollapsed', isCollapsed);
	const renderChart = () => {
		myChart && myChart.clear();
		myChart = null;
		var chartDom = document.getElementById('lineChart');
		console.log('chartDom.clientWidth', chartDom.clientWidth);
		myChart = echarts.init(
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
				trigger: 'axis'
			},
			legend: {
				data: ['邮件营销', '联盟广告', '视频广告'],
				bottom: 0
			},
			grid: {
				top: 20,
				bottom: 50,
				left: 40,
				right: 20,
				containLabel: false,
				borderWidth: 0
			},
			toolbox: {
				feature: {}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				axisTick: false,
				axisLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				axisTick: false,
				axisLine: {
					show: false
				}
			},
			series: [
				{
					name: '邮件营销',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210],
					itemStyle: {
						borderWidth: 5
					},
					lineStyle: {
						width: 4,
						color: '#ff0000'
					}
				},
				{
					name: '联盟广告',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310],
					itemStyle: {
						borderWidth: 5
					},
					lineStyle: {
						width: 4,
						color: 'blue'
					}
				},
				{
					name: '视频广告',
					type: 'line',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410],
					itemStyle: {
						borderWidth: 5
					},
					lineStyle: {
						width: 4,
						color: 'yellow'
					}
				}
			]
		};

		option && myChart.setOption(option);
	};
	const watchWindowSize = () => {
		console.log('执行');
		_.delay(() => {
			myChart.resize({
				width: document.getElementById('lineChart').clientWidth
			});
		}, 300);
	};
	useEffect(() => {
		_.delay(() => {
			renderChart();
		}, 50);
	}, []);
	useEffect(() => {
		window.addEventListener('resize', watchWindowSize, false);
		return () => window.removeEventListener('size', watchWindowSize, false);
	});
	useEffect(() => {
		watchWindowSize();
	}, [isCollapsed]);
	return (
		<div className="line-chart-container">
			<div id="lineChart" className="lineChart"></div>
		</div>
	);
};

export default LineChart;
