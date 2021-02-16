import React, { Component } from 'react'
import { Select, Table, Checkbox, Popover } from 'antd'
import IconFont from '@/components/IconFont';
import '../index.scss'

const { Option } = Select

class contentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
      //  model 1手动 0自动  status: 1 启用  0未启用
        {  key: 0, name: '高二级开灯', status: 1, model: 1},
        {  key: 1, name: '高三级电脑开机', status: 0, model: 0},
        {  key: 2, name: '多媒体课室开灯', status: 1, model: 1},
        {  key: 3, name: '高二级开灯', status: 1, model: 1},
        {  key: 4, name: '高三级电脑开机', status: 0, model: 0},
        {  key: 5, name: '多媒体课室开灯', status: 1, model: 1},
        {  key: 6, name: '高二级开灯', status: 1, model: 1},
        {  key: 7, name: '高三级电脑开机', status: 0, model: 0},
        {  key: 8, name: '多媒体课室开灯', status: 1, model: 1},
        {  key: 9, name: '高二级开灯', status: 1, model: 1},
        {  key: 10, name: '高三级电脑开机', status: 0, model: 0},
        {  key: 11, name: '多媒体课室开灯', status: 1, model: 1},
        {  key: 12, name: '高二级开灯', status: 1, model: 1},
        {  key: 13, name: '高三级电脑开机', status: 0, model: 0},
        {  key: 14, name: '多媒体课室开灯', status: 1, model: 1},
      ],
      columns: [
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
      ],
      sclect: false,
      selectedRowKeys: [],
      rowSelection: null,
      contentRow: false,
      menuStyle: {
            position: "absolute",
            top: "0",
            left: "0",
      }
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
        onChange: this.onChange,
      } : null
    })
  }

  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys
    })
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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

  // 行操作
  onrowFum = (e) => {
    e.preventDefault();
    console.log(e)
    this.setState({
      contentRow: true,
      menuStyle: {
        position: "fixed",
        top: e.pageY,
        left: e.pageX,
      }
    })
    document.body.addEventListener("click", this.bodyClick);
  }
  
  bodyClick = () => {
    this.setState({
      contentRow: false,
    })
    document.body.removeEventListener("click", this.bodyClick);
  }

  render() {   
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
        
        <div className="task-list" style={{ height: `calc(100vh - ${this.state.sclect?'175':'137'}px)`}}>
        <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
          onRow={record => {
            return {
              onContextMenu: (e)=> this.onrowFum(e, record), 
            };
          }}
        />
        </div>
        {
          this.state.sclect ? (<div className="table-footer">
					<div className="check-all">
						<Checkbox onChange={(e) => this.checkAll(e)}>全选</Checkbox>
					</div>
					<div className="check-total">已选{this.state.selectedRowKeys.length ? this.state.selectedRowKeys.length: 0}项</div>
					<div className="action-item">
						<IconFont type="icon-ziyuan" className="icon-tiaojie" />
					</div>
					<div className="action-item">
						<IconFont type="icon-del" className="icon-del" />
					</div>
					<div className="action-item">
						<IconFont type="icon-set" className="icon-set" />
					</div>
					<div className="cancel">
						<button className="cancel-button" onClick={() => this.editTable()}>取消</button>
					</div>
        </div>) : ''
        }
        {/* 表格右点击浮动框 */}
        {
          this.state.contentRow ? ( <div className="tableRight" style={this.state.menuStyle}>
          <div className="tableRightItem">修改</div>
          <div className="tableRightItem">删除</div>
          <div className="tableRightItem">执行</div>
          <div className="tableRightItem">创建副本</div>
          <div className="tableRightItem">启用/暂停</div> 
        </div>) : ''
        }
      </div>
    );
  }
}

export default contentTable;
