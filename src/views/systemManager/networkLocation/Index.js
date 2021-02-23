import React, { Component } from 'react';
import { Button, Input, Table, Tooltip } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'


class NetworkLocation extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {key: 0,name: 'A-admin',ip: '192.168.1.100', subnetMask: '255.255.255.0', gateway: '192.168.1.1'}
      ],
      columns: [
        {
          title: '名称',
          align: 'center',
          key: 'name',
          ellipsis: true,
          dataIndex: 'name',
        },
        {
          title: 'IP',
          align: 'center',
          key: 'ip',
          dataIndex: 'ip',
        },
        {
          title: '子网掩码',
          align: 'center',
          key: 'subnetMask',
          dataIndex: 'subnetMask',
        },
        {
          title: '网关',
          align: 'center',
          key: 'gateway',
          dataIndex: 'gateway',
        },
        {
          title: '操作',
          align: 'center',
          key: 'operation',
          dataIndex: 'operation',
          render: (text) => <div className="user-task">
            <Tooltip placement="topLeft" title='编辑' arrowPointAtCenter>
             <IconFont type='icon-bi' className="edit" />
            </Tooltip>
            <Tooltip placement="topLeft" title='保存' arrowPointAtCenter>
             <IconFont type='icon-select-bold' className="setting" />
            </Tooltip>
            <Tooltip placement="topLeft" title='删除' arrowPointAtCenter>
             <IconFont type='icon-delete' className="del" />
            </Tooltip>
           
          </div>,
        },
      ],
    }
  }

  render() {
    return (
      <div className="account">
        <div className="account-header-s">
          <div className="account-title">网络位置</div>
          <div className="account-btn"><Button type="primary">保存</Button></div>
        </div>
        <div className="network-main">
          <div className="network-dns">
            <div className="network-dns-title">DNS服务器地址</div>
            <div className="network-dns-item">
              <div className="network-label">首选DNS服务器</div>
              <div className="networl-value"><Input value="192.168.1.1"/></div>
            </div>
            <div className="network-dns-item">
              <div className="network-label">备选DNS服务器</div>
              <div className="networl-value"><Input value="192.168.1.1"/></div>
            </div>
          </div>
          <div className="network-setting">
            <div className="network-setting-title">网卡设置</div>
            <Table
              pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
              rowSelection={this.state.rowSelection}
              columns={this.state.columns}
              dataSource={this.state.data}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NetworkLocation;
