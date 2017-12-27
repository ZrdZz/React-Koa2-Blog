import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../reducers/adminNewArticle';
import {actions as tagsActions} from '../../reducers/adminManagerTags';
import style from './style.css';
import moment from 'moment';
import Markdown from 'react-markdown';



class AdminNewArticle extends Component{
	constructor(props){
		super(props);
		this.state={
			visible: false
		}
		this.titleOnChange = this.titleOnChange.bind(this);
		this.contentOnChange = this.contentOnChange.bind(this);
		this.tagsOnChange = this.tagsOnChange.bind(this);
		this.save = this.save.bind(this);
		this.publish = this.publish.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.preView = this.preView.bind(this);
	}

	handleOk(e){
		this.setState({
			visible: false
		})
	}

	preView(){
		this.setState({
			visible: true
		})
	}

	titleOnChange(e){
		this.props.updateTitle(e.target.value);
	}

	contentOnChange(e){
		this.props.updateContent(e.target.value);
	}

	tagsOnChange(value){
		this.props.updateTags(value); //注意这里传值
	}

	publish(){
		let articleData = {};
        articleData.title = this.props.title;
        articleData.content = this.props.content;
        articleData.tags = this.props.tags;
        articleData.time =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        articleData.isPublish = true;
        this.props.saveArticle(articleData);
	}

	save(){
 		let articleData = {};
        articleData.title = this.props.title;
        articleData.content = this.props.content;
        articleData.tags = this.props.tags;
        articleData.time =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        articleData.isPublish = false;
        this.props.saveArticle(articleData);
	}

	render(){
		return(
			<div>
				<h2>发文</h2>
				<div className={style.mainContainer}>
					<div className={style.title}>标题</div>
					<Input placeholder='请输入文章标题' value={this.props.title} onChange={this.titleOnChange}/>
					<div className={style.title}>分类</div>
					<Select value={this.props.tags} placeholder='请选择分类' mode="multiple" onChange={this.tagsOnChange} className={style.select}>
						{
							this.props.allTags.slice(1).map(function(item){
								return <Select.Option key={item}>{item}</Select.Option>
							})
						}
					</Select>
					<div className={style.title}>正文</div>
					<Input.TextArea value={this.props.content} onChange={this.contentOnChange} placeholder='请输入文章内容' autosize={{minRows: 15}}/>
				</div>
				<div className={style.btnContainer}>
					<Button type="primary" style={{marginLeft: '10px'}} onClick={this.publish}>发布</Button>
					<Button type="primary" style={{marginLeft: '10px'}} onClick={this.save}>保存</Button>
					<Button type="primary" style={{marginLeft: '10px'}} onClick={this.preView}>预览</Button>
				</div>
				<Modal 
					title="文章预览"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleOk}
					width={'900px'}
				>
                    <div>
                        <Markdown source={this.props.content} />
                    </div>
				</Modal>
			</div>
		)
	}

	componentDidMount(){
		this.props.get_all_tags();
	}
}

function mapDispatchToProps(dispatch){
	return{
		updateTitle: bindActionCreators(actions.update_title, dispatch),
		updateContent: bindActionCreators(actions.update_content, dispatch),
		updateTags: bindActionCreators(actions.update_tags, dispatch),
		get_all_tags: bindActionCreators(tagsActions.get_all_tags, dispatch),
		saveArticle: bindActionCreators(actions.save_article, dispatch)
	}
}

function mapStateToProps(state){
	let {title, content, tags} = state.admin.newArticleReducers,
		allTags = state.admin.tagReducers;
	return {title, content, tags, allTags}
}

AdminNewArticle = connect(mapStateToProps, mapDispatchToProps)(AdminNewArticle)

export default AdminNewArticle