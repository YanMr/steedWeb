import React, { Component } from 'react'
import { Select, Table } from 'antd'
import IconFont from '@/components/IconFont';
import '../index.scss'

const { Option } = Select

class contentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sclect: false,
      rowSelection: null
    }
  }

  // 任务搜索
  handleChange = (value) => {
    console.log(value)
  }

  // 编辑
  editTable = () => {
    this.setState({
      sclect: !this.state.sclect,
      rowSelection: !this.state.sclect ? {
        type: 'checkbox',
        onChange: this.onChange
      } : null
    })
  }

  onChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  render() {
    const columns = [
      {
        title: '任务名称',
        align: 'center',
        key: 'name',
        ellipsis: true,
        dataIndex: 'name',
      },
      {
        title: '任务状态',
        align: 'center',
        key: 'status',
        dataIndex: 'status',
        render: (text) => <div className='status-task'>
          <IconFont type={text?'icon-icon_list_qiyong': 'icon-qiyongzhong'} className={text?'yes':'no'} /> {text?'启用中': '未启用'}
        </div>,
      },
      {
        title: '任务模式',
        align: 'center',
        key: 'model',
        dataIndex: 'model',
        render: (text) => <div className="status-task">
          <span className={text?'yes':'no'}><IconFont type={text?'icon-shoudong': 'icon-zidongshibie'} /> </span>{text?'手动任务': '自动任务'}
        </div>,
      },
      {
        title: '操作',
        align: 'center',
        key: 'operation',
        dataIndex: 'operation',
        render: (text) => <div className="status-task">
          <IconFont type='icon-bofang' className="yes" />
          <IconFont type='icon-gantanhao' />
        </div>,
      },
    ];
    //  model 1手动 0自动  status: 1 启用  0未启用
    const data = [
      { key: 0, name: '高二级开灯', status: 1, model: 1},
      {  key: 1, name: '高三级电脑开机', status: 0, model: 0},
      {  key: 2, name: '多媒体课室开灯', status: 1, model: 1}
    ]
    return (
      <div className="serch-container">
        <div className="seach-header">
          <div className="select-task">
          <Select defaultValue="全部任务" style={{ width: 130 }} bordered={false}  onChange={this.handleChange}>
            <Option value="全部任务">全部任务</Option>
            <Option value="手动任务">手动任务</Option>
            <Option value="自动任务">自动任务</Option>
          </Select>
          </div>
          <div className={!this.state.sclect ? 'task-btn task-edit': 'task-btn task-close'} onClick={() => this.editTable()}>{!this.state.sclect? '编辑' : '取消'}</div>
        </div>
        
        <div className="task-list">
        <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
          rowSelection={this.state.rowSelection}
          columns={columns}
          dataSource={data}
        />
        </div>

      </div>
    );
  }
}

export default contentTable;
