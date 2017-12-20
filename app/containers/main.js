import React, {Component}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Admin from './admin/Admin';
import Front from './front/Front';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {notification} from 'antd';
import {actions} from '../reducers/index';

class Main extends Component{
  constructor(props){
    super(props);
    this.openNotification = this.openNotification.bind(this);
  }

  openNotification(type, message){
    let that = this;
    notification[type]({
      message: message,
      onClose: () => {
        that.props.clear_msg();
      }
    })
    that.props.clear_msg();
  }

  render(){
    return(
      <Router>
        <div>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route render={(props) => <Front {...props} userInfo={this.props.userInfo}/>} />
          </Switch>
        </div>
      </Router>
    )
  }

  componentDidUpdate(){
    if(this.props.notification && this.props.notification.content){
      if(this.props.notification.type === 1){
        this.openNotification('success', this.props.notification.content)
      }else{
        this.openNotification('error', this.props.notification.content)
      }
    }
  }
}

function mapStateToProps(state) {
    return {
        userInfo: state.globalState.userInfo,
        notification: state.globalState.msg
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(actions.clear_msg, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
