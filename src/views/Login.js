import React, { Component } from 'react';
import ReactSimpleVerify from 'react-simple-verify'
import 'react-simple-verify/dist/react-simple-verify.css'
import { Form, Input, Button, Tabs, Select } from 'antd';
import { connect } from 'react-redux';
import SchoolList from './login/SchoolList'
import { setUserInfo } from '@/redux/actions/userInfo';
import '@/assets/css/login';
import banner from '@/assets/img/banber.png'
import computer from '@/assets/img/computer.png'
import qrcode from '@/assets/img/qrcode.png'

const { TabPane } = Tabs;
const { Option } = Select;
const FormItem = Form.Item;

const selectBefore = (
  <Select defaultValue="+86" className="select-before">
    <Option value="+86">+86</Option>
    <Option value="+863">+863</Option>
  </Select>
);

class Login extends Component {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = { 
			clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
			userName: '',
			password: '',
			phone: '',
			phoneV: '',
			submitType: false,
			tabKey: '1',
			submitTypePhone: false,
			isPass: false,
			count: 60,
			liked: true,
			action: true,
			server: false,
			userMessage: {},
		};
	}
	
	login = e => {
		e.preventDefault();
		this.formRef.current.validateFields().then((values) => {
			localStorage.setItem('isLogin', '1');
			// 开始选择院校
			this.setState({
				server: true,
				userMessage: values
			})
			// 模拟生成一些数据
			this.props.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
			localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } })));
			// this.props.history.push('/dashboard');	
		}).catch((errorInfo ) => {
			console.log(errorInfo );
		})
	};
	componentDidMount() {
		window.addEventListener('resize', this.onResize);
	}
	componentWillUnmount() {
		window.addEventListener('resize', this.onResize);
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	onResize = () => {
		this.setState({ clientHeight: document.documentElement.clientHeight || document.body.clientHeight });
	}
	 
	// 模式切换
 	callback = (key) => {
		if(key === '1') {
			this.setState({
				isPass: false
			})
		}
		this.setState({
			tabKey: key
		})
	}
  // 按钮显示
	userNameFun =(event) =>{
		this.setState({
			userName: event.target.value
		},() => {
			this.state.password && this.state.userName ? this.setState({submitType: true}):this.setState({submitType: false})
		})
	}

	passwordFun = (event) => {
		this.setState({
			password: event.target.value
		},() => {
			this.state.password && this.state.userName ? this.setState({submitType: true}):this.setState({submitType: false})
		})
	}

	phoneFun = (event) => {
    this.setState({
			phone: event.target.value
		},() => {
			this.state.phone && this.state.phoneV ? this.setState({submitTypePhone: true}):this.setState({submitTypePhone: false})
		})
	}

	phoneVFun = (event) => {
    this.setState({
			phoneV: event.target.value
		},() => {
			this.state.phone && this.state.phoneV ? this.setState({submitTypePhone: true}):this.setState({submitTypePhone: false})
		})
	}

  // 拖动验证
	simpleVerify = () => {
		if (!this.state.phone) {
			this.setState({
				isPass: true
			})
			this.formRef.current.validateFields()
		} else {
			this.setState({
				isPass: true
			},() => {
				this.handleClick()
			})
		}
	}

  // 倒计时
	countDown = () => {
    const {count} = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown, 1000)
    }
	}

  // 发送验证码
	handleClick = () => {
    const {liked} = this.state;
    if (!liked) {
      return;
    }
    this.countDown();
	};
	
	// 扫一扫
	actionFun = () => {
		this.setState( {
			action: !this.state.action
		})
	}

	// 院校选择关闭
	serverClose = () => {
		localStorage.removeItem('isLogin');
	}

	render() {
		return (
			<div className="container" style={{'height': this.state.clientHeight}}>
				<div className="content-main">
				<div className="steed-title">铠硕达智慧校园设备管理系统</div>
				 <div className="content">
					<div className="login-main">
					<div className="login-img"><img alt="banner" src={banner}/></div>
					<div className="login-form-z">
						{!this.state.server?(<div>
						{this.state.action?(<Tabs defaultActiveKey={this.state.tabKey} onChange={this.callback}>
							<TabPane tab="密码登录" key="1">
							{this.state.tabKey === '1'?(	<Form ref={this.formRef} className="login-form">
								<FormItem 
									name="username"
									rules={[{ required: true, message: '请填写手机号/邮箱！' }]}
								>
									<Input placeholder="手机号/邮箱"  onChange={this.userNameFun}/>
								</FormItem>
								<FormItem 
									name="password"
									rules={[{ required: true, message: '请填写密码！' }]}
								>
									<Input placeholder="密码"  onChange={this.passwordFun}/>
								</FormItem>
								<FormItem>
								  <Button type="primary" disabled={!this.state.submitType}  htmlType="submit" block onClick={this.login}>
										登录
									</Button>
									<div className="forget-pass">忘记密码</div>
								</FormItem>
							</Form>):''}
							</TabPane>
							<TabPane tab="短信登录" key="2">
							{this.state.tabKey === '2'?(	<Form ref={this.formRef} className="login-form">
							<FormItem 
									name="phone"
									rules={[{ required: true, message: '请填写正确的手机号！' }]}
								>
									<Input addonBefore={selectBefore} onChange={this.phoneFun} />
								</FormItem>
								<FormItem 
									name="phoneCode"
									rules={[{ required: true, message: '请输入验证码！' }]}
								>
									<div>
											<ReactSimpleVerify ref="verify" width={277} movedColor="#4164F0" successTips="已通过" success={this.simpleVerify}/>
											{
												this.state.isPass?(<div className="Verification">
													<div className="code-input"><Input placeholder="请输入验证码" onChange={this.phoneVFun}/></div>
													<div className="code-click">
														<Button type="primary" disabled={!this.state.liked} onClick={this.handleClick}>
															{
															  this.state.liked? '发送验证码': `${this.state.count} 秒后重发`
														  }
													</Button>
													</div>
												</div>):''
											}
										</div>
								</FormItem>
								<FormItem>
									<Button type="primary" disabled={!this.state.submitTypePhone}  htmlType="submit" block onClick={this.login}>
										登录
									</Button>
								</FormItem>
							</Form>):''}
							</TabPane>
						</Tabs>):(<div className="wx-page">
							<div className="wx-title">微信二维码登录</div>
							<div className="wx-qrcode"></div>
							<div className="wx-text">请使用微信扫描二维码登录</div>
						</div>)}
						<div className="action-s" onClick={this.actionFun}>{this.state.action?'扫一扫登录':'账号密码登录'}</div>
						<div className="action-img" onClick={this.actionFun}><img alt="banner" src={this.state.action?qrcode:computer}/></div>
					  </div>):(<SchoolList prop={this.props} close={this.serverClose} value={this.state.userMessage} />)}
					</div>
					</div>
					</div>
				</div>
				<div className="copyright">
					<div className="copyright-one">粤公网安备000000000000号 / 粤ICP备00000000号</div>
					<div className="copyright-one">深圳市铠硕达科技有限公司 © 2020 STEED</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
