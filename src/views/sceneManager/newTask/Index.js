import React, { Component } from 'react';
import { Input, Switch, Select, Radio, Button, TimePicker } from 'antd';
import Back from '@/components/Back/index';
import CheckCalendar from '@/components/CheckCalendar/Index'
import IconFont from '@/components/IconFont';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import '../index.scss'



class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1,
      showCalendar: false,
      weekDate: [{ state: '0', name: '周一', cur: false},
        { state: '1', name: '周二', cur: false},
        { state: '2', name: '周三', cur: false},
        { state: '3', name: '周四', cur: false},
        { state: '4', name: '周五', cur: false},
        { state: '5', name: '周六', cur: false},
        { state: '6', name: '周日', cur: false},
      ],
      isCheck: [],
      palyList: ['']
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
        week[num].cur = true
      } else {
        week[num].cur = false
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
              <div className="task-value"><Input placeholder="请输入任务名称" style={{width: '220px'}}/></div>
            </div>
            <div className="task-item">
              <div className="task-label">优先级</div>
              <div className="task-value"><Input placeholder="请输入优先级（1-100）" style={{width: '220px'}}/></div>
            </div>
          </div>

          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon wu"><IconFont type="icon-shebeixuanze" /></div>
              <div className="text">物联控制</div>
            </div>
            <div className="task-item">
              <div className="task-label">类型</div>
              <div className="task-value">
                <div className="type-list">
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-yitiji" /></div>
                  <div className="type-text">一体机</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-touyingyi-shouye" /></div>
                  <div className="type-text">投影仪</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-xianshiqi-shouye" /></div>
                  <div className="type-text">显示器</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-menjin-shouye" /></div>
                  <div className="type-text">门禁</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-chuanglian-shouye" /></div>
                  <div className="type-text">窗帘</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-diandeng-shouye" /></div>
                  <div className="type-text">灯光</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-fengshan-shouye" /></div>
                  <div className="type-text">风扇</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-kongtiao-shouye" /></div>
                  <div className="type-text">空调</div>
                </div>
                </div>
              </div>
            </div>
            <div className="task-item">
              <div className="task-label">状态</div>
              <div className="task-value">
                <div className="task-switch">
                <Switch defaultChecked />
                <Switch defaultChecked />
                </div>
              </div>
            </div>
            <div className="task-item">
              <div className="task-label">控制</div>
              <div className="task-value">
                <div className="task-kz">
                  <div className="task-kz-text jz">禁止</div>
                  <div className="task-kz-text rx">容许</div>
                </div>
              </div>
            </div>
          </div>

          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon cy"><IconFont type="icon-chengyuanxuanze" /></div>
              <div className="text">接收成员</div>
            </div>
            <div className="task-item">
              <div className="task-label">名称</div>
              <div className="task-value"><Select placeholder='请选择接收成员' style={{ width: '220px' }}>
                  <Select.Option value='0'>全部</Select.Option>
                  <Select.Option value='1'>教学楼</Select.Option>
                </Select></div>
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
              this.state.radioValue !==3 && this.state.palyList.map((itme, index) => {
                return( <div className="task-item" key={index}>
                <div className="task-cf-label">播放时间{index + 1}</div>
                <div className="task-bf-value">
                <TimePicker  style={{width: '220px'}} locale={locale}  placeholder="请选择播放时间"/>
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

          <div className="btn-task">
          <Button type="primary">确认提交</Button>
          </div>
          <CheckCalendar
          visible={this.state.showCalendar}
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
       />

        </div>
      </div>
    );
  }
}

export default NewTask;
