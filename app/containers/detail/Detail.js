import React, {Component} from 'React';
import {connect} from 'react-redux';

class Detail extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<h1>{this.props.detail.title}</h1>
				<h1>{this.props.detail.content}</h1>
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