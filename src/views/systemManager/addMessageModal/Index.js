import React, { Component } from 'react';
import { Modal, Form, Select, } from 'antd';
import '../index.scss'


class AddMessageModal extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    }
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
  }

  render() {
    return (
      <div className="add-message-con">
       <Modal title="消息添加" className="add-message"  okText="确定" cancelText="取消" visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
       <Form layout="inline" ref={this.formRef} className="searh-header-form">
        <Form.Item
            label="消息类型"
            rules={[{ required: true, message: '请选择消息类型!' }]}
            name='messageType'
          >
          <Select placeholder='请选择消息类型' style={{ width: '206px' }}>
              <Select.Option value='0'>部门-全部</Select.Option>
              <Select.Option value='1'>教学楼</Select.Option>
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
          </Select>
        </Form.Item>
        <Form.Item
            label="接收成员"
            rules={[{ required: true, message: '请选择阈值!' }]}
            name='userName'
          >
          <Select placeholder='请选择接收成员' style={{ width: '206px' }}>
              <Select.Option value='1'>严瑾苒</Select.Option>
              <Select.Option value='2'>严瑾苒</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
            label="消息频率"
            rules={[{ required: true, message: '请选择消息频率!' }]}
            name='userName'
          >
          <Select placeholder='请选择消息频率' style={{ width: '206px' }}>
              <Select.Option value='1'>10分钟</Select.Option>
              <Select.Option value='2'>20分钟</Select.Option>
          </Select>
        </Form.Item>
       </Form>
       </Modal>
      </div>
    );
  }
}

export default AddMessageModal;
