import React, { Component } from 'react';
import { Form, Input, Button, Checkbox,Select, Table, Tooltip, message } from 'antd';
import { setRoleDepartment, getUserList, setBatchDel, setUserDel } from '@/server/system/user'
import IconFont from '@/components/IconFont';
import AddUser from '../addUserModal/Index'
import AddUserClass from '../addUserClass/Index'
import _, { set } from 'lodash'
import '../index.scss'


class Account extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          title: '用户名',
          align: 'center',
          key: 'nameUser',
          ellipsis: true,
          dataIndex: 'nameUser',
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '部门',
          align: 'center',
          key: 'department',
          dataIndex: 'department',
        },
        {
          title: '用户类型',
          align: 'center',
          key: 'types',
          dataIndex: 'types',
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone',
          dataIndex: 'phone',
        },
        {
          title: '操作',
          align: 'center',
          key: 'operation',
          dataIndex: 'operation',
          render: (text, read) => <div className="user-task">
            <Tooltip placement="topLeft" title='编辑' onClick={() => this.userEdit(read.key)} arrowPointAtCenter>
             <IconFont type='icon-bi' className="edit" />
            </Tooltip>
            <Tooltip placement="topLeft" title='删除' onClick={() => this.userDel(read.key)} arrowPointAtCenter>
             <IconFont type='icon-del' className="del" />
            </Tooltip>
            {/* <Tooltip placement="topLeft" title='设置' arrowPointAtCenter>
             <IconFont type='icon-shezhi' className="setting" />
            </Tooltip> */}
          </div>,
        },
      ],
      sclect: false,
      selectedRowKeys: [],
      user_department: [],
      user_roles: [],
      page: 1,
      size: 10,
      name: '',
      department: undefined,
      total: undefined
    }
  }

  componentDidMount() {
    this.setRoleDepartmentFun()
  }

  // 部门与角色获取
  setRoleDepartmentFun = async() => {
    const { user_department, user_roles } = await setRoleDepartment()
    this.setState({
      user_department,
      user_roles
    }, () => {
      this.getUserListFun()
    })
  }

  // 部门过滤
  departmentFilter = (id) => {
    let text = ''
    for(let i=0;i<this.state.user_department.length;i++){
      if (this.state.user_department[i].id === id) {
        text = this.state.user_department[i].name
        return text
      }
    }
  }

  // 角色过滤
  rolesFilter = (id) => {
    let text = ''
    for(let i=0;i<this.state.user_roles.length;i++){
      if (this.state.user_roles[i].id === id) {
        text = this.state.user_roles[i].name
        return text
      }
    }
  }

  // 搜索
  searchList = () => {
    this.formRef.current.validateFields().then((values) => {
      this.setState({
        name: values.text,
        department: values.department
      },() => {
      this.getUserListFun()
      })
    })
  }

  //  获取用户列表
  getUserListFun = async () => {
   const {user_list} = await getUserList({
      "page": {
        "page": this.state.page,
        "size": this.state.size
    },
    "search": {
        "name": this.state.name,
        "department": this.state.department,
    }
    })
    let data = []
    user_list.user && user_list.user.map((item, index) => {
      data.push({
        key: item.id,
        id: item.id,
        nameUser: item.name,
        name: item.xingming,
        department: this.departmentFilter(item.department),
        types: this.rolesFilter(item.role),
        phone: item.phone
      })
    })
    this.setState({
      total: user_list.total,
      data
    })
  }
  // 全选
  checkAll = (e) => {
    const selectedRowKeys = []
    this.state.data.map(item => {
      selectedRowKeys.push(item.key)
    })
    this.setState({
      selectedRowKeys: e.target.checked ? selectedRowKeys : [],
      rowSelection: {
        type: 'checkbox',
        onChange: this.onChange,
        selectedRowKeys: e.target.checked ? selectedRowKeys : []
      }
    })
  } 

  // 编辑
  editTable = () => {
    this.setState({
      sclect: !this.state.sclect,
      rowSelection: !this.state.sclect ? {
        type: 'checkbox',
        onChange: this.onChange,
      } : null
    })
  }

  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
    })
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  } 
  //  添加用户
  adduser = () => {
    this.refs.addUser.showModal()
  }
  // 添加部门和用户类型
  addUserClass = () => {
    this.refs.addUserClass.showModal()
  }

   // 分页切换
   onChangeTable = (e) => {
    this.setState({
      page: e
    }, () => {
      this.getUserListFun()
    })
  }

  // 批量删除
  batchDel = async() => {
    const data = await setBatchDel({
      "user_info": {
          "id": this.state.selectedRowKeys
      }
  })
    if (_.get(data, 'result.code') === 0) {
      message.success('删除成功')
      this.getUserListFun()
    }
  }

  // 指定删除
  userDel = async(id) => {
    const data = await setUserDel({
      "user_info": {
          "id": id
      }
  })

    if (_.get(data, 'result.code') === 0) {
      message.success('删除成功')
      this.getUserListFun()
    }
  }

  // 用户信息编辑
  userEdit = (id) => {
    this.refs.addUser.userDetails(id)
    this.refs.addUser.showModal()
  }
  


  render() {
    return (
      <div className="account">
        <div className="account-header">账号管理</div>
        <div className="account-search">
          <div className="search-left">
            <Form layout="inline" ref={this.formRef} className="searh-header-form">
              <Form.Item
                name='department'
                initialValue={0}
              >
                <Select placeholder='请选择部门名称' style={{ width: '206px' }}>
                <Select.Option key={0} value={0}>全部</Select.Option>
                  {this.state.user_department.map((item,index) => <Select.Option key={index + 1} value={item.id}>{item.name}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item
                name='text'
              >
                <Input style={{ width: '206px' }} placeholder='请输入搜索内容' />
              </Form.Item>
              <Form.Item >
                <Button type="primary" onClick={() => this.searchList()} style={{ background: '#4164F0', borderColor: "#4164F0" }}>
                  <IconFont type='icon-sousuo' />搜索
				        </Button>
              </Form.Item>
              <Form.Item >
                <Button type="primary" onClick={() => this.adduser()} style={{ background: '#4586F3', borderColor: "#4586F3" }}>
                  添加用户
				        </Button>
              </Form.Item>
              <Form.Item >
                <Button type="primary"  onClick={() => this.addUserClass()} style={{ background: '#35AA53', borderColor: "#35AA53" }}>
                  部门与用户类型
				        </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="search-right">
          <div className={!this.state.sclect ? 'task-btn task-edit': 'task-btn task-close'} onClick={() => this.editTable()}>{!this.state.sclect? '编辑' : '取消'}</div>
          </div>
        </div>

        <div className="user-table">
        <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true, total: this.state.total, onChange: this.onChangeTable}}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
        </div>
        {
          this.state.sclect ? (<div className="table-footer">
					<div className="check-all">
						<Checkbox onChange={(e) => this.checkAll(e)}>全选</Checkbox>
					</div>
					<div className="check-total">已选{this.state.selectedRowKeys.length ? this.state.selectedRowKeys.length: 0}项</div>
					{/* <div className="action-item">
						<IconFont type="icon-ziyuan" className="icon-tiaojie" />
					</div> */}
					<div className="action-item">
						<IconFont type="icon-del" className="icon-del" onClick={() => this.batchDel() } />
					</div>
					{/* <div className="action-item">
						<IconFont type="icon-set" className="icon-set" />
					</div> */}
					<div className="cancel">
						<button className="cancel-button" onClick={() => this.editTable()}>取消</button>
					</div>
        </div>) : ''
        }
        <AddUser ref="addUser" refresh={this.getUserListFun} />
        <AddUserClass  ref="addUserClass"  />
      </div>
    );
  }
}

export default Account;
