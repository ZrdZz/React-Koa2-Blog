import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Banner from '../../components/banner/Banner';
import Menu from '../../components/menu/Menu';
import style from './style.css';
import Logorreg from '../logorreg/Logorreg';

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
          <Menu />
  	  	</div>
  	  	<div className={style.main}>
          <div className={style.content}>
  	  	    <Switch>
  	  	      <Route exact path={url} component={Home} />
  	  	      <Route path={"/:tag"} component={Home} />
  	  	    </Switch>
          </div>
          <div className={style.logorreg}>
            <Logorreg />
          </div>
  	  	</div>
  	  </div>
  	)
  }
}

export default Front