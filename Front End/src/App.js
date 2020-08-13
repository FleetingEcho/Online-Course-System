import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import LayOut from './Components/LayOut'
import Login from './Pages/Mine/Login'
import ErrorPage from './Pages/ErrorPage'

import Home from './Pages/Home/Home'
import User from './Pages/User/User'
import SowingRouter from './Pages/Sowing/router'
import CourseRouter from './Pages/Course/router'
import MineRouter from './Pages/Mine/router'
import * as constants from "./Store/actionTypes";

class App extends Component {
    componentWillMount() {
        this.props.reqLocalData();
    }

    render() {
        // Main pages
        let LayOutRouter = (
            <LayOut>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/user" component={User}/>
                    <Route path="/mine" component={MineRouter}/>
                    <Route path="/sowing" component={SowingRouter}/>
                    <Route path="/course" component={CourseRouter}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </LayOut>
        );
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={
                            this.props.userData ?
                                (props)=> LayOutRouter :
                                ()=> <Redirect to="/login"  push/>
                        }
                    />
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={props => LayOutRouter}/>
                </Switch>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      reqLocalData(){
          const userData = JSON.parse(sessionStorage.getItem('userData'));
          dispatch({
              type: constants.INIT_USER_DATA,
              userData
          });
      }
  }
};

const mapStateToProps = (state)=>{
    return {
        userData: state.userData
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
