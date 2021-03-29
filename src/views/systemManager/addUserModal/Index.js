import React, { Component } from 'react';
import { Modal, Form, Input, Button, Transfer, Select, message, } from 'antd';
import { setAddUserMessage, setRoleDepartment, getUserDetails } from '@/server/system/user'
import { getScenePlace } from '@/server/scene'
import IconFont from '@/components/IconFont';
import _ from 'lodash'
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
      selectedKeys: [],
      user_department: [],
      user_roles: [],
      userMess: {}
    }
  }

  componentDidMount() {
		// this.getMockData()
	}

  // 角色与部门获取接口
  setRoleDepartmentFun = async() => {
    const { user_department, user_roles} = await setRoleDepartment()
    this.setState({
      user_department,
      user_roles
    })

  }

  // 获取用户信息
  userDetails = async(id) => {
    const data = await getUserDetails({
      "user_info": {
          "id": id
      }
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
      isModalVisible: true,
      steps: 1
    }, () => {
      this.setRoleDepartmentFun()
    })
  }

  handleOk = () => {
    this.setState({
        isModalVisible: false
    })
  }

  // 下一步
  nextMessage = () => {
    if (this.state.steps === 1) {
      this.formRef.current.validateFields().then((values) => {
        this.setState({
          steps: 2,
          userMess: values
        }, () => {
          this.setRoleAddEditFun()
        })
      })
    } else {
      this.setAddUserMessageFun()
    }
    
  }

  // 添加用户信息
  setAddUserMessageFun = async () => {
    const data = await setAddUserMessage({
      "user_info": {
        "name": this.state.userMess.name,
        "role": this.state.userMess.usertype,
        "password": this.state.userMess.passWorld,
        "xingming": this.state.userMess.name,
        "department": this.state.userMess.department,
        "phone": this.state.userMess.phonenum,
        "place_id": this.state.targetKeys
    }
    })
    if (_.get(data, 'result.code') === 0) {
      message.success('操作成功')
      this.setState({
        steps: 3
      },() => {
        this.props.refresh()
      })
    }
  }

  // 上一步
  previous = () => {
    this.setState({
      steps: 1
    })
  }

  // 查询设备位置
  setRoleAddEditFun = async() => {
    const { placelist } = await getScenePlace({
      "search": {
        "keyword": ""
    }
    })
    let arr = []
    placelist &&  placelist.map(item => {
      item.room.map(flag => {
        arr.push({
          key: flag.id,
          title: flag.name,
          description: flag.name
        })
      })
    })
    this.setState({
      mockData: arr
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
        {this.state.isModalVisible ? <Modal title="用户添加"  footer={null} visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
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
           <div className={this.state.steps === 1 ? 'block steps-one' : 'none'}>
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
                  {
                    this.state.user_department.map((item,index) => {
                      return (
                        <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name='usertype'
                rules={[{ required: true, message: '请选择用户类型！' }]}
                label="用户类型"
              >
                <Select placeholder='请选择用户类型' style={{ width: '206px' }}>
                {
                    this.state.user_roles.map((item,index) => {
                      return (
                        <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
           </Form>
           </div>
           {/* 步骤一 end */}
           {/* 步骤二 begin */}
           <div className={this.state.steps === 2 ? 'block steps-two' : 'none'}>
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
           </div>
           {/* 步骤二 end */}
           {/* 步骤三 begin */}
           <div className={this.state.steps === 3 ? 'block steps-three' : 'none'}>
             <IconFont type="icon-chenggong" />
             <div className="suss-text">添加完成</div>
           </div>
           {/* 步骤三 end */}
         </div>
         {/* 按钮 begin */}
          <div className="footer">
          {this.state.steps === 2 ? (<Button type="primary" onClick={() => this.previous()}>上一步</Button>) : '' }
          {this.state.steps === 1 || this.state.steps === 2 ? (<Button type="primary" onClick={() => this.nextMessage()}>下一步</Button>) : '' }
          {this.state.steps === 3 ? (<Button type="primary" onClick={() => this.handleOk()}>关闭</Button>) : '' }
          </div>
         {/* 按钮 end */}
         {/* 内容区域 end */}
        </Modal>
        : ''}
        
      </div>
    );
  }
}

export default AddUserModal;
