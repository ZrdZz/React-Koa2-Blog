import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class Register extends Component{
	constructor(props){
		super(props);
	}

	handleRegister = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if(!err){
				this.props.register(values);
			}
		})
	}

	render(){
        const {getFieldDecorator} = this.props.form;
		return(
			<Form style={{padding: "0 20px"}} onSubmit={this.handleRegister}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('rePassword', {
                        rules: [{required: true, message: '请重复输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Repeat Password" />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </FormItem>
			</Form>
		)
	}
}

Register = Form.create({})(Register);

export default Register