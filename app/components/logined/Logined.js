import React, {Component} from 'react';
import {Button, Avatar} from 'antd';
import style from './style.css'

class Logined extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className={style.container}>
				<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
				<h3>欢迎, {this.props.userInfo.username}</h3>
				<p className={style.content}>光临我的博客!</p>
				{this.props.userInfo.userType === 'admin' ?
                	<Button onClick={() => this.props.history.push('/admin')} type="primary">点击进入管理页面</Button> : 
                null}
			</div>
		)
	}
}

export default Logined