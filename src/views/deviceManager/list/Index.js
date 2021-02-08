import React, { useState } from 'react';
import { Tag, Button } from 'antd';
import './index.scss';
import SearchHeader from '@/components/SearchHeader';
import DeviceTable from './components/DeviceTable';
import RightTab from './components/RightTab';
import RightTabMain from './components/RightTabMain';
const searData = [
	{label: '位置：', name:'location', type: 'slelct', defaultValue: '0',  required: true, message: '请选择位置！', listData:[{value:'0',name:'全部'}, {value:'1',name:'全部1'}]},
	{label: '设备状态：', name:'status', type: 'slelct', defaultValue: '0', required: true, message: '请选择设备状态', listData:[{value:'0',name:'全部'}, {value:'1',name:'在线'}, {value:'2',name:'离线'}]},
	{type: 'input', name:'text', width: '300', defaultValue: '0', placeholder: '输入位置、IP地址或序列号进行搜索'},
	{type: 'button', icon: 'icon-sousuo', color: '#4164F0', defaultValue: '搜索', submit: true}
]

const List = () => {
  const [showCheckBox, setShowCheckBox] = useState(true);
	const [activeTab, setActiveTab] = useState(1);
	const toggleEdit = () => {
		setShowCheckBox(!showCheckBox);
  };
  const changeRightTab = (tabIndex) => {
    setActiveTab(tabIndex);
	}
	
	const operation = params => {
		if (params.type = 'search') {
			// 搜索 {type: 'search', data:{location: "0", status: "0", text: undefined}}
			console.log(params.data)
		}
	}

	return (
		<section className="device-page full-content">
			<section className="device-left">
				<section className="custom-layout">
					<header className="custom-layout-header">
						<SearchHeader  data={searData} operation={operation}/>
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
