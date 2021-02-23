import React, { Component } from 'react';
import { Button } from 'antd';
import '../index.scss'


class SystemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="account">
        <div className="account-header">系统更新</div>
        <div className="system-update">
          <div className="system-text">现使用版本：4.053；发现新版本：5.053.</div>
          <div className="system-btn">
          <Button type="primary">下载文件</Button>
          <Button type="primary">按照更新</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SystemUpdate;
