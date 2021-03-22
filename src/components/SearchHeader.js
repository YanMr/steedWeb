import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input,Button, Select } from 'antd';
import IconFont from '@/components/IconFont';
import '@/assets/css/searchHeader.scss'

/** 设备列表页 头部搜索 */
class SearchHeader extends Component {
	formRef = React.createRef()
	constructor(props) {
		super(props)
		this.state = {
			keyText: ''
		}
}
	componentDidMount() {
	}

	// 清空搜索
	clearKeyText = () => {
		this.formRef.current.setFieldsValue({
			text: '',
		})
		this.setState({
			keyText: ''
		})
	}

	inputValue = (e) => {
		this.setState({
			keyText: e.target.value
		})
	}
	
	// 表单校验
	validation = item => {
		// item.name = search: 搜索 / task: 新建任务 / refresh: 刷新
		//  item.submit  验证操作
		if (item.submit) {
		
			this.formRef.current.validateFields().then((values) => {
				this.props.operation({type:item.name,data:values})
			 }).catch((errorInfo ) => {
				 console.log(errorInfo );
			 })
		} else {
			this.props.operation({type:item.name,data: null})
		}
	}
	
	// 创建节点
	createElement = (item,index) => {
    if (item.type === 'slelct') {
			return (
				<Form.Item
				name={item.name}
				rules={[{ required: item.required, message: item.message }]}
				initialValue= {item.defaultValue}
				label={item.label} key={index}>
					<Select placeholder={item.placeholder} style={{width: item.width+'px'}}>
						  {
								item.listData.map((flag, num) => {
									return (
										<Select.Option key={num} value={flag.value}>{flag.name}</Select.Option>
									)
								})
							}
						</Select>
				</Form.Item>
			)
		}
		if (item.type === 'input') {
			return (
				<Form.Item
				name={item.name}
				rules={[{ required: item.required, message: item.message }]}
				initialValue={this.state.keyText}
				label={item.label} key={index}>
					<Input style={{width: item.width+'px'}} onChange={this.inputValue}  placeholder={item.placeholder}/>
				</Form.Item>
			)
		}

		if (item.type === 'button') {
			return (
				<Form.Item label={item.label} key={index}>
						<Button type="primary" onClick={() => this.validation(item)} style={{width: item.width+'px', background: item.color, borderColor: item.color}}>
							<IconFont type={item.icon} />{item.defaultValue}
						</Button>
				</Form.Item>
			)
		}
	}

	render() {
		const {data} = this.props
		return (
			<header className="search-header">
				<Form layout="inline" ref={this.formRef} className="searh-header-form">
				  {
						data.map((item,index) => this.createElement(item,index))
					}
				</Form>
			</header>
		);
	}
}

export default SearchHeader;
