import React, { Component } from 'react'
import { Select, Table, Checkbox, Tooltip, Popover, message} from 'antd'
import IconFont from '@/components/IconFont';
import { getTaskList, setTaskExecution, getTaskDel, getTaskState } from '@/server/scene'
import '../index.scss'
import _ from 'lodash'

const { Option } = Select

class contentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
      //  model 1手动 0自动  status: 1 启用  0未启用
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
            <span className={text===3?'yes':'no'}><IconFont type={text===3?'icon-shoudong': 'icon-zidongshibie'} /> </span>{text===3?'手动任务': '自动任务'}
          </div>,
        },
        {
          title: '操作',
          align: 'center',
          key: 'operation',
          dataIndex: 'operation',
          render: (text, record) => <div className="status-task">
            <Tooltip placement="topLeft" title='执行' arrowPointAtCenter onClick={() => this.serTaskExecutionFun(record.id)}>
            <IconFont type='icon-bofang' className="yes" />
            </Tooltip>
            <Tooltip placement="topLeft" title='编辑' arrowPointAtCenter  onClick={() => this.editTaskList(record.id)}>
            <IconFont type='icon-bi' className="edit" />
            </Tooltip>
            <Popover content={(
              <div className="operation-shu">
              <div className="operationitem">创建者：{record.creator}</div>
              <div className="operationitem">创建时间：{record.create_time}</div>
              <div className="operationitem">更新时间：{record.update_time}</div>
            </div>
            )} placement="bottom" trigger="click" arrowPointAtCenter>
            <Tooltip placement="topLeft" title='属性' arrowPointAtCenter>
            <IconFont type='icon-gantanhao' />
            </Tooltip>
            </Popover>
          </div>,
        },
      ],
      sclect: false,
      task_type: 0,
      selectedRowKeys: [],
      rowSelection: null,
      contentRow: false,
      menuStyle: {
            position: "absolute",
            top: "0",
            left: "0",
      },
      page: 1,
      size: 10,
      total: 0,
      keyword: '',
      scene_id: undefined,
      selectedRows: [],
      recordData: {}
    }
  }

  componentDidMount() {
    
  }

  // 任务编辑
  editTaskList = (id) => {
    this.props.prop.prop.history.push({pathname: '/sevice/newtask', state: {sceneId: this.state.scene_id, task_id: id }})
  }
  
  // 搜索
  serchTaskList = (text) => {
    this.setState({
      keyword: text
    },() => {
      this.getTaskListFun(this.state.scene_id)
    })
  }

  // 分页切换
  onChangeTable = (e) => {
    this.setState({
      page: e
    }, () => {
      this.getTaskListFun(this.state.scene_id)
    })
  }

  // 任务执行
  serTaskExecutionFun = async(id) => {
   const data = await setTaskExecution({
    "task_id": id
   })
   if (data.result.code === 0) {
     message.success('操作成功')
   }
  }

  // 刷新
  refresh = () => {
    this.qiehTaskList(this.state.scene_id)
  }

  // 切换场景搜索任务 
  qiehTaskList = (id) => {
    this.setState({
      keyword: ''
    }, () => {
      this.getTaskListFun(id)
    })
  }

  // 获取任务列表
 getTaskListFun = async (id) => {
    const data = await getTaskList({
      "page": {
          "page": this.state.page,
          "size": this.state.size
      },
      "task_search": {
          "type": this.state.task_type,
          "scene_id": id,
          "order": 1,
          "keyword": this.state.keyword
      }
    })
    const list = []
    data.task_infos.task_lists && data.task_infos.task_lists.map((item,index) => {
      list.push({key: index, id: item.id, name: item.name, status: item.state, model: item.type, creator: item.creator, create_time: item.create_time, update_time: item.update_time})
    })
    this.setState({
      total:data.task_infos.total,
      data:list,
      scene_id: id
    })
  }

  // 任务搜索
  handleChange = (value) => {
    this.setState({
      task_type: Number(value)
    }, () => {
      this.getTaskListFun(this.state.scene_id)
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
      selectedRows
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
  onrowFum = (e, record) => {
    e.preventDefault();
    console.log(record)
    this.setState({
      contentRow: true,
      recordData: record,
      menuStyle: {
        position: "fixed",
        top: e.pageY,
        left: e.pageX,
      }
    })
    document.body.addEventListener("click", this.bodyClick);
  }

  // 右键修改
  rightTaskEdit = () => {
    const { id } = this.state.recordData
    this.editTaskList(id)
  }

  // 右键执行
  rightTaskExecution = () => {
    const { id } = this.state.recordData
    this.serTaskExecutionFun(id)
    this.setState({
      contentRow: false,
    })
  }

  // 右键创建任务
  rightCreatTask = () => {
    this.props.prop.prop.history.push({pathname: '/sevice/newtask', state: {sceneId: this.state.scene_id }})
  }

  // 右键启用暂停
  rightStateTask = () => {
    this.setState({
      contentRow: false,
    }, async () => {
      const { status, id } = this.state.recordData
      const data = await getTaskState({
        "task": {
          "state": status ? 0 : 1,
          "ids": [
              {
                  "id": id
              }
          ]
      }
      })
      if (_.get(data,'result.code') === 0) {
        this.getTaskListFun(this.state.scene_id)
        message.success('操作成功!')
      }
    })
  }

  delTask = async(idArr) => {
    const data = await getTaskDel({
      "task_lists": idArr
    })
    if (_.get(data,'result.code') === 0) {
      this.getTaskListFun(this.state.scene_id)
      message.success('操作成功!')
      this.editTable()
    }
  }

  // 右键删除
  rightDelTask = () => {
    const { id } = this.state.recordData
    this.delTask([{id}])
  }
  
  bodyClick = (e) => {
    if (e.target.parentNode.className !== 'tableRight') {
      this.setState({
        contentRow: false,
      })
      document.body.removeEventListener("click", this.bodyClick);
    }
  }

  // 批量删除
  delTable = () => {
    const idList = []
    this.state.selectedRows.map(item => {
      idList.push({id: item.id})
    })
    this.delTask(idList)
  }

  // 查看任务详情右侧弹窗
  onRightTaskDetails = (record) => {
    this.props.rightData(record)
  }


  render() {   
    return (
      <div className="serch-container">
        <div className="seach-header">
          <div className="select-task">
          <Select defaultValue="0" style={{ width: 130 }} bordered={false}  onChange={this.handleChange}>
            <Option value="0">全部任务</Option>
            <Option value="1">手动任务</Option>
            <Option value="2">自动任务</Option>
          </Select>
          </div>
          <div className={!this.state.sclect ? 'task-btn task-edit': 'task-btn task-close'} onClick={() => this.editTable()}>{!this.state.sclect? '编辑' : '取消'}</div>
        </div>
        
        <div className="task-list" style={{ height: `calc(100vh - ${this.state.sclect?'175':'137'}px)`}}>
        <Table
          pagination={{ defaultPageSize: 10, hideOnSinglePage: true, total: this.state.total, onChange: this.onChangeTable }}
          rowSelection={this.state.rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
          onRow={record => {
            return {
              onClick: (e) => this.onRightTaskDetails(record), 
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
					{/* <div className="action-item">
						<IconFont type="icon-ziyuan" className="icon-tiaojie" />
					</div> */}
					<div className="action-item" onClick={() => this.delTable()}>
						<IconFont type="icon-del" className="icon-del" />
					</div>
					{/* <div className="action-item">
						<IconFont type="icon-set" className="icon-set" />
					</div> */}
					<div className="cancel">
						<button className="cancel-button" onClick={() => this.editTable()}>取消</button>
					</div>
        </div>) : ''
        }
        {/* 表格右点击浮动框 */}
        {
          this.state.contentRow ? ( <div className="tableRight" style={this.state.menuStyle}>
          <div className="tableRightItem" onClick={() => this.rightTaskEdit()}>修改</div>
          <div className="tableRightItem" onClick={() => this.rightDelTask()}>删除</div>
          <div className="tableRightItem" onClick={() => this.rightTaskExecution()}>执行</div>
          <div className="tableRightItem" onClick={() => this.rightCreatTask()}>创建任务</div>
          <div className="tableRightItem" onClick={() => this.rightStateTask()} >启用/暂停</div> 
        </div>) : ''
        }
      </div>
    );
  }
}

export default contentTable;
