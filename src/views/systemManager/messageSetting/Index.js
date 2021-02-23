import React, { Component } from 'react';
import { Switch, Table, Tooltip } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'


class MessageSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {key: 0,message: '设备与物联离线异常',maxNumber: '离线10分钟报警', userName: 'admin', frequency: '每天一次'}
      ],
      columns: [
        {
          title: '消息',
          align: 'center',
          key: 'message',
          ellipsis: true,
          dataIndex: 'message',
        },
        {
          title: '阈值',
          align: 'center',
          key: 'maxNumber',
          dataIndex: 'maxNumber',
        },
        {
          title: '接收成员',
          align: 'center',
          key: 'userName',
          dataIndex: 'userName',
        },
        {
          title: '消息频率',
          align: 'center',
          key: 'frequency',
          dataIndex: 'frequency',
        },
        {
          title: '操作+',
          align: 'center',
          key: 'operation',
          dataIndex: 'operation',
          render: (text) => <div className="user-task">
            <Tooltip placement="topLeft" title='删除' arrowPointAtCenter>
             <IconFont type='icon-del' className="del" />
            </Tooltip>
           
          </div>,
        },
      ],
    }
  }

  render() {
    return (
      <div className="account">
        <div className="account-header">消息设置</div>
        <div className="message-setting-qr">
          <div className="message-title-header">提醒：消息接收人员，请设置手机号与关注铠硕达科技安全助手微信公众号 , 点击查看操作指引。</div>
          <div className="message-qrcode">
            <div className="qrcode-img"></div>
            <div className="qrcode-text">铠硕达智能设备管理平台助手(公众号二维码)</div>
          </div>
        </div>
        <div className="user-login-message">
            <div className="user-mess-text">用户登录信息</div>
            <div className="user-mess-radio"><Switch defaultChecked></Switch></div>
        </div>
        <div className="other">其他消息</div>
        <div className="other-table">
        <Table
              pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
              rowSelection={this.state.rowSelection}
              columns={this.state.columns}
              dataSource={this.state.data}
            />
        </div>    
      </div>
    );
  }
}

export default MessageSetting;
