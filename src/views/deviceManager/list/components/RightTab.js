import React from "react";

const noop = () => {};
const RightTab = (props={}) => {
  const { onClickHandle = noop, activeTab } = props;
  return (
    <section className="tab-bar">
      <div className={`tab-item ${activeTab === 1 && 'active'}`} onClick={() => onClickHandle(1)}>物联</div>
      <div className={`tab-item ${activeTab === 2 && 'active'}`}  onClick={() => onClickHandle(2)}>控制</div>
    </section>
  )
}

export default RightTab;