import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
// import { Prompt } from 'react-router'
import {message} from 'antd'
import { Modal, Button, Space } from 'antd';
import { Tooltip,Progress,Steps} from 'antd';
import { HighlightOutlined, EditOutlined, UploadOutlined, CheckOutlined,LoadingOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Select, Tag } from 'antd';
const { Option } = Select;
const { confirm } = Modal;
const { Step } = Steps;
const categoryData=[];
class CourseAddOne extends Component {
    constructor(props){
        super(props);
        const addCourseData = this.props.addCourseData;
        this.state = {
            s_sub_course:'------',
            s_main_course:'',
            course_title: addCourseData.course_title,
            course_sub_title: addCourseData.course_sub_title,
            course_teacher: addCourseData.course_teacher,
            course_serialize_status: addCourseData.course_serialize_status,
            // main_category: addCourseData.main_category,
            main_category: this.props.categoryData[0].main_category,
            sub_category: addCourseData.sub_category,
            course_intro: addCourseData.course_intro,
            course_tag: addCourseData.course_tag,
            sub_course: this.props.categoryData[0][0].sub_course
        }

    }
    handleProvinceChange = index => {
        // console.log(index);
        const {categoryData} = this.props;
        this.setState({
            s_main_course: categoryData[0][index].main_title,
            s_sub_course:categoryData[0][index].sub_course[0].sub_title,
            sub_course:  categoryData[0][index].sub_course,
        });
        console.log(categoryData[0][index].sub_course[0].sub_title);
        console.log('maincourse is '+this.state.s_main_course);
            
        // const cityData=this.state.cityData
        // const sub_course=this.props.categoryData[0][0].sub_course
      };
    
      onSecondCityChange = index => {
        //   const secondCity=this.state.secondCity
        this.setState({
          s_sub_course: this.state.sub_course[index].sub_title,
        });
      };

    showPromiseConfirm() {
        confirm({
          title: 'Do you want to leave this page?',
          icon: <ExclamationCircleOutlined />,
          content: 'the information will not be saved after leave',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? true : false, 800);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {
            return false
          },
        });
      }

    componentDidMount() {
        console.log(this.props.addCourseData);
        // console.log(1111);
        //  console.log(res);
        window.addEventListener('onunload', this.listener.bind(this))   

    }
    componentWillUnmount() {
        window.removeEventListener('onunload', this.listener.bind(this))   
    }
    listener = e => {
        e.preventDefault();
        this.showPromiseConfirm()
        // (e || window.event).returnValue = confirmationMessage;
        // return confirmationMessage;
    }

    render() {
        const {
            course_title,
            course_sub_title,
            course_teacher,
            course_serialize_status,
            main_category,
            sub_category,
            course_intro,
            course_tag,
            sub_course
        } = this.state;
        const {categoryData} = this.props;
        console.log(categoryData[0]);
        console.log(sub_course);
        return (
            <div className="body course-add">
            {/* <Prompt
                message={(location, action) => {
                        return location.pathname.startsWith("/app")
                        ? true
                        : `Are you sure to leave this page?`
                    }}
                /> */}
                <ol className="breadcrumb">
                <li><Link to="/course/list">Courses / </Link></li>
                    <li className="active">Add</li>
                </ol>
                    <Tooltip title="1 done / 1 in progress / 2 to do">
                    <Progress percent={33.3} success={{ percent: 10 }} />
                    </Tooltip>
                    <Steps>
                        <Step status="finish" title="Enter Title" icon={<HighlightOutlined />} />
                        <Step status="process" title="Enter Info" icon={<LoadingOutlined/>} />
                        <Step status="wait" title="Upload Image" icon={<UploadOutlined />} />
                        <Step status="wait" title="Done" icon={<CheckOutlined />} />
                    </Steps>
                <div className="steps">
                    <ul className="forwards list-unstyled">
                        <li>
                            <Link to="/course/add_one" className="active">
                                <b>1</b>
                                Basic Info
                            </Link>
                        </li>
                        <li>
                            <Link to="/course/add_two">
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
                    <div className="content">
                        <div className="title">
                            <h5>Basic Info</h5>
                        </div>
                        <div className="basic form-horizontal">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">Title</label>
                                <div className="col-md-8">
                                    <input
                                        name="course_title"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="enter the title"
                                        value={course_title}
                                        onChange={(e)=>this._dealInputValue(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">Subtitle</label>
                                <div className="col-md-8">
                                    <input
                                        name="course_sub_title"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="subtitle"
                                        value={course_sub_title}
                                        onChange={(e)=>this._dealInputValue(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">Teacher</label>
                                <div className="col-md-8">
                                    <input
                                        name="course_teacher"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="teacher's name"
                                        value={course_teacher}
                                        onChange={(e)=>this._dealInputValue(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">Status</label>
                                <div className="col-md-8">
                                    <select
                                    style={{width:'32%'}}
                                        name="course_serialize_status"
                                        className="form-control input-sm"
                                        value={course_serialize_status}
                                        onChange={(e)=>this._dealInputValue(e, 'course_serialize_status')}
                                    >
                                        <option value="Non-serial course">Non-serial course</option>
                                        <option value="Updating">Updating</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">Classification</label>
                                <div className="col-md-8">
                                <Select
                                    defaultValue={categoryData[0][0]["main_title"]}
                                    style={{ width: 120 }}
                                    onChange={this.handleProvinceChange}
                                    >
                                    {categoryData[0].map((category, index) => (
                                        <Option key={index}> {category.main_title}</Option>
                                    ))}
                                </Select>
                                <Select
                                        style={{ width: 120 }}
                                        // defaultValue={this.state.s_sub_course}
                                        defaultValue={this.state.s_sub_course}
                                        onChange={this.onSecondCityChange}
                                        >
                                        { sub_course.map((course, index)=>(
                                         
                                                <Option key={index}>{course.sub_title}</Option>
                                        
                                        ))}
                                </Select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">Brief Introduction</label>
                                <div className="col-md-8 ckeditor">
                                    <textarea
                                        name="course_intro"
                                        rows="10"
                                        value={course_intro}
                                        className="form-control input-sm"
                                        onChange={(e)=>this._dealInputValue(e, 'course_intro')}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">label</label>
                                <div className="col-md-8">
                                    <input
                                        name="course_tag"
                                        type="text"
                                        className="form-control input-sm"
                                        value={course_tag}
                                        onChange={(e)=>this._dealInputValue(e, 'course_tag')}
                                    />
                                        <p className="help-block">Tags will help your course be retrieved by students</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-10">
                                    <Button
                                    type="primary"
                                        onClick={()=>this._dealClick()}
                                        className="pull-right">
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _dealInputValue(e, type){
        let inputValue = e.target.value;
        let inputName = e.target.name;

        if(type === 'main_category'){
            this.props.categoryData.map((category, index)=>{
                if(category.main_title === inputValue){
                    this.setState({
                        sub_course: category.sub_course
                    })
                }
            });
        }

        this.setState({
            [inputName]: inputValue
        })
    }

    _dealClick(){
        const {categoryData} = this.props;
        const {
            course_title,
            course_sub_title,
            course_teacher,
            s_sub_course,
            course_serialize_status,
            main_category,
            sub_category,
            course_intro,
            course_tag
        } = this.state;
        // const {categoryData} = this.props;
        // 2. check info
        if(
            course_title === '' ||
            course_sub_title === '' ||
            s_sub_course==='------' ||
            course_intro === '' ||
            course_tag === ''
        ){
            message.info('Some info need to be entered');
            return;
        }

        this.props.addCourseData.course_title = course_title;
        this.props.addCourseData.course_sub_title = course_sub_title;
        this.props.addCourseData.course_teacher = course_teacher === '' ? 'Jake': course_teacher;
        this.props.addCourseData.course_serialize_status = course_serialize_status === '' ? 'Non-serial course': course_serialize_status;
        this.props.addCourseData.main_category = main_category === '' ? this.state.s_main_course: categoryData[0][0]["main_title"];
        this.props.addCourseData.sub_category = sub_category === '' ? this.state.s_sub_course: this.state.s_sub_course;
        // this.props.addCourseData.main_category = main_category === '' ? this.props.categoryData[0].main_title: main_category;
        // this.props.addCourseData.sub_category = sub_category === '' ? this.props.categoryData[0].sub_course[0].sub_title: sub_category;
        this.props.addCourseData.course_intro = course_intro;
        this.props.addCourseData.course_tag = course_tag;

        // console.log(this.props.addCourseData);
        // debugger;

       this.props.history.push('/course/add_two')
    }
}

const mapStateToProps = (state)=>{
    return {
        addCourseData: state.addCourseData,
        categoryData: state.categoryData
    }
};

// export default connect(mapStateToProps, mapDispatchToProps)(CourseAddOne);
export default connect(mapStateToProps, null)(CourseAddOne);