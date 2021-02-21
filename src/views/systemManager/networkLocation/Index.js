import React, { Component } from 'react';
import '../index.scss'


class NetworkLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="account">
        <div className="account-header">网络位置</div>
      </div>
    );
  }
}

export default NetworkLocation;
