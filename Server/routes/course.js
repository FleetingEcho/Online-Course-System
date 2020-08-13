import express from 'express';
import Course from './../models/Course';
import Comments from './../models/Comments'
import formidable from 'formidable';
import config from './../src/config';
import {basename} from 'path';
import clonedeep from 'clonedeep'
const fs = require('fs');
const path = require('path')
const router = express.Router({});

router.post('/course/api/add1', (req, res, next) => {
    // console.log(req.body);
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        const body = fields;
        // console.log(body["courseList[0][title]"]);
        // console.log(files);
        if(files.course_page !==undefined){
            body.course_page = basename(files.course_page.path);
        }else{
            body.course_page=''
        }
        let flag=0
        let flag2=0
        const classArray=[]
        const videoArray=[]
        Object.keys(body).forEach((index)=>{
            // console.log(index);
            if(index.indexOf('courseList')!== -1 ){
                const id=index.substr(11,1)
                // console.log(id);
                if(Number(id)===flag){
                    // let name=`courseList${id}`
                    const temp={
                        'title':body[`courseList[${id}][title]`],
                        'label':body[`courseList[${id}][label]`],
                        'free':body[`courseList[${id}][free]`],
                        'introduction':body[`courseList[${id}][introduction]`],
                        'time':body[`courseList[${id}][time]`],
                    }
                    flag+=1
                    // console.log(temp);
                    classArray.push(temp)
                }
            }
        })
        Object.keys(files).forEach((index)=>{
            // console.log(index);
            const temp1={}
            if(index.indexOf('courseList')!== -1 ){
                const videoId=index.substr(11,1)
                const childId=index.substr(21,1)
                // console.log(childId);
                    temp1['videoIndex']=`Video-${videoId}--${childId}`
                    temp1['Path']=basename(files[`courseList[${videoId}][video][${childId}]`]["path"])
                    videoArray.push(temp1)
                    // console.log(temp1);
                // flag2+=1
            }
        })
        // console.log(classArray);
        // console.log(videoArray);
        const class1={}
        const class2={}
        const class3={}
        const class4={}
        const class5={}
        const class6={}
        const class7={}
        const class8={}
        const class9={}
        const class10={}

        const finalVideos1={}
        const finalVideos2={}
        const finalVideos3={}
        const finalVideos4={}
        const finalVideos5={}
        const finalVideos6={}
        const finalVideos7={}
        const finalVideos8={}
        const finalVideos9={}
        const finalVideos10={}
        videoArray.map((item,index,self)=>{
           if( item["videoIndex"].indexOf(`Video-0`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            // console.log(videoArray_id);
            finalVideos1[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-1`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos2[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-2`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos3[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-3`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos4[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-4`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos5[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-5`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos6[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-6`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos7[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-7`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos8[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-8`)!==-1){
            let videoArray_id=item["videoIndex"].slice(9)
            finalVideos9[`path${videoArray_id}`]=item["Path"]
           }
           if( item["videoIndex"].indexOf(`Video-9`)!==-1){
            let videoArray_id=item["videoIndex"].slice(10)
            finalVideos10[`path${videoArray_id}`]=item["Path"]
           }
        })
        const infoLength=classArray.length
        if(1<=infoLength){
            class1["class"]=classArray[0]
            class1["video"]=finalVideos1
        }
        if(2<=infoLength){
            class2["class"]=classArray[1]
            class2["video"]=finalVideos2
        }
        if(3<=infoLength){
            class3["class"]=classArray[2]
            class3["video"]=finalVideos3
        }
        if(4<=infoLength){
            class4["class"]=classArray[3]
            class4["video"]=finalVideos4
        }   
        if(5<=infoLength){
            class5["class"]=classArray[4]
            class5["video"]=finalVideos5
        }
        if(6<=infoLength){
            class6["class"]=classArray[5]
            class6["video"]=finalVideos6
        }
        if(7<=infoLength){
            class7["class"]=classArray[6]
            class7["video"]=finalVideos7
        }
        if(8<=infoLength){
            class8["class"]=classArray[7]
            class8["video"]=finalVideos8
        }
        if(9<=infoLength){
            class9["class"]=classArray[8]
            class9["video"]=finalVideos9
        }
        if(10<=infoLength){
            class10["class"]=classArray[9]
            class10["video"]=finalVideos10
        }
        // console.log(class1)
        const classTotal={
            class_1:class1,
            class_2:class2,
            class_3:class3,
            class_4:class4,
            class_5:class5,
            class_6:class6,
            class_7:class7,
            class_8:class8,
            class_9:class9,
            class_10:class10,
        }


        // 2. 操作数据库
        const course = new Course({
            course_name: body.course_name,
            course_title: body.course_title,
            course_sub_title: body.course_sub_title,
            course_teacher: body.course_teacher,
            course_serialize_status: body.course_serialize_status,
            main_category: body.main_category,
            sub_category: body.sub_category,
            course_intro: body.course_intro,
            course_tag: body.course_tag,
            course_page: body.course_page,
            course_class:classTotal
        });
        course.save((err, result) => {
            if (err) {
                return next(err)
            }
            console.log(result);
            res.json({
                status_code: 200,
                result: 'Course added Successfully'
            });
        })

    });
});


router.post('/course/api/list', (req, res, next) => {
    const keyword=req.body.search;
// console.log(req.body);
    const page=Number(req.body.page);
    const pageSize=Number(req.body.pageSize);
    Course.find({course_name: {$regex: keyword, $options: '$i'}}).skip((page - 1) * pageSize).limit(pageSize).sort({'_id':-1}).exec((err, courses) => {
        if (err) {
            return next(err);
        }
        const course={}
        const course1=[]
        course1.push(courses)
        
        
        Course.count({course_name: {$regex: keyword}}, function( err, count){
            // console.log( "Number of users:", count );
            course1.push([count])
            course["course"]=course1
            res.json({
                status_code: 200,
                result: course
            })
        })
    });
});

router.post('/course/api/courseinfo', (req, res, next) => {
    // console.log(req.body);
    const key=req.body.id
    // const key='5f2775efcb90003bb06c0ed7'
    Course.find({_id: key}).exec((err, courses) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: courses
        })

    });
    });

router.post('/course/api/comments',(req,res,next)=>{
    console.log(req.body);
    const {id}=req.body
    Comments.find({course_id:id}).exec((err, comments) => {
        console.log(comments);
      if(comments.length===0){
        res.json({
            status_code: 200,
            result: [],
        });
      }else{
        res.json({
            status_code: 200,
            result: comments[0].comments,
        });
      }
    })
    // res.json({
    //     status_code: 200,
    //     result: '123',
    // });
})
router.post('/course/api/addcomments',(req,res,next)=>{
    console.log(req.body);
    const {id,value,upload_time}=req.body
    Comments.find({course_id:id}).exec((err, result) => {
       if(result.length===0){
           const temp={
               content:value,
               upload_time:upload_time
           }
           const data={
               course_id:id,
               comments:temp
           }
           Comments.insertMany(data,(err,comments)=>{
               if(err) throw err
            //    console.log(result);
            res.json({
                status_code: 200,
                result: 'Added Successfully'
            });
           })
       }else{
        const comments1=clonedeep(result[0])
        const temp1={
            content:value,
            upload_time:upload_time
        }
        comments1["comments"].unshift(temp1)
        Comments.updateOne({course_id:id},{ $set:comments1 }).exec((err, comments)=>{
            if(err)  throw err
            res.json({
                status_code: 200,
                result: 'Added Successfully'
            });
        })
       }

    })
})
router.post('/course/api/delcomments',(req,res,next)=>{
    console.log(req.body);
    const {courseId,commentId,index}=req.body
    Comments.find({course_id:courseId}).exec((err, comments) => {
        // console.log(comments);
        const comments1=clonedeep(comments[0])
        let newComments=[]
        comments1.comments.map((item,index1,self)=>{
            if(index!==index1){
                newComments.push(item)
            }
        })
        if(newComments!==undefined){
            comments1["comments"]=newComments
            Comments.updateOne({course_id:courseId},{ $set:comments1 }).exec((err, comments)=>{
                if(err)  throw err
                res.json({
                    status_code: 200,
                    result: 'Deleted Successfully'
                });
            })
        }else{
            comments1["comments"]=[]
            Comments.updateOne({course_id:courseId},{ $set:comments1 }).exec((err, comments)=>{
                if(err)  throw err
                res.json({
                    status_code: 200,
                    result: 'Deleted Successfully'
                });
            })
        }

    })
})

router.post('/course/api/remove', (req, res, next) => {
    // console.log(req.body);
    const key=req.body.deleteKey
    console.log(key);
    Course.find({_id: key}).exec((err, courses) => {
        if (err) {
            return next(err);
        }
        const resInfo=courses[0]
        const course_class=resInfo.course_class;
        const processedCourse=Object.values(course_class) 
        let tempVideoList=[]
        processedCourse.map((item1,index1)=>{
          if(item1.video!==undefined){
            tempVideoList.push(String(Object.values(item1.video)))
            }
          })
        tempVideoList.map((item,index,self)=>{
            const realPath1 = path.resolve(__dirname, '../public/uploads')
            const videos = `${realPath1}\\${item}`;
            fs.unlink(videos, (err) => {
              if (err) {
                console.log(err);
                return
              };
            }) 
          })
        //   console.log(tempVideoList);
        const image1=courses[0].course_page
        const realPath = path.resolve(__dirname, '../public/uploads')
        const coursePage = `${realPath}\\${image1}`;
        fs.unlink(coursePage, (err) => {
          if (err) {
            console.log(err);
            return
          };
        }) 
        Comments.remove({course_id:key},(err,res)=>{
                if(err){ console.log(err)}
            })
        Course.remove({_id: key}, (err, result) => {
            if (err) {
                return next(err);
            }
            res.json({
                status_code: 200,
                result: 'Deleted Successfully'
            });
        // });
    });
    
    });
})


module.exports = router;