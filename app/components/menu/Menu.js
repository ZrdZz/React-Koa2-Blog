import React, {Component} from 'react';
import {Menu} from 'antd';
import style from './style.css'

class ContentMenu extends Component{
	constructor(props){
		super(props);
		this.state = {
			current: this.props.tags[0]
		}
	}

	handleClick(e){
		if(e.key === '首页'){
			this.props.get_tag_articles();
		}else{
			this.props.get_tag_articles(e.key);
		}

		this.setState({current: e.key});
		let path = e.key === '首页' ? '/' : '/' + e.key;
		this.props.history.push(path);
	}

	render(){
		return(
			<Menu mode="horizontal" className={style.menuCenter} selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
				{
					this.props.tags.map(function(item, index){
						return(
							<Menu.Item key={item}>
								{item}
							</Menu.Item>
						)
					})
				}
			</Menu>
		)
	}

	componentDidMount(){
		this.props.get_tag_articles();
	}
}

export default ContentMenu