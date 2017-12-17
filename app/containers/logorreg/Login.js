import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class Login extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			//可以用antd做表单验证
			<Form style={{padding: "20px 20px"}}>
				<FormItem>
					<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
				</FormItem>
				<FormItem>
					<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="Password" />
				</FormItem>
				<FormItem style={{paddingTop: "20px"}}>
					<Button type="primary" htmlType="submit">登录</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Login