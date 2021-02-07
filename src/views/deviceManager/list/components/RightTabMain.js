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
					<div className="li">
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
					<div className="li">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>

			<div className="control-row">
				<div className="control-item">
					<div className="li disabled">
						<IconFont type="icon-shexiangji" className="icon-shexiangji font-30" />
						<div className="control-name">投影仪</div>
					</div>
					<div className="li li-group disabled">
						<div className="li mini-li light  disabled">
							<IconFont type="icon-danxuan" className="icon-radio" />
							<div className="control-name">电脑</div>
						</div>
						<div className="li mini-li light disabled">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">VGA</div>
						</div> 
          </div>
          <div className="li li-group">
						<div className="li mini-li light disabled">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">html1</div>
						</div>
						<div className="li mini-li light disabled">
							<IconFont type="icon-danxuankuang" className="icon-radio" />
							<div className="control-name">html2</div>
						</div>                                    
					</div>
					<div className="li disabled">
						<IconFont type="icon-guanbi" className="icon-guanbi" />
					</div>
				</div>
			</div>
            
		</section>
	);
};
const RightTabMain = props => {
	return <section className="right-tab-main">{renderInternet()}</section>;
};

export default RightTabMain;
