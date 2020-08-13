import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addSourceData,addSourceData1 } from './../../Api/index'
import { Tooltip, Progress, message, Steps, Radio } from 'antd'
import { ExclamationCircleOutlined,LoadingOutlined} from '@ant-design/icons';
import {
  HighlightOutlined,
  EditOutlined,
  UploadOutlined,
  CheckOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import { Select, Upload, Modal, Form, Input, InputNumber, Button } from 'antd'
import clonedeep from 'clonedeep'
const { Step } = Steps
const { confirm } = Modal;
const { Option } = Select
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const validateMessages = {
  required: '${label} is required!',
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}
const formList1 = { class: [], videoList: [] }
// const formList2=new Set([])
const formList2=[]
const formList3=[]
let arrLength
class CourseThrees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      processFlag:true,
      modalVisible: false,
      files: [],
      value: true,
      courseList: [
        {
          title: 'Course Introduction',
          label: 'Basic',
          free: false,
          video: [],
          introduction: '',
          Time: '30',
        },
        // {
        //   title: 'Node',
        //   label: 'Basic',
        //   free: false,
        //   video: '',
        //   introduction: '',
        //   Time: '60',
        // },
      ],
      finalVideos: [],
      formInitialValues: {
        title: '',
        label: '',
        video: '',
        introduction: '',
        Time: '',
      },
    }
  }
  onFinish = (values) => {
    this.setState({
      modalVisible:false
    })
    // console.log(values)
    const courseList1=clonedeep(this.state.courseList)
    const newVal={
      title:values.class.title,
      label:values.label,
      free:values.free,
      video:[],
      introduction:values.class.introduction,
      Time:values.class.Time
    }
    const tempVideos=[]
    if(values.dragger!== undefined&& values.dragger.length!==0){
      values.dragger.map((item,index)=>{
        // console.log(item);
        tempVideos.push(item.originFileObj)
      })
      }
      newVal["video"]=tempVideos
      courseList1.push(newVal)
      this.setState({
        courseList:courseList1
      })
      console.log(courseList1);
  }


  normFile = (e) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  showDeleteConfirm(id){
    console.log(id);
    const that=this
    confirm({
      title: 'Delete Confirm?',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this course?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const courseList= that.state.courseList
        let newCourseList= clonedeep(courseList)
        let  List=newCourseList.filter(function(element, index, self){
          return index!==id
        })
        that.setState({
          courseList:List
        })
        // console.log(List);
      },
      onCancel() {
        that.setState({
          modalVisible:false
        })
        // console.log('Cancel');
      },
    });
  }
  render() {
    const { courseList } = this.state
    const that=this
    const setModalVisible = (modal2Visible, index) => {
      //   console.log(index);
      if (index !== undefined) {
        const courseList = this.state.courseList
        courseList.some((item, key) => {
          if (key === index) {
            const initialValues = courseList[index]
            // console.log(initialValues);
            const initialValues1 = {
              title: initialValues.title,
              Time: initialValues.Time,
              label: initialValues.label,
              introduction: initialValues.introduction,
            }
            // console.log(initialValues1);
            this.setState({
              formInitialValues: initialValues1,
            }, 
            // ()=>{this.refs.classForm.setFieldsValue({inputScope:'123'})}
            )
          // ! Since my form is inside Modal, I cannot get this.props.form when I initialize the render
          // !! ...
            
            // that.props.form.setFieldsValue(initialValues1)
            // this.props.form.setFieldsValue(initialValues1)
            // this.props.form.setFieldsValue(initialValues1);
            // this.props.form.getFieldDecorator('', { initialValue: 'My Value' })
          }
        })
      }
      this.setState({ modal2Visible })
    }
    return (
      <div>
        <div className="body course-add">
          <ol className="breadcrumb">
            <li>
            <li><Link to="/course/list">Courses / </Link></li>
            </li>
            <li className="active"> Add</li>
          </ol>
          <Tooltip title="3 done / 1 in progress / 0 to do">
            <Progress percent={100} success={{ percent: 66.6 }} />
          </Tooltip>
          <Steps>
            <Step
              status="finish"
              title="Enter Title"
              icon={<HighlightOutlined />}
            />
            <Step status="finish" title="Enter Info" icon={<EditOutlined />} />
            <Step
              status="finish"
              title="Upload Image"
              icon={<UploadOutlined />}
            />
           {
            this.state.processFlag===true
            ?
            <Step status="finish" title="Done" icon={<LoadingOutlined />} />
            :
            <Step status="process" title="Done" icon={<CheckOutlined />} />
           }
            {/* <Step status="finish" title="Enter Info" icon={<EditOutlined />} /> */}
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
                <Link to="/course/add_two">
                  <b>2</b>
                  Cover
                </Link>
              </li>
              <li>
                <Link to="/course/add_three" className="active">
                  <b>3</b>
                  Class Hours
                </Link>
              </li>
            </ul>
            <div className="content">
              <div className="title">
                <h5>Class Hours</h5>
                {/* <a src="javascript:;" data-toggle="modal" data-target="#lesson"
                                   className="btn btn-outline-info btn-sm pull-right">
                                    <i className="fa fa-plus"></i>
                                    Class
                                </a> */}
                <Button
                  type="primary"
                  data-target="#lesson"
                  // style={{backgroundColor:'#52C41A'}}
                  className=" pull-right"
                  onClick={() => 
                  {
                  setModalVisible(true)
                    this.setState({
                                modalVisible:true
                              })
                  }
                  }
                  data-target="#lesson"
                >
                  + Class
                </Button>
              </div>
              <div className="lessons">
                <ul className="list-unstyled">
                  {courseList.map((item, index) => {
                    return (
                      <li key={index}>
                        <i className="fa fa-video-camera"></i>
                        <span className="order"> {item.title}</span>
                        <span className="name" style={{ color: 'skyblue' }}>
                          {' '}
                          {item.label}{' '}
                        </span>
                        <span className="duration">
                          {' '}
                          Time: {item.Time} mins
                        </span>
                        <div
                          className="action pull-right"
                          style={{ marginTop: '-4px' }}
                        >
                          <Button
                            type="danger"
                            style={{ marginLeft: '6px' }}
                            data-target="#lesson"
                            onClick={this.showDeleteConfirm.bind(this,index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="col-md-2">
                <button
                  onClick={() => this._dealClick1()}
                  className="btn btn-info btn-sm pull-right"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
         okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          destroyOnClose={true}
          title="Vertically centered modal dialog"
          centered
          visible={this.state.modalVisible}
          onOk={() => {
            that.setState({
          modalVisible:false
        })
            // setModalVisible(false)
            // console.log(formList1)
            // const courseList = this.state.courseList
            // const courseList1 = clonedeep(courseList)
            // courseList1.push(formList1.class)
            // this.setState({
            //   courseList: courseList1,
            // })
            // const finalVideos1 = []
            // finalVideos1.push(formList1.videoList)
            // this.setState({
            //   finalVideos: finalVideos1,
            // })
            // this.refs.classForm.resetFields()
          }}
          onCancel={() => {
            that.setState({
              modalVisible:false
        })
            // this.refs.classForm.resetFields()
            // setModalVisible(false)
          }}
        >
          <Form
            //    initialValues={this.state.formInitialValues}
            // setFieldsValue={(this.state.formInitialValues)}
            ref="classForm"
            labelAlign="left"
            {...layout}
            name="nest-messages"
            onValuesChange={this.onValuesChange}
            onFinish={this.onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['class', 'title']}
              label="Course Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
      
              <Input />
 
            </Form.Item>
            <Form.Item
              name="label"
              label="Label"
              hasFeedback
              rules={[{ required: true, message: 'Please select a label!' }]}
            >
              <Select placeholder="Select a label">
                <Option value="Basic">Basic</Option>
                <Option value="Advanced">Advanced</Option>
                <Option value="Hard">Hard</Option>
                <Option value="Expert">Expert</Option>
              </Select>
            </Form.Item>
            
      <Form.Item name="free" label="Free?">
      <Radio.Group value={this.state.value}>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
      </Form.Item>
            <Form.Item label="Dragger">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={this.normFile}
                noStyle
              >
                <Upload.Dragger
                  name="files"
                  action="#"
                  beforeUpload={() => {
                    return false
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <Form.Item name={['class', 'introduction']} label="Introduction"
           rules={[{ required: true, message: 'Please enter this course\'s introduction!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={['class', 'Time']}
              label="Time"
              rules={[{ type: 'number', min: 0, max: 500 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
          </Form>
        </Modal>

      </div>
    )
  }
   _dealClick1(){
     this.setState({
       processFlag:false
     })
    const addCourseData = this.props.addCourseData
      console.log(this.state.courseList);
      const courseList=this.state.courseList
      let formData = new FormData()
      formData.append('course_name', addCourseData.course_name)
      formData.append('course_title', addCourseData.course_title)
      formData.append('course_sub_title', addCourseData.course_sub_title)
      formData.append('course_teacher', addCourseData.course_teacher)
      formData.append(
        'course_serialize_status',
        addCourseData.course_serialize_status
      )
      formData.append('main_category', addCourseData.main_category)
      formData.append('sub_category', addCourseData.sub_category)
      formData.append('course_intro', addCourseData.course_intro)
      formData.append('course_tag', addCourseData.course_tag)
      formData.append('course_page', addCourseData.course_page_url)

      courseList.map((item,index,array)=>{
        formData.append('courseList['+index+'][title]',item.title)
        formData.append('courseList['+index+'][label]',item.label)
        formData.append('courseList['+index+'][free]',item.free)
        formData.append('courseList['+index+'][time]',item.Time)
        if(item["video"].length!==0){
          console.log("进入videos了");
          item["video"].map((item1,index1,array1)=>{
            console.log(item["video"][0]);
            console.log(item1);
            formData.append('courseList['+index+'][video]['+index1+']',item1)
          })
        }
        formData.append('courseList['+index+'][introduction]',item.introduction)
      })
          addSourceData1(formData)
    .then((res) => {
      if (res.status_code === 200) {
          this.props.addCourseData.course_name = ''
          this.props.addCourseData.course_title = ''
          this.props.addCourseData.course_sub_title = ''
          this.props.addCourseData.course_teacher = ''
          this.props.addCourseData.course_serialize_status = ''
          this.props.addCourseData.main_category = ''
          this.props.addCourseData.sub_category = ''
          this.props.addCourseData.course_intro = ''
          this.props.addCourseData.course_tag = ''
          this.props.addCourseData.course_page = ''
          this.props.addCourseData.course_page_url = {}
          message.success('Course Added Successfully', 1)
          this.props.history.push('/course/list')
      }
    })
    .catch((error) => {
      console.log(error)
      message.error('Failed to upload this course');
    })


   }
}

const mapStateToProps = (state) => {
  return {
    addCourseData: state.addCourseData,
  }
}

export default connect(mapStateToProps, null)(CourseThrees)
