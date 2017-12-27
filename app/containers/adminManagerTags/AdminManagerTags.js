import React, {Component} from 'react';
import { Tag, Input, Tooltip, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../reducers/adminManagerTags';

class AdminManagerTags extends Component{
	constructor(props){
		super(props);
		this.state = {
			tags: ['首页'],
    	inputVisible: false,
    	inputValue: ''
		}
	}

	handleClose = (removedTag) => {
    this.props.deleteTag(removedTag);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    let inputValue = this.state.inputValue;
    let tags = this.state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      this.props.addTag(inputValue);
    }
    this.setState({
    	inputVisible: false,
    	inputValue: ''
    })
  }

  saveInputRef = input => this.input = input

	render() {
    	const { inputVisible, inputValue } = this.state;
    	const {tags} = this.props;
    	return (
     		<div>
            <h2>标签管理</h2>
        		{tags.map((tag, index) => {
          			const isLongTag = tag.length > 20;
          			const tagElem = (
            			<Tag key={index} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
             				{isLongTag ? `${tag.slice(0, 20)}...` : tag}
            			</Tag>
          			);
          			return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        		})}

        		{inputVisible && (
          			<Input
            			ref={this.saveInputRef}
            			type="text"
            			size="small"
            			style={{ width: 108 }}
            			value={inputValue}
            			onChange={this.handleInputChange}
            			onBlur={this.handleInputConfirm}
            			onPressEnter={this.handleInputConfirm}
          			/>
        		)}
        		
        		{!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                      <Icon type="plus" /> New Tag
                    </Tag>
            )}
        </div>
      );
  }

  componentDidMount(){
    this.props.getAllTags();
  }
}

function mapDispatchToProps(dispatch){
  return{
    getAllTags: bindActionCreators(actions.get_all_tags, dispatch),
    deleteTag: bindActionCreators(actions.delete_tag, dispatch),
    addTag: bindActionCreators(actions.add_tag, dispatch)
  }
}

function mapStateToProps(state){
  return{
    tags: state.admin.tagReducers 
  }
}

AdminManagerTags = connect(mapStateToProps, mapDispatchToProps)(AdminManagerTags)

export default AdminManagerTags