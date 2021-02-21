import React, { Component } from 'react';
import { Form, Input, Button, Select, Table, Tooltip } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'


class Card extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {key: 0, name: 'Gin', department: '行政管理', card: '教职工', systemUser: 'A-admin'}
      ],
      columns: [
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
          title: '一卡通',
          align: 'center',
          key: 'card',
          dataIndex: 'card',
        },
        {
          title: '关联系统用户',
          align: 'center',
          key: 'systemUser',
          dataIndex: 'systemUser',
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
            <Tooltip placement="topLeft" title='删除' arrowPointAtCenter>
             <IconFont type='icon-del' className="del" />
            </Tooltip>
            <Tooltip placement="topLeft" title='设置' arrowPointAtCenter>
             <IconFont type='icon-shezhi' className="setting" />
            </Tooltip>
          </div>,
        },
      ],
    }
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
                initialValue='0'
              >
                <Select placeholder='请选择部门名称' style={{ width: '206px' }}>
                  <Select.Option value='0'>部门-全部</Select.Option>
                  <Select.Option value='1'>教学楼</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='text'
              >
                <Input style={{ width: '206px' }} placeholder='请输入搜索内容' />
              </Form.Item>
              <Form.Item >
                <Button type="primary" style={{ background: '#4164F0', borderColor: "#4164F0" }}>
                  <IconFont type='icon-sousuo' />搜索
				        </Button>
              </Form.Item>
              <Form.Item >
                <Button type="primary" style={{ background: '#4586F3', borderColor: "#4586F3" }}>
                  添加用户
				        </Button>
              </Form.Item>
              <Form.Item >
                <Button type="primary" style={{ background: '#35AA53', borderColor: "#35AA53" }}>
                  部门与用户类型
				        </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="search-right">
            <Button type="primary" style={{ background: '#4164F0', borderColor: "#4164F0" }}>
              编辑
				    </Button>
          </div>
        </div>

        <div className="user-table">
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

export default Card;
