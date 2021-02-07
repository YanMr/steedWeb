import React, { useState } from 'react';
import { Tag, Button } from 'antd';
import './index.scss';
import SearchHeader from './components/SearchHeader';
import DeviceTable from './components/DeviceTable';
import RightTab from './components/RightTab';
import RightTabMain from './components/RightTabMain';
const List = () => {
  const [showCheckBox, setShowCheckBox] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
	const toggleEdit = () => {
		setShowCheckBox(!showCheckBox);
  };
  const changeRightTab = (tabIndex) => {
    setActiveTab(tabIndex);
  }
	return (
		<section className="device-page full-content">
			<section className="device-left">
				<section className="custom-layout">
					<header className="custom-layout-header">
						<SearchHeader />
					</header>
					<section className="left-main custom-layout-content">
						<div className="status-control">
							<Tag className="status-button status-online" color="blue">
								在线:20/30
							</Tag>
							<Tag className="status-button status-poweron" color="green">
								开机:20
							</Tag>
							<Tag className="status-button status-turnoff" color="magenta">
								关机:20
							</Tag>
							<Button className="button-edit" type="primary" onClick={toggleEdit}>
								编辑
							</Button>
						</div>
						<DeviceTable showCheckBox={showCheckBox} />
					</section>
				</section>
			</section>
			<section className="device-right">
				<section className="custom-layout">
					<header className="custom-layout-header">
						<RightTab onClickHandle={changeRightTab} activeTab={activeTab}/>
					</header>
					<section className="custom-layout-content">
						<RightTabMain activeTab={activeTab} />
					</section>
				</section>
			</section>
		</section>
	);
};

export default List;
