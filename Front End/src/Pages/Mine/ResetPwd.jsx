import React, {Component} from 'react';
import md5 from 'md5'
import {editPwdData} from './../../Api/index'
import {Link} from "react-router-dom";
import { message, Button, Space } from 'antd';
const S_KEY = 'JaKe!';
const userData = JSON.parse(sessionStorage.getItem('userData'));

class ResetPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: userData.token || '',
            old_pwd: '',
            new_pwd: '',
            re_pwd: ''
        }
    }

    render() {
        const {old_pwd, new_pwd, re_pwd} = this.state;
        return (
            <div className="container-fluid">
                <div className="body">
                <ol className="breadcrumb">
                    <li><Link to="/">Home / </Link></li>
                </ol>

                    <div className="repass">
                        <div className="form-horizontal col-md-offset-2">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Old Password</label>
                                <div className="col-md-4">
                                    <input
                                        name="old_pwd"
                                        type="text"
                                        className="form-control input-sm"
                                        value={old_pwd}
                                        onChange={(e) => this._onInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">New Password</label>
                                <div className="col-md-4">
                                    <input
                                        name="new_pwd"
                                        type="password"
                                        className="form-control input-sm"
                                        value={new_pwd}
                                        onChange={(e) => this._onInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Re-Enter New Password</label>
                                <div className="col-md-4">
                                    <input
                                        name="re_pwd"
                                        type="password"
                                        className="form-control input-sm"
                                        value={re_pwd}
                                        onChange={(e) => this._onInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-7">
                                    <Button
                                    type="primary"
                                        onClick={()=>this._onSubmit()}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                    type="primary"
                                    style={{backgroundColor:'#4CAF50'}}
                                    // style={{backgroundColor: "#008CBA",marginLeft:'34%'}}
                                        onClick={() => this.props.history.goBack()}
                                        style={{marginLeft: '30%'}}
                                    >Back
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _onInputChange(e){
        let inputName = e.target.name;
        let inputValue = e.target.value;
        this.setState({
            [inputName] : inputValue
        })
    }

    _onSubmit(){
        const {old_pwd, new_pwd, re_pwd, token} = this.state;
        if(new_pwd !== re_pwd){
            message.error('New password didn\'t match');
            return;
        }
        console.log(md5(old_pwd + S_KEY));
        const md5_old_pwd = md5(old_pwd + S_KEY);
        const md5_new_pwd = md5(new_pwd + S_KEY);

        let params = new URLSearchParams();
        params.append('token', token);
        params.append('old_pwd', md5_old_pwd);
        params.append('new_pwd', md5_new_pwd);

        editPwdData(params).then((res)=>{
            console.log(res);
            if(res.status_code === 200){
                message.success('Changed Successfully');
                 sessionStorage.removeItem('userData');
                this.props.history.push('/login');
            }
        }).catch((error)=>{
            console.log(error);
            message.error('Failed to change password')
        })
    }
}

export default ResetPwd;