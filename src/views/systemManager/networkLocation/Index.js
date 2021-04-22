import React, { Component } from 'react';
import { Button, Input, Table, Modal, Form, message} from 'antd';
import IconFont from '@/components/IconFont';
import { getNetworkMess, setNetworkMess } from '@/server/system/network'
import _ from 'lodash'
import '../index.scss'


const FormItem = Form.Item;

class NetworkLocation extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      dns_server1: '',
      dns_server2: '',
      networkState: true,
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
        }
      ],
    }
  }

  componentDidMount() {
    this.getNetworkMessFun()
  }

  // 网络信息获取
  getNetworkMessFun = async() => {
    const {network_info} = await getNetworkMess()
    let dataMess = []
    network_info.network_card_info.map((item,index) => {
      dataMess.push({key: index,name: item.name,ip: item.ip, subnetMask: item.netmask, gateway: item.gateway})
    })
    this.setState({
      data: dataMess,
      dns_server1: network_info.dns_server1,
      dns_server2: network_info.dns_server1,
    })
  }

  setNetworkmess = () => {
    this.setState({
      networkState: !this.state.networkState 
    })
  } 

  // 修改网络信息
  handleOk = () => {
    this.formRef.current.validateFields().then(async(values) => {
      const params = {
        "network_info": {
            "dns_server1": values.dns_server1,
            "dns_server2": values.dns_server2,
            "network_card_info": [
                {
                    "ip": values.ip,
                    "name": this.state.data[0].name,
                    "gateway": values.gateway,
                    "netmask": values.subnetMask
                }
            ]
        }
    }
      const data = await setNetworkMess(params)
      if (_.get(data,'result.code') === 0) {
        message.success('操作成功')
        this.getNetworkMessFun()
        this.setState({
          networkState: true
        })
      }
    })
  }

  handleCancel = () => {
    this.setState({
      networkState: true
    })
  }

  render() {
    return (
      <div className="account">
        <div className="account-header-s">
          <div className="account-title">网络位置</div>
          <div className="account-btn"><Button type="primary" onClick={this.setNetworkmess} >{this.state.networkState?'设置':'保存'}</Button></div>
        </div>
        <div className="network-main">
          <div className="network-dns">
            <div className="network-dns-title">DNS服务器地址</div>
            <div className="network-dns-item">
              <div className="network-label">首选DNS服务器</div>
              <div className="networl-value">{this.state.dns_server1}</div>
            </div>
            <div className="network-dns-item">
              <div className="network-label">备选DNS服务器</div>
              <div className="networl-value">{this.state.dns_server2}</div>
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
        {!this.state.networkState ? <Modal title="修改网络信息" zIndex="1050"   okText="确定" cancelText="取消" visible={!this.state.networkState} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
        <Form ref={this.formRef} labelAlign="right" className="editNetwork">
            <FormItem
                  label="服务器名称"
                  name="name"
								>
								{this.state.data[0].name}
						</FormItem>
            <FormItem 
                  label="首选DNS服务器"
                  name="dns_server1"
                  initialValue={this.state.dns_server1}
									rules={[{ required: true, message: '请填写首选DNS服务器' }]}
								>
								<Input placeholder="请填写首选DNS服务器" />
						</FormItem>
            <FormItem
                  label="备选DNS服务器"
                  name="dns_server2"
                  initialValue={this.state.dns_server2}
									rules={[{ required: true, message: '请填写备选DNS服务器' }]}
								>
								<Input placeholder="请填写备选DNS服务器" />
						</FormItem>
            <FormItem
                  label="服务器ip"
                  name="ip"
                  initialValue={this.state.data[0].ip}
									rules={[{ required: true, message: '请填写服务器ip' }]}
								>
								<Input placeholder="请填写服务器ip" />
						</FormItem>
            <FormItem
                  label="服务器子网掩码"
                  name="subnetMask"
                  initialValue={this.state.data[0].subnetMask}
									rules={[{ required: true, message: '请填写服务器子网掩码' }]}
								>
								<Input placeholder="请填写服务器子网掩码" />
						</FormItem>
            <FormItem
                  label="服务器网关"
                  name="gateway"
                  initialValue={this.state.data[0].gateway}
									rules={[{ required: true, message: '请填写服务器网关' }]}
								>
								<Input  placeholder="请填写服务器网关"/>
						</FormItem>
        </Form>
        </Modal> : ''}
      </div>
    );
  }
}

export default NetworkLocation;
