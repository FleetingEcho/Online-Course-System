import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Liao from './images/error.png';

class ErorrPage extends Component {
    render() {
        return (
            <div className="container-fluid"
                 style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     flexDirection: "column",
                     paddingTop: 20
                 }}>
                <Link to="/">
                    <h3 className="text-primary">
                   Click to return to the home page
                    </h3>
                </Link>
                <img src={Liao} style={{width: '70%'}}/>
            </div>
        );
    }
}

export default ErorrPage;