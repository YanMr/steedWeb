import React, { Component } from 'react';
import { Input, Switch, Select, Radio, Button } from 'antd';
import BreadCrumb from '@/views/layout/BreadCrumb';
import IconFont from '@/components/IconFont';
import '../index.scss'



class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1
    }
  }

  radioFun = e => {
    this.setState({
      radioValue: e.target.value
    })
    console.log(e.target.value)
  }

  render() {
    return (
      <div className="new-task">
        <BreadCrumb/>
        <div className="new-task-main">
          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon"><IconFont type="icon-xinxi" /></div>
              <div className="text">基本信息</div>
            </div>
            <div className="task-item">
              <div className="task-label">名称</div>
              <div className="task-value"><Input placeholder="请输入任务名称" style={{width: '220px'}}/></div>
            </div>
            <div className="task-item">
              <div className="task-label">优先级</div>
              <div className="task-value"><Input placeholder="请输入优先级（1-100）" style={{width: '220px'}}/></div>
            </div>
          </div>

          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon wu"><IconFont type="icon-shebeixuanze" /></div>
              <div className="text">物联控制</div>
            </div>
            <div className="task-item">
              <div className="task-label">类型</div>
              <div className="task-value">
                <div className="type-list">
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-yitiji" /></div>
                  <div className="type-text">一体机</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-touyingyi-shouye" /></div>
                  <div className="type-text">投影仪</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-xianshiqi-shouye" /></div>
                  <div className="type-text">显示器</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-menjin-shouye" /></div>
                  <div className="type-text">门禁</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-chuanglian-shouye" /></div>
                  <div className="type-text">窗帘</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-diandeng-shouye" /></div>
                  <div className="type-text">灯光</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-fengshan-shouye" /></div>
                  <div className="type-text">风扇</div>
                </div>
                <div className="type">
                  <div className="type-icon"><IconFont type="icon-kongtiao-shouye" /></div>
                  <div className="type-text">空调</div>
                </div>
                </div>
              </div>
            </div>
            <div className="task-item">
              <div className="task-label">状态</div>
              <div className="task-value">
                <div className="task-switch">
                <Switch defaultChecked />
                <Switch defaultChecked />
                </div>
              </div>
            </div>
            <div className="task-item">
              <div className="task-label">控制</div>
              <div className="task-value">
                <div className="task-kz">
                  <div className="task-kz-text jz">禁止</div>
                  <div className="task-kz-text rx">容许</div>
                </div>
              </div>
            </div>
          </div>

          <div className="new-task-list">
            <div className="new-task-title">
              <div className="icon cy"><IconFont type="icon-chengyuanxuanze" /></div>
              <div className="text">接收成员</div>
            </div>
            <div className="task-item">
              <div className="task-label">名称</div>
              <div className="task-value"><Select placeholder='请选择接收成员' style={{ width: '220px' }}>
                  <Select.Option value='0'>全部</Select.Option>
                  <Select.Option value='1'>教学楼</Select.Option>
                </Select></div>
            </div>
          </div>

          <div className="new-task-list noborder">
            <div className="new-task-title">
              <div className="icon datesj"><IconFont type="icon-dingshizhixingrenwu" /></div>
              <div className="text">播放时间</div>
            </div>
            <div className="task-item">
              <div className="task-label">重复</div>
              <div className="task-value" >
              <Radio.Group value={this.state.radioValue} onChange={(e) => this.radioFun(e)}>
                <Radio value={1}>按周重复</Radio>
                <Radio value={2}>指定日期</Radio>
                <Radio value={3}>手动控制</Radio>
              </Radio.Group>
              </div>
            </div>
          </div>

          <div className="btn-task">
          <Button type="primary">确认提交</Button>
          </div>

        </div>
      </div>
    );
  }
}

export default NewTask;
