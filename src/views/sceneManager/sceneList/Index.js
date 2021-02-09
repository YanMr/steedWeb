import React, { Component } from 'react';
import { Input } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'

class SceneList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newScene: true,
      serch: false
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

  render() {
    return (
      <div>
        <div className="serch-header">
          {
            this.state.newScene ? (<div className="new-scene"><IconFont type="icon-add1" /></div>) : ''
          }
          <div className="serch-scene">
            <Input className="serch-input" ref="serchInput" onBlur={() => this.serchBlur()} style={{width: !this.state.newScene? '100%' : '', opacity:  !this.state.newScene? '1' : ''}} />
            <IconFont type="icon-sousuo" className="sousuo-fun" style={{right: !this.state.newScene? '9px' : ''}} onMouseDown={(e) => this.serchFun(e)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SceneList;
