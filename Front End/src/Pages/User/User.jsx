import React, {Component} from 'react';
import {connect} from "react-redux";
import {getStudentDataAction} from "../../Store/actionCreators";
import {removeStudentData} from './../../Api/index'
import { Button, Tooltip,message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Modal,Input,Pagination} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { Search } = Input;
let shouldClear
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize:10,
            search:'',
            current:1,
            total: 0,
            flagCount: 0,
            refresh:-1,
            exact_reg_account:'',
            exact_user_name:'',
            exact_user_age:'',
            exact_user_sex:'',
            exact_area:'',
            exact_phone:'',
            exact_points:'',
            exact_reg_time:'',
            exact_last_login_time:'',

        }
    }

    showModal = (index) => {
        this.setState({
          visible: true,
          info: index
        });
        let {studentData} = this.props;
        studentData[0].some((item,index1)=>{
            if(index1===index){
            this.setState({
                exact_reg_account:item.reg_account,
                exact_user_name:item.user_name,
                exact_user_age:item.user_age,
                exact_user_sex:item.user_sex,
                exact_area:item.area,
                exact_phone: item.user_phone,
                exact_points:item.points,
                exact_reg_time:item.reg_time,
                exact_last_login_time:item.last_login_time,
            })
            }
        })
      };
            
              hideModal = () => {
                this.setState({
                  visible: false,
                });
              };
              searchChange(e){
                this.setState({search: e.target.value})
                // console.log(e.target.value);
            }
            
            pageReload=()=>{
                shouldClear= setTimeout(()=>{
                    this.pageChange(1)
                },500)
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
                  onOk(){
                      message.success('deleted Successfully',1)
                      that.pageReload()
                    removeStudentData(id).then((res)=>{
                        if(res.status_code === 200){
                        }
                    }).catch((err)=>{
                    console.log(err);
                    })
                  },
                  onCancel() {
                    // console.log('Cancel');
                  },
                });
              }
              deleteId(id){
                removeStudentData(id).then((res)=>{
                    if(res.status_code === 200){
                        message.success('deleted Successfully',1)
                        // window.location.reload();
                        // this.pageChange(1)
                        this.pageReload()
                    }
                    // this.props.reqSowingData()
                }).catch(()=>{
                    // alert('Failed to delete');
                })
              }


    render() {
        const {studentData}=this.props
        const total=Number(studentData[1])
        return (
            <div className="container-fluid" style={{width:'100%'}}>
                <div className="body">
                    <ol className="breadcrumb">
                        <li><a href="#">User /</a></li>
                        <li className="active">List</li>
                    </ol>
                <Search
                    style={{width:'50%',marginLeft:'25%',marginBottom:'20px'}} 
                    placeholder="input search text"
                    onSearch={this.goSearch.bind(this)} 
                    onChange={this.searchChange.bind(this)} 
                    enterButton="Search"
                    size="large"
                    />
                    <div className="panel panel-default user-list">
                        <div className="panel-body">
                        </div>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>User</th>
                                <th>Account</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Region</th>
                                <th>Cell</th>
                                <th>Credit</th>
                                <th>RegTime</th>
                                <th>Login Time</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                studentData[0].map((student,index)=>(
                                    <tr key={student._id}>
                                        <td>{student.user_id}</td>
                                        <td>{student.reg_account}</td>
                                        <td>{student.user_name}</td>
                                        <td>{student.user_age}</td>
                                        <td>{student.user_sex}</td>
                                        <td>{student.area}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.points}</td>
                                        <td>{student.reg_time}</td>
                                        <td>{student.last_login_time.substr(0,10)}</td>
                                        <td>
                                            {/* <a href="#" className="btn btn-info btn-xs" onClick={this.showModal}>
                                            Check
                                            </a> */}
                                            <Button type="primary" key={index} onClick={this.showModal.bind(this,index)} icon={<SearchOutlined />}>
                                                Check
                                                </Button>
                                            <Modal
                                            title="User Info"
                                            visible={this.state.visible}
                                            onOk={this.hideModal}
                                            onCancel={this.hideModal}
                                            okText="OK"
                                            cancelText="Cancel"
                                            >
                                        <p><span style={{color:"#17a2b8"}}>Account: </span>{this.state.exact_reg_account}</p>
                                        <p><span style={{color:"#17a567"}}>Name: </span>{this.state.exact_user_name}</p>
                                        <p><span style={{color:"#143567"}}>Age: </span>{this.state.exact_user_age}</p>
                                        <p><span style={{color:"#176545"}}>Gender: </span>{this.state.exact_user_sex}</p>
                                        <p><span style={{color:"#777765"}}>Region: </span>{this.state.exact_area}</p>
                                        <p><span style={{color:"#434344"}}>Cell: </span>{this.state.exact_phone}</p>
                                        <p><span style={{color:"#888643"}}>Credits: </span>{this.state.exact_points}</p>
                                        <p><span style={{color:"#555163"}}>Reg_Time: </span>{this.state.exact_reg_time}</p>
                                        <p><span style={{color:"#cccfff"}}>Login Time: </span>{this.state.exact_last_login_time}</p>
                                            </Modal>
                                            {/* <a href="#" className="btn btn-danger btn-xs"></a> */}
                                            <Button type="primary" 
                                            style={{width:'92px',marginTop:'20px'}}
                                            danger
                                            onClick={this.showDeleteConfirm.bind(this,student._id)}
                                            >
                                            Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                   <Pagination
                    style={{width:'50%',marginLeft:'25%',marginBottom:'20px'}} 
                    current={this.state.current} 
                    total={studentData[1]} 
                    pageSize={this.state.pageSize}
                    showQuickJumper
                    showSizeChanger={false}
                    onChange={this.pageChange.bind(this)}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=this.state.current
        this.props.reqStudentList({
            key:key,
            page:currentPage,
            pageSize: pageSize
            });
    }
    componentWillUnmount() {
     clearTimeout(shouldClear)
    }
    goSearch(){
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=this.state.current
        this.props.reqStudentList({
            key:key,
            page:currentPage,
            pageSize: pageSize
            });
    }
    pageChange(page){
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=page
        this.setState({
            current:page
        })
       this.props.reqStudentList({
            key:key,
            page:currentPage,
            pageSize: pageSize
            });
    }

    _onPageNumChange(pageNum){
        // this.setState({
        //     pageNum,
        //     flagCount: (pageNum - 1) * this.state.pageSize
        // }, ()=>{
        //     this.props.reqStudentList({
        //         page:pageNum,
        //         pageSize: this.state.pageSize
        //     });
        // })
    }
}

const mapStateToProps = (state)=>{
    return {
       studentData: state.studentData
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
       reqStudentList(parmas){
           const action = getStudentDataAction(parmas);
           dispatch(action)
       }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);