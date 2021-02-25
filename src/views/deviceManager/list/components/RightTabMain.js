import React from 'react';
import IconFont from '@/components/IconFont';

/** 渲染物联 */
const renderInternet = () => {
	return (
		<section className="control-list">
			<div className="control-row control-row-small">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-center" className="icon-center" />
						<div className="control-name">中控</div>
					</div>
					<div className="li danger">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-kongzhi1" className="icon-kongzhi1" />
						<div className="control-name">本地控制</div>
					</div>
					<div className="li">
						<IconFont type="icon-danxuan" className="icon-danxuan" />
					</div>
				</div>
			</div>

			<div className="control-row">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-yitiji" className="icon-yitiji" />
						<div className="control-name">一体机</div>
					</div>
					<div className="li li-group">
						<div className="li mini-li light">
							<IconFont type="icon-danxuan" className="icon-radio" />
							<div className="control-name">电脑</div>
						</div>
						<div className="li mini-li light">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">VGA</div>
						</div>
					</div>
					<div className="li li-group">
						<div className="li mini-li light">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">html1</div>
						</div>
						<div className="li mini-li light">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">html2</div>
						</div>
					</div>
					<div className="li danger">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>

			<div className="control-row">
				<div className="control-item disabled">
					<div className="li light">
						<IconFont type="icon-shexiangji" className="icon-shexiangji font-30" />
						<div className="control-name">投影仪</div>
					</div>
					<div className="li li-group">
						<div className="li mini-li light">
							<IconFont type="icon-danxuan" className="icon-radio" />
							<div className="control-name">电脑</div>
						</div>
						<div className="li mini-li light">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">VGA</div>
						</div>
					</div>
					<div className="li li-group">
						<div className="li mini-li light">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">html1</div>
						</div>
						<div className="li mini-li light">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">html2</div>
						</div>
					</div>
					<div className="li light">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>

			<div className="control-row">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-kongtiao-shouye" className="icon-shexiangji font-22" />
						<div className="control-name">空调</div>
					</div>
					<div className="li control-conditioner">
						<div className="conditioner-mode">
							<IconFont type="icon-songfengmoshi" className="font-20 light" />
							<IconFont type="icon-zhiremoshi" className="font-20" />
							<IconFont type="icon-zhilengmoshi" className="font-20" />
						</div>
						<div className="conditioner-action">
							<IconFont type="icon-kongtiaotiaojie-" className="font-18 light" />
							<div className="c">16℃</div>
							<IconFont type="icon-kongtiaotiaojie" className="font-18" />
						</div>
					</div>
					<div className="li light">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>

			<div className="control-row">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-songfengmoshi" className="icon-shexiangji font-22" />
						<div className="control-name">风扇</div>
					</div>
					<div className="li light">
						<IconFont type="icon-fengshanyidang" className="icon-shexiangji font-20" />
						<div className="control-name font-12">一档</div>
					</div>
					<div className="li">
						<IconFont type="icon-fengshanyidang" className="icon-shexiangji font-20" />
						<div className="control-name font-12">二档</div>
					</div>
					<div className="li">
						<IconFont type="icon-fengshansandang" className="icon-shexiangji font-20" />
						<div className="control-name font-12">三档</div>
					</div>
					<div className="li">
						<IconFont type="icon-fengshansandang" className="icon-shexiangji font-20" />
						<div className="control-name font-12">四档</div>
					</div>
					<div className="li light">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>

			<div className="control-row">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-songfengmoshi" className="icon-shexiangji font-22" />
						<div className="control-name">频道</div>
					</div>
					<div className="li light"></div>
					<div className="li li-channel light">
						<div className="channel">
							<p className="text">上一</p>
							<p className="text">频道</p>
						</div>
					</div>
					<div className="li li-channel">
						<div className="channel">
							<p className="text">上一</p>
							<p className="text">频道</p>
						</div>
					</div>
					<div className="li li-channel">
						<div className="channel">
							<p className="text">上一</p>
							<p className="text">频道</p>
						</div>
					</div>
					<div className="li li-channel">
						<div className="channel">
							<p className="text">上一</p>
							<p className="text">频道</p>
						</div>
					</div>
					<div className="li light">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>

			<div className="control-row">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-chuanglian-shouye" className="icon-shexiangji font-22" />
						<div className="control-name">窗帘</div>
					</div>
					<div className="li light">
						<IconFont type="icon-xiaochengxutubiao-46" className="icon-shexiangji font-32" />
					</div>
					<div className="li">
						<IconFont type="icon-xiaochengxutubiao-47" className="icon-shexiangji font-32" />
					</div>
					<div className="li">
						<IconFont type="icon-xiaochengxutubiao-48" className="icon-shexiangji font-32" />
					</div>
				</div>
			</div>

			<div className="control-row control-row-small">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-xiaochengxutubiao-19" className="icon-center" />
						<div className="control-name">显示器</div>
					</div>
					<div className="li danger">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-zuoce-anfangmenjin" className="icon-kongzhi1" />
						<div className="control-name">门禁</div>
					</div>
					<div className="li">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>
			<div className="control-row control-row-small">
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-diandeng-shouye" className="icon-center" />
						<div className="control-name">电灯</div>
					</div>
					<div className="li danger">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
				<div className="control-item">
					<div className="li light">
						<IconFont type="icon-diandeng-shouye" className="icon-kongzhi1" />
						<div className="control-name">电灯</div>
					</div>
					<div className="li">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>
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
const RightTabMain = props => {
	const { activeTab = 1 } = props;
	return <section className="right-tab-main">{activeTab === 1 ? renderInternet() : renderControl()}</section>;
};

export default RightTabMain;
