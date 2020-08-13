import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import icon from './../../Common/images/default.png'
import {editUserData} from './../../Api/index'
import { message, Button, Space } from 'antd';
import LKTool from './../../Components/LKTool/LKTool'
import * as constants from "../../Store/actionTypes";
import { DatePicker} from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
const _tool = new LKTool;
const userData = JSON.parse(sessionStorage.getItem('userData'));
const IMG_PRE = '../uploads/';

class Mine extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: userData? userData.token : '',
            real_name: userData? userData.real_name : '',
            user_name: userData? userData.user_name : '',
            icon_url: userData? IMG_PRE + userData.icon_url : '',
            sex: userData? userData.sex : '',
            phone: userData? userData.phone : '',
            e_mail:  userData?userData.e_mail : '',
            join_time:  userData?userData.join_time : '',
            intro_self: userData? userData.intro_self : '',
            join_time1:'',
        }
    }
    componentWillMount(){

        
    }

    onChange(date, dateString) {
        console.log(dateString);
        this.setState({
            join_time1:dateString
        })
        // console.log(this.state.join_time);
      }
    render() {
        console.log(userData);
        const {real_name, user_name, icon_url, sex, phone, e_mail, join_time, intro_self} = this.state;
        return (
            // userData.token
        userData!==null &&userData.token!==undefined 
        ?
        <div className="container-fluid">
        <div className="body teacher-profile">
        <ol className="breadcrumb">
            <li><Link to="/">Home / </Link></li>
        </ol>
            <div className="settings">
                <div action="" className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Name</label>
                        <div className="col-md-5">
                            <input
                                name="real_name"
                                type="text"
                                className="form-control input-sm"
                                value={real_name}
                                onChange={(e)=>this._onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Avatar</label>
                        <div className="col-md-2 preview">
                            <img src={icon_url.includes('undefined') ? icon : icon_url}/>
                            <input
                                name="icon_url"
                                ref="icon_url"
                                type="file"
                                className="form-control input-sm"
                                onChange={(e)=>this._onInputChange(e, 'file')}
                            />
                            <div className="cover">
                                <i className="fa fa-upload"></i>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Gender</label>
                        <div className="col-md-3">
                            <label className="radio-inline">
                                <input
                                    name="sex"
                                    type="radio"
                                    checked={sex === 'Male'}
                                    onChange={(e)=>this._onInputChange(e, 'Male')}
                                />
                                Male
                            </label>
                            <label className="radio-inline" style={{marginLeft:'30px'}}>
                                <input
                                    name="sex"
                                    type="radio"
                                    checked={sex === 'Female'}
                                    onChange={(e)=>this._onInputChange(e, 'Female')}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">User Name</label>
                        <div className="col-md-5">
                            <input
                                name="user_name"
                                type="text"
                                className="form-control input-sm"
                                value={user_name}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Cell</label>
                        <div className="col-md-5">
                            <input
                                name="phone"
                                type="text"
                                className="form-control input-sm"
                                value={phone}
                                onChange={(e)=>this._onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Email</label>
                        <div className="col-md-5">
                            <input
                                name="e_mail"
                                type="text"
                                className="form-control input-sm"
                                value={e_mail}
                                onChange={(e)=>this._onInputChange(e)}
                            />
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Registration Time</label>
                        <div className="col-md-5">
                            <input

                                name="join_time"
                                type="date"
                                className="form-control input-sm"
                                value={join_time}
                                onChange={(e)=>this._onInputChange(e)}
                            />
                        </div>
                    </div> */}
                    {/* <DatePicker onChange={this.onChange} /> */}
                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Registration Time</label>
                        <div className="col-md-5">
                    <DatePicker 
                    style={{height:'38px',width:'100%'}}
                    defaultValue={moment(join_time, dateFormat)} 
                     onChange={this.onChange.bind(this)}
                     format={dateFormat} />

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="" className="col-md-3 control-label">Self Introduction</label>
                        <div className="col-md-5 ckeditor">
                            <textarea
                                name="intro_self"
                                rows="15"
                                className="form-control input-sm"
                                value={intro_self}
                                onChange={(e)=>this._onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-8">
                            <Button onClick={()=>this._onSubmit()} type="primary">Save</Button>
                            <Button onClick={()=>this._toReset()} type="primary" 
                            style={{backgroundColor: "#008CBA",marginLeft:'34%'}}
                            
                            >Change Password?</Button>
                            {/* <Link to="/mine/reset" className="btn btn-link btn-success pull-right"> Change Password?</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    :
    <div> Loading... Please refresh this page</div>
        );
    }
    _toReset(){
        this.props.history.push('/mine/reset')
    }
    _onInputChange(e, flag){
        let inputValue = e.target.value;
        let inputName = e.target.name;

        if(flag === 'Male'){
            inputValue = 'Male';
        }else if(flag === 'Female'){
            inputValue = 'Female';
        }

        if(flag === 'file'){
            inputValue = '';
            _tool.fileToBase64Url(e.target.files[0], (src)=>{
                inputValue = src;
                this.setState({
                    icon_url: inputValue
                })
            })
        }

        this.setState({
            [inputName]: inputValue
        })
    }

    _onSubmit(){
       const {token, real_name, user_name, sex, phone, e_mail, join_time,join_time1, intro_self} = this.state;
       const {icon_url}= userData;

        let formData = new FormData();
        formData.append('token', token);
        formData.append('real_name', real_name);
        formData.append('user_name', user_name);
        formData.append('sex', sex);
        formData.append('phone', phone);
        formData.append('e_mail', e_mail);
        formData.append('join_time', join_time1);
        formData.append('intro_self', intro_self);
        formData.append('icon_url', this.refs.icon_url.files[0] || icon_url);

        editUserData(formData).then((res)=>{
            if(res.status_code === 200){
                this.props.refreshLocalUserData(res.result);
                message.success('saved Successfully');
                this.props.history.push('/');
            }
        }).catch(()=>{
            message.error('Failed to save your information');
        })
    }
}

const mapStateToProps = (state)=>{
   return {
       userData: state.userData
   }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        refreshLocalUserData(userData){
            dispatch({
                type: constants.INIT_USER_DATA,
                userData
            });
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Mine);