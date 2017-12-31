import React, {Component} from 'React';
import {connect} from 'react-redux';
import Markdown from 'react-markdown';
import style from './style.css';

class Detail extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<div className={style.article}>
					<h1>{this.props.detail.title}</h1>
					<div className={style.msg}>
						<span style={{paddingRight: '5px'}}>{this.props.detail.author}</span>
						<span>{this.props.detail.time}</span>
					</div>
					<div className={style.content}>
						<Markdown source={this.props.detail.content} />
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		detail: state.front.articleDetail
	}
}

Detail = connect(mapStateToProps)(Detail)

export default Detail