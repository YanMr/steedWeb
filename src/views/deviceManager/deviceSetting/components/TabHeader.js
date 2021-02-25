import React, { useState } from 'react';

const TabHeader = ({ tabList, currentTabId, setCurrentTabId}) => {

	return (
		<section className="tab-header-container">
			<section className="tab-header">
				{tabList.map(item => {
					return (
						<div key={item.id} className={`item ${currentTabId === item.id && 'active'}`} onClick={() => setCurrentTabId(item.id)}>
							{item.name}
						</div>
					);
				})}
			</section>
		</section>
	);
};

export default TabHeader;
