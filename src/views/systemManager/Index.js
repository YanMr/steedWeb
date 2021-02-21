import React, { Component } from 'react';
import { Tabs } from 'antd';
import LogQuery from './logQuery/Index';
import MessageSetting from './messageSetting/Index';
import NetworkLocation from './networkLocation/Index';
import SystemMessage from './systemMessage/Index';
import SystemUpdate from './systemUpdate/Index';
import BreadCrumb from '@/views/layout/BreadCrumb';

import './index.scss'

const { TabPane } = Tabs;

class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  callback = () => {

  }

  render() {
    return (
      <div className="system-user">
        <BreadCrumb/>
        <Tabs defaultActiveKey="1" onChange={() => this.callback()}>
          <TabPane tab="系统信息设置" key="1">
            <SystemMessage />
          </TabPane>
          <TabPane tab="系统版本更新" key="2">
           <SystemUpdate />
          </TabPane>
          <TabPane tab="网络位置" key="3">
           <NetworkLocation />
          </TabPane>
          <TabPane tab="消息设置" key="4">
           <MessageSetting />
          </TabPane>
          <TabPane tab="日志查询" key="5">
           <LogQuery />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default System;
