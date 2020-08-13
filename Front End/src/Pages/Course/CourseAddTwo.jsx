import React, {Component} from 'react';
import {Link} from "react-router-dom";
import course from './../../Common/images/course.jpg'
import {connect} from "react-redux";
import { Tooltip,Progress,Steps,Button, message} from 'antd';
import { HighlightOutlined, EditOutlined, UploadOutlined, CheckOutlined,LoadingOutlined } from '@ant-design/icons';
const { Step } = Steps;
class CourseAddTwo extends Component {
    constructor(props) {
        super(props);
        const course_page = this.props.addCourseData.course_page;
        this.state = {
            course_page: course_page
        }
    }

    render() {
        const {course_page} = this.state;
        return (
            <div className="body course-add teacher-profile">
                <ol className="breadcrumb">
                <li><Link to="/course/list">Courses / </Link></li>
                    <li className="active">Add</li>
                </ol>
                <Tooltip title="2 done / 1 in progress / 1 to do">
                    <Progress percent={66.6} success={{ percent: 33.3 }} />
                    </Tooltip>
                    <Steps>
                        <Step status="finish" title="Enter Title" icon={<HighlightOutlined />} />
                        <Step status="finish" title="Enter Info" icon={<EditOutlined/>} />
                        <Step status="process" title="Upload Image" icon={<LoadingOutlined/>} />
                        <Step status="wait" title="Done" icon={<CheckOutlined />} />
                    </Steps>
                <div className="steps">
                    <ul className="forwards list-unstyled">
                        <li>
                            <Link to="/course/add_one">
                                <b>1</b>
                                Basic Info
                            </Link>
                        </li>
                        <li>
                            <Link to="/course/add_two" className="active">
                                <b>2</b>
                                Cover
                            </Link>
                        </li>
                        <li>
                            <Link to="/course/add_three">
                                <b>3</b>
                                Class Hours
                            </Link>
                        </li>
                    </ul>
                    <div className="content settings">
                        <div className="title">
                            <h5>Course Cover</h5>
                        </div>
                        <div className="picture col-md-offset-2">
                            <div className="preview" style={{height: 225}}>
                                <img src={course_page === '' ? course : course_page} alt=""/>
                                <input
                                    ref="course_page"
                                    type="file"
                                    className="form-control input-sm"
                                    placeholder="select an image"
                                    onChange={() => this._previewImg('course_page')}
                                />
                                <div className="cover">
                                    <i className="fa fa-upload"></i>
                                </div>
                            </div>
                            <p className="tips">
                            Accept files in jpg, gif, and png formats . Max to 2M.
                            </p>
                            <div className="col-md-2">
                                <Button
                                    onClick={()=>this._dealClick()}
                                    type="primary"
                                    className=" pull-right">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _previewImg(imgRef) {
        let file = this.refs[imgRef].files[0];
        console.log(file);

        let src = '';
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        } else {
            src = '';
        }
        reader.onloadend = () => {
            src = reader.result;
            this.setState({
                course_page: src
            })
        }
    }

    _dealClick(){
        const {course_page} = this.state;
        if(course_page === ''){
           message.error('The cover image cannot be empty');
           return;
        }

        this.props.addCourseData.course_page = course_page;
        this.props.addCourseData.course_page_url = this.refs.course_page.files[0];
        this.props.history.push('/course/add_three');
    }
}

const mapStateToProps = (state) => {
    return {
        addCourseData: state.addCourseData
    }
};

export default connect(mapStateToProps, null)(CourseAddTwo);