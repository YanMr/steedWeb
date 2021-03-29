import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import IconFont from '@/components/IconFont';
import { getSystemName, setSystemName } from '@/server/system/system'
import '../index.scss'


class SystemMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      loading: false,
      server: {}
    }
  }

  componentDidMount () {
    this.getSystemNameFun()
  }

  // 获取系统信息
  getSystemNameFun = async () => {
    await getSystemName()
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
              <div className="img-system">{this.state.logo?(<img src={this.state.logo} alt="avatar" style={{ width: '100%' }} />): (<IconFont type="icon-morentouxiang" />)}</div>
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
