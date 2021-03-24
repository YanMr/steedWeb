import React, { Component } from 'react';
import IconFont from '@/components/IconFont';
import iconFun from '@/components/IconType';
import { getTaskDetails } from '@/server/scene'
import _ from 'lodash'
import '../index.scss'

class SceneRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_property: {}
    }
  }

  // 获取任务详情
  getTaskDetailsFun = async (taskId) => {
    const { task_property } = await getTaskDetails({
      task_id: taskId
    })
    this.setState({
      task_property
    })
  }

  weekFun = (week) => {
    let text = ''
     if (week == 1) {
      text = "星期一";
     }
     if (week == 2) {
      text = "星期二";
     }
     if (week == 3) {
      text = "星期三";
     }
     if (week == 4) {
      text = "星期四";
     }
     if (week == 5) {
      text = "星期五";
     }
     if (week == 6) {
      text = "星期六";
     }
     if (week == 7) {
      text = "星期日";
     }
    return text
  }

  // 控制项图标获取
  getIconFont = (type) => {
    return iconFun(type)
  }

  render() {
    return (
      <>
      {
        _.isEqual(this.state.task_property, {}) ? (<div className="noData">请选择任务</div>) : ( <div className="serch-container">
        <div className="serch-right-header">{this.state.task_property.name}</div>
        <div className="serch-right-container">
          {/* 设备控制 begin */}
          <div className="serch-right-device">
            <div className="device-header">设备控制</div>
            <div className="device-list">
              {
                this.state.task_property?.iot_control?.map(item => {
                  return (
                   <div className={item.state? 'device-item yes' : 'device-item no'}>
                     <div className="device-item-img"><IconFont type={this.getIconFont()} /></div>
                     <div className="device-item-name ellipsis">{item.name}-{item.state?'开':'关'}</div>
                   </div>
                  )
                })
              }
              
              
            </div>
          </div>
          {/* 设备控制 end */}
          {/* 接收成员 begin */}
          <div className="device-user">
          <div className="user-header">
            <div className="user-header-title">接收成员</div>
            <div className="user-header-ico"><IconFont type="icon-jinru" /></div>
          </div>
          <div className="user-container">
            {
              this.state.task_property?.placelist?.map(itme =>  <div className="user-list">
              <div className="user-list-header">{itme.name}</div>
              <div className="user-list-con">
                {
                  itme.room?.map(falg => <div className="user-list-item">{falg.name}</div>)
                }
              </div>
            </div>)
            }
           
            
          </div>
 
           <div className="user-footer">
             共{this.state.task_property?.place_id?.length > 0 ? this.state.task_property?.place_id.length : 0}个
           </div>
 
          </div>
          {/* 接收成员 end */}
 
          {/* 生效时间 begin */}
          <div className="device-user">
          <div className="user-header">
            <div className="user-header-title">{this.state.task_property.time_type === 1 ? '按周重复' : '按日期重复'}</div>
            <div className="user-header-ico"><IconFont type="icon-jinru" /></div>
          </div>
          <div className="user-container">
            <div className="effect-date">
            <div className="user-container-title">{this.state.task_property.time_type === 1 ? '指定星期' : '指定日期'}</div>
            <div className="user-container-list">
              {
               this.state.task_property.time_type === 1 ? (<>{
                 this.state.task_property?.time?.week?.map(item => <div className="user-date-item">{this.weekFun(item)}</div>)
               }</>) : (<>{
                 this.state.task_property?.time?.date?.map(item => <div className="user-date-item">{item}</div>)
               }</>)
              }
              
            </div>
            </div>
          </div>
 
           <div className="user-footer">
             共{this.state.task_property.time_type === 1 ? this.state.task_property?.time?.week.length : this.state.task_property?.date?.week.length}个
           </div>
 
          </div>
          {/* 生效时间 end */}
 
          {/* 重复 begin */}
          <div className="device-user">
          <div className="user-header">
            <div className="user-header-title">播放时间</div>
            <div className="user-header-ico"><IconFont type="icon-jinru" /></div>
          </div>
          <div className="user-container">
            <div className="effect-date">
            <div className="user-container-title">执行时间</div>
            <div className="user-container-list">
             {this.state.task_property?.time?.time?.map(item => <div className="user-date-item">{item}</div>)}
            </div>
            </div>
          </div>
 
           <div className="user-footer">
             共{this.state.task_property?.time?.time.length}个
           </div>
 
          </div>
          {/* 重复 end */}
        </div>
       </div>)
      }
      </>
    );
  }
}

export default SceneRight;
