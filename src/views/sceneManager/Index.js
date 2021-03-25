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
      seceneType: '',
      seceneDetails: {},
      showRightSider: 0,
      sceneId: undefined,
      taskId: undefined
    }
  }

  operation = params => {
    //  根据返回的 type 做操作判断
    if (params.type === 'search') {
      // 搜索 {type: 'search', data:{location: "0", status: "0", text: undefined}}
      this.refs.content.operation('search', params.data.text)
    } else if (params.type === 'task') {
      // 新建任务 {type: 'task', data: null}
      this.props.history.push({pathname: '/sevice/newtask', state: {sceneId: this.state.sceneId}})
    } else if (params.type === 'refresh') {
      // 刷新 {type: 'refresh', data: null}
      this.refs.content.operation('refresh', this.state.sceneId)
    }
  }

  toggleShowRightSider = () => {
    this.setState({
      showRightSider: this.state.showRightSider === 0 ? 285 : 0
    })
  }

  sceneDetail = (type, details) => {
    console.log(type, details)
    this.setState({
      seceneType: type,
      seceneDetails: details
    })
    this.refs.content.showSceneDetails()
  }

  closemodel = () => {
    this.refs.content.close()
  }

  sceneId = (id) => {
    this.setState({
      sceneId: id
    })
    this.refs.content.getSceneId(id)
    this.refs.search.clearKeyText()
  }
  rightTask = (data) => {
    this.setState({
      showRightSider: 285,
    })
    this.refs.sceneRight.getTaskDetailsFun(data.id)
  }

  render() {
    return (
      <div className="shadow-radius">
        <Layout style={{ minHeight: 'calc(100vh - 61px)', height: 'calc(100vh - 61px)', overflowY: 'auto' }}>
          <Sider className="scene-left" width={142}><SceneLeft prop={this.props} sceneId={this.sceneId} sceneDetail={this.sceneDetail} close={this.closemodel}/></Sider>
          <Layout>
            <Header className="scene-header"><SearchHeader ref="search" data={this.state.searData} operation={this.operation} /></Header>
            <Content className="scene-content">
            <ContentMain prop={this.props} rightTask={this.rightTask} sceneId={this.state.sceneId} ref="content" seceneType={this.state.seceneType} seceneDetails={this.state.seceneDetails}/>
            </Content>
          </Layout>
          <Sider className="scene-right-main" width={this.state.showRightSider}>
            <div className="scene-right">
            <div className={`toggleVisibleRight ${this.state.showRightSider === 285 ? '' : 'active'}`} onClick={() => this.toggleShowRightSider()}>
              <IconFont type="icon-bofangsanjiaoxing" className="icon-arr" />
            </div>
            <SceneRight ref="sceneRight" prop={this.props} />
            </div>
          </Sider>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Scene);
