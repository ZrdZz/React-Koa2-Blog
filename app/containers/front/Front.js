import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import style from './style.css';

class Front extends Component{
  constructor(props){
  	super(props);
  }

  render(){
  	const {url} = this.props.match;
    console.log('url:' + url)
  	return(
  	  <Router>
  	  	<div>
  	  	  <div>
  	  	    <h1 className={style.red}>Front</h1>
  	  	  </div>
  	  	  <div>
  	  	    <Switch>
  	  	      <Route exact path={url} component={Home} />
  	  	      <Route path={`/:tag`} component={Home} />
  	  	    </Switch>
  	  	  </div>
  	  	</div>
  	  </Router>
  	)
  }
}

export default Front