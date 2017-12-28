import React, {Component} from 'react';
import {Table, Divider, Pagination} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../reducers/adminManagerArticle';
import style from './style.css'

const columns = [{
	title: 'Title',
	dataIndex: 'title'
}, {
	title: 'Author',
	dataIndex: 'author'
}, {
	title: 'time',
	dataIndex: 'time'
}, {
	title: 'isPublish',
	dataIndex: 'isPublish'
}, {
	title: 'Action',
	key: 'action',
	render: () => (
		<span>
			<a href="#">编辑</a>
			<Divider type="vertical" />
			<a href="#">删除</a>
			<Divider type="vertical" />
			<a href="#">查看</a>
		</span>
	)
}]

class AdminManagerArticle extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<h3>文章管理</h3>
				<Table columns={columns} dataSource={this.props.articlesList} pagination={false} className={style.table} />
				<Pagination current = {this.props.pageNum} total = {this.props.total} onChange = {(pageNum) => {
					this.props.get_all_articles(pageNum)
				}} defaultPageSize={5} className={style.pagination} />
			</div>
		)
	}

	componentDidMount(){
		this.props.get_all_articles();
	}
}

function mapDispatchToProps(dispatch){
	return{
		get_all_articles: bindActionCreators(actions.get_all_articles, dispatch)
	}
}

function mapStateToProps(state){
	let {pageNum, articlesList, total} = state.admin.articleReducers;
	return{
		pageNum,
		articlesList,
		total
	}
}

AdminManagerArticle = connect(mapStateToProps, mapDispatchToProps)(AdminManagerArticle)

export default AdminManagerArticle