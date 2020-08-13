import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSourceDataAction} from "../../Store/actionCreators";
import { Modal, Button , message,Tooltip} from 'antd';
import { Pagination, Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import {removeCourseData} from '../../Api/index'
const { confirm } = Modal;
// import { Pagination } from 'antd';
const IMG_PRE = '../uploads/';
const { Search } = Input;
let shouldClear
const divCss={
overflow: 'hidden',
WebkitBoxOrient: 'vertical',
}
class CourseList extends Component {
    state = { 
        visible: false,
        pageSize:2,
         exactInfo:'',
         exactImg:'',
         exactTitle:'',
         search:'',
         current:1
        };
    showModal = (index) => {
        this.setState({
          visible: true,
          info: index
        });
        let {sourceData} = this.props;
        sourceData[0].some((item,index1)=>{
            if(index1===index){
            this.setState({
                exactInfo:item.course_intro,
                exactImg:item.course_page,
                exactTitle:item.course_name,
            })
            }
        })
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      searchChange(e){
        this.setState({search: e.target.value})
        // console.log(e.target.value);
    }
    pageReload(){
        shouldClear=setTimeout(()=>{
            this.pageChange(1)
        },100)
    }
    showDeleteConfirm(id){
        const that=this
        confirm({
          title: 'Delete Confirm?',
          icon: <CheckOutlined  />,
          content: 'Are you sure to this course has completed?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            removeCourseData(id).then((res)=>{
                message.success('deleted Successfully',1)
                that.pageReload()
                if(res.status_code === 200){
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

      courseImgClick(id){
        // console.log(id);
                // 2. 跳转到下一级界面
                // this.props.courseId=id;
                this.props.history.push('/course/topic',{id:id});
      }
      render() {
        const {sourceData} = this.props;
        console.log(sourceData)
        return (
            <div className="container-fluid">
                <div className="body course-list">
                    <ol className="breadcrumb">
                        <li><a href="#">Courses /</a></li>
                        <li className="active">List</li>
                    </ol>
                    <Search style={{width:'50%',marginLeft:'25%'}} 
                    onSearch={this.goSearch.bind(this)} 
                    placeholder="input search text" 
                    onChange={this.searchChange.bind(this)} 
                    enterButton />
                    <div className="courses">
                        {
                            sourceData[0].map((source, index)=>{
                                return (

                                    <div className="course" key={index}>
                                    <Modal
                                    key={index}
                                            title="Course Info"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                            >
                                            <p><strong><span style={{color:'skyblue'}}>Title:</span> {this.state.exactTitle}</strong></p>
                                            <div style={divCss} ><strong><span style={{color:'skyblue'}}>Introduction: </span>{this.state.exactInfo}</strong> </div>
                                            <img style={{maxWidth:'440px',marginTop:'20px'}}  src={IMG_PRE + this.state.exactImg} alt=""/>

                                            {/* <p>Teacher: {source.course_teacher} </p> */}
                                        </Modal>
                                        <div className="pic">
                                            <img style={{height:'120px'}} onClick={this.courseImgClick.bind(this,source._id)} src={IMG_PRE + source.course_page} alt=""/>
                                        </div>
                                        <div className="info">
                                            <a key={index} onClick={this.showModal.bind(this,index)}>{source.course_name}</a>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <span>Teacher：{source.course_teacher}</span>
                                                    <span>Main Category：{source.main_category}</span>
                                                </li>
                                                <li>
                                                    <span>Sub-Category： {source.sub_category}</span>
                                                </li>
                                            </ul>
                                        <div style={{float:'right'}}>
                                        <Tooltip title="Completed">
                                        <Button style={{paddingLeft:'5px'}}
                                        type="primary"
                                         onClick={this.showDeleteConfirm.bind(this,source._id)}
                                         icon={<CheckOutlined />} />
                                        </Tooltip>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                    <Pagination 
                    style={{width:'50%',marginLeft:'33%'}} 
                    current={this.state.current} 
                    size='large'
                    total={sourceData[1]} 
                    pageSize={this.state.pageSize}
                    onChange={this.pageChange.bind(this)}
                    showQuickJumper
                     />
                </div>
            </div>
        );
    }
    componentDidMount() {
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=this.state.current
        this.props.reqCourseData(key,currentPage,pageSize);
    }
    componentWillUnmount() {
        clearTimeout(shouldClear)
       }
    goSearch(){
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=this.state.current
       this.props.reqCourseData(key,currentPage,pageSize);
    }
    pageChange(page){
        console.log(page);
        const pageSize=this.state.pageSize
        const key=this.state.search
        let currentPage=page
        this.setState({
            current:page
        })
       this.props.reqCourseData(key,currentPage,pageSize);
    }
}

const mapStateToProps = (state)=>{
    return {
        sourceData: state.sourceData
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        reqCourseData(searchVal,page,pageSize){
            const action = getSourceDataAction(searchVal,page,pageSize);
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);