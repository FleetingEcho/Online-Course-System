import React, {Component} from 'react';
import { Collapse } from 'antd';
import {fetchCourseInfo,getCourseComments,addCourseComments,delCourseComments,getUserImg} from '../../Api/index.js'
import {Modal,Comment, Tooltip,Form, List, Input } from 'antd';
import {Link} from "react-router-dom";
import moment from 'moment';
import { PlayCircleTwoTone,PlayCircleOutlined } from '@ant-design/icons';
import { Button, Avatar, Card,message} from 'antd';
import { SearchOutlined,ExclamationCircleOutlined ,CheckOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { TextArea } = Input;
const { Panel } = Collapse;
let shouldClear1, shouldClear
function callback(key) {
    // console.log(key);
  }
  const IMG_PRE = '../uploads/';

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );


class CourseTopic extends Component {
    constructor(props){
        super(props);
        this.state = {
            courseId:'',
            courseInfo:[],
            course_class:[],
            visible: false,
            exactClassInfo:[],
            exactVideoList:[],
            comments: [],
            submitting: false,
            value: '',
            tempTitle:'',
            userAvatar:''
        }
    }
    
  handleSubmit = () => {
      const that=this
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });
    const commentsData={
        id:this.state.courseId,
        value:this.state.value,
        upload_time:moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    addCourseComments(commentsData).then((res)=>{
        this.setState({
            submitting: false,
            value:''
        })
        // console.log(res)              
          if(res.status_code === 200){
         shouldClear=  setTimeout(()=>{
                that.componentWillMount()
            },600)
            message.success('Added Successfully', 1)
                }
    }).catch(err=>console.log(err))
}
handleChange = e => {
    this.setState({
      value: e.target.value,
    });
    // console.log('评论是' +e.target.value);
  };



    handleOk = e => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      };

      showModal = (index) => {
        this.setState({
          visible: true,
        });
        const course_class= this.state.course_class

        course_class.some((item1,index1)=>{
            if(index1===index){
            if(item1.video!==undefined){
                const processedVideos=Object.values(item1.video) 
                this.setState({
                    exactClassInfo: [item1.class],
                    exactVideoList: processedVideos,
                    tempTitle:[item1.class][0]["title"]
                })
            }else{
                this.setState({
                    exactClassInfo: [item1.class],
                    exactVideoList: [],
                    tempTitle:[item1.class][0]["title"]
                })
            }
            }
        })
      };


    render() {
        const { comments, submitting, value } = this.state;
        // console.log(comments);
        // console.log();
        // console.log();
        const ExampleComment = ({ children }) => (
            <Comment
              actions={[<span key="comment-nested-reply-to">Reply to</span>]}
              author={<a>Robert Downey Jr.</a>}
              avatar={
                <Avatar
                  src="http://ww1.sinaimg.cn/large/007hXJtKgy1ghei11ea23j31991iztkr.jpg"
                  alt="Robert Downey Jr."
                />
              }
              content={
                <p>
                  Learn Once, Write Anywhere.
                  We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.
                  React can also render on the server using Node and power mobile apps using React Native.
                </p>
              }
            >
              {children}
            </Comment>
          )
        const videoList=this.state.exactVideoList
        const classInfo= this.state.courseInfo
        const course_class= this.state.course_class
        // console.log(course_class);
        return (
                        <div className="body">
                            <ol className="breadcrumb">
                    <li><Link to="/course/list">Courses / </Link></li>
                        <li className="active">Add</li>
                    </ol>
            {
                classInfo.map((item, index)=>{
                    return(
                        <div key={index}>
                            <div style={{ color:'#fff',marginBottom:'30px',height:'50px',width:'100%', borderRadius:'20px',backgroundColor:'rgb(35, 35, 37)'}}>
                            {/* <span>Title : </span> */}
                            <div
                            style={{height:'50px', width:'100%',lineHeight:'50px',textAlign:'center',fontSize:'30px'}}
                            >
                            {/* <img style={{ display:'inline-block',height:'50px',width:'50px'}}
                             src={IMG_PRE +'titleImg3.jpg'} alt=""/> */}
                            {item.course_name}</div>
                            </div>
                            <div style={{marginLeft:'0px',height:'400px',width:'100%'}}>
                            <img style={{maxHeight:'360px', float:'left',maxWidth:'60%',marginLeft:'1%',marginBottom:'20px'}}
                             src={IMG_PRE +item.course_page} alt=""/>
                           
                            <Card title={item.course_sub_title} bordered={false} 
                            style={{  height:'350px',marginLeft:'20px', overflow:'hidden',width: '36%',float:'left' }}
                            >
                            <h6>Teacher:{item.course_teacher}</h6>
                            <p>Status: {item.course_serialize_status}</p>
                            <h6>Introduction:</h6>
                            <div
                            style={{width: '100%',wordWrap:'break-word'}}>
                            {item.course_intro}
                            </div>
                            </Card>
                             </div>
                            {
                                course_class.map((item1,index1)=>{
                                    return(
                                        <div key={index1}>
                                        <Collapse defaultActiveKey={['1']} onChange={callback}>
                                <Panel header={item1.class.title} key="1">
                                {/* <i className="fa fa-video-camera"></i> */}
                               <h3><PlayCircleTwoTone  /></h3>
                                <div style={{height:'30px'}}>
                               <div style={{height:'24px'}}> 
                                <span ><strong>Class Title: </strong> {item1.class.title}</span>
                                <strong style={{float:'right', paddingLeft:'30px'}}>{item1.class.time} mins</strong>
                                <Button onClick={this.showModal.bind(this,index1)} style={{float:'right'}} type="primary" icon={<PlayCircleOutlined />}>
                                    Play
                                </Button>
                                </div>
                                <Modal
                                    key={index1}
                                    // title={tempTitle1}
                                    title={this.state.tempTitle}
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    destroyOnClose={true}
                                    centered
                                            >
                                           {
                                            videoList.length===0
                                            ?
                                            <div>No video uploaded for this course</div>
                                           :
                                           videoList.map((item2,index2)=>{
                                            if(item2.indexOf('mp4')!== -1){
                                            {/* if(item2.indexOf('mp4'||'wmv' || 'm4a' || 'mkv' || 'avi')!== -1){ */}
                                                return (
                                                    <div key={index2}>
                                                    <video 
                                                    style={{width:'470px'}}
                                                    src={IMG_PRE +item2} controls>
                                                    {/* <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls> */}
                                                        <p> not support </p>
                                                    </video>
                                                    </div>
                                                )
                                            }else{
                                                return (
                                                    <div key={index2}> <img src={IMG_PRE +item2}  alt=""/></div>
                                                )
                                            }
                                            })
                                           }
                                </Modal>

                                 
                                </div>
                                <h6 style={{color:'#64d432'}} >Course Introduction:</h6>
                                <div>{item1.class.introduction}</div>
                                {/* <p>{item11.class.introduction}</p> */}
                                </Panel>
                              </Collapse>
                                        </div>
                                    )
                                })
                            }
                            <h5 style={{marginTop:'30px'}}>Course Replies: </h5>
                            <ExampleComment>
                                <ExampleComment>
                                </ExampleComment>
                            </ExampleComment>
                           
                            {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
        
          avatar={
            <Avatar
                  src={this.state.userAvatar}
                  // src="http://ww1.sinaimg.cn/large/007hXJtKgy1ghei11ea23j31991iztkr.jpg"
                  alt="Robert Downey Jr."
                />
          }
          content={
            <Editor
              onChange={this.handleChange.bind(this)}
              onSubmit={this.handleSubmit.bind(this)}
              submitting={submitting}
              value={value}
            />
          }
        />
                           
                            </div>

          
                    )
                })
            }
                        </div>
        );
    }
    delComments(commentsId,courseId,index){

      const that=this
      confirm({
        title: 'Delete Confirm?',
        icon: <ExclamationCircleOutlined  />,
        content: 'Are you sure to delete this comment?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          const params={
            commentId:commentsId,
            courseId:courseId,
            index:index
        }
        delCourseComments(params).then((res)=>{
          const that1=that
          if(res.status_code === 200){
            message.success('Deleted Successfully', 1)
              shouldClear1=  setTimeout(()=>{
                      that1.componentWillMount()
                  },800)
            }
            // console.log(res);
        }).catch(err=>console.log(err))

        },
        onCancel() {
          // console.log('Cancel');
        },
      });
  
    }
    componentWillMount() {
        const courseId = this.props.location.state.id
        getUserImg().then((res)=>{
          // console.log(res);
          this.setState({
            userAvatar:IMG_PRE+res.result
          })
        }).catch(err=>console.log(err))
        this.setState({courseId:courseId})
        const params={
            id:courseId,
        }
        getCourseComments(params).then((res)=>{
            console.log(res)
            let comments1=[]
            if(res.result.length!==0){
                res.result.map((item,index,self)=>{
                    const fetchedComments= {
                            actions:[<span key={index} onClick={this.delComments.bind(this,item._id,this.state.courseId,index)}>delete</span>],
                            author: "Robert Downey Jr.",
                            // avatar: "http://ww1.sinaimg.cn/large/007hXJtKgy1ghei11ea23j31991iztkr.jpg",
                            avatar: this.state.userAvatar,
                            content: <p>{this.state.value}</p>,
                            datetime: moment().format('MMMM Do YYYY, h:mm:ss a'),
                          }
                          fetchedComments["content"]=<p>{item.content}</p>
                          fetchedComments["datetime"]=<p>{item.upload_time}</p>
                          comments1.push(fetchedComments)
                        })
                              this.setState({
                               comments:  comments1 
                              })

            }
        }).catch(err=>{console.log(err)})
       
        fetchCourseInfo(courseId).then((res)=>{
            if(res.status_code === 200){
                // console.log(res.result[0]);
                const resInfo=res.result[0]
                // console.log()
                const course_class=resInfo.course_class;
                // console.log( );
                const processedCourse=Object.values(course_class) 
                this.setState({
                    courseInfo:[resInfo],
                    course_class:processedCourse
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
        }
        componentWillUnmount() {
            clearTimeout(shouldClear)
            clearTimeout(shouldClear1)
           }


}

export default CourseTopic;