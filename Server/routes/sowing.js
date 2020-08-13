import express from 'express';
import Sowing from './../models/Sowing';
import formidable from 'formidable';
import config from './../src/config';
import {basename} from 'path';
const fs = require('fs');
const router = express.Router({});
const path = require('path')

router.post('/sowing/api/add', (req, res, next) => {
    // console.log(req.body);
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        const body = fields;
        body.image_url = basename(files.image_url.path);
        body.image_small_url = basename(files.image_small_url.path);

        const sowing = new Sowing({
            image_title: body.image_title,
            image_url: body.image_url,
            image_small_url: body.image_small_url,
            image_link: body.image_link,
            s_time: body.s_time,
            e_time: body.e_time,
        });
        sowing.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                status_code: 200,
                result: 'Added Successfully'
            });
        })
    });
});
router.get('/sowing/api/carousels',(req,res)=>{
    Sowing.find().sort({"_id":-1}).select('image_url s_time e_time').exec((err, carousels) => {
        if (err) {
            return next(err);
        }
            res.json({
                status_code: 200,
                result: carousels
    });
})})


router.post('/sowing/api/list', (req, res, next) => {
    // console.log(req.body);
    const keyword=req.body.key;
    const page=req.body.currentPage;
    const pageSize=req.body.pageSize;
    Sowing.find({
        $or: [ 
            {image_title: {$regex: keyword,$options: '$i'}},
            {image_link: {$regex: keyword, $options: '$i'}}, 
          ]
    }).skip((page - 1) * pageSize).limit(pageSize).sort({"main_sort":-1}).exec((err, courses) => {
        if (err) {
            return next(err);
        }
        // console.log(courses);
        const course={}
        const course1=[]
        course1.push(courses)
        Sowing.count({
            $or: [ 
                {image_title: {$regex: keyword,$options: '$i'}},
                {image_link: {$regex: keyword, $options: '$i'}}, 
              ]

        }, function( err, count){
            // console.log( "Number of categories:", count );
            course1.push([count])
            course["carousels"]=course1
            res.json({
                status_code: 200,
                result: course
            })
        })
    });

});

router.get('/sowing/api/single/:sowingId', (req, res, next) => {
    Sowing.findById(req.params.sowingId, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: docs
        })
    })
});
/**
 * 根据id修改一条数据
 */
router.post('/sowing/api/edit', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        const body = fields;
        Sowing.findById(body.id, (err, sowing) => {
            if (err) {
                return next(err);
            }

            // Parse the uploaded file name and save it to the database
            sowing.image_title = body.image_title;
            sowing.image_url = body.image_url || basename(files.image_url.path);
            sowing.image_small_url = body.image_small_url || basename(files.image_small_url.path);
            sowing.image_link = body.image_link;
            sowing.s_time = body.s_time;
            sowing.e_time = body.e_time;
            sowing.c_time = Date.now();
            sowing.l_time = Date.now();

            sowing.save((err, result) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    status_code: 200,
                    result: 'Updated Successfully'
                })
            });
        });
    });


});
router.post('/sowing/api/remove', (req, res, next) => {
Sowing.find({_id: req.body.id}).exec((err, sowings) => {
    if (err) {
        return next(err);
    }
    const image1=sowings[0].image_url
    const image2=sowings[0].image_small_url
    const realPath = path.resolve(__dirname, '../public/uploads')
    const path1 = `${realPath}\\${image1}`;
    const path2 = `${realPath}\\${image2}`;
    // console.log(path1,path2);
    fs.unlink(path1, (err) => {
      if (err) {
        console.log(err);
        return
      };
    //   console.log('The image1 is already delete');
    })
    fs.unlink(path2, (err) => {
        if (err) {
          console.log(err);
          return
        };
        // console.log('The image2 is already delete');
      })
      Sowing.remove({_id: req.body.id}, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: 'Deleted Successfully'
        });
    });
});

});
router.get('/sowing/api/count', (req, res, next) => {
    Sowing.count((err, count) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: count
        });
    });
});
router.get('/sowing_list', (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10) || 1;
    const pageSize = 3;
    Sowing.find().skip((page - 1) * pageSize).limit(pageSize).exec((err, swoings) => {
        if (err) {
            return next(err);
        }
        Sowing.count((err, count) => {
            if (err) {
                return next(err);
            }
            const totalPage = Math.ceil(count / pageSize);
            res.render('sowing_list.html', {swoings, totalPage, page});
        });
    });
});
router.get('/sowing_add', (req, res, next) => {
    res.render('sowing_add.html');
});

module.exports = router;