import React from 'react';
import IconFont from '@/components/IconFont';
import _ from 'lodash';

const getIotType = type => {
	const iotTypes = {
		0: 'icon-guanbi',
		1: 'icon-diandeng-shouye',
		2: 'icon-kongtiao-shouye',
		3: 'icon-shexiangji',
		4: 'icon-fengshan-shouye',
		5: 'icon-tongyongleiyihuamian', //幕布
		6: 'icon-yitiji',
		7: 'icon-zuoce-anfangmenjin',
		8: 'icon-chuanglian-shouye',
		9: 'icon-xiaochengxutubiao-19',
		10: 'icon-qita' //其他
	};
	return iotTypes[type] || '';
};

/** 渲染物联 */
const renderInternet = (data = {}, state = 0) => {
	const list = _.get(data, 'iot_module_list', []);
	return (
		<section className="control-list">
			{_.map(list, (item, key) => {
				const childrenList = _.get(item, 'module_funtion_list', []);
				const noChildren = _.size(childrenList) == 0;
				// "type": 0:总开关，1：灯光，2：空调 3：投影仪 4:风扇 6:一体机 7:磁控锁/门禁 8:窗帘 9:电脑 10:其它
				return (
					<div>
						{item.type === 0 && (
							<div className="control-row" key={key}>
								<div className="control-item">
									<div className="li light">
										<IconFont type="icon-center" className="icon-center" />
										<div className="control-name" name="中控">
											{item.name}
										</div>
									</div>
									<div className="li danger">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
									</div>
								</div>
							</div>
						)}
						{item.type == 6 && (
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
												<div className={`li mini-li ${state == 0 ? 'disabled' : 'light'}`} key={key2}>
													<IconFont type="icon-danxuan" className="icon-radio" />
													<div className="control-name">{item2.function}</div>
												</div>
											);
										})}
									</div>
									<div className="li danger">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
									</div>
								</div>
							</div>
						)}
						{item.type == 3 && (
							<div className="control-row">
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
												<div className="li mini-li light" key={key2}>
													<IconFont type="icon-danxuan" className="icon-radio" />
													<div className="control-name">{item2.function}</div>
												</div>
											);
										})}
									</div>
									<div className="li light">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
									</div>
								</div>
							</div>
						)}
						{item.type == 2 && (
							<div className="control-row">
								<div className="control-item">
									<div className="li light">
										<IconFont type="icon-kongtiao-shouye" className="icon-shexiangji font-22" />
										<div className="control-name" name="空调">
											{item.name}
										</div>
									</div>
									<div className="li control-conditioner light">
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
													<React.Fragment>
														<IconFont key={key2} type={icon} className="font-20" name={item2.function} function_id={item2.function_id} />
													</React.Fragment>
												);
											})}
										</div>
										<div className="conditioner-action">
											<IconFont type="icon-kongtiaotiaojie-" className="font-18 light" />
											<div className="c">{item.temperature}℃</div>
											<IconFont type="icon-kongtiaotiaojie" className="font-18" />
										</div>
									</div>
									<div className="li light">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
									</div>
								</div>
							</div>
						)}
						{item.type == 4 && (
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
											<div className="li light" key={key2}>
												<IconFont type={icons[item2.function_id]} className="icon-shexiangji font-20" />
												<div className="control-name font-12">{item2.function}</div>
											</div>
										);
									})}
									<div className="li light">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
									</div>
								</div>
							</div>
						)}

						{(item.type == 8 || item.type == 5) && (
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
											<div className="li light">
												<IconFont type={icons[key2]} key={key2} className="icon-shexiangji font-32" />
											</div>
										);
									})}
								</div>
							</div>
						)}
						{(item.type == 7 || item.type == 1) && (
							<div className="control-row" key={key}>
								<div className="control-item">
									<div className="li light">
										<IconFont type={`${item.type == 7 ? 'icon-zuoce-anfangmenjin' : 'icon-diandeng-shouye'}`} className="icon-kongzhi1" />
										<div className="control-name" name="门禁|灯光">
											{item.name}
										</div>
									</div>
									<div className="li">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
									</div>
								</div>
							</div>
						)}
						{item.type == 9 && (
							<div className="control-row" key={key}>
								<div className="control-item">
									<div className="li light">
										<IconFont type="icon-xiaochengxutubiao-19" className="icon-kongzhi1" />
										<div className="control-name" name="电脑">
											{item.name}
										</div>
									</div>
									<div className="li">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
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
											<div className="li li-channel light" key={key2}>
												<div className="channel">
													<p className="text">{item2.function}</p>
												</div>
											</div>
										);
									})}
									<div className="li light">
										<IconFont type="icon-guanbi" className="icon-guanbi" />
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
				<IconFont type="icon-lixian" className='offline-icon'></IconFont>
			</div>
			<div className="off-line-text">设备离线</div>
		</section>
	);
};
const RightTabMain = props => {
	const { activeTab = 1, data = {}, state = 0 } = props;
	console.log("data", data)
	console.log("state", state)
	return (
		<React.Fragment>
			{state == 2 && RenderOffLine()}
			{state != 2 && <section className="right-tab-main">{activeTab === 1 ? renderInternet(data, state) : renderControl(data, state)}</section>}
		</React.Fragment>
	);
};

export default RightTabMain;
