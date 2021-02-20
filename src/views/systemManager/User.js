import React, { Component } from 'react';
import { Tabs } from 'antd';
import BreadCrumb from '@/views/layout/BreadCrumb';
import Account from './account/Index';
import Card from './card/Index'
import './index.scss'

const { TabPane } = Tabs;

class User extends Component {
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
          <TabPane tab="账号管理" key="1">
            <Account />
          </TabPane>
          <TabPane tab="一卡通" key="2">
            <Card />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default User;
