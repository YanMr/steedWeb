import React, { Component } from 'react';
import { Upload, message, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import IconFont from '@/components/IconFont';
import { getSystemName, setSystemName } from '@/server/system/system'
import _ from 'lodash'
import '../index.scss'


class SystemMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      defaultLogo: '',
      loading: false,
      server: {},
      settingStatus: true,
    }
  }

  componentDidMount () {
    this.getSystemNameFun()
  }

  // 获取系统信息
  getSystemNameFun = async () => {
   const {server, logo} =  await getSystemName()
   this.setState({
    server,
    logo,
    defaultLogo: logo
   })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, logo =>
        this.setState({
          logo,
          loading: false,
        }),
      );
    }
  }
  
  // 恢复默认
  defaultFun = () => {
    this.setState({
      logo: this.state.defaultLogo
    })
  }

  serverName = (e) => {
    let server =  this.state.server
    server.name = e.target.value
    this.setState({
      server
    })
  }

  // 设置系统名称
  saveStatus = async () => {
    this.setState({
      settingStatus: false
    })
    if (!this.state.settingStatus) {
      const data =  await setSystemName({
         "place": {
           "level": 1,
           "parent_id": 0,
           "name": this.state.server.name
       }
       })
       if (_.get(data, 'result.code') === 0) {
         message.success('修改成功')
         this.setState({
          settingStatus: true
        })
       }

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
            <div className="system-name no">{this.state.settingStatus ? this.state.server.name : <Input className="serverInput" value={this.state.server.name} onChange={this.serverName}/>}</div>
            <div className="system-setting" onClick={this.saveStatus}>{this.state.settingStatus? '设置': '保存'}</div>
          </div>
          </div>

          <div className="system-img-main">
            <div className="system-img-title">系统图标设置</div>
            <div className="system-img-setting-img">
              <div className="img-system">{this.state.logo?(<img src={this.state.logo} style={{ width: '100%' }} />): (<IconFont type="icon-morentouxiang" />)}</div>
              <div className="img-setting">
              <Upload 
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
              >
                <div className="img-bottom">{this.state.loading?(<LoadingOutlined />):''}点击上传</div>
              </Upload>
                <div className="img-bottom" onClick={this.defaultFun}>恢复默认</div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default SystemMessage;
