import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class Register extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Form style={{padding: "0 20px"}}>
				<FormItem>
					<Input placeholder="用户名" label="用户名" />
				</FormItem>
				<FormItem>
					<Input placeholder="密码" label="密码"/>
				</FormItem>
				<FormItem>
					<Input placeholder="重复密码" label="重复密码"/>
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">注册</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Register