import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUserDataAction} from '../../Store/actionCreators'
import md5 from 'md5'
import { message } from 'antd';
const S_KEY = 'JaKe!';
const IMG_PRE = '../uploads/';
class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_name: '',
            user_pwd: ''
        }
    }

    render() {
        return (
            <div className="login"  style={{background:`url(${IMG_PRE}login2.jpg) no-repeat`, backgroundSize:'cover'}} >
                <div className="login-wrap" >
                    <div className="avatar">
                        <img src="./uploads/logo.jpg" className="img-circle imgLogin" alt="" />
                    </div>
                    <div className="col-md-offset-1 col-md-10  loginDiv">
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                                <i className="fa fa-id-card-o"></i>
                            </span>
                            <input
                                name="user_name"
                                type="text"
                                style={{borderRadius:'6px'}}
                                className="form-control loginInput"
                                placeholder="username"
                                onChange={e=>this._onInputChange(e)}
                                onKeyUp={e=>this._onInputKeyUp(e)}
                            />
                        </div>
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                                <i className="fa fa-key"></i>
                            </span>
                            <input
                                name="user_pwd"
                                style={{borderRadius:'6px'}}
                                type="password"
                                className="form-control loginInput"
                                placeholder="password"
                                onChange={e=>this._onInputChange(e)}
                                onKeyUp={e=>this._onInputKeyUp(e)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-info btn-block"
                            onClick={e=>this._onSubmit(e)}
                            style={{backgroundColor:'#4a7e93',color:'#fff',width:'100%'}}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    _onInputChange(e){
       let inputValue = e.target.value,
           inputName = e.target.name;

       this.setState({
           [inputName] : inputValue
       })

    }

    _onInputKeyUp(e){
         if(e.keyCode === 13){
             this._onSubmit();
         }
    }

    _onSubmit(){
        const {user_name, user_pwd} = this.state;
        if(!user_name){
            message.info('username cannot be empty!')
            return;
        }
        if(!user_pwd){
            message.info('password cannot be empty!')
            return;
        }

        const md5_user_pwd = md5(user_pwd + S_KEY);
        let params = new URLSearchParams();
        params.append('user_name', user_name);
        params.append('user_pwd', md5_user_pwd);

        this.props.reqLogin(params, (userData)=>{
            if(userData.token !== ''){
                message.success('Login Successfully');
                this.props.history.push('/');
            }
        })
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        reqLogin(data, callback){
            const action = getUserDataAction(data, callback);
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(Login);