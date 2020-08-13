import express from 'express';
import Home from './../models/Home';
import formidable from 'formidable';
import config from './../src/config';
const router = express.Router({});

router.post('/home/api/add', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }

        const home = new Home({
            login_user: fields.login_user,
            new_register: fields.new_register,
            new_stu_course: fields.new_stu_course,
            new_stu_classes: fields.new_stu_classes,
            new_member: fields.new_member,
            not_reply: fields.not_reply,
            order_counter: {
                "web": fields.web,
                "java": fields.java,
                "python": fields.python,
                "bigdata": fields.bigdata,
                "ui": fields.ui
            },
        });
        home.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                status_code: 200,
                result: 'Data added Successfully'
            });
        })
    });
});

router.get('/home/api/list', (req, res, next) => {
    Home.find().exec((err, home) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: home
        })
    });
});

module.exports = router;