import React, { Component } from 'react';
import { Input, Popover, Modal, Form, Select, Radio, TimePicker, DatePicker } from 'antd';
import IconFont from '@/components/IconFont';
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
      sceneIndex: -1,
      isModalVisible: true,
      sceneData: [
        {status: 1, name: '日常授课场景'},
        {status: 0, name: '期末考试'},
        {status: 1, name: '校园秋季运动会运动会'}
      ]
    }
  }
  
  // 搜索
  serchFun = e => {
    e.preventDefault();
    this.setState({
      newScene: false,
      serch: true 
    }, () => {
      const input = this.refs.serchInput;
      input.focus()
    })
  }

  // 失去焦点
  serchBlur = () => {
    this.setState({
      newScene: true
    })
  }

  //  选中场景
  sceneDetails = (index) => {
    this.setState({
      sceneIndex: index
    })
  }

  // 添加场景弹窗
  handleOk = () => {
    
  }

  handleCancel = () => {

  }

  //  开机时间
  onChange = (time, timeString) => {
    console.log(time, timeString);
  }

  render() {
     // 场景悬浮框内容
      const content = (
        <div className="operation">
          <div className="operationitem">修改</div>
          <div className="operationitem">删除</div>
          <div className="operationitem">创建副本</div>
          <div className="operationitem">启用/暂停</div>
        </div>
      );
    return (
      <div className="serch-container">
        {/* 搜索 begin */}
        <div className="serch-header">
          {
            this.state.newScene ? (<div className="new-scene"><IconFont type="icon-add1" /></div>) : ''
          }
          <div className="serch-scene">
            <Input className="serch-input" ref="serchInput" onBlur={() => this.serchBlur()} style={{width: !this.state.newScene? '100%' : '', opacity:  !this.state.newScene? '1' : ''}} />
            <IconFont type="icon-sousuo" className="sousuo-fun" style={{right: !this.state.newScene? '9px' : ''}} onMouseDown={(e) => this.serchFun(e)}/>
          </div>
        </div>
        {/* 搜索 end */}
        <div className="scene-main">
        {/* 场景 begin */}
          <div className="scene-main-list">
            {
              this.state.sceneData.map((item, index) =>  (
                  <div key={index} className={item.status?'scene-itme open':'scene-itme close'} onClick={() => this.sceneDetails(index)}>
                  <div className="scene-itme-icon"><IconFont type={item.status?'icon-bofang': 'icon-tingzhi'} /></div>
                  <div className={this.state.sceneIndex === index ? ' scene-itme-text ellipsis cur' : 'scene-itme-text ellipsis' }>{item.name}</div>
                  <div className="scene-itme-more">
                  <Popover placement="bottomLeft" content={content}>
                    <IconFont type="icon-gengduo" />
                  </Popover>  
                  </div>
                </div>
                ))
            }

          </div>
        {/* 场景 end */}
        <div className="scene-title ellipsis">日常授课场景</div>
        {/* 场景详情 begin */}
          <div className="scene-details">
            <div className="scene-details-list">
              <div className="scene-details-icon"><IconFont type="icon-youxianji" /></div>
              <div className="scene-details-text">优先级</div>
              <div className="scene-details-go">3</div>
            </div>
            <div className="scene-details-list">
              <div className="scene-details-icon"><IconFont type="icon-chengyuanxuanze" /></div>
              <div className="scene-details-text">接收成员</div>
              <div className="scene-details-go"> <IconFont type="icon-jinru" /></div>
            </div>
            <div className="scene-details-list">
              <div className="scene-details-icon"><IconFont type="icon-laihuijiantou" /></div>
              <div className="scene-details-text">重复</div>
              <div className="scene-details-go"><IconFont type="icon-jinru" /></div>
            </div>
            <div className="scene-details-list">
              <div className="scene-details-icon"><IconFont type="icon-dingshizhixingrenwu" /></div>
              <div className="scene-details-text">执行时间</div>
              <div className="scene-details-go"><IconFont type="icon-jinru" /></div>
            </div>
          </div>
        {/* 场景详情 end */}
        </div>
        {/* 添加场景弹窗 begin */}
        <Modal title="场景添加"  okText="确定" cancelText="取消" visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
            <Form ref={this.formRef} labelAlign="left" className="login-form">
                <FormItem 
                  label="场景名称"
									name="scenename"
									rules={[{ required: true, message: '请填写场景名称!' }]}
								>
									<Input placeholder="任务名称" />
								</FormItem>

                <FormItem 
                  label="场景状态"
									name="scenestate"
									rules={[{ required: true, message: '请选择场景状态!' }]}
								>
									<Radio.Group>
                    <Radio value="1">启用</Radio>
                    <Radio value="2">禁用</Radio>
                  </Radio.Group>
								</FormItem>

                <FormItem 
                  label="场景重复"
									name="scenerepeat"
									rules={[{ required: true, message: '请选择场景重复模式!' }]}
								>
									<Radio.Group>
                    <Radio value="1">按周重复</Radio>
                    <Radio value="2">指定日期</Radio>
                  </Radio.Group>
								</FormItem>

                <FormItem 
                  label="场景周期"
									name="scenecycle"
									rules={[{ required: true, message: '请选场景周期!' }]}
								>
									<Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="请选择周期"
                  >
                    <Option key='0'>星期一</Option>
                    <Option key='1'>星期二</Option>
                    <Option key='2'>星期三</Option>
                    <Option key='3'>星期四</Option>
                    <Option key='4'>星期五</Option>
                    <Option key='5'>星期六</Option>
                    <Option key='6'>星期日</Option>
                  </Select>
								</FormItem>

                <FormItem 
                  label="开始时间"
									name="sceneStarDate"
									rules={[{ required: true, message: '请选场景开始时间!' }]}
								>
									<DatePicker style={{ width: '100%' }} locale={locale} placeholder="请选场景开始时间"/>
								</FormItem>

                <FormItem 
                  label="结束时间"
									name="sceneEndDate"
									rules={[{ required: true, message: '请选场景结束时间!' }]}
								>
									<DatePicker style={{ width: '100%' }} locale={locale} placeholder="请选场景结束时间" />
								</FormItem>

                <FormItem 
                  label="开机时间"
									name="sceneboot"
                  rules={[{ required: true, message: '请选场景开机时间!' }]}
								>
									<TimePicker style={{ width: '100%' }} locale={locale} onChange={this.onChange}  placeholder="请选开机时间"/>
								</FormItem>

                <FormItem 
                  label="场景位置"
									name="scenelocation"
									rules={[{ required: true, message: '请选场景位置!' }]}
								>
								<Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="请选场景位置"
                  >
                    <Option key='0'>教学楼</Option>
                    <Option key='1'>办公室</Option>
                    <Option key='2'>自习楼</Option>
                    <Option key='3'>舞蹈室</Option>
                  </Select>
								</FormItem>
							
							</Form>
        </Modal>
        {/* 添加场景弹窗 end */}
      </div>
    );
  }
}

export default SceneLeft;
