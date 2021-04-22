import React, { Component } from 'react';
import { Modal, Form, Select, } from 'antd';
import { getUserList } from '@/server/system/network'
import '../index.scss'


class AddMessageModal extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      user: []
    }
  }

  componentDidMount() {
    this.getUserListFun();
  }

  // 接收人员获取
  getUserListFun = async() => {
    const data = await getUserList()
    this.setState({
      user: data.user || []
    })
  }
  // 添加用户弹窗
  showModal = () => {
    this.setState({
      isModalVisible: true
    })
  }

  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
    this.props.close()
  }

  render() {
    return (
      <div className="add-message-con">
       <Modal title="消息添加" className="add-message"  okText="确定" cancelText="取消" visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
       <Form layout="inline" ref={this.formRef} className="searh-header-form">
        <Form.Item
            label="消息名称"
            rules={[{ required: true, message: '请输入消息名!' }]}
            name='messageType'
          >
          <Select placeholder='请选择消息类型' style={{ width: '206px' }}>
              <Select.Option value='0'>全部</Select.Option>
              {/* {
                this.state.user.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)
              } */}
          </Select>
        </Form.Item>
        <Form.Item
            label="阈值"
            rules={[{ required: true, message: '请选择阈值!' }]}
            name='num'
          >
          <Select placeholder='请选择阈值' style={{ width: '206px' }}>
              <Select.Option value='1'>1</Select.Option>
              <Select.Option value='2'>2</Select.Option>
              <Select.Option value='3'>3</Select.Option>
              <Select.Option value='4'>4</Select.Option>
              <Select.Option value='5'>5</Select.Option>
              <Select.Option value='6'>6</Select.Option>
              <Select.Option value='7'>7</Select.Option>
              <Select.Option value='8'>8</Select.Option>
              <Select.Option value='9'>9</Select.Option>
              <Select.Option value='10'>10</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
            label="接收成员"
            rules={[{ required: true, message: '请选择阈值!' }]}
            name='userName'
          >
          <Select placeholder='请选择接收成员' style={{ width: '206px' }}>
              <Select.Option value='0'>全部</Select.Option>
              {
                this.state.user.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)
              }
          </Select>
        </Form.Item>
        <Form.Item
            label="消息频率"
            rules={[{ required: true, message: '请选择消息频率!' }]}
            name='userName'
          >
          <Select placeholder='请选择消息频率' style={{ width: '206px' }}>
              <Select.Option value='5'>5分钟</Select.Option>
              <Select.Option value='10'>10分钟</Select.Option>
              <Select.Option value='20'>20分钟</Select.Option>
              <Select.Option value='30'>30分钟</Select.Option>
              <Select.Option value='60'>60分钟</Select.Option>
          </Select>
        </Form.Item>
       </Form>
       </Modal>
      </div>
    );
  }
}

export default AddMessageModal;
