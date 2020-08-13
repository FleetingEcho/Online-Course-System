import express from 'express';
import User from './../models/User';
import md5 from 'blueimp-md5';
import formidable from 'formidable';
import config from './../src/config';
import {basename} from 'path';
const router = express.Router({});

const S_KEY = 'Jake!';

router.post('/user/api/add', (req, res, next) => {
    const user_name = req.body.user_name || '';
    const user_pwd = md5(req.body.user_pwd + S_KEY) || '';
    const user = new User({
        user_name: user_name,
        user_pwd: user_pwd
    });

    user.save((err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            status_code: 200,
            result: 'Added Successfully'
        });
    })
});


router.post('/user/api/getUerImg' ,(req,res)=>{
    // console.log();
    const id='5c90b8649ccbfe20f813e0b0'
    User.findOne({_id:id}).select('icon_url').exec((err,img)=>{
        if(err) throw err
        res.json({
            error_code: 200,
            result: img.icon_url
        });
    })
})
router.post('/user/api/login', (req, res) => {
    const user_name = req.body.user_name;
    const user_pwd = req.body.user_pwd;

    User.findOne({user_name: user_name}, (err, user) => {
        if (err) {
            return next(err);
        }

        if(user !== null){
            if(user.user_pwd === user_pwd){
                res.json({
                    status_code: 200,
                    result: {
                        token: user._id,
                        user_name: user.user_name,
                        real_name: user.real_name,
                        icon_url: user.icon_url,
                        sex: user.sex,
                        phone: user.phone,
                        e_mail: user.e_mail,
                        join_time: user.join_time,
                        intro_self: user.intro_self,
                    }
                });
            }else {
                res.json({
                    error_code: 1,
                    result: 'password error'
                });
            }
        }else {
            res.json({
                error_code: 1,
                result: 'user doesn\'t exist'

            });
        }
    });
});


router.post('/user/api/edit', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
  
        const body = fields;
     
        User.findById(body.token, (err, user) => {
            if (err) {
                return next(err);
            }
      
            user.real_name = body.real_name;
            user.user_name = body.user_name;
            user.icon_url = body.icon_url || basename(files.icon_url.path);
            user.sex = body.sex;
            user.phone = body.phone;
            user.e_mail = body.e_mail;
            user.join_time = body.join_time;
            user.intro_self = body.intro_self;

            user.save((err, result) => {
                if (err) {
                    return next(err);
                }
                console.log(result);
                res.json({
                    status_code: 200,
                    result: {
                        token: result._id,
                        real_name: result.real_name,
                        user_name: result.user_name,
                        icon_url: result.icon_url,
                        phone: result.phone,
                        sex: result.sex,
                        e_mail: result.e_mail,
                        join_time: result.join_time,
                        intro_self: result.intro_self,
                    }
                })
            });
        });
    });


});


router.post('/user/api/reset', (req, res, next) => {

    const token = req.body.token;
    const old_pwd = req.body.old_pwd;
    const new_pwd = req.body.new_pwd;

    User.findById(token, (err, user) => {
        if (err) {
            return next(err);
        }
        if(user === null){
            res.json({
                error_code: 1,
                result: "this user doesn\'t exist"
            })
        }

        console.log(user.user_pwd, old_pwd);
        if(user.user_pwd !== old_pwd){
            res.json({
                error_code: 1,
                result: "password didn\'t match"
            })
        }
        user.user_pwd = new_pwd;
        // 1.3 保存
        user.save((err, result) => {
            if (err) {
                return next(err);
            }
            res.json({
                status_code: 200,
                result: "password changed successfully"
            })
        });
    });
});

module.exports = router;