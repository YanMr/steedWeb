import React, { Component } from 'react';
import { Select, Table, Tabs } from 'antd';
import { getLogList } from '@/server/system/network'
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
      page: 1,
      size: 10,
      log_time: 1,
      log_type: 1,
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,
    }
  }

  componentDidMount() {
    this.getLogListFun()
  }

  logChange = (e) => {
    this.setState({
      log_type: e
    }, () => {
      this.getLogListFun()
    })
  }

  getLogListFun = async() => {
    const data = await getLogList({
      "page": {
          "page": 1,
          "size": 10
      },
      "log_info": {
          "log_type":Number(this.state.log_type),
          "log_time": Number(this.state.log_time)
      }
    })

  }

  logTimeFun = (e) => {
    this.setState({
      log_time: e
    }, () => {
      this.getLogListFun()
    })
  }

  render() {
    return (
      <div className="account">
        <div className="account-header">日志查询</div>
        <div className="log-query-main">
          <div className="log-query-select">
          <Select placeholder='请选择查询时间范围' defaultValue='1' onChange={this.logTimeFun} style={{ width: '206px' }}>
              <Select.Option value='1'>最近一天</Select.Option>
              <Select.Option value='2'>最近一周</Select.Option>
              <Select.Option value='3'>最近一个月</Select.Option>
              <Select.Option value='4'>最近三个月</Select.Option>
          </Select>
          </div>
          <Tabs defaultActiveKey="1" onChange={this.logChange}>
          <TabPane tab="用户日志" key="1">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true,  total: this.state.total1, onChange: this.onChangeTable1 }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
          </TabPane>
          <TabPane tab="设备日志" key="2">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true,  total: this.state.total2, onChange: this.onChangeTable2 }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
          </TabPane>
          <TabPane tab="任务日志" key="3">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true,  total: this.state.total3, onChange: this.onChangeTable3 }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
          </TabPane>
          <TabPane tab="系统日志" key="4">
          <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true,  total: this.state.total4, onChange: this.onChangeTable4 }}
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
