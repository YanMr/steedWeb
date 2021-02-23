import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import SearchHeader from '@/components/SearchHeader';
import SceneLeft from './sceneLeft/Index'
import ContentMain from './content/Index'
import SceneRight from './sceneRight/Index'
import IconFont from '@/components/IconFont';
import './index.scss'

const { Header, Sider, Content } = Layout;

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searData: [
        { type: 'input', name: 'text', width: '200', defaultValue: '0', placeholder: '请输入搜索内容' },
        { type: 'button', name: 'search', submit: true, icon: 'icon-sousuo', color: '#4164F0', defaultValue: '搜索' },
        { type: 'button', name: 'task', icon: 'icon-add1', color: '#4586F3', defaultValue: '新建任务' },
        { type: 'button', name: 'refresh', icon: 'icon-ai-spin', color: '#35AA53', defaultValue: '刷新' }
      ],
      showRightSider: 0,
    }
  }

  operation = params => {
    alert(params.type)
    //  根据返回的 type 做操作判断
    if (params.type === 'search') {
      // 搜索 {type: 'search', data:{location: "0", status: "0", text: undefined}}
      console.log(params.data)
    } else if (params.type === 'task') {
      // 新建任务 {type: 'task', data: null}
      this.props.history.push('/sevice/newtask')
      console.log(params.data)
    } else if (params.type === 'refresh') {
      // 刷新 {type: 'refresh', data: null}
      console.log(params.data)
    }
  }

  toggleShowRightSider = () => {
    this.setState({
      showRightSider: this.state.showRightSider === 0 ? 285 : 0
    })
  }

  render() {
    return (
      <div className="shadow-radius">
        <Layout style={{ minHeight: 'calc(100vh - 61px)', height: 'calc(100vh - 61px)', overflowY: 'auto' }}>
          <Sider className="scene-left" width={142}><SceneLeft /></Sider>
          <Layout>
            <Header className="scene-header"><SearchHeader data={this.state.searData} operation={this.operation} /></Header>
            <Content className="scene-content">
            <ContentMain />
            </Content>
          </Layout>
          <Sider className="scene-right-main" width={this.state.showRightSider}>
            <div className="scene-right">
            <div className={`toggleVisibleRight ${this.state.showRightSider === 285 ? '' : 'active'}`} onClick={() => this.toggleShowRightSider()}>
              <IconFont type="icon-bofangsanjiaoxing" className="icon-arr" />
            </div>
            <SceneRight />
            </div>
          </Sider>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Scene);
