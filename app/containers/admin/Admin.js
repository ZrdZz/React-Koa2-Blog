import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound';
import AdminMenu from '../../components/adminMenu/AdminMenu';
import AdminManagerUser from '../adminManagerUser/AdminManagerUser';
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
              <div>
                <div>
                  <AdminMenu />
                </div>
                <div>
                  <Switch>
                    <Route path={`${url}/managerUser`} component={AdminManagerUser}/>
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