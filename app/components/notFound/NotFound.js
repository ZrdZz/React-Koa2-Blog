import React, {Component} from 'react';
import style from './style.css'; 
const notFound = require('./404.png');

class NotFound extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
            <div className={style.container}>
                <img src={'http://localhost:8080' + notFound} />
            </div>			
		)
	}
}

export default NotFound