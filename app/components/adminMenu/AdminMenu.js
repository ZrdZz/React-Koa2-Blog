import React, {Component} from 'react';
import {Menu, Icon, Button} from 'antd';
import style from './style.css';

const menus = [
    {url: '/admin', name: '首页', iconType: 'home'},
    {url: '/admin/managerUser', name: '用户管理', iconType: 'usergroup-delete'},
    {url: '/admin/newArticle', name: '发文', iconType: 'file-text'},
    {url: '/admin/managerTags', name: '标签管理', iconType: 'tags-o'},
    {url: '/admin/managerArticle', name: '文章管理', iconType: 'edit'},
    {url: '/', name: '博客首页', iconType: 'close-circle-o'}
];

class AdminMenu extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{width: 256}} className={style.menu}>
				<Menu theme="dark" onClick={({key}) => {
					this.props.history.push(`${key}`);  //路径前一定要加斜杠
				}}>
					{
						menus.map((item, index) => 
							<Menu.Item key={item.url}>
								<Icon type={item.iconType}/>
                                <span>{item.name}</span>
							</Menu.Item>
						)
					}
				</Menu>
			</div>
		)
	}
}

export default AdminMenu