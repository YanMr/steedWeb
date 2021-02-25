import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import IconFont from '@/components/IconFont';
import '../index.scss'


class addUserClass extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    }
  }


  // 添加用户弹窗
  showModal = () => {
    this.setState({
      isModalVisible: true
    })
  }

  handleOk = () => {
    this.setState({
      isModalVisible: false,
      classList: [{id: 1, name: '一年级组'}, {id: 2, name: '二年级组'}],
      userType: [{id: 1, name: '管理员'}, {id: 2, name: '教职工'}, {id: 3, name: '临时工'}]
    })
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    return (
      <div className="add-message-con">
       <Modal title="部门/用户类型" className="add-message"  okText="确定" cancelText="取消" visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
         <div className="classUserCon">
           {/* 添加部门 begin */}
            <div className="classType">
              <div className="classtitle titles"> 
                <div className="classname">部门</div>
                <div className="classicon"><IconFont type="icon-add1" /></div>
              </div>

              <div className="classtitle"> 
                <div className="classname">
                  <div className="classInput"><Input placeholder="请输入部门名称"/></div>
                </div>
                <div className="classicons">
                  <IconFont style={{color: '#02ff00'}} type="icon-select-bold" />
                  <IconFont style={{color: 'red'}} type="icon-guanji" />
                </div>
              </div>

              <div className="classtitle"> 
                <div className="classname">
                  <div className="classText ellipsis">一年级组</div>
                </div>
                <div className="classicons">
                  <IconFont style={{color: '#4164F0'}} type="icon-bi" />
                  <IconFont style={{color: 'red'}} type="icon-del" />
                </div>
              </div>

            </div>
           {/* 添加部门 end */}
           {/* 添加用户类型 begin */}
           <div className="classType">
              
           <div className="classtitle titles"> 
                <div className="classname">用户类型</div>
                <div className="classicon"><IconFont type="icon-add1" /></div>
          </div>

           <div className="classtitle"> 
                <div className="classname">
                  <div className="classInput"><Input placeholder="请输入部门名称"/></div>
                </div>
                <div className="classicons">
                  <IconFont style={{color: '#02ff00'}} type="icon-select-bold" />
                  <IconFont style={{color: 'red'}} type="icon-guanji" />
                </div>
              </div>

              <div className="classtitle"> 
                <div className="classname">
                  <div className="classText ellipsis">一年级组</div>
                </div>
                <div className="classicons">
                  <IconFont style={{color: '#4164F0'}} type="icon-bi" />
                  <IconFont style={{color: 'red'}} type="icon-del" />
                </div>
              </div>

            </div>
             {/* 添加用户类型 end */}
         </div>
       </Modal>
      </div>
    );
  }
}

export default addUserClass;
