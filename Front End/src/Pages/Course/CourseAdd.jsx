import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {getCategoryDataAction} from "../../Store/actionCreators";
import { Tooltip,Progress,Steps,Button, message} from 'antd';
import { HighlightOutlined, EditOutlined, UploadOutlined, CheckOutlined } from '@ant-design/icons';
const { Step } = Steps;
class CourseAdd extends Component {
    constructor(props){
        super(props);
        const addCourseData = this.props.addCourseData;
        this.state = {
            course_name: addCourseData.course_name
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="body course-add">
                    <ol className="breadcrumb">
                    <li><Link to="/course/list">Courses / </Link></li>
                        <li className="active">Add</li>
                    </ol>
                    <Tooltip title="0 done / 1 in progress / 4 to do">
                    <Progress percent={10} success={{ percent: 0 }} />
                    </Tooltip>
                    <Steps>
                        <Step status="process" title="Enter Title" icon={<HighlightOutlined />} />
                        <Step status="wait" title="Enter Info" icon={<EditOutlined/>} />
                        <Step status="wait" title="Upload Image" icon={<UploadOutlined />} />
                        <Step status="wait" title="Done" icon={<CheckOutlined />} />
                    </Steps>
                    <div className="steps create">
                        <div className="title">
                            <h5>Create  <small>COURSE</small></h5>
                        </div>
                        <div className="form-horizontal  col-md-offset-3 col-md-6">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">Title</label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Enter the title"
                                        value={this.state.course_name}
                                        onChange={(e)=>this._dealInputValue(e)}
                                    />
                                        <small className="text-danger">Note: Course title is the information displayed externally</small>
                                </div>
                            </div>
                            <div className="col-md-11">
                                <Button
                                type="primary"
                                    onClick={()=>this._dealClick()}
                                    className=" pull-right">
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const params={
            key:'',
            pageSize: 1000,
            currentPage:1
        }
        this.props.reqCategoryData(params);
    }

    _dealInputValue(e){
       const val = e.target.value;
       this.setState({
           course_name: val
       })
    }

    _dealClick(){
        const {course_name} = this.state;
        if(course_name === '' || course_name === undefined){
            message.error('Title cannot be empty');
            return;
        }
        this.props.addCourseData.course_name = course_name;
        this.props.history.push('/course/add_one');
    }
}

const mapStateToProps = (state)=>{
    return {
        addCourseData: state.addCourseData
    }
};


const mapDispatchToProps = (dispatch)=>{
    return {
        reqCategoryData(params){
            const action = getCategoryDataAction(params);
            dispatch(action)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseAdd);