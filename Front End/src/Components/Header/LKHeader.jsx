import React, { Component } from 'react';
import '../../../src/Common/css/LKHeader.css'
import { Modal ,Button, notification,Badge } from 'antd';
import {Link} from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
class LKHeader extends Component {

    constructor() {
        super();
        this.state = {
          msg:5
        }
      }

    render() {
        return (
            <div className="header1">
                <nav className="navbar navbar-custom">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Course Management System</Link>
                    </div>
                    <div className="needToFloat">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/mine"><i className="fa fa-user"></i>Personal Center</Link></li>
                        <li>
                            <a href="#" onClick={this.openNotification} >
                            <Badge count={this.state.msg}>
                            <i className="fa fa-bell"></i>
                            </Badge>
                            </a>
                        </li>
                        <li>
                            <a style={{cursor: 'pointer'}}  onClick={this.showConfirm}>
                               <i className="fa fa-sign-out"></i>Log out
                            </a>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        );
    }
    openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary" size="small" onClick={() => notification.close(key)}>
            Confirm
          </Button>
        );
        notification.open({
          message: 'Notification Alert',
          description:
            'You have received 5 notifications yesterday',
          btn,
          key,
          onClose:this.close,
        });
        this.setState({
          msg: 0
        })
    };

    showConfirm=()=>{
        confirm({
          title: 'Logout Confirm',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure to logout?',
          onOk(){
        sessionStorage.removeItem('userData');
        window.location.href = '/';
          },
          onCancel() {
           
          },
        });
      }
}

export default LKHeader;