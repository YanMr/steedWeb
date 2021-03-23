import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Switch, Radio, Button, TimePicker, Modal, Checkbox, Tree, message } from 'antd';
import Back from '@/components/Back/index';
import CheckCalendar from '@/components/CheckCalendar/Index'
import IconFont from '@/components/IconFont';
import iconFun from '@/components/IconType';
import { getAiControl, getScenePlace, getTaskAdd, getTaskDetails } from '@/server/scene'
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import '../index.scss'
import _  from 'lodash'
import { getConfirmLocale } from 'antd/lib/modal/locale';


class NewTask extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1,
      showCalendar: false,
      weekDate: [{ state: '1', name: '周一', cur: false},
        { state: '2', name: '周二', cur: false},
        { state: '3', name: '周三', cur: false},
        { state: '4', name: '周四', cur: false},
        { state: '5', name: '周五', cur: false},
        { state: '6', name: '周六', cur: false},
        { state: '7', name: '周日', cur: false},
      ],
      getWeekDate: [],
      isModalVisible: false,
      isCheck: [],
      palyList: [''],
      sceneId: undefined,
      taskName: '',
      priority: undefined,
      locationSerch: false,
      checkedKeys: [],
      checkedKeysfu: [],
      checkedTitle: [],
      checkedTitlefu: [],
      controlList: [],
      controDate: [],
      taskId: undefined
    }
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.sceneId !== undefined) {
      this.setState({
        sceneId: this.props.location.state.sceneId
      })
      if (this.props.location.state.task_id) {
        // TODO
        this.getTaskDetailsFun(this.props.location.state.task_id)
      }
      console.log(this.props.location.state.sceneId)
    } else {
      this.props.history.goBack()
    }
    
  }

  // 获取任务详情
  getTaskDetailsFun = async (taskId) => {
    const { task_property } = await getTaskDetails({
      task_id: taskId
    })
    const iot_control = []
    _.map(task_property.iot_control, item =>  {
      _.assign(item, {checkbox: true})
      iot_control.push(item)
    })
    let text = []
    task_property.placelist.map(item => {
      item.room.map(flag => {
        text.push(flag.name)
      })
    })
    let weekDate = this.state.weekDate

    if (task_property.time_type === 1) {
      _.map(weekDate, (item, index) => {
        _.map(task_property.time.week, flag => {
          if (Number(item.state) === flag) {
            weekDate[index].cur = true
          }
        })
      })

      console.log(weekDate)
    }
    this.setState({
      taskId,
      taskName: task_property.name,
      controDate: iot_control,
      checkedKeys: task_property.place_id,
      checkedKeysfu: task_property.place_id,
      checkedTitle: text,
      radioValue: task_property.time_type,
      weekDate,
      palyList: task_property?.time?.time || []
    })
    if (task_property.time_type === 2) {
      this.setState({
        isCheck: task_property.time.date
      })
    }
    
  }

  radioFun = e => {
    this.setState({
      radioValue: e.target.value
    })
    if (e.target.value === 2) {
      this.setState({
        showCalendar: true
      })
    }
  }

  weekFun = index => {
    const week = this.state.weekDate
    week.map((item, num) => {
      if (num === index) {
        week[num].cur = !week[index].cur
      }
    })
    this.setState({
      weekDate: week
    })
  }

  showCalendarFun = () => {
    this.setState({
      showCalendar: true
    })
  }
  // 物联控制
  // 复选框单选
  controChange = (e, index) => {
    let listDate = this.state.controlList
    listDate[index].checkbox = e.target.checked
    this.setState({
      controlList: listDate
    })
  }
  // 开关
  controState = (e, index) => {
    let list = this.state.controlList
    list[index].state = e?1:0 
    this.setState({
      controlList: list
    })
  }
  

  addwl  = () => {
    this.setState({
      isModalVisible: true
    }, () => {
      // 物联控制获取
      this.getAiControlFun()
    })
  }

  // 物联控制获取
  getAiControlFun = async() => {
    const list = await getAiControl()
    const controlList = []
    const controDate =  this.state.controDate
    list.batch_control_item_list.map(item => {
        controlList.push({ checkbox: false ,id: item.id, name: item.name, type: item.type, local_control: 1, state: 0})
    })
    controDate.map((flag) => {
      controlList.map((item,index) => {
        if (flag.type === item.type) {
          controlList[index] = flag
        }
      })
    })
    this.setState({
      controlList
    })
  }

  // 物联控制选项删除
  delControDate = (index) => {
    const data = this.state.controDate
    data.splice(index, 1)
    this.setState({
      controDate: data
    })
  }


  //  添加播放时间
  addPlay = () => {
    const palyList = this.state.palyList;
    palyList.push('')
    this.setState({
      palyList
    })
  }

  // 删除播放时间
  delPlay = index => {
    const palyList = this.state.palyList;
    palyList.splice(index, 1)
    this.setState({
      palyList
    })
  }

  // 物联控制弹窗OK
  handleOk = () => {
    let data = []
    this.state.controlList.map(item => {
      if (item.checkbox) {
        data.push(item)
      }
    })
    this.setState({
      controDate: data,
      isModalVisible: false
    })
  }

  // 物联控制弹窗No
  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  }

  // 基本信息
  // 名称
  taskName = (e) => {
    this.setState({
      taskName: e.target.value
    })
  }
  // 控制项图标获取
  getIconFont = (type) => {
    return iconFun(type)
  }

   // 选择位置弹窗
   locationSerchOk = () => {
    this.setState({
      locationSerch: false,
      checkedTitle: this.state.checkedTitlefu,
      checkedKeysfu: this.state.checkedKeys
    })
    console.log(this.state.checkedKeys)
  }

  locationSerchCancel = () => {
    console.log(this.state.checkedKeysfu)
    console.log(this.state.checkedKeys)
    
      this.setState({
        locationSerch: false,
        checkedKeys: this.state.checkedKeysfu,
        checkedTitle: this.state.checkedTitle
      })
  }

  onCheck = (checkedKeys, info) => {
    let checkedTitlefu = []
    
    info.checkedNodes.map(item => {
      if (!item.children) {
        checkedTitlefu.push(item.title)
      }
    })
    this.setState({
      checkedKeys: checkedKeys,
      checkedTitlefu
    })
    // console.log('onCheck', checkedKeys, info);
  }

  // 显示位置选择弹窗
  selectLocation = async () => {
    console.log(this.state.checkedKeys)
    const {placelist} =   await getScenePlace({
       "search": {
         "keyword": ""
     }
     })
     let data = []
     placelist.map((item, index) => {
       data.push({
         title: item.name,
         key: item.id,
         children: []
       })
       item.room.map((flag, num) => {
         data[index].children.push({
           title: flag.name,
           key: flag.id,
         })
       })
     })
     this.setState({
       treeData: data,
       locationSerch: true
     })
   }

   // 验证优先级
   priorityFun = e => {
     console.log(e.target.value)
     this.setState({
      priority: e.target.value
     })
   }
  //  播放时间
  taskDate = (time, timeString,index) => {
    this.state.palyList[index]= timeString;
    
  }

  //  任务提交 
  submintTask = async () => {
    if (!this.state.taskName) {
      message.error('请填写任务名')
      return false
    }
    
    if (this.state.controDate.length<=0) {
      message.error('请选择物联控制')
      return false
    }
    if (this.state.checkedKeys.length<=0) {
      message.error('请选择接收成员')
      return false
    }
    if(!this.state.radioValue) {
      message.error('请选择播放时间重复方式')
      return false
    }
    const getWeekDate = []
    this.state.weekDate.map(item => {
      if (item.cur) {
        getWeekDate.push(Number(item.state))
      }
    })
    this.setState({
      getWeekDate
    }, () => {
      if(this.state.radioValue === 1 && this.state.getWeekDate.length<=0) {
        message.error('请选择播放时间执行星期')
        return false
      }
    })

    if(this.state.radioValue === 2 && this.state.isCheck.length<=0) {
      message.error('请选择播放时间执行日期')
      return false
    }
    for(let i = 0;i<this.state.palyList.length; i++) {
      if(!this.state.palyList[i]) {
        message.error(`请选择播放时间${i+1}执行日期`)
        return false
      }
    }
    const iot_control = []
    this.state.controDate.map(item => {
      iot_control.push({name: item.name, id: item.id, type: item.type, state: item.state,local_control_id: item.local_control})
    })
    const params = {
      task_property: {
        id: this.state.taskId,
        name: this.state.taskName,
        type: 1,
        time_type: this.state.radioValue,
        scene_id: this.state.sceneId,
        iot_control: iot_control,
        place_id: this.state.checkedKeys,
        time: {}
      }
    }
    if (this.state.radioValue === 1) {
      params.task_property.time  = {
        week: getWeekDate,
        time: this.state.palyList
      }
    } else if (this.state.radioValue === 2) {
      params.task_property.time  = {
        date: this.state.isCheck,
        time: this.state.palyList
      }
    } else {
      params.task_property.time  = {
        time: this.state.palyList
      }
    }

    const data = await getTaskAdd(params)
    if (data.result.code === 0) {
      message.success('操作成功')
      this.props.history.goBack()
    }

  }
 
  render() {
    return (
      <div className="new-task">
        	<header className="custom-layout-header">
					<Back />
				</header>
        <div className="new-task-main">
          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon"><IconFont type="icon-xinxi" /></div>
              <div className="text">基本信息</div>
            </div>
            <div className="task-item">
              <div className="task-label">名称</div>
              <div className="task-value"><Input placeholder="请输入任务名称" style={{width: '220px'}} value={this.state.taskName} onChange={this.taskName}/></div>
            </div>
            {/* <div className="task-item">
              <div className="task-label">优先级</div>
              <div className="task-value"><Input placeholder="请输入优先级（1-100）" value={this.state.priority} style={{width: '220px'}} onChange={this.priorityFun} /></div>
            </div> */}
          </div>

          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon wu"><IconFont type="icon-shebeixuanze" /></div>
              <div className="text">物联控制</div>
              <div className="addWl" onClick={() => this.addwl()}> <IconFont type="icon-tianjia1" /></div>
            </div>
            {
              this.state.controDate.length > 0 ? <div className="task-item">
              <div className="task-table">
                <div className="task-he">
                  <div className="task-tr task-tr-right">类型</div>
                  <div className="task-tr">状态</div>
                  <div className="task-tr">操作</div>
                </div>
                {this.state.controDate.map((item, index) => <div key={index} className="task-he">
                <div className="task-tr task-tr-right" >
                  <div className="type-icon"><IconFont  type={this.getIconFont(item.type)} /></div>
                  <div className="type-text">{item.name}</div>
                  </div>
                  <div className="task-tr task-tr-right">{item.state?'开':'关'}</div>
                  <div className="task-tr task-tr-right del"><IconFont  type='icon-jianshao' onClick={() => this.delControDate(index)} /></div>
                </div>)}
              </div>
            </div> : ''
            }
            
          </div>

          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon cy"><IconFont type="icon-chengyuanxuanze" /></div>
              <div className="text">接收成员</div>
            </div>
            <div className="task-item">
              <div className="task-label">名称</div>
              <div className="task-value" onClick={() => this.selectLocation()}><div className="calendarInput">{this.state.checkedTitle.length <= 0 ? (<div className="init">请选择接收成员</div>): (<div>{this.state.checkedTitle.join(' / ')}</div>)}</div></div>
            </div>
          </div>

          <div className="new-task-list noborder">
            <div className="new-task-title">
              <div className="icon datesj"><IconFont type="icon-dingshizhixingrenwu" /></div>
              <div className="text">播放时间</div>
            </div>
            <div className="task-item">
              <div className="task-label">重复</div>
              <div className="task-value" >
              <Radio.Group value={this.state.radioValue} onChange={(e) => this.radioFun(e)}>
                <Radio value={1}>按周重复</Radio>
                <Radio value={2}>指定日期</Radio>
                <Radio value={3}>手动控制</Radio>
              </Radio.Group>
              </div>
            </div>

            {/* 按周重复begin */}
            {this.state.radioValue === 1 ? (<div className="task-item">
              <div className="task-cf-label">执行星期</div>
              <div className="task-cf-value">
                {
                  this.state.weekDate.map((item, index) => {
                    return (
                      <div className="task-cf-value-item" key={index} className={item.cur ?'task-cf-value-item cur': 'task-cf-value-item'} onClick={() => this.weekFun(index)}>{item.name}</div>
                    )
                  })
                }
              </div>
            </div>) : '' }
            {/* 按周重复 end */}
            {/* 指定日期 begin */}
            {this.state.radioValue === 2 ? (<div className="task-item">
              <div className="task-cf-label">执行日期</div>
              <div className="task-cf-value">
                {
                  this.state.isCheck.map((item, index) => {
                    return (
                      <div className="task-cf-value-item" key={index}>{item}</div>
                    )
                  })
                }
                <IconFont type="icon-tianjia1" onClick={() => {this.showCalendarFun()}}/>
              </div>
            </div>) : ''}
            {/* 指定日期 end */}

            {/* 播放时间 begin */}
            {
              this.state.radioValue !== 3 && this.state.palyList.map((itme, index) => {
                return( <div className="task-item" key={index}>
                <div className="task-cf-label">播放时间{index + 1}</div>
                <div className="task-bf-value">
                <TimePicker  style={{width: '220px'}} locale={locale} value={itme ? moment(itme, 'HH:mm:ss'): undefined} onChange={(time, timeString) => this.taskDate(time, timeString,index)}  placeholder="请选择播放时间"/>
                {
                  index === 0 ? (<IconFont type="icon-tianjia1" onClick={() => this.addPlay()} />) :
                  (<IconFont type="icon-jianshao" className="del" onClick={() => this.delPlay(index)} />)
                }
                </div>
              </div>)
              })
            }
           
            {/* 播放时间end */}

          </div>

          <div className="btn-task" onClick={() => this.submintTask()}>
          <Button type="primary">确认提交</Button>
          </div>
          {this.state.showCalendar ? <CheckCalendar
          visible={this.state.showCalendar}
          isCheckData={this.state.isCheck}
          onCancel={()=>{
                this.setState({
                    showCalendar:false
                })
          }}
          onConfirm={(isCheck)=>{
                this.setState({
                    isCheck,
                    showCalendar:false
                })
          }}
       /> : ''}

        </div>
        {/* 添加物联设备弹窗begin */}
        {this.state.isModalVisible ? <Modal title="添加物联控制" zIndex="1050"   okText="确定" cancelText="取消" visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
        <div className="task-table">
          <div className="task-he">
          <div className="task-tr ">选择</div>
            <div className="task-tr task-tr-k">类型</div>
            <div className="task-tr">状态</div>
          </div>
          {
            this.state.controlList.map((item,index) => 
              <div className="task-he" key={index}>
                {/* <Checkbox value="1"></Checkbox> */}
                <div className="task-tr "><Checkbox checked={item.checkbox} onChange={(e) => this.controChange(e, index)}/></div>
                <div className="task-tr task-tr-k">
                  <div className="type-icon"><IconFont type={this.getIconFont(item.type)} /></div>
                  <div className="type-text">{item.name}</div>
                  </div>
                  <div className="task-tr"><Switch  checkedChildren="开" unCheckedChildren="关" checked={item.state} onChange={(e)=> this.controState(e, index)} /></div>
              </div>
            )
          }
        </div>
        </Modal> : ''}
        
        {/* 添加物联设备弹窗end */}
         {/* 位置选择弹窗 begin */}
         <Modal title="选择位置" zIndex="2002"  okText="确定" cancelText="取消" visible={this.state.locationSerch} onOk={() => this.locationSerchOk()} onCancel={() => this.locationSerchCancel()}>
        {
          this.state.locationSerch ? (<Tree
            checkable
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll
            onCheck={this.onCheck}
            treeData={this.state.treeData}
          />):''
        }
        
        </Modal>
        {/* 位置选择弹窗 bend */}
      </div>
    );
  }
}

export default withRouter(NewTask);
