import React, {Component} from 'react';
import {Table, Divider, Pagination, Button} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../reducers/adminManagerArticle';
import style from './style.css'

class AdminManagerArticle extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const columns = [{
			title: 'Title',
			dataIndex: 'title'
		}, {
			title: 'ID',
			dataIndex: '_id'
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
			render: (text, record) => (
				<span>
					<Button type="primary" onClick={() => {this.props.edit_article(record._id); this.props.history.push('/admin/newArticle')}}>编辑</Button>
					<Divider type="vertical" />
					<Button type="primary" onClick={() => {this.props.delete_article(record._id)}}>删除</Button>
				</span>
			)
		}]
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
		get_all_articles: bindActionCreators(actions.get_all_articles, dispatch),
		edit_article: bindActionCreators(actions.edit_article, dispatch),
		delete_article: bindActionCreators(actions.delete_article, dispatch)
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