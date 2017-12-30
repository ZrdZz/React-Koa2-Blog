import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Banner from '../../components/banner/Banner';
import Menu from '../../components/menu/Menu';
import Detail from '../detail/Detail';
import style from './style.css';
import Logorreg from '../../components/logorreg/Logorreg';
import Logined from '../../components/logined/Logined';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../reducers/index';
import {actions as managerTagsActions} from '../../reducers/adminManagerTags';
import {actions as tagArticlesActions} from '../../reducers/front';

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
          <Menu tags={this.props.tags} get_tag_articles={this.props.get_tag_articles} history={this.props.history}/>
  	  	</div>
  	  	<div className={style.main}>
          <div className={style.content}>
  	  	    <Switch>
  	  	      <Route exact path={url} component={Home} />
              <Route path={`/detail/:id`} component={Detail}/>
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

  componentDidMount(){
    this.props.get_all_tags();
    this.props.get_tag_articles();
  }
}

function mapDispatchToProps(dispatch){
  return{
    login: bindActionCreators(actions.user_login, dispatch),
    register: bindActionCreators(actions.user_register, dispatch),
    get_all_tags: bindActionCreators(managerTagsActions.get_all_tags, dispatch),
    get_tag_articles: bindActionCreators(tagArticlesActions.get_tag_articles, dispatch)
  }
}

function mapStateToProps(state){
  return{
    tags: state.admin.tagReducers
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Front);