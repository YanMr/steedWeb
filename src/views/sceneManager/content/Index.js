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

  render() {
    return (
      <div className="serch-container">
        <ContentTable />
        {this.state.details ? 
        (<SceneDetails ref="sceneDetails"  seceneType={this.props.seceneType} seceneDetails={this.props.seceneDetails}  close={this.close}/>) 
        : ''}
      </div>
    );
  }
}

export default Content;
