import React, { Component } from 'react';
import { Layout } from 'antd';
import SearchHeader from '@/components/SearchHeader';
import './index.scss'

const { Header, Sider, Content } = Layout;

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searData: [
        { type: 'input', name: 'text', width: '270', defaultValue: '0', placeholder: '请输入搜索内容' },
        { type: 'button', name: 'search', submit: true, icon: 'icon-sousuo', color: '#4164F0', defaultValue: '搜索' },
        { type: 'button', name: 'task', icon: 'icon-add', color: '#4586F3', defaultValue: '新建任务' },
        { type: 'button', name: 'refresh', icon: 'icon-ai-spin', color: '#35AA53', defaultValue: '刷新' }
      ]
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
      console.log(params.data)
    } else if (params.type === 'refresh') {
      // 刷新 {type: 'refresh', data: null}
      console.log(params.data)
    }
  }

  render() {
    return (
      <div className="shadow-radius">
        <Layout style={{ minHeight: '100vh', height: '100vh', overflowY: 'auto' }}>
          <Sider className="scene-left" width={142}>左边</Sider>
          <Layout>
            <Header className="scene-header"><SearchHeader data={this.state.searData} operation={this.operation}/></Header>
            <Content className="scene-content">Content</Content>
          </Layout>
          <Sider className="scene-right" width={285}>右边</Sider>
        </Layout>
      </div>
    );
  }
}

export default Scene;
