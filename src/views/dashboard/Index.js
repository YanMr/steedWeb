import React, { Component } from 'react';
import SearchHeader from '@/components/SearchHeader';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searData: [
				{label: '位置：', name:'location', type: 'slelct', defaultValue: '0',  required: true, message: '请选择位置！', listData:[{value:'0',name:'全部'}, {value:'1',name:'全部1'}]},
				{label: '设备状态：', name:'status', type: 'slelct', defaultValue: '0', required: true, message: '请选择设备状态', listData:[{value:'0',name:'全部'}, {value:'1',name:'在线'}, {value:'2',name:'离线'}]},
				{type: 'input', name:'text', width: '270', defaultValue: '0', placeholder: '输入位置、IP地址或序列号进行搜索'},
				{type: 'button', name:'search', submit: true, icon: 'icon-sousuo', color: '#4164F0', defaultValue: '搜索'},
				{type: 'button', name: 'task', icon: 'icon-add1', color: '#4586F3', defaultValue: '新建任务'},
				{type: 'button', name: 'refresh', icon: 'icon-ai-spin', color: '#35AA53', defaultValue: '刷新'}
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
				<SearchHeader data={this.state.searData} operation={this.operation}/>
				<div >
					<h1>这是系统首页</h1>
				</div>
			</div>
		);
	}
}

export default Index;
