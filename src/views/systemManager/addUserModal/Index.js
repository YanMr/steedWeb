import React, { Component } from 'react';
import { Modal, Form, Input, Button, Transfer, Select, } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'


class AddUserModal extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      steps: 1,
      mockData: [],
      targetKeys: [],
      selectedKeys: []
    }
  }

  componentDidMount() {
		this.getMockData()
	}
  
  //  穿梭框
  getMockData = () => {
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
      });
    }
    this.setState({
      mockData,
    }, () => {
       this.setState({
        targetKeys: this.state.mockData.filter(item => +item.key > 10).map(item => item.key)
       })
    })
  }

  onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    this.setState({
      targetKeys: nextTargetKeys
    })
  }

   onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
    })
  };

  onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

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
      <div className="add-user">
        {/* 添加用户  begin*/}
        <Modal title="用户添加"  footer={null} visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
         {/* 进度条 begin */}
         <div className="add-user-Modal-herder">
           <div className={this.state.steps === 1 ? 'zong cur one' : 'zong one'} >
           <div className="user">
            <div className="user-text">1</div>
            <div className="user-border"></div>
           </div>
           <div className="add-user-title">用户信息</div>
           </div>
           <div className={this.state.steps === 2 ? 'zong cur two' : 'zong two'}>
           <div className="user">
           <div className="user-border"></div>
            <div className="user-text">2</div>
            <div className="user-border"></div>
           </div>
           <div className="add-user-title">设备授权</div>
           </div>
           <div className={this.state.steps === 3 ? 'zong cur three' : 'zong three'}>
           <div className="user">
           <div className="user-border"></div>
           <div className="user-text">3</div>
           </div>
           <div className="add-user-title">完成</div>
           </div>
         </div>
         {/* 进度条end */}
         {/* 内容区域 begin */}
         <div className="content-main-user">
           {/* 步骤一 begin */}
         {this.state.steps === 1 ? (<div className="steps-one">
           <Form layout="inline" ref={this.formRef} className="searh-header-form">
             <Form.Item
                label="用户名"
                rules={[{ required: true, message: '请输入用户名！' }]}
                name='userName'
              >
                <Input style={{ width: '206px' }} placeholder='请输入用户名'/>
              </Form.Item>
              <Form.Item
                label="密码"
                rules={[{ required: true, message: '请输入密码！' }]}
                name='passWorld'
              >
                <Input style={{ width: '206px' }} placeholder='请输入密码'/>
              </Form.Item>
              <Form.Item
                label="姓名"
                rules={[{ required: true, message: '请输入姓名！' }]}
                name='name'
              >
                <Input style={{ width: '206px' }} placeholder='请输入姓名'/>
              </Form.Item>
              <Form.Item
                label="手机号"
                rules={[{ required: true, message: '请输入手机号！' }]}
                name='phonenum'
              >
                <Input style={{ width: '206px' }} placeholder='请输入手机号'/>
              </Form.Item>
              <Form.Item
                name='department'
                rules={[{ required: true, message: '请选择部门名称！' }]}
                label="部门"
              >
                <Select placeholder='请选择部门名称' style={{ width: '206px' }}>
                  <Select.Option value='0'>部门-全部</Select.Option>
                  <Select.Option value='1'>教学楼</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='usertype'
                rules={[{ required: true, message: '请选择用户类型！' }]}
                label="用户类型"
              >
                <Select placeholder='请选择用户类型' style={{ width: '206px' }}>
                  <Select.Option value='0'>部门-全部</Select.Option>
                  <Select.Option value='1'>教学楼</Select.Option>
                </Select>
              </Form.Item>
           </Form>
           </div>) : ''}
           {/* 步骤一 end */}
           {/* 步骤二 begin */}
           {this.state.steps === 2 ? (<div className="steps-two">
           <Transfer
              dataSource={this.state.mockData}
              titles={['未选位置', '已选位置']}
              locale ={{itemUnit: '项', itemsUnit: '项'}}
              targetKeys={this.state.targetKeys}
              selectedKeys={this.state.selectedKeys}
              onChange={this.onChange}
              onSelectChange={this.onSelectChange}
              onScroll={this.onScroll}
              render={item => item.title}
            />
           </div>) : ''}
           {/* 步骤二 end */}
           {/* 步骤三 begin */}
           {this.state.steps === 3 ? (<div className="steps-three">
             <IconFont type="icon-chenggong" />
             <div className="suss-text">添加完成</div>
           </div>) : ''}
           {/* 步骤三 end */}
         </div>
         {/* 按钮 begin */}
          <div className="footer">
          {this.state.steps === 2 ? (<Button type="primary">上一步</Button>) : '' }
          {this.state.steps === 1 || this.state.steps === 2 ? (<Button type="primary">下一步</Button>) : '' }
          {this.state.steps === 3 ? (<Button >取消</Button>) : '' }
          {this.state.steps === 3 ? (<Button type="primary">完成</Button>) : '' }
          </div>
         {/* 按钮 end */}
         {/* 内容区域 end */}
         
        </Modal>
        {/* 添加用户 end */}
      </div>
    );
  }
}

export default AddUserModal;
