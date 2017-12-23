import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Banner from '../../components/banner/Banner';
import Menu from '../../components/menu/Menu';
import style from './style.css';
import Logorreg from '../../components/logorreg/Logorreg';
import Logined from '../../components/logined/Logined';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../reducers/index';

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
            {this.props.userInfo.userId ? <Logined userInfo={this.props.userInfo} history={this.props.history}/> :
                                          <Logorreg login={this.props.login} register={this.props.register}/>
            }
          </div>
  	  	</div>
  	  </div>
  	)
  }
}

function mapDispatchToProps(dispatch){
  return{
    login: bindActionCreators(actions.user_login, dispatch),
    register: bindActionCreators(actions.user_register, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Front);