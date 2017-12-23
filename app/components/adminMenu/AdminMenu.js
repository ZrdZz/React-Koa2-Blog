import React, {Component} from 'react';
import {Menu, Icon} from 'antd';

class AdminMenu extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{width: 256}}>
				<Menu>
					<Menu.Item key="main">
						<Icon type="pie-chart" />
						<span>首页</span>
					</Menu.Item>
					<Menu.Item key="userManager">
						<Icon type="pie-chart" />
						<span>用户管理</span>
					</Menu.Item>
					<Menu.Item key="publishArt">
						<Icon type="pie-chart" />
						<span>发文</span>
					</Menu.Item>
					<Menu.Item key="tagsManager">
						<Icon type="pie-chart" />
						<span>标签管理</span>
					</Menu.Item>
					<Menu.Item key="commentsManager">
						<Icon type="pie-chart" />
						<span>评论管理</span>
					</Menu.Item>
					<Menu.Item key="articleManager">
						<Icon type="pie-chart" />
						<span>文章管理</span>
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}

export default AdminMenu