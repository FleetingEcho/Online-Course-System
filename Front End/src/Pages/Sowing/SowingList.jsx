import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getSowingDataAction} from './../../Store/actionCreators'
import {removeSowingData} from './../../Api/index'
import { Link } from "react-router-dom";
import { message,Modal,Input, Button,Pagination} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { Search } = Input;
const IMG_PRE = '../uploads/';
let shouldClear, shouldClear1
class SowingList extends Component {
    // spinning
    constructor(props){
        super(props);
        this.state = {
            spinning: true,
            visible: false,
            pageSize:2,
            search:'',
            current:1,
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
        }
    }
    pageReload=()=>{
        shouldClear=  setTimeout(()=>{
            this.props.reqSowingData()
        },800)
    }
    goSearch(){
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=this.state.current
        const params={
            key:key,
            pageSize:pageSize,
            currentPage:currentPage
        }
        this.props.reqSowingData(params);
    }
    searchChange(e){
        this.setState({search: e.target.value})
        console.log(e.target.value);
    }

    showDeleteConfirm(id){
        const that=this
        confirm({
          title: 'Delete Confirm?',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure to delete this carousel?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            removeSowingData(id).then((res)=>{
                message.success('deleted Successfully',1)
                if(res.status_code === 200){
                    shouldClear1=  setTimeout(()=>{
                            that.componentDidMount()
                        },800)
                    }
            }).catch(()=>{
                // alert('Failed to delete');
            })

          },
          onCancel() {
            // console.log('Cancel');
          },
        });
      }
    //   getBase64(file) {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = error => reject(error);
    //     });
    //   }
      handlePreview = async file1 => {
          console.log(file1);
          const file=IMG_PRE+file1
        if (!file.url && !file.preview) {
            // file.preview = await this.getBase64(file);
          }
      
          this.setState({
            previewImage: file,
            previewVisible: true,
            // previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
          });
    }
    handleCancel = () => this.setState({ previewVisible: false });
        
    render() {
        const {sowingData} = this.props;
        console.log(sowingData[0]);
        return (
            <div className="container-fluid">
                <div className="body advert">
                    <ol className="breadcrumb">
                        <li><a href="#">Carousel /</a></li>
                        <li className="active">List </li>
                    </ol>
                    <Search 
                    placeholder="input search text" 
                    style={{width:'50%',marginLeft:'25%',marginBottom:'30px'}} 
                    onChange={this.searchChange.bind(this)} 
                    onSearch={this.goSearch.bind(this)} 
                    enterButton />
                    <div className="page-title">
                        <Link to="/sowing/add" className="btn btn-info btn-xs pull-right">Add</Link>
                    </div>
                    <div className="panel panel-default">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <td>Id</td>
                                <th>Title</th>
                                <th>Main Image</th>
                                <th>BackUp Image</th>
                                <th>Link</th>
                                <th>Online</th>
                                <th>Offline</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>                            
                            {
                                sowingData[0].map((sowing, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>Carousel{index + 1}</td>
                                            <td>{sowing.image_title}</td>
                                            <td>
                                            <img onClick={this.handlePreview.bind(this,sowing.image_url )} src={IMG_PRE + sowing.image_url} style={{width: 150}} /> 
                                           
                                            <Modal
                                            visible={this.state.previewVisible}
                                            title={sowing.image_title}
                                            onCancel={this.handleCancel}
                                            onOk={this.handleCancel}
                                            >
                                            <img alt={`${sowing.image_title}`} style={{ width: '100%' }} src={this.state.previewImage} />
                                            </Modal>

                                            </td>
                                            <td><img onClick={this.handlePreview.bind(this,sowing.image_small_url)} src={IMG_PRE + sowing.image_small_url} style={{width: 150}}/> </td>
                                            <td>   
                                            <Link to={`../${sowing.image_link}`} >{sowing.image_link.slice(sowing.image_link.lastIndexOf('/')+1)}</Link>    
                                            </td>
                                            <td>{sowing.s_time.substr(0, 10)}</td>
                                            <td>{sowing.e_time.substr(0, 10)}</td>
                                            <td>
                                                <div>
                                                <Link
                                                style={{width:'70%', height:'32px', paddingTop:'4px',marginLeft:"15%",backgroundColor:'#1890FF',color:'#fff'}}
                                                    to={{
                                                        pathname: "/sowing/edit",
                                                        state: { sowing }
                                                    }}
                                                >Edit  </Link>
                                                </div>
                                                                                                      
                                                  
                                                <div
                                                style={{width:'70%', cursor:'pointer',  paddingTop:'4px' ,marginTop:'10px',height:'32px',marginLeft:"15%",backgroundColor:'#FF4D4F',color:'#fff'}}
                                                    onClick={this.showDeleteConfirm.bind(this,sowing._id)}
                                                >Del</div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                    style={{width:'60%',marginLeft:'30%'}} 
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={total => `Total ${total} Carousels`}
                    current={this.state.current} 
                    total={sowingData[1]} 
                    pageSize={this.state.pageSize}
                    onChange={this.pageChange.bind(this)}
                    />

                </div>
            </div>
        );
    }
    loading(){
        // const {sowingData} = this.props
        this.setState({spinning:false})
    }

    pageChange(page){
        console.log(page);
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=page
        this.setState({
            current:page
        })
        const params={
            key:key,
            currentPage: currentPage,
            pageSize:pageSize
        }
        this.props.reqSowingData(params);
    }

    componentDidMount() {
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=this.state.current
        console.log(pageSize,key,currentPage);
        const params={
            key:key,
            pageSize:pageSize,
            currentPage: currentPage,
        }
       this.props.reqSowingData(params);
        // this.props.reqSowingData();
        // this.loading()
     }
     componentWillUnmount() {
        clearTimeout(shouldClear)
       }

    _removeSowing(id){
        // alert(id);

     }
}

const mapStateToProps = (state)=>{
  return {
      sowingData: state.sowingData
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
     reqSowingData(params){
         const action = getSowingDataAction(params);
         dispatch(action);
     }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SowingList);