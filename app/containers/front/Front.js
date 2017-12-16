import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Banner from '../../components/banner/Banner';

class Front extends Component{
  constructor(props){
  	super(props);
  }

  render(){
  	const {url} = this.props.match;
  	return(
  	  <div>
  	  	<div>
  	  	  <Banner />
  	  	</div>
  	  	<div>
  	  	  <Switch>
  	  	    <Route exact path={url} component={Home} />
  	  	    <Route path={"/:tag"} component={Home} />
  	  	  </Switch>
  	  	</div>
  	  </div>
  	)
  }
}

export default Front