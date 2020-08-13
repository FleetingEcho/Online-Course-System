import express from 'express';
import Student from './../models/Student';
const router = express.Router({});

const _getRandomString = (len) =>{
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

const _getRandomAge = (len) =>{
    len = len || 2;
    let $chars = '123';
    let maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

const _getAddress = ()=>{
    let addressArr = ['Ottawa', 'Vancouver', 'Calgary', 'Montreal', 'Toronto', 'CornWall', 'Kingston', 'Quebec'];
    return addressArr[Math.floor(Math.random()* (addressArr.length-1))];
};

const _getRandomPhone = (len) =>{
    len = len || 32;
    let $chars = '123456789';
    let maxPos = $chars.length;
    let str = '873';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

const _getRandomNum = ()=>{
    let $chars = '123456789';
    let maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < 3; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

/**
 *  Administrator only (test)
 */
router.get('/stu/api/add', (req, res, next) => {
    let stuData = [];
    for(let i=0; i<100; i++){
        const userId=`User${i+1}`
        const reg_account = _getRandomString(6) + '@gmail.com';
        const user_name = _getRandomString(8);
        const user_age = _getRandomAge(2);
        const user_sex = Math.floor(Math.random()*10+1) > 5 ? 'Male':'Female';
        const area = _getAddress();
        const phone = _getRandomPhone(8);
        const points = _getRandomNum(3);
        const reg_time = '2020-07-20';
        let student = new Student({
            user_id: userId,
            reg_account : reg_account,
            user_name : user_name,
            user_age : user_age,
            user_sex : user_sex,
            area : area,
            phone : phone,
            points : points,
            reg_time : reg_time
        });
        stuData.push(student);
    }
    Student.insertMany(stuData,(err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            status_code: 200,
            result: 'Added Successfully'
        });
    })
});


router.post('/stu/api/list', (req, res, next) => {
    // console.log(req.body);
    const keyword=req.body.key;
    const page=req.body.page;
    const pageSize=req.body.pageSize;
    Student.find({
        $or: [ 
            {reg_account: {$regex: keyword,$options: '$i'}},
            {user_id: {$regex: keyword,$options: '$i'}},
            {phone: {$regex: keyword, $options: '$i'}}, 
            {user_sex: {$regex: keyword, $options: '$i'}}, 
            {reg_time: {$regex: keyword, $options: '$i'}}, 
            {area: {$regex: keyword, $options: '$i'}}
          ]
    }).skip((page - 1) * pageSize).limit(pageSize).exec((err, courses) => {
        if (err) {
            return next(err);
        }
        const course={}
        const course1=[]
        course1.push(courses)
        
        
        Student.count({
            $or: [ 
                {reg_account: {$regex: keyword,$options: '$i'}},
                {user_id: {$regex: keyword,$options: '$i'}},
                {phone: {$regex: keyword, $options: '$i'}}, //  $options: '$i' ignore the lowercase and uppercase
                {user_sex: {$regex: keyword, $options: '$i'}}, 
                {reg_time: {$regex: keyword, $options: '$i'}}, 
                {area: {$regex: keyword, $options: '$i'}}
              ]
        }, function( err, count){
            // console.log( "Number of users:", count );
            course1.push([count])
            course["students"]=course1
            res.json({
                status_code: 200,
                result: course
            })
        })
    });


});
router.post('/student/api/delete', (req, res, next) => {
          Student.remove({_id: req.body.id}, (err, result) => {
            if (err) {
                return next(err);
            }
            res.json({
                status_code: 200,
                result: 'Delete Successfully'
            });
        });
    
    });


router.get('/stu/api/list', (req, res, next) => {

    const keyword="y7";
    const page=1;
    const pageSize=6;
    Student.find({
        $or: [ 
            {reg_account: {$regex: keyword,$options: '$i'}},
            {phone: {$regex: keyword, $options: '$i'}},
            {user_sex: {$regex: keyword, $options: '$i'}}, 
            {reg_time: {$regex: keyword, $options: '$i'}}, 
            {area: {$regex: keyword, $options: '$i'}}
          ]
    }).skip((page - 1) * pageSize).limit(pageSize).exec((err, courses) => {
        if (err) {
            return next(err);
        }
        const course={}
        const course1=[]
        course1.push(courses)
        
        
        Student.count({
            $or: [ 
                {reg_account: {$regex: keyword,$options: '$i'}},
                {phone: {$regex: keyword, $options: '$i'}}, 
                {user_sex: {$regex: keyword, $options: '$i'}}, 
                {reg_time: {$regex: keyword, $options: '$i'}}, 
                {area: {$regex: keyword, $options: '$i'}}
              ]
        }, function( err, count){
            console.log( "Number of users:", count );
            course1.push([count])
            course["students"]=course1
            res.json({
                status_code: 200,
                result: course
            })
        })
    });
});


router.get('/stu/api/count', (req, res, next) => {
    Student.count((err, count) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: count
        });
    });
});

module.exports = router;