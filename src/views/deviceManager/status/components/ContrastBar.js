import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import _ from 'lodash';
let myChart = null;
const ContrastBar = () => {
	const renderChart = () => {
		var chartDom = document.getElementById('contrastBar');
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
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			color: ['#649DA6', '#58455B', '#E96036', '#6F9087', '#284C70', '#C2253A'],
			legend: {
				data: ['电脑', '投影仪', '一体机', '窗帘', '空调', '灯光'],
				top: 10,
				itemWidth: 10,
				itemHeight: 10,
				icon: 'circle'
			},
			grid: {
				left: '0%',
				right: '4%',
				bottom: '3%',
				top: '50',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				axisLine: {
					show: true
				},
				axisTick: {
					show: true
				}
			},
			yAxis: {
				type: 'category',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			series: [
				{
					name: '电脑',
					type: 'bar',
					data: [18203, 23489, 29034, 104970, 131744, 630230, 555555]
					// barWidth: 6
				},
				{
					name: '投影仪',
					type: 'bar',
					// barWidth: 6,
					data: [19325, 23438, 31000, 121594, 134141, 681807, 555555]
				},
				{
					name: '一体机',
					type: 'bar',
					// barWidth: 6,
					data: [19325, 23438, 31000, 121594, 134141, 681807, 555555]
				},
				{
					name: '窗帘',
					type: 'bar',
					// barWidth: 6,
					data: [19325, 23438, 31000, 121594, 134141, 681807, 555555]
				},
				{
					name: '空调',
					type: 'bar',
					// barWidth: 6,
					data: [19325, 23438, 31000, 121594, 134141, 681807, 687456]
				},
				{
					name: '灯光',
					type: 'bar',
					// barWidth: 6,
					data: [19325, 23438, 31000, 121594, 134141, 681807, 123456]
				}
			]
		};

		option && myChart.setOption(option);
	};
	const watchWindowSize = () => {
		_.delay(() => {
			myChart.resize({
				width: document.getElementById('contrastBar').clientWidth
			});
		}, 300);
	};
	useEffect(() => {
		setTimeout(() => {
			renderChart();
		}, 50);
	}, []);
	useEffect(() => {
		window.addEventListener('resize', watchWindowSize, false);
		return () => window.removeEventListener('size', watchWindowSize, false);
	});
	return (
		<section className="contrastBar-wrapper">
			<div id="contrastBar" className="contrastBar"></div>
		</section>
	);
};

export default ContrastBar;
