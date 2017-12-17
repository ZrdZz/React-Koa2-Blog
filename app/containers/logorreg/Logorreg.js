import React, {Component} from 'react';
import {Tabs} from 'antd';
import Login from './Login';
import Register from './Register';
const TabPane = Tabs.TabPane;

class LogOrReg extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Tabs>
				<TabPane tab="登录" key="login"><Login /></TabPane>
				<TabPane tab="注册" key="register"><Register /></TabPane>
			</Tabs>
		)
	}
}

export default LogOrReg