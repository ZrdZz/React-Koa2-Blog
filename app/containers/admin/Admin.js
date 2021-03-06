import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound';
import AdminMenu from '../../components/adminMenu/AdminMenu';
import AdminManagerUser from '../adminManagerUser/AdminManagerUser';
import AdminManagerTags from '../adminManagerTags/AdminManagerTags';
import AdminNewArticle from '../adminNewArticle/AdminNewArticle';
import AdminManagerArticle from '../adminManagerArticle/AdminManagerArticle';
import AdminIndex from '../../components/adminIndex/AdminIndex'
import {actions} from '../../reducers/adminManagerUser';
import style from './style.css';

class Admin extends Component{
  constructor(props){
  	super(props);
  }

  render(){
  	const {url} = this.props.match;
    if(this.props.userInfo.userType){
      return(
        <div>
          {
            this.props.userInfo.userType === 'admin' ?
              <div className={style.container}>
                <div className={style.adminMenu}>
                  <AdminMenu history={this.props.history} />
                </div>
                <div className={style.adminContent}>
                  <Switch>
                    <Route path={url} exact component={AdminIndex}/>
                    <Route path={`${url}/managerUser`} component={AdminManagerUser}/>
                    <Route path={`${url}/managerTags`} component={AdminManagerTags}/>
                    <Route path={`${url}/newArticle`} component={AdminNewArticle}/>
                    <Route path={`${url}/managerArticle`} component={AdminManagerArticle}/>
                  </Switch>
                </div>
              </div> :
              <Redirect to='/' />
          }
        </div>
      )
    }else{
      return <NotFound />
    }
  }
}

export default Admin