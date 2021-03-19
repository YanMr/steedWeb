import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tag, Button } from 'antd';
import './index.scss';
import IconFont from '@/components/IconFont';
import SearchHeader from '@/components/SearchHeader';
import DeviceTable from './components/DeviceTable';
import RightTab from './components/RightTab';
import RightTabMain from './components/RightTabMain';

import { getDeviceManage, getDevicePlace, getDeviceDetail } from '@/server/device';
import _ from 'lodash';

const searDataMode = [
	{
		label: '位置：',
		name: 'location',
		type: 'slelct',
		required: true,
		message: '请选择位置！',
		placeholder: '请输入位置',
		defaultValue: 0,
		listData: [
			{
				name: '全部',
				value: 0
			}
		]
	},
	{
		label: '设备状态：',
		name: 'status',
		type: 'slelct',
		defaultValue: '',
		required: false,
		message: '请选择设备状态',
		listData: [
			{ value: '', name: '全部' },
			{ value: '0', name: '关机' },
			{ value: '1', name: '在线' },
			{ value: '2', name: '离线' }
		]
	},
	{ type: 'input', name: 'text', width: '270', defaultValue: '', placeholder: '输入位置、IP地址或序列号进行搜索' },
	{ type: 'button', icon: 'icon-sousuo', color: '#4164F0', defaultValue: '搜索', submit: true }
];

const List = () => {
	const [searchData, setSearchData] = useState(searDataMode);
	const [showCheckBox, setShowCheckBox] = useState(false);
	const [activeTab, setActiveTab] = useState(1);
	const [showRightSider, setShowRightSider] = useState(false);
	const [pageNum, setPageNum] = useState(1);
	const [data, setData] = useState({
		lock_number: 0,
		off_number: 0,
		on_number: 0,
		online_number: 0,
		total: 0,
		list: []
	});
	const [searchParams, setSearchParams] = useState({
		place: '',
		onlineState: '',
		keyword: ''
	});
	const [searchTimeStamp, setsearchTimeStamp] = useState('');
	const [deviceDetail, setDeviceDetail] = useState({});
	const [rowState, setRowState] = useState('0');
	const toggleEdit = () => {
		setShowCheckBox(!showCheckBox);
	};
	const changeRightTab = tabIndex => {
		setActiveTab(tabIndex);
	};

	/** 点击 搜索 */
	const operation = params => {
		console.log(params.data);
		const place = params.data.location;
		const onlineState = params.data.status;
		const keyword = params.data.text || '';
		setSearchParams({ place, onlineState, keyword });
		/** 防止重复触发查询列表 确保只触发1次 */
		if (pageNum == 1) {
			setsearchTimeStamp(new Date().getTime());
		} else {
			setPageNum(1);
		}
	};
	const toggleShowRightSider = () => {
		setShowRightSider(!showRightSider);
	};

	/** 查询设备位置 */
	const fetchDevicePlace = async () => {
		const res = await getDevicePlace();
		if (_.get(res, 'result.code') == 0) {
			const list = _.get(res, 'sort_list', []);
			let placeSelectOption = [];
			_.forEach(list, item => {
				placeSelectOption.push({
					name: item.name,
					value: item.id
				});
			});
			searDataMode[0].defaultValue = _.get(list, '[0].id');
			searDataMode[0].listData = placeSelectOption;
			setSearchData([...searDataMode]);
		}
	};

	/** 查询设备列表 */
	const fetchDeviceList = async () => {
		console.log('pageNUm', pageNum);
		const res = await getDeviceManage({
			page: {
				size: 10,
				page: pageNum
			},
			device_search: {
				keyword: searchParams.keyword,
				place: searchParams.place,
				online_state: searchParams.onlineState
			},
			device_order: ''
		});
		if (_.get(res, 'result.code') === 0) {
			const data = _.get(res, 'device_info_list', {});
			setData(data);
		}
	};

	/** 查询单个设备详情 */
	const fetchDeviceDetail = async item => {
		console.log('row item', item);
		setRowState(_.get(item, 'device_iot_state.device_state', 0));
		setShowRightSider(true);
		const res = await getDeviceDetail({
			device: {
				id: item.id
			}
		});
		if (_.get(res, 'result.code') == 0) {
			const device_control_info = _.get(res, 'device_control_info', {});
			setDeviceDetail(device_control_info);
		}
	};
	useEffect(() => {
		fetchDevicePlace();
	}, []);
	useEffect(() => {
		fetchDeviceList();
	}, [pageNum, searchTimeStamp]);
	const onPageSizeChange = page => {
		setPageNum(page);
	};
	const total = _.get(data, 'total', 0);
	const list = _.get(data, 'device_property_list', []);
	return (
		<section className="device-page full-content">
			<section className={`device-left ${showRightSider && 'showRightSider'}`}>
				<section className="custom-layout">
					<header className="custom-layout-header">
						<SearchHeader data={searchData} operation={operation} />
					</header>
					<section className="left-main custom-layout-content">
						<div className="status-control">
							<Tag className="status-button status-online" color="blue">
								在线:{_.get(data, 'on_number', 0)}/{total}
							</Tag>
							<Tag className="status-button status-poweron" color="green">
								开机:{_.get(data, 'on_number', 0)}/{total}
							</Tag>
							<Tag className="status-button status-turnoff" color="magenta">
								关机:{_.get(data, 'off_number', 0)}/{total}
							</Tag>
							<Tag className="status-button status-lock" color="gold">
								禁用:{_.get(data, 'lock_number', 0)}/{total}
							</Tag>
							<Button className="button-edit" type="primary" onClick={toggleEdit}>
								{showCheckBox ? '取消' : '编辑'}
							</Button>
						</div>
						<DeviceTable data={list} total={total} current={pageNum} showCheckBox={showCheckBox} onCancel={toggleEdit} onPageSizeChange={onPageSizeChange} onItemClick={fetchDeviceDetail} />
					</section>
				</section>
				<div className={`toggleVisibleRight ${showRightSider ? '' : 'active'}`} onClick={toggleShowRightSider}>
					<IconFont type="icon-bofangsanjiaoxing" className="icon-arr" />
				</div>
			</section>
			{showRightSider && (
				<section className="device-right">
					<section className="custom-layout">
						<header className="custom-layout-header">
							<RightTab onClickHandle={changeRightTab} activeTab={activeTab} />
						</header>
						<section className="custom-layout-content">
							<RightTabMain activeTab={activeTab} data={deviceDetail} state={rowState} />
						</section>
					</section>
				</section>
			)}
		</section>
	);
};

export default List;
