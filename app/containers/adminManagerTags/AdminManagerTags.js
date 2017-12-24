import React, {Component} from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';

class AdminManagerTags extends Component{
	constructor(props){
		super(props);
		this.state = {
			tags: ['首页', 'HTML', 'CSS', 'JavaScript'],
    		inputVisible: false,
    		inputValue: ''
		}
	}

	handleClose = (removedTag) => {
    	this.props.deleteTag();
    }

    showInput = () => {
    	this.setState({ inputVisible: true }, () => this.input.focus());
    }

  	handleInputChange = (e) => {
    	this.setState({ inputValue: e.target.value });
  	}

  	handleInputConfirm = () => {
    	this.props.addTag(this.state.inputValue);
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
        		{tags.map((tag, index) => {
          			const isLongTag = tag.length > 20;
          			const tagElem = (
            			<Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
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
            			style={{ width: 78 }}
            			value={inputValue}
            			onChange={this.handleInputChange}
            			onBlur={this.handleInputConfirm}
            			onPressEnter={this.handleInputConfirm}
          			/>
        		)}
        		
        		{!inputVisible && (
          			<Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            			<Icon type="plus" /> New Tag
          			</Tag>
                )}
            </div>
        );
    }
}