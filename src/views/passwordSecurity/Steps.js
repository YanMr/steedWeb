import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconFont from '@/components/IconFont'
import './index.scss';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
	render() {
		return (
			<div className="steps-container">
        <div className={this.props.stepNum >= 1 ? 'steps-main w62 cur' : 'steps-main w62'}>
          <div className="steps-text">1</div>
          <div className="steps-mess">验证身份</div>
        </div>
        <div className={this.props.stepNum >= 2 ? 'steps-border curB' : 'steps-border'}></div>
        <div className={this.props.stepNum >= 2 ? 'steps-main cur' : 'steps-main'}>
        <div className="steps-text">2</div>
        <div className="steps-mess">修改登录密码</div>
        </div>
        <div className={this.props.stepNum === 3 ? 'steps-border curB' : 'steps-border'}></div>
        <div className={this.props.stepNum === 3? 'steps-main w85 cur' : 'steps-main w85'}>
         <div className="steps-text steps-go"><IconFont type='icon-select-bold'/></div>
         <div className="steps-mess">完成</div>
        </div>
			</div>
		);
	}
}

export default withRouter(Steps)
