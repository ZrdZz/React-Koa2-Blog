import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class Login extends Component{
	constructor(props){
		super(props);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err){
				this.props.login(values.username, values.password);
			}
		});
	}

	render(){
		const {getFieldDecorator} = this.props.form;
		return(
			<Form style={{padding: "20px 20px"}} onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('username', {
						rules: [{required: true, message: '请输入用户名!'}]
					})(
						<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
					)}
				</FormItem>

				<FormItem>
					{getFieldDecorator('password', {
						rules: [{required: true, message: '请输入密码!'}]
					})(
						<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password" />
					)}
				</FormItem>

				<FormItem style={{paddingTop: "20px"}}>
					<Button type="primary" htmlType="submit">登录</Button>
				</FormItem>
			</Form>
		)
	}
}

Login = Form.create({})(Login);

export default Login