import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import IconFont from '@/components/IconFont'
import { setLocalServer } from '@/server/login'
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
  goDashboard = async (server) => {
    const data = await setLocalServer({
      server_token: localStorage.getItem('server_token'),
      server_id: server.server_id
    })
    localStorage.setItem('isLogin', '1');
    localStorage.setItem('logo', data.server.logo)
    localStorage.setItem('ui', data.login_info.ui)
    this.props.setUserInfo(Object.assign({}, this.props.value, { role: { type: data.login_info.role_level, name: data.login_info.user } }));
    localStorage.setItem('serverName', server.name)
    localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, this.props.value, { role: { type: data.login_info.role_level, name: data.login_info.user } })));
    this.props.prop.history.push('/dashboard');
  }

	render() {
		return (
			<div className="server-list">
			<div className="server-title">选择院校</div>
      <div className="server-main">

        {this.props.value.map((item, index) => {
          return(<div key={index} className={item.is_online ? 'server-item status-yes' : 'server-item status-no'} onClick={() => this.goDashboard(item)}>
          <div className="server-left">
            <IconFont type='icon-xuexiao'/>
            <div className="server-name">{item.name}</div>
          </div>
          <div className="server-go"><IconFont type='icon-jinru'/></div>
        </div>)
        })}

      </div>

       <div className="server-btn">
          <Button type="primary" onClick={this.props.refresh}>刷新</Button>
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

