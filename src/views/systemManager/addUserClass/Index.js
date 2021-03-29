import React, { Component } from 'react';
import { Modal, Input, Tooltip, message } from 'antd';
import { setRoleDepartment, setRoleAddEdit, setClassAddEdit, setClassDel, setRoleDel } from '@/server/system/user'
import IconFont from '@/components/IconFont';
import _ from 'lodash'
import '../index.scss'


class addUserClass extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      user_department: [],
      user_departmentFu: [],
      user_roles: [],
      user_rolesFu: []
    }
  }

  // 部门与角色获取
  setRoleDepartmentFun = async() => {
    const {user_department, user_roles} = await setRoleDepartment()
    this.setState({
      user_department,
      user_departmentFu: user_department,
      user_roles,
      user_rolesFu: user_roles
    })

  }

  // 添加用户弹窗
  showModal = () => {
    this.setState({
      isModalVisible: true
    }, () => {
      this.setRoleDepartmentFun()
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

  // 添加部门
  addClass = () => {
    const user_department = this.state.user_department
    user_department.unshift({checked: true, name: ""})
    this.setState({
      user_department,
      user_departmentFu: user_department
    })
  }

    // 添加角色
    addRoles = () => {
      const user_roles = this.state.user_roles
      user_roles.unshift({checked: true, name: ""})
      this.setState({
        user_roles,
        user_rolesFu: user_roles
      })
    }

  // 修改部门名称
  editClassName = (index) => {
    const user_department = this.state.user_department
    user_department[index].checked = true
    this.setState({
      user_department
    })
  }

  // 修改角色名称
  editRolesName = (index) => {
    const user_roles = this.state.user_roles
    user_roles[index].checked = true
    this.setState({
      user_roles
    })
  }

  //  确认部门名称
  saveClassName = (index) => {
    const user_department = this.state.user_department
    if (!_.trim(user_department[index].name)) {
      message.error('请填写部门名称')
    } else {
      user_department[index].checked = false
      if (!String(user_department[index].id)) { // 添加角色
        this.setClassAddEditFun({
          name: user_department[index].name
        })
      } else if (user_department[index].name !== this.state.user_departmentFu[index].name) { // 修改角色
        this.setClassAddEditFun({
          id: user_department[index].id,
          name: user_department[index].name
        })
      }
      this.setState({
        user_department,
        user_departmentFu: user_department
      })
    }
  }

  // 部门添加修改接口
  setClassAddEditFun = async (params) => {
    const data = await setClassAddEdit(params)
    if (_.get(data, 'result.code') === 0) {
      message.success('操作成功')
    }
  }

  //  确认角色名称
  saveRolesName = (index) => {
    const user_roles = this.state.user_roles
    if (!_.trim(user_roles[index].name)) {
      message.error('请填写部门名称')
    } else {
      user_roles[index].checked = false
      if (!String(user_roles[index].id)) { // 添加角色
        this.setRoleAddEditFun({
          name: user_roles[index].name
        })
      } else if (user_roles[index].name !== this.state.user_rolesFu[index].name) { // 修改角色
        this.setRoleAddEditFun({
          id: user_roles[index].id,
          name: user_roles[index].name
        })
      }
      this.setState({
        user_roles,
        user_rolesFu: user_roles
      })
    }
  }

    // 角色添加修改接口
    setRoleAddEditFun = async(params) => {
     const data =  await setRoleAddEdit(params)
     if (_.get(data, 'result.code') === 0) {
       message.success('操作成功')
     }
    }
  
  // 取消编辑后的部门名称
  cancelClassName = (index) => {
    const user_department = this.state.user_department
    user_department.splice(index,1)
    this.setState({
      user_department
      })
  }

  // 取消编辑后的角色名称
  cancelRolesName = (index) => {
    const user_roles = this.state.user_roles
    user_roles.splice(index,1)
    this.setState({
      user_roles
    })
  }

  // 删除指定部门名称
  delClassName = (index) => {
    const user_department = this.state.user_department
    user_department.splice(index,1)
    if(String(user_department[index].id)) {
      this.setClassDelFun({
        id: user_department[index].id
      })
    }
    this.setState({
      user_department,
      user_departmentFu: user_department
    })
  }

  // 部门删除接口
  setClassDelFun = async(params) => {
    const data = await setClassDel(params)
    if (_.get(data, 'result.code') === 0) {
      message.success('删除成功')
    }
  }

  // 删除指定角色名称
  delRolesName = (index) => {
    const user_roles = this.state.user_roles
    user_roles.splice(index,1)
    if(String(user_roles[index].id)) {
      this.setClassDelFun({
        id: user_roles[index].id
      })
    }
    this.setState({
      user_roles,
      user_rolesFu: user_roles
    })
  }

   // 角色删除接口
   setRoleDelFun = async(params) => {
    const data = await setRoleDel(params)
    if (_.get(data, 'result.code') === 0) {
      message.success('删除成功')
    }
  }

  inputChange = (e, index) => {
    const user_department = _.cloneDeepWith(this.state.user_department)
    user_department [index].name = e.target.value
    this.setState({
      user_department
    })
  }

  inputRolesChange = (e, index) => {
    const user_roles = _.cloneDeepWith(this.state.user_roles)
    user_roles [index].name = e.target.value
    this.setState({
      user_roles
    })
  }

  render() {
    return (
      <div className="add-message-con">
       <Modal title="部门/用户类型" className="add-message"  okText="确定" cancelText="取消" visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
         <div className="classUserCon">
           {/* 添加部门 begin */}
            <div className="classType">
              <div className="classtitle titles"> 
                <div className="classname">部门</div>
                <div className="classicon" onClick={() => this.addClass()}><IconFont type="icon-add1" /></div>
              </div>
              {
                this.state.user_department?.map((item, index) => {
                  return (<div className="classtitle" key={index}>
                  <div className="classname">
                    {!item.checked ? <div className="classText ellipsis">{item.name}</div> :  <div className="classInput" ><Input value={item.name} allowClear={true} onChange={(e) => this.inputChange(e, index)} placeholder="请输入部门名称"/></div>}
                  </div>
                  <div className="classicons">
                  {!item.checked ? <>
                  <Tooltip title="编辑"><IconFont style={{color: '#4164F0'}} type="icon-bi" onClick={() => this.editClassName(index)} /></Tooltip> 
                  <Tooltip title="删除"><IconFont style={{color: 'red'}} type="icon-del" onClick={() => this.delClassName(index)}  /></Tooltip>
                  </>: <>
                  <Tooltip title="确认"><IconFont style={{color: '#02ff00'}} type="icon-select-bold" onClick={() => this.saveClassName(index)} /></Tooltip>
                  <Tooltip title="取消"><IconFont style={{color: 'red'}} type="icon-guanji" onClick={() => this.cancelClassName(index)} /></Tooltip>
                  </>}
                  </div>
                </div>)
                })
              }
            </div>
           {/* 添加部门 end */}
           {/* 添加用户类型 begin */}
           <div className="classType">
              
           <div className="classtitle titles"> 
                <div className="classname">用户类型</div>
                <div className="classicon" onClick={() => this.addRoles()}><IconFont type="icon-add1" /></div>
          </div>

          {
                this.state.user_roles?.map((item, index) => {
                  return (<div className="classtitle" key={index}>
                  <div className="classname">
                    {!item.checked ? <div className="classText ellipsis">{item.name}</div> :  <div className="classInput" ><Input value={item.name} allowClear={true} onChange={(e) => this.inputRolesChange(e, index)} placeholder="请输入角色名称"/></div>}
                  </div>
                  <div className="classicons">
                  {!item.checked ? <>
                  <Tooltip title="编辑"><IconFont style={{color: '#4164F0'}} type="icon-bi" onClick={() => this.editRolesName(index)} /></Tooltip> 
                  <Tooltip title="删除"><IconFont style={{color: 'red'}} type="icon-del" onClick={() => this.delRolesName(index)}  /></Tooltip>
                  </>: <>
                  <Tooltip title="确认"><IconFont style={{color: '#02ff00'}} type="icon-select-bold" onClick={() => this.saveRolesName(index)} /></Tooltip>
                  <Tooltip title="取消"><IconFont style={{color: 'red'}} type="icon-guanji" onClick={() => this.cancelRolesName(index)} /></Tooltip>
                  </>}
                  </div>
                </div>)
                })
              }

            </div>
             {/* 添加用户类型 end */}
         </div>
       </Modal>
      </div>
    );
  }
}

export default addUserClass;
