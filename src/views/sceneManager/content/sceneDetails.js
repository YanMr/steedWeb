import React, { Component } from 'react';
import '../index.scss'

class SceneDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    
  }

  seceneLength = (type) => {
    let text = '';
    let num = 0;
    if (type === '接收成员') {
      num = this.props.seceneDetails.place_id.length
      text = `已选择${num}个`
    }
    if (type === '重复') {
      if (this.props.seceneDetails.time.type === 1) {
        num = this.props.seceneDetails.time.week.length
      } else {
        num = this.props.seceneDetails.time.date.length
      }
      text = `已选择${num}个`
    }
    return  text
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

  render() {
    return (
      <div>
        {/* 指定日期 begin */}
        <div className="serch-details-Model">
          <div className="model-title">
            <div className="model-title-text">{this.props.seceneType}</div>
            <div className="model-title-num">{this.seceneLength(this.props.seceneType)}</div>
          </div>

          <div className="model-container">
          {
            this.props.seceneType === '接收成员' && this.props.seceneDetails.place_list.map((item, index) => {
              return (
                <div className="model-list" key={index}>
                <div className="model-list-name cur">{item.name}</div>
                {
                  item.room.map((flag, num) => {
                    return (
                      <div className="model-list-name" key={num}>{flag.name}</div>
                    )
                  })
                }
              </div>
              )
            })
          }
          {
            this.props.seceneType === '重复' && this.props.seceneDetails.time.type === 1 ? (
              <div className="model-list" >
              <div className="model-list-name cur">指定星期</div>
              {
                this.props.seceneDetails.time.week.map((item, index) => {
                  return (
                    <div className="model-list-name" key={index}>{this.weekFun(item)}</div>
                  )
                })
              }
              
              </div>
            ): ''
          }
          {
            this.props.seceneType === '重复' && this.props.seceneDetails.time.type === 2 ? (
              <div className="model-list" >
              <div className="model-list-name cur">指定日期</div>
              {
                this.props.seceneDetails.time.date.map((item, index) => {
                  return (
                    <div className="model-list-name" key={index}>{item}</div>
                  )
                })
              }
              
              </div>
            ): ''
          }
        {
            this.props.seceneType === '执行时间' ? (
              <>
              <div className="model-list">
              <div className="model-list-name cur">开始时间</div>
              <div className="model-list-name">{this.props.seceneDetails.time.start_time}</div>
              </div>
              <div className="model-list">
              <div className="model-list-name cur">结束时间</div>
              <div className="model-list-name">{this.props.seceneDetails.time.end_time}</div>
              </div>
              </>
            ): ''
          }
          
          </div>

          <div className="model-footer">
            <div className="submit cur" onClick={this.props.close} >确定</div>
            <div className="submit" onClick={this.props.close}>取消</div>
          </div>

        </div>
        {/* 指定日期 end */}
        {/* 重复星期 begin */}
        {/* <div className="serch-details-Model">model1</div> */}
        {/* 重复星期 end */}
      </div>
    );
  }
}

export default SceneDetails;
