import React, {Component} from 'react';
import LKHeader from "../Header/LKHeader";
import SideBar from '../../Pages/Course/SideBar'
class LayOut extends Component {
    render() {
        return (
            <div>
                <LKHeader/>
                <div className="main">
                    <SideBar/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LayOut;