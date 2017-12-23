import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../reducers/adminManagerUser';
import {Table, Pagination} from 'antd';

const columns = [{
	title: '姓名',
	dataIndex: 'username',
	key: 'name',
	render: text => <a href="#">{text}</a>
},{
	title: 'ID',
	dataIndex: '_id',
	key: 'id'
},{
	title: '密码',
	dataIndex: 'password',
	key: 'password'
},{
	title: '身份',
	dataIndex: 'type',
	key: 'address'
}]

class AdminManagerUser extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<h3>用户管理</h3>
				<Table columns={columns} dataSource={this.props.list} pagination={false} />
				<Pagination current = {this.props.pageNum} total = {this.props.total} onChange = {(pageNum) => {
					this.props.get_all_users(pageNum)
				}} />
			</div>
		)
	}

	componentDidMount(){
		this.props.get_all_users();
	}
}


AdminManagerUser.defaultProps = {
	pageNum: 1,
	total: 0,
	list: []
}

function mapDispatchToProps(dispatch){
  return{
  	get_all_users: bindActionCreators(actions.get_all_users, dispatch)
  }
}

function mapStateToProps(state){
	let {list, pageNum, total} = state.admin.userReducers;
	return{
		pageNum,
		list,
		total
	}
}

AdminManagerUser = connect(mapStateToProps, mapDispatchToProps)(AdminManagerUser)

export default AdminManagerUser