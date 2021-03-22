import React, { Component } from 'react';
import { Input, Popover, Modal, Form, Select, Radio, TimePicker, Tree, message } from 'antd';
import IconFont from '@/components/IconFont';
import CheckCalendar from '@/components/CheckCalendar/Index'
import { getScenePlace, setTaskScene, getSceneList, getSceneDetails, getSceneStatus, setDelScene } from '@/server/scene'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import '../index.scss'

const { Option } = Select;
const FormItem = Form.Item;

class SceneLeft extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      newScene: true,
      serch: false,
      sceneIndex: 0,
      isModalVisible: false,
      showCalendar: false,
      isCheck: [],
      locationSerch: false,
      radioCalendar: '1',
      serchInputValue: '',
      sceneData: [],
      sceneDetails: {},
      sceneDetailsFu: {},
      treeData:[],
      checkedKeys: [],
      checkedKeysfu: [],
      checkedTitle: [],
      checkedTitlefu: [],
      sceneId: undefined,
    }
  }

  componentDidMount() {
    this.getSceneListFun()
  }
  
  // 搜索
  serchFun =  e => {
    e.preventDefault();
    if (this.state.newScene) {
      this.setState({
        newScene: false,
        serch: true,
        serchInputValue: ''
      }, () => {
        const input = this.refs.serchInput;
        input.focus()
      })
    } else {
      this.getSceneListFun()
    }
  }

  // 获取场景详情
  getSceneDetailsFun = async(id) => {
    const data = await getSceneDetails({
        "task_scene_id": id
    })
    this.setState({
      sceneDetails: data
    })
  }

  // 获取场景列表
  getSceneListFun = async() => {
    const data =  await getSceneList({
      "search": {
        "keyword": this.state.serchInputValue
    }
    })
    this.setState({
      sceneData: data.task_scene_list
    })
    this.props.sceneId(data.task_scene_list[0].id)
    this.getSceneDetailsFun(data.task_scene_list[0].id)
  }

  // 失去焦点
  serchBlur = () => {
    this.setState({
      newScene: true
    })
  }

  //  选中场景
  sceneDetails = (id,index) => {
    this.getSceneDetailsFun(id)
    this.setState({
      sceneIndex: index
    })
    this.props.close()
    this.props.sceneId(id)
  }
  
  // 新建场景任务
  addScene = () => {
    this.setState({
      sceneDetailsFu: {},
      radioCalendar: '1',
      isModalVisible: true
    })
  }

  // 添加场景弹窗
  handleOk = () => {
    this.formRef.current.validateFields().then(async(values) => {
      const params = {
        "task_scene_info": {
            "id": this.state.sceneId,
            "name": values.scenename,
            "state": Number(values.scenestate),
            "priority": Number(values.priority),
            "time": {},
            "place_id": values.scenelocation
        }
    }

    if (values.scenerepeat === '1') {
      let numList = []
      values.scenecycle.map(item => {
        numList.push(Number(item))
      })
      params.task_scene_info.time = {
        "type": Number(values.scenerepeat),
        "week": numList,
        "start_time": moment(values.sceneStarDate).format('LTS'),
        "end_time": moment(values.sceneEndDate).format('LTS')
      }
    } else {
      params.task_scene_info.time = {
        "type": Number(values.scenerepeat),
        "date": values.scenecycle,
        "start_time": moment(values.sceneStarDate).format('LTS'),
        "end_time": moment(values.sceneEndDate).format('LTS')
      }
    }
    const data =  await setTaskScene(params)
      this.setState({
        isModalVisible: false
      }, () => {
        if (data.result.code === 0) {
          message.success("操作成功");
          this.getSceneListFun()
        }
      })
    })
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  }

  // 选择位置弹窗
  locationSerchOk = () => {
    this.setState({
      locationSerch: false,
      checkedTitle: this.state.checkedTitlefu,
      checkedKeysfu: this.state.checkedKeys
    })
    this.formRef.current.setFieldsValue({
      scenelocation: this.state.checkedKeys
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

  sceneType = (e) => {
    this.setState({
      radioCalendar: e.target.value,
    })
    this.formRef.current.setFieldsValue({
      scenecycle: undefined
    })
    if (e.target.value === '1') {
      this.setState({
        showCalendar: false
      })
    } else {
      this.setState({
        showCalendar: true
      })
    }
    
  }

  // 开始时间
  sceneStarDate = (time, timeString) => {
    console.log(time, timeString);
    // this.formRef.current.setFieldsValue({
    //   sceneStarDate: time
    // })
  }
  
  // 结束时间
  sceneEndDate = (time, timeString) => {
    console.log(time, timeString);
  }

  // 显示位置选择弹窗
  selectLocation = async () => {
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

  // 位置选择
  // onSelect = (selectedKeys, info) => {
  //   this.setState({
  //     checkedKeys: selectedKeys
  //   })
  //   console.log('selected', selectedKeys, info);
  // }

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
    console.log('onCheck', checkedKeys, info);
  }

  // 指定日期选择
  confirmCalendal = (isCheck) => {
    this.formRef.current.setFieldsValue({
      scenecycle: isCheck
    })
    this.setState({
      isCheck,
      showCalendar:false
    })
  }
  
  // 验证优先级
  checkAccount = (rule, value, callback) => {
    if ((value > 0 &&  value <=  100) || !value) {
      callback();
  } else {
      callback('优先级范围1 - 100');
  }
  }

  // 搜索输入框
  serchInput = (e) => {
    this.setState({
      serchInputValue: e.target.value
    })
  }

  // 场景状态设置
  setSceneState = async (e,id, state) => {
    e.stopPropagation()
    const data = await getSceneStatus({
      "task_scene_id": id,
      "state": state === 0 ? 1 : 0
    })
    if (data.result.code === 0) {
      message.success("操作成功");
      this.getSceneListFun()
    }
  }

  // 场景删除
  delScene = async (e, id) => {
    e.stopPropagation()
    const data = await setDelScene({
      "task_scene_id": id
    })
    if (data.result.code === 0) {
      message.success("操作成功");
      this.getSceneListFun()
    }
  }

  // 场景修改
  editScene = async(e, id) => {
    e.stopPropagation()
      const data = await getSceneDetails({
        "task_scene_id": id
    })
    let text = []
    data.place_list.map(item => {
      item.room.map(flag => {
        text.push(flag.name)
      })
    })
    this.setState({
      sceneId: id,
      checkedTitle: text,
      sceneDetailsFu: data,
      checkedKeys:data.place_id,
      radioCalendar: String(data.time?.type),
      isModalVisible: true
    }, () => {
      this.formRef.current.setFieldsValue({
        scenelocation: data.place_id,
        // scenecycle: data.time.date,
      })
    })
    if (data.time.type === 2) {
      this.setState({
        isCheck: data.time.date
      })
    }
  }

  // 星期转换
  weekFun = (time) => {
    let text = [];
    if (time?.type === 1) {
      time.week.map(item => {
        text.push(String(item))
      })
    } else {
      text = ''
      text = time?.date.join('/')
    }
    console.log(text)
    return text
  }

  // 创建任务
  createrTask = (e, id) => {
    e.stopPropagation()
    this.props.prop.history.push({pathname: '/sevice/newtask', state: {sceneId: id}})
  }

  render() {
    return (
      <div className="serch-container">
        {/* 搜索 begin */}
        <div className="serch-header">
          {
            this.state.newScene ? (<div className="new-scene" onClick={() => this.addScene()}><IconFont type="icon-add1" /></div>) : ''
          }
          <div className="serch-scene">
            <Input className="serch-input" value={this.state.serchInputValue} onChange={this.serchInput} ref="serchInput" onBlur={() => this.serchBlur()} style={{width: !this.state.newScene? '100%' : '', opacity:  !this.state.newScene? '1' : ''}} />
            <IconFont type="icon-sousuo" className="sousuo-fun" style={{right: !this.state.newScene? '9px' : ''}} onMouseDown={(e) => this.serchFun(e)}/>
          </div>
        </div>
        {/* 搜索 end */}
        <div className="scene-main">
        {/* 场景 begin */}
          <div className="scene-main-list">
            {
              this.state.sceneData?.map((item, index) =>  (
                  <div key={index} className={item.state?'scene-itme open':'scene-itme close'} onClick={() => this.sceneDetails(item.id, index)}>
                  <div className="scene-itme-icon"><IconFont type={item.state?'icon-bofang': 'icon-tingzhi'} /></div>
                  <div className={this.state.sceneIndex === index ? ' scene-itme-text ellipsis cur' : 'scene-itme-text ellipsis' }>{item.name}</div>
                  <div className="scene-itme-more" onClick={e => e.stopPropagation()}>
                  <Popover placement="bottomLeft" content={(
                      <div className="operation">
                        <div className="operationitem" onClick={(e) => this.editScene(e, item.id)}>修改</div>
                        <div className="operationitem" onClick={(e) => this.delScene(e,item.id)}>删除</div>
                        <div className="operationitem" onClick={(e) => this.createrTask(e,item.id)}>创建任务</div>
                        <div className="operationitem" onClick={(e) => this.setSceneState(e,item.id, item.state)}>启用/暂停</div>
                      </div>
                    )}>
                    <IconFont type="icon-gengduo" />
                  </Popover>  
                  </div>
                </div>
                ))
            }
          </div>
        {/* 场景 end */}
        {JSON.stringify(this.state.sceneDetails) !== '{}' ? (<><div className="scene-title ellipsis">{this.state.sceneDetails.name}</div>
        {/* 场景详情 begin */}
          <div className="scene-details">
            <div className="scene-details-list">
              <div className="scene-details-icon"><IconFont type="icon-youxianji" /></div>
              <div className="scene-details-text">优先级</div>
              <div className="scene-details-go">{this.state.sceneDetails.priority}</div>
            </div>
            <div className="scene-details-list" onClick={() => this.props.sceneDetail('接收成员', this.state.sceneDetails)}>
              <div className="scene-details-icon"><IconFont type="icon-chengyuanxuanze" /></div>
              <div className="scene-details-text">接收成员</div>
              <div className="scene-details-go"> <IconFont type="icon-jinru" /></div>
            </div>
            <div className="scene-details-list" onClick={() => this.props.sceneDetail('重复', this.state.sceneDetails)}>
              <div className="scene-details-icon"><IconFont type="icon-laihuijiantou" /></div>
              <div className="scene-details-text">重复</div>
              <div className="scene-details-go"><IconFont type="icon-jinru" /></div>
            </div>
            <div className="scene-details-list" onClick={() => this.props.sceneDetail('执行时间', this.state.sceneDetails)}>
              <div className="scene-details-icon"><IconFont type="icon-dingshizhixingrenwu" /></div>
              <div className="scene-details-text">执行时间</div>
              <div className="scene-details-go"><IconFont type="icon-jinru" /></div>
            </div>
          </div>
        {/* 场景详情 end */}</>) : ''}
        </div>
        {/* 添加场景弹窗 begin */}
        {this.state.isModalVisible ? (<Modal title="场景添加" zIndex="1050"   okText="确定" cancelText="取消" visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
            <Form ref={this.formRef} labelAlign="left" className="login-form">
                <FormItem 
                  label="场景名称"
                  name="scenename"
                  initialValue={this.state.sceneDetailsFu.name}
									rules={[{ required: true, message: '请填写场景名称!' }]}
								>
									<Input placeholder="场景名称" />
								</FormItem>
                <FormItem 
                  label="优先级别"
                  name="priority"
                  initialValue={this.state.sceneDetailsFu.priority}
									rules={[{ required: true, message: '请填写优先级别' }, {
                    validator: this.checkAccount,
                }]}
								>
									<Input placeholder="优先级别" />
								</FormItem>
                <FormItem 
                  label="场景状态"
                  name="scenestate"
                  initialValue={String(this.state.sceneDetailsFu.state)}
									rules={[{ required: true, message: '请选择场景状态!' }]}
								>
									<Radio.Group>
                    <Radio value="0">禁用</Radio>
                    <Radio value="1">启用</Radio>
                  </Radio.Group>
								</FormItem>

                <FormItem 
                  label="场景重复"
                  name="scenerepeat"
                  initialValue={String(this.state.sceneDetailsFu.time?.type)}
									rules={[{ required: true, message: '请选择场景重复模式!' }]}
								>
									<Radio.Group onChange={(e) => this.sceneType(e)}>
                    <Radio value="1">按周重复</Radio>
                    <Radio value="2">指定日期</Radio>
                  </Radio.Group>
								</FormItem>

                <FormItem 
                  label="场景周期"
                  name="scenecycle"
                  initialValue={this.weekFun(this.state.sceneDetailsFu.time)}
									rules={[{ required: true, message: '请选场景周期!' }]}
								>
                  {this.state.radioCalendar === '1' ? (<Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="请选择周期"
                  >
                    <Option key='1'>星期一</Option>
                    <Option key='2'>星期二</Option>
                    <Option key='3'>星期三</Option>
                    <Option key='4'>星期四</Option>
                    <Option key='5'>星期五</Option>
                    <Option key='6'>星期六</Option>
                    <Option key='7'>星期日</Option>
                  </Select>) : (<div className="calendarInput" onClick={() => this.setState({ showCalendar: true})} >{this.state.isCheck.length > 0 ? (<div>{this.state.isCheck.join(' / ')}</div>): (<div className="init">请选择周期</div>) }</div>)}
									
								</FormItem>

                <FormItem 
                  label="开始时间"
                  name="sceneStarDate"
                  initialValue={ this.state.sceneDetailsFu.time ? moment(this.state.sceneDetailsFu.time?.start_time, 'HH:mm:ss') : ''}
									rules={[{ required: true, message: '请选场景开始时间!' }]}
								>
									<TimePicker style={{ width: '100%' }} locale={locale} onChange={this.sceneStarDate}  placeholder="请选场景开始时间"/>
								</FormItem>

                <FormItem 
                  label="结束时间"
                  name="sceneEndDate"
                  initialValue={this.state.sceneDetailsFu.time ? moment(this.state.sceneDetailsFu.time?.end_time, 'HH:mm:ss'): ''}
									rules={[{ required: true, message: '请选场景结束时间!' }]}
								>
                  <TimePicker style={{ width: '100%' }} locale={locale} onChange={this.sceneEndDate}  placeholder="请选场景结束时间"/>
								</FormItem>

                <FormItem 
                  label="场景位置"
									name="scenelocation"
									rules={[{ required: true, message: '请选场景位置!' }]}
								>
								<div className="calendarInput" onClick={() => this.selectLocation()}>{this.state.checkedTitle.length <= 0 ? (<div className="init">请选择场景位置</div>): (<div>{this.state.checkedTitle.join(' / ')}</div>)}</div>
								</FormItem>							
							</Form>
        </Modal>):''}
        
        {/* 添加场景弹窗 end */}
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
        {/* 指定日期 begin */}
        {
          this.state.showCalendar ? (<CheckCalendar
            isCheckData={this.state.isCheck}
            visible={this.state.showCalendar}
            onCancel={()=>{
                  this.setState({
                      showCalendar:false
                  })
            }}
            onConfirm={(isCheck)=> this.confirmCalendal(isCheck)}
         />) : ''
        }
        
       {/* 指定日期 end */}
      </div>
    );
  }
}


export default SceneLeft;
