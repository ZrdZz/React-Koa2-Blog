import React, {Component}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Admin from './admin/Admin';
import Front from './front/Front';

class Main extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router>
        <div>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route component={Front} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Main
