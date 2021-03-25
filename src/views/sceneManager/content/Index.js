import React, { Component } from 'react'
import SceneDetails from './sceneDetails'
import ContentTable from './contentTable'
import '../index.scss'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    }
  }
  
  showSceneDetails = () => {
    this.setState({
      details: true
    })
  }

  close = () => {
    this.setState({
      details: false
    })
  }

  getSceneId = (id) => {
    this.refs.contentTable.qiehTaskList(id)
  }

  operation = (type, params) => {
    if (type === 'search') {
      // 搜索
      this.refs.contentTable.serchTaskList(params)
    }
    if (type === 'refresh') {
      // 刷新
      this.refs.contentTable.refresh()
    }
  }

  rightData = (data) => {
    this.props.rightTask(data)
  }
  

  render() {
    return (
      <div className="serch-container">
        {this.props.sceneId ?  <ContentTable prop={this.props} rightData={this.rightData} ref="contentTable" /> : ''}
        {this.state.details ? 
        (<SceneDetails ref="sceneDetails"  seceneType={this.props.seceneType} seceneDetails={this.props.seceneDetails}  close={this.close}/>) 
        : ''}
      </div>
    );
  }
}

export default Content;
