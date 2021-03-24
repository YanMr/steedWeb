import React, { useEffect, useState } from 'react';
import IconFont from '@/components/IconFont';
import _ from 'lodash';
import { setDeviceControl } from '@/server/device';
import { message } from 'antd';
const RightTabMain = props => {
	const { activeTab = 1, data = {} } = props;
	const state = data.device_state;
	const list = _.get(data, 'iot_module_list', []);
	const listSize = _.size(list);
	/** 渲染物联 */
	const renderInternet = (data = {}, state = 0) => {
		const deviceServer = async params => {
			try {
				const res = await setDeviceControl({ ...params });
				if (_.get(res, 'result.code') == 0) {
					message.success(res.result.text);
					props.fetchDeviceDetail(params.device_id);
				}
			} catch (error) {
				throw error;
			}
		};
		/*设备点击*/
		const onButtonClick = async (e, item, power = false) => {
			e.stopPropagation();
			let params = {
				device_id: data.device_id,
				device_control: {
					control_cmd: '',
					control_unit_info: {
						unit_id: item.unit_id,
						onoff: item.onoff,
						type: item.type
					}
				}
			};
			if (power) {
				params.device_control.control_cmd = 2048; //所有开关 cmd = 2048
			} else {
				const t = item.type;
				// "type": 0:总开关，1：灯光，2：空调 3：投影仪 4:风扇 6:一体机 7:磁控锁/门禁 8:窗帘 9:电脑 10:其它
				if (_.includes([3, 4, 6, 10, 5, 8], t)) {
					params.device_control.control_cmd = 16777216; //投影机/风扇/大屏一体机/自定义设备 功能选择 cmd = 2048
					params.device_control.control_unit_info.select_function = item.function_id;
				}
			}
			try {
				deviceServer(params);
			} catch (error) {
				throw error;
			}
		};
		const getOnoff = onoff => {
			return onoff ? 'danger' : 'disabled';
		};
		const getOnoff2 = onoff => {
			return onoff ? 'light' : 'disabled';
		};
		/* 中控开关 */
		const zongKongClick = async () => {
			const params = {
				device_id: data.device_id,
				device_control: {
					control_cmd: 1,
					device_onoff: data.device_onoff
				}
			};
			deviceServer(params);
		};
		/** 本地控制开关 */
		const bendiClick = async () => {
			const params = {
				device_id: data.device_id,
				device_control: {
					control_cmd: 2,
					device_state: data.device_state
				}
			};
			deviceServer(params);
		};
		/*空调模式修改*/
		const kongtiaoClick = (e, item) => {
			console.log('空调模式', item);
			e.stopPropagation();
			const params = {
				device_id: data.device_id,
				device_control: {
					control_cmd: 2048,
					control_unit_info: {
						unit_id: item.unit_id,
						type: item.type,
						select_function: item.function_id,
						temperature: item.temperature,
						onoff: item.onoff
					}
				}
			};
			deviceServer(params);
		};
		/*空调温度修改*/
		const kongtiaoTemperatureClick = (e, item, type) => {
			e.stopPropagation();
			const currentTemperature = item.temperature;
			let targetTemperature = type == 'up' ? currentTemperature + 1 : currentTemperature - 1;
			if (currentTemperature > 30) {
				targetTemperature = 30;
			} else if (currentTemperature < 20) {
				targetTemperature = 20;
			}
			const params = {
				device_id: data.device_id,
				device_control: {
					control_cmd: 2048,
					control_unit_info: {
						unit_id: item.unit_id,
						type: item.type,
						select_function: item.function_id,
						temperature: targetTemperature,
						onoff: item.onoff
					}
				}
			};
			deviceServer(params);
		};
		return (
			<section className="control-list">
				<div className="control-row control-row-small">
					<div className="control-item ">
						<div className="li light">
							<IconFont type="icon-center" className="icon-center" />
							<div className="control-name" name="中控">
								中控
							</div>
						</div>
						<div className={`li`}>
							<IconFont type="icon-guanbi" className="icon-guanbi" onClick={zongKongClick} />
						</div>
					</div>
					<div className="control-item">
						<div className="li light">
							<IconFont type="icon-kongzhi1" className="icon-center" />
							<div className="control-name" name="中控">
								本地控制
							</div>
						</div>
						<div className={`li`}>
							<IconFont type="icon-icon_list_qiyong" className="icon-guanbi" onClick={bendiClick} />
						</div>
					</div>
				</div>

				{_.map(list, (item, key) => {
					const childrenList = _.get(item, 'module_funtion_list', []);
					// "type": 0:总开关，1：灯光，2：空调 3：投影仪 4:风扇 6:一体机 7:磁控锁/门禁 8:窗帘 9:电脑 10:其它
					return (
						<div key={key + '_div'}>
							{/* {item.type === 0 && (
							<div className="control-row" key={key}>
								<div className="control-item">
									<div className="li light">
										<IconFont type="icon-center" className="icon-center" />
										<div className="control-name" name="中控">
											{item.name}
										</div>
									</div>
									<div className={`li ${getOnoff(item.onoff)}`}>
										<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
									</div>
								</div>
							</div>
						)} */}
							{item.type === 6 && (
								<div className="control-row" key={key}>
									<div className="control-item">
										<div className="li light">
											<IconFont type="icon-yitiji" className="icon-yitiji" />
											<div className="control-name" name="一体机">
												{item.name}
											</div>
										</div>
										<div className="li li-group">
											{_.map(childrenList, (item2, key2) => {
												return (
													<div className={`li mini-li ${state === 0 ? 'disabled' : 'light'}`} key={key2} onClick={e => onButtonClick(e, { ...item, function_id: item2.function_id })}>
														<IconFont type="icon-danxuan" className="icon-radio" />
														<div className="control-name">{item2.function}</div>
													</div>
												);
											})}
										</div>
										<div className={`li ${getOnoff(item.onoff)}`}>
											<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
										</div>
									</div>
								</div>
							)}
							{item.type === 3 && (
								<div className={`control-row ${getOnoff2(item.onoff)}`} key={key}>
									<div className={`control-item ${item.state == 2 && 'disabled'}`}>
										<div className="li light">
											<IconFont type="icon-shexiangji" className="icon-shexiangji font-30" />
											<div className="control-name" name="投影仪">
												{item.name}
											</div>
										</div>
										<div className="li li-group">
											{_.map(childrenList, (item2, key2) => {
												return (
													<div className={`li mini-li ${item.select_function == item2.function_id && 'light'}`} key={key2} onClick={e => onButtonClick(e, { ...item, function_id: item2.function_id })}>
														<IconFont type="icon-danxuan" className="icon-radio" />
														<div className="control-name">{item2.function}</div>
													</div>
												);
											})}
										</div>
										<div className={`li ${getOnoff(item.onoff)}`}>
											<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
										</div>
									</div>
								</div>
							)}
							{item.type === 2 && (
								<div className="control-row" key={key}>
									<div className="control-item">
										<div className="li light">
											<IconFont type="icon-kongtiao-shouye" className="icon-shexiangji font-22" />
											<div className="control-name" name="空调">
												{item.name}
											</div>
										</div>
										<div className="li control-conditioner">
											<div className="conditioner-mode">
												{_.map(childrenList, (item2, key2) => {
													let icon = '';
													const function_id = item2.function_id;
													if (function_id == 1) {
														icon = 'icon-zhilengmoshi';
													} else if (function_id == 3) {
														icon = 'icon-songfengmoshi';
													} else if (function_id == 4) {
														icon = 'icon-zhiremoshi';
													}
													return (
														<React.Fragment key={key2}>
															<IconFont key={key2} type={icon} className={`font-20 ${function_id == item.select_function && 'light'}`} name={item2.function} onClick={e => kongtiaoClick(e, { ...item, function_id: item2.function_id })} />
														</React.Fragment>
													);
												})}
											</div>
											<div className="conditioner-action">
												<IconFont type="icon-kongtiaotiaojie-" className="font-18" onClick={e => kongtiaoTemperatureClick(e, item, 'down')} />
												<div className="c">{item.temperature}℃</div>
												<IconFont type="icon-kongtiaotiaojie" className="font-18" onClick={e => kongtiaoTemperatureClick(e, item, 'up')} />
											</div>
										</div>
										<div className={`li ${getOnoff(item.onoff)}`}>
											<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
										</div>
									</div>
								</div>
							)}
							{item.type === 4 && (
								<div className="control-row" key={key}>
									<div className="control-item">
										<div className="li light">
											<IconFont type="icon-songfengmoshi" className="icon-shexiangji font-22" />
											<div className="control-name" name="风扇">
												{item.name}
											</div>
										</div>
										{_.map(childrenList, (item2, key2) => {
											const icons = {
												1: 'icon-fengshanyidang',
												2: 'icon-fengshanerdangmdpi',
												3: 'icon-fengshansandang',
												4: 'icon-fengshansidang'
											};
											return (
												<div className={`li ${item.select_function == item2.function_id && 'light'}`} key={key2} onClick={e => onButtonClick(e, { ...item, function_id: item2.function_id })}>
													<IconFont type={icons[item2.function_id]} className="icon-shexiangji font-20" />
													<div className="control-name font-12">{item2.function}</div>
												</div>
											);
										})}
										<div className={`li ${getOnoff(item.onoff)}`}>
											<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
										</div>
									</div>
								</div>
							)}

							{(item.type === 8 || item.type === 5) && (
								<div className="control-row" key={key}>
									<div className="control-item">
										<div className="li light">
											<IconFont type={`${item.type == 8 ? 'icon-chuanglian-shouye' : 'icon-tongyongleiyihuamian'}`} className="icon-shexiangji font-22" />
											<div className="control-name" name="窗帘|幕布">
												{item.name}
											</div>
										</div>
										{_.map(childrenList, (item2, key2) => {
											const icons = ['icon-xiaochengxutubiao-46', 'icon-xiaochengxutubiao-47', 'icon-xiaochengxutubiao-48'];
											return (
												<div className={`li ${item.select_function == item2.function_id && 'light'}`} key={key2} onClick={e => onButtonClick(e, { ...item, function_id: item2.function_id })}>
													<IconFont type={icons[key2]} key={key2} className="icon-shexiangji font-32" />
												</div>
											);
										})}
									</div>
								</div>
							)}
							{(item.type === 7 || item.type === 1) && (
								<div className="control-row" key={key}>
									<div className="control-item">
										<div className="li light">
											<IconFont type={`${item.type == 7 ? 'icon-zuoce-anfangmenjin' : 'icon-diandeng-shouye'}`} className="icon-kongzhi1" />
											<div className="control-name" name="门禁|灯光">
												{item.name}
											</div>
										</div>
										<div className={`li ${getOnoff(item.onoff)}`}>
											<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
										</div>
									</div>
								</div>
							)}
							{item.type === 9 && (
								<div className="control-row" key={key}>
									<div className="control-item">
										<div className="li light">
											<IconFont type="icon-xiaochengxutubiao-19" className="icon-kongzhi1" />
											<div className="control-name" name="电脑">
												{item.name}
											</div>
										</div>
										<div className={`li ${getOnoff(item.onoff)}`}>
											<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
										</div>
									</div>
								</div>
							)}
							{item.type == 10 && (
								<div className="control-row" key={key}>
									<div className={`control-item ${item.state == 2 && 'disabled'}`}>
										<div className="li light">
											<IconFont type="icon-qita" className="icon-shexiangji font-22" />
											<div className="control-name" name="其他类型">
												{item.name}
											</div>
										</div>
										{_.map(childrenList, (item2, key2) => {
											return (
												<div key={key2} className={`li li-channel ${item.select_function == item2.function_id && 'light'}`} key={key2} onClick={e => onButtonClick(e, { ...item, function_id: item2.function_id })}>
													<div className="channel">
														<p className="text">{item2.function}</p>
													</div>
												</div>
											);
										})}
										<div className={`li ${getOnoff(item.onoff)}`}>
											<IconFont type="icon-guanbi" className="icon-guanbi" onClick={e => onButtonClick(e, item, true)} />
										</div>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</section>
		);
	};

	const renderControl = () => {
		return (
			<section className="right-control-main">
				<div className="item">
					<IconFont type="icon-wendu" className="icon-wendu" />
					<p className="name">温度 (℃)</p>
					<p className="value-box">25℃</p>
				</div>
				<div className="item">
					<IconFont type="icon-shidu" className="icon-shidu" />
					<p className="name">湿度 (%)</p>
					<p className="value-box">25%</p>
				</div>
				<div className="item">
					<IconFont type="icon-guangzhao" className="icon-guangzhao" />
					<p className="name">光照度 (lx)</p>
					<p className="value-box">100</p>
				</div>
				<div className="item">
					<IconFont type="icon-PM25" className="icon-wendu" />
					<p className="name">PM2.5 (pg/m2)</p>
					<p className="value-box">100</p>
				</div>
			</section>
		);
	};

	const RenderOffLine = () => {
		return (
			<section className="off-line-container">
				<div className="off-line-icon">
					<IconFont type="icon-lixian" className="offline-icon"></IconFont>
				</div>
				<div className="off-line-text">设备离线</div>
			</section>
		);
	};

	const RenderNoData = () => {
		return (
			<section className="off-line-container">
				<div className="off-line-icon">
					<IconFont type="icon-wushuju" className="offline-icon"></IconFont>
				</div>
				<div className="off-line-text">无设备</div>
			</section>
		);
	};

	return (
		<React.Fragment>
			{state === 2 && RenderOffLine()}
			{listSize === 0 && RenderNoData()}
			{listSize > 0 && state !== 2 && <section className="right-tab-main">{activeTab === 1 ? renderInternet(data, state) : renderControl(data, state)}</section>}
		</React.Fragment>
	);
};

export default RightTabMain;
