import React, { Component } from 'react';
import { Input, Popover } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'

class SceneLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newScene: true,
      serch: false,
      sceneIndex: -1,
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
      </div>
    );
  }
}

export default SceneLeft;
