import React, {Component} from 'react';
import {addSowingData} from './../../Api/index'
import { Link } from "react-router-dom";
import { message,DatePicker,Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'MM-DD-YYYY';
const fileList=[]
const  props={
    action: '#',
    listType: 'picture',
    defaultFileList: [...fileList],
  }
class SowingAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
        timeArray:[],
        files:[],
        link:'',
        select1:'http://',
        select2:'.com',
        }
    }
    // disabledDate(current) {
    //     // Can not select days before today and today
    //     return current && current < moment().endOf('day');
    //   }
      onChange(value){
const timeArray1=[]
        value.map(item=>{
            const str=item._d
            const str1=JSON.stringify(str)
            const res=str1.substr(1,10)
            timeArray1.push(res.replace(/\s+/g,"-"))
            this.setState({
                timeArray:timeArray1
            })
        })
      }
      imgsChange(value){
        //  value.fileList.map((item)=>{
        //    item["path"]=item.name
        //  })
         value.fileList.forEach(imgItem => {
            if (imgItem && imgItem.status == 'done' && imgItem.response && imgItem.response.imgUrl) {
              imgItem.thumbUrl = imgItem.response.imgUrl;
            }
          });

          console.log(value);
                  this.setState({
                    files:value.fileList
                  })

      }
    beforeUpload = file => {
        return false;  // prevent auto upload
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
            <Select defaultValue='http://'  onChange={this.onSelect1.bind(this)} className="select-before">
              <Option value="http://">http://</Option>
              <Option value="https://">https://</Option>
            </Select>
          );
        const selectAfter = (
            <Select defaultValue=".com" onChange={this.onSelect2.bind(this)}  className="select-after">
              <Option value=".ca">.ca</Option>
              <Option value=".com">.com</Option>
              <Option value=".gov">.gov</Option>
              <Option value=".cn">.cn</Option>
              <Option value=".org">.org</Option>
            </Select>
          );

        return (
            <div className="container-fluid">
                <div className="body advert">
                    <ol className="breadcrumb">
                        <li><Link to="/sowing/list">Carousel / </Link></li>
                        <li className="active">add</li>
                    </ol>
                    <div className="advert-add">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Carousel Name</label>
                                <div className="col-md-5">
                                    <input ref="image_title" type="text" className="form-control input-sm" placeholder="Enter name"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Big Image & Small Image</label>
                                <div className="col-md-5">
                                <Upload 
                                {...props}
                                onChange={this.imgsChange.bind(this)}
                                 beforeUpload={this.beforeUpload}
                                 >
                                    <Button>
                                        <UploadOutlined /> Upload
                                    </Button>
                                    </Upload>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Jump to Link</label>
                            <div  className="col-md-5" style={{ marginBottom: 16 }}>
                                <Input addonBefore={selectBefore} addonAfter={selectAfter} onChange={this.linkChange.bind(this)} value={this.state.link} defaultValue="mysite" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Time Range</label>
                                <div className="col-md-5">
                            <RangePicker style={{width:'100%'}} disabledDate={this.disabledDate}  format={dateFormat} onChange={this.onChange.bind(this)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-5">
                                    <button onClick={()=>this._dealWithClick()} style={{marginLeft:'50px'}} className="btn btn-success btn-xs pull-right">Add</button>
                                <button onClick={()=>this.props.history.push('/sowing/list')}  className="btn btn-info btn-xs pull-right">Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    _dealWithClick(){
        if(this.state.files.length!==2){
            message.error('Need to upload 2 images');
            return;
        }
        const str1=this.state.select1
        const str3=this.state.link
        const str2=this.state.select2
        // const strLink= JSON.stringify(str1+str3+str2)
        const strLink= str1+str3+str2
        const image_title = this.refs.image_title.value;
        const image_url = this.state.files[0].originFileObj;
        const image_small_url =this.state.files[1].originFileObj;

        const image_link =strLink;
        // const image_link =this.refs.image_link.value;
        const s_time=this.state.timeArray[0]
        const e_time=this.state.timeArray[1]
        console.log(typeof(image_link1));
        console.log(typeof(image_link));

        // 2.check info 
        if(!image_title || !image_url || !image_small_url || !image_link || !s_time || !e_time){
            message.error('Input cannot be empty');
            return;
        }
        // 3. build formdata Object
        let formData = new FormData();
        formData.append('image_title', image_title);
        formData.append('image_url', image_url);
        formData.append('image_small_url', image_small_url);
        formData.append('image_link', image_link);
        formData.append('s_time', s_time);
        formData.append('e_time', e_time);
        for (var value of formData.values()) {
            console.log(value); 
         }

        addSowingData(formData).then((res)=>{
            if(res.status_code === 200){
               message.success('Upload Successfully')
                this.props.history.push('/sowing/list');
            }
        }).catch((error)=>{
            console.log(error);
            message.error('Failed to upload');
        })
    }
}
export default SowingAdd;