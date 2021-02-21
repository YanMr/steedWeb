import React, { Component } from 'react';
import { Button } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'


class SystemMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="account">
        <div className="account-header">系统消息设置</div>
        <div className="systemMessage">

          <div className="system-main">
          <div className="label-name">系统名称</div>
          <div className="label-value">
            <div className="system-name no">未设置</div>
            <div className="system-setting">设置</div>
          </div>
          </div>

          <div className="system-img-main">
            <div className="system-img-title">系统图标设置</div>
            <div className="system-img-setting-img">
              <div className="img-system"><IconFont type="icon-morentouxiang" /></div>
              <div className="img-setting">
                <div className="img-bottom">点击上传</div>
                <div className="img-bottom">恢复默认</div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default SystemMessage;
