import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import IconFont from '@/components/IconFont'
import './index.scss';

const FormItem = Form.Item;

class Stepscontarner extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
      count: 60,
    }
  }
  componentDidMount() {
    if (this.props.stepNum === 1 ) {
      this.formRef.current.setFieldsValue({
        phone: "15720609248"
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
  
  // 确定
  submit = e => {
    e.preventDefault();
    console.log(this.formRef.current)
    this.formRef.current.validateFields().then((values) => {
      console.log(values)
    }).catch((errorInfo ) => {
			console.log(errorInfo );
		})
  }

	render() {
		return (
			<div className="containerStep">
        {/* 第一步 begin */}
        {this.props.stepNum === 1 ? (<div className="stepnoe">
          <div className="step-title">
            <div className="step-text-main">手机验证码验证</div>
            <div className="step-text-vice">为确保是本人进行操作，请完成以下验证</div>
          </div>
          <div className="step-z">
            <div className="step-from">
              <Form ref={this.formRef} >
              <FormItem 
                  label="手机号码:"
									name="phone"
								>
                157****9248
              </FormItem>
              <FormItem 
                  label="验证码:"
                  name="phoneCode"
                  rules={[{ required: true, message: '请输入验证码!' }]}
								>
                <div className="phoneCode">
                <div className="phoneInput">
                  <Input placeholder="请输入验证码"/>
                </div>
                <div className="code-click">
										<Button type="primary" disabled={!this.state.liked} onClick={this.handleClick}>
                      {
                        this.state.liked? '获取短信验证码': `${this.state.count} 秒后重发`
                      }
									</Button>
								</div>
                </div>
              </FormItem>
              <FormItem>
                <div className="submit">
									<Button type="primary"  htmlType="submit" onClick={this.submit}>
										确认
									</Button>
                </div>
							</FormItem>
              </Form>
            </div>
          </div>
          <div className="message">
            <div className="message-h1">没收到短信验证码？</div>
            <div className="message-con">
              <span>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</span>
              <span>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</span>
              <span>3、如果手机已丢失或停用，请选择其他验证方式。</span>
              <span>4、您也可以尝试将SIM卡移动到另一部手机，然后重试。</span>
            </div>
          </div>
        </div>): ''}
        {/* 第一步 end */}
        {/* 第二步 bengin */}
        {
          this.props.stepNum === 2 ? (
          <div className="steptwo">
           <Form ref={this.formRef} >
              <FormItem 
                  label="新的登录密码:"
                  name="newpassword"
                  rules={[{ required: true, message: '请输入新的登录密码!' }]}
								>
                 <Input placeholder="请输入新的登录密码" type="password" />
              </FormItem>
              <FormItem 
                  label="确认新的登录密码:"
                  name="subPassworld"
                  rules={[{ required: true, message: '请确认新的登录密码!' }]}
								>
                <Input placeholder="请确认新的登录密码" type="password" />
              </FormItem>
              <FormItem>
                <div className="submit">
									<Button type="primary"  htmlType="submit" onClick={this.submit}>
										确认
									</Button>
                </div>
							</FormItem>
              </Form>
          </div>)
          : ''
        }
        {/* 第二步 end */}
        {/* 第三步 begin */}
        {
          this.props.stepNum === 3 ? (<div className="stepthree">
           <div className="suss-icon">
            <IconFont type='icon-chenggong'/>
           </div>
           <div className="suss-text">
             密码修改成功，请点击<i onClick={this.props.security}>重新登录</i>
             </div>
         </div>) : ''
        }
        {/* 第三步 end */}
			</div>
		);
	}
}

export default withRouter(Stepscontarner)
