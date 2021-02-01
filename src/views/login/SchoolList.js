import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import IconFont from '@/components/IconFont'
import { setUserInfo } from '@/redux/actions/userInfo';
import '@/assets/css/login';

class SchoolList extends Component {
	constructor(props) {
    super(props);
    this.state = {}
  }
  
	componentDidMount() {
		
	}
	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
  }
  
  // 跳转首页
  goDashboard = (serverName) => {
    // 模拟生成一些数据
    this.props.setUserInfo(Object.assign({}, this.props.value, { role: { type: 1, name: '超级管理员' } }));
    localStorage.setItem('serverName', serverName)
    localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, this.props.value, { role: { type: 1, name: '超级管理员' } })));
    this.props.prop.history.push('/dashboard');
  }

	render() {
		return (
			<div className="server-list">
			<div className="server-title">选择院校</div>
      <div className="server-main">
        {/* 在线 */}
        <div className="server-item status-yes" onClick={() => this.goDashboard('深圳新中外国语学校')}>
          <div className="server-left">
            <IconFont type='icon-xuexiao'/>
            <div className="server-name">深圳新中外国语学校</div>
          </div>
          <div className="server-go"><IconFont type='icon-jinru'/></div>
        </div>
        {/* 离线 */}
        <div className="server-item status-no">
          <div className="server-left">
            <IconFont type='icon-xuexiao'/>
            <div className="server-name">深圳新中外国语学校</div>
          </div>
          <div className="server-go"><IconFont type='icon-jinru'/></div>
        </div>

      </div>

       <div className="server-btn">
          <Button type="primary">刷新</Button>
          <Button onClick={this.props.close}>取消</Button>
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
)(SchoolList);

