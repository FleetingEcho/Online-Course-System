import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

import Mine from './Mine'
import ResetPwd from './ResetPwd'

class MineRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/mine/main" component={Mine}/>
                <Route path="/mine/reset" component={ResetPwd}/>
                <Redirect exact form="/mine" to="/mine/main"/>
            </Switch>
        );
    }
}

export default MineRouter;