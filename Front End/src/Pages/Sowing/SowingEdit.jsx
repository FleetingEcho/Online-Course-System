import React, {Component} from 'react';
import {editSowingData} from './../../Api/index'
import { Link } from "react-router-dom";
import {message, Input, Select } from 'antd';
const { Option } = Select;
const IMG_PRE = '../uploads/';

class SowingEdit extends Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state);
        const sowing = this.props.location.state.sowing;
        this.state = {
            select1:'http://',
            select2:sowing.image_link.slice(sowing.image_link.lastIndexOf('.')),
            link:sowing.image_link.slice(0,sowing.image_link.lastIndexOf('.')),
            id: sowing._id,
            image_title: sowing.image_title,
            image_url: IMG_PRE + sowing.image_url,
            image_small_url:  IMG_PRE + sowing.image_small_url,
            image_link: sowing.image_link,
            s_time: sowing.s_time,
            e_time: sowing.e_time,
        }
    }
    onSelect1(value){
        this.setState({
            select1:value
        })
    }
    onSelect2(value){
        this.setState({
            select2:value
        })
    }
    linkChange(e){
        this.setState({link: e.target.value})
        console.log(e.target.value);
    }

    render() {
        const selectBefore = (
            <Select defaultValue={this.state.select1}  onChange={this.onSelect1.bind(this)} className="select-before">
              <Option value="http://">http://</Option>
              <Option value="https://">https://</Option>
            </Select>
          );
        const selectAfter = (
            <Select defaultValue={this.state.select2} onChange={this.onSelect2.bind(this)}  className="select-after">
              <Option value=".ca">.ca</Option>
              <Option value=".com">.com</Option>
              <Option value=".gov">.gov</Option>
              <Option value=".cn">.cn</Option>
              <Option value=".org">.org</Option>
            </Select>
          );
        return (
            <div className="container-fluid">
                <div className="body teacher-profile">
                    <ol className="breadcrumb">
                        <li><Link to="/sowing/list">Carousel / </Link></li>
                        <li className="active">Edit</li>
                    </ol>
                    <div className="settings">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Title</label>
                                <div className="col-md-5">
                                    <input
                                        ref="image_title"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Enter the title"
                                        value = {this.state.image_title}
                                        onChange={(e)=>this._dealInputValue(e, 'image_title')}
                                    />
                                </div>
                            </div>
                            {/*大图*/}
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Big Image</label>
                                <div className="col-md-2 preview">
                                    <img src={this.state.image_url} alt="" style={{border: 1}} />
                                    <input
                                        ref="image_url"
                                        type="file"
                                        className="form-control input-sm"
                                        placeholder="Select big image"
                                        onChange={()=>this._previewImg('image_url')}
                                    />
                                    <div className="cover">
                                        <i className="fa fa-upload"></i>
                                    </div>
                                </div>
                            </div>
                            {/*小图*/}
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Small Image</label>
                                <div className="col-md-2 preview">
                                    <img src={this.state.image_small_url} alt=""  style={{border: 1}} />
                                    <input
                                        ref="image_small_url"
                                        type="file"
                                        className="form-control input-sm"
                                        placeholder="Select small image"
                                        onChange={()=>this._previewImg('image_small_url')}
                                    />
                                    <div className="cover">
                                        <i className="fa fa-upload"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Link</label>
                            <div  className="col-md-5" style={{ marginBottom: 16 }}>
                                <Input addonBefore={selectBefore} addonAfter={selectAfter} onChange={this.linkChange.bind(this)} value={this.state.link} defaultValue="mysite" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Online Time</label>
                                <div className="col-md-5">
                                    <input
                                        ref="s_time"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="enter the online time"
                                        value = {this.state.s_time.substr(0, 10)}
                                        onChange={(e)=>this._dealInputValue(e, 's_time')}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Offline Time</label>
                                <div className="col-md-5">
                                    <input
                                        ref="e_time"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="enter the offline time"
                                        value = {this.state.e_time.substr(0, 10)}
                                        onChange={(e)=>this._dealInputValue(e, 'e_time')}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-1">
                                    {/* <button onClick={()=>this.props.history.push('/sowing/list')} className="btn btn-info btn-xs pull-right">Back</button> */}
                                    <button onClick={()=>this._dealWithClick()} style={{marginLeft:'0px'}} className="btn btn-danger btn-xs pull-right">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Process Value
    _dealInputValue(e, type){
        // console.log(e.target.value);
        const val = e.target.value;
        if(type === 'image_title'){
            this.setState({
                image_title: val
            })
        }else if(type === 'image_link'){
            this.setState({
                image_link: val
            })
        }else if(type === 's_time'){
            this.setState({
                s_time: val
            })
        }else if(type === 'e_time'){
            this.setState({
                e_time: val
            })
        }
    }

    _previewImg(imgRef){
        let file = this.refs[imgRef].files[0];
        console.log(file);

        let src = '';
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
        }else {
            src = '';
        }
        reader.onloadend = ()=>{
            src = reader.result;
            if(imgRef === 'image_url'){
                this.setState({
                    image_url: src
                })
            }else {
                this.setState({
                    image_small_url: src
                })
            }

        }
    }

    _dealWithClick(){
        const str1=this.state.select1
        const str3=this.state.link
        const str2=this.state.select2
        // const strLink= JSON.stringify(str1+str3+str2)
        const strLink= str1+str3+str2
         const {id, image_title, s_time, e_time} = this.state;
         const {image_url, image_small_url} = this.props.location.state.sowing;
         let formData = new FormData();
         formData.append('id', id);
         formData.append('image_title', image_title);
        //  formData.append('image_link', image_link);
         formData.append('image_link', strLink);
         formData.append('s_time', s_time);
         formData.append('e_time', e_time);
         formData.append('image_url', this.refs.image_url.files[0] || image_url);
         formData.append('image_small_url', this.refs.image_small_url.files[0] || image_small_url);
        editSowingData(formData).then((res)=>{
            console.log(res);
            if(res.status_code === 200){
                message.success('Edit Successfully!')
                this.props.history.push('/sowing/list');

            }
        }).catch((error)=>{
            console.log(error);
            alert('Failed to Edit');
        });
    }

}

export default SowingEdit;