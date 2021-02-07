import React, { useState } from 'react';
import { Tag, Button } from 'antd';
import '@/assets/css/device-list';
import SearchHeader from './SearchHeader';
import DeviceTable from './DeviceTable';

const List = () => {
  const [showCheckBox, setShowCheckBox] = useState(true);
  const toggleEdit = () => {
    console.log('showCheckBox', showCheckBox);
    setShowCheckBox(!showCheckBox)
  }
	return (
		<section className="device-page full-content">
			<section className="device-left">
				<header className="device-page-header">
					<SearchHeader />
				</header>
				<section className="left-main">
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
					<DeviceTable showCheckBox={showCheckBox}/>
				</section>
			</section>
			<section className="device-right">
				<header className="device-page-header">右边</header>
			</section>
		</section>
	);
};

export default List;
