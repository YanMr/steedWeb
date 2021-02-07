import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Steps from "./Steps"
import Stepscontarner from './Stepscontarner'
import './index.scss';

class PasswordSecurity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1 // 步奏传值  1 2 3
    }
  }
	render() {
		return (
			<div className="securuty-container">
				<div className="securuty-header">
					<div className="securuty-main">
						<div className="login-text">铠硕达智慧校园设备管理系统</div>
						<div className="securuty-title">验证身份</div>
						<div className="login-page" onClick={this.props.securityFun}>已有账号,<i>马上登录</i></div>
					</div>
				</div>
				<div className="securuty-center">
					<Steps stepNum={this.state.step}/>
					<Stepscontarner stepNum={this.state.step} security={this.props.securityFun}/>
				</div>
				<div className="copyright-name">
          <span>深圳市铠硕达科技有限公司 © 2020 STEED</span>
          <span className="mg15">粤公网安备000000000000号</span>
          <span>粤ICP备00000</span>
          </div>
			</div>
		);
	}
}

export default withRouter(PasswordSecurity)
