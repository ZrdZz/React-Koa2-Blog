import React, {Component} from 'react';
import {Menu} from 'antd';
import style from './style.css'

class contentMenu extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Menu mode="horizontal" className={style.menuCenter}>
				<Menu.Item key='javascript'>JavaScript</Menu.Item>
				<Menu.Item key='css'>CSS</Menu.Item>
				<Menu.Item key='html'>HTML</Menu.Item>
			</Menu>
		)
	}
}

export default contentMenu