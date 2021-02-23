import React, { Component } from 'react';
import { Select, Table, Tabs } from 'antd';
import '../index.scss'

const { TabPane } = Tabs;

class LogQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {key: 0, id: 'Gin-001', name: 'A-admin', date: '2020-12-18', ip: '192.168.1.1', way: '微信小程序'}
      ],
      columns: [
        {
          title: '序号',
          align: 'center',
          key: 'id',
          dataIndex: 'id',
        },
        {
          title: '用户名称',
          align: 'center',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '登录时间',
          align: 'center',
          key: 'date',
          dataIndex: 'date',
        },
        {
          title: '登录Ip',
          align: 'center',
          key: 'ip',
          dataIndex: 'ip',
        },
        {
          title: '登录方式',
          align: 'center',
          key: 'way',
          dataIndex: 'way',
        },
        
      ],
    }
  }

  render() {
    return (
      <div className="account">
        <div className="account-header">日志查询</div>
        <div className="log-query-main">
          <div className="log-query-select">
          <Select placeholder='请选择查询时间范围' defaultValue='0' style={{ width: '206px' }}>
              <Select.Option value='0'>最近一天</Select.Option>
              <Select.Option value='1'>最近一个月</Select.Option>
          </Select>
          </div>
          <Tabs defaultActiveKey="1">
          <TabPane tab="用户日志" key="1">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
          </TabPane>
          <TabPane tab="设备日志" key="2">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
          </TabPane>
          <TabPane tab="任务日志" key="3">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
          </TabPane>
          <TabPane tab="系统日志" key="4">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
          </TabPane>
        </Tabs>
        </div>
      </div>
    );
  }
}

export default LogQuery;
