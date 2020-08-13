import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

//pages
import SowingList from './SowingList'
import SowingAdd from './SowingAdd'
import SowingEdit from './SowingEdit'

class SowingRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/sowing/list" component={SowingList}/>
                <Route path="/sowing/add" component={SowingAdd}/>
                <Route path="/sowing/edit" component={SowingEdit}/>
                <Redirect exact form="/sowing" to="/sowing/list"/>
            </Switch>
        );
    }
}

export default SowingRouter;