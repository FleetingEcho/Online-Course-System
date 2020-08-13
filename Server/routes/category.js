import express from "express";
import Category from './../models/Category';
import clonedeep from 'clonedeep'
const router = express.Router({});

router.post("/category/api/add", (req, res, next) => {
// console.log(req.body.data);
Category.insertMany(req.body.data,(err,result)=>{
    if(err)  throw err
    res.json({
        status_code: 200,
        result: 'Successfully added'
    })
})
});


router.post("/category/api/fetch", (req, res, next) => {
//  console.log(req.body)
 const id=req.body.categoryId
// const mainTitle='Web Front End'
const subIndex=0
Category.find({_id:id
}).exec((err, categories)=>{
    if(err)  throw err
    res.json({
        status_code: 200,
        result: categories
    })
})
});


router.post("/category/api/change", (req, res, next) => {
 console.log(req.body)
 const id=req.body.categoryId
 const Title=req.body.changeTitle
 const Sort=req.body.changeSort
 const toShow=req.body.changeToShow
    Category.updateOne({_id: id
    },{ $set: { main_title: Title, main_is_show:toShow,main_sort:Sort} }).exec((err, categories)=>{
        if(err)  throw err
        // console.log(categories);    
        res.json({
            status_code: 200,
            result: 'Successfully Changed'
        })
    })

// })
});
router.post("/category/api/changesub", (req, res, next) => {
 console.log(req.body)
 const id=req.body.categoryId
 const sub_index=req.body.sub_course_index
 const subTitle=req.body.changeSubTitle
 const Count=req.body.changeCount
 const toShow=req.body.changeToShow
//  const exact_Sub=`sub_course.${sub_index}.sub_title`
let exact_subTitle
 Category.find({_id:id
 }).exec((err, categories)=>{
     if(err)  throw err
        const exact_SubList=categories[0].sub_course
        exact_SubList.some((item,index)=>{
            if(index===sub_index){
                exact_subTitle=item.sub_title
                console.log(exact_subTitle);
            }
        })

        Category.updateOne({_id:id, 'sub_course.sub_title':exact_subTitle
        },{ $set: {
            'sub_course.$.sub_title':subTitle,
            sub_total_count:Count,
            sub_is_show:toShow
        } }).exec((err, categories)=>{
            if(err)  throw err
            console.log(categories);    
            res.json({
                status_code: 200,
                result: 'Successfully Changed'
            })
        })
 })

 
});






router.post("/category/api/del", (req, res, next) => {

    // delete child categories
if(req.body.subIndex!== -100){
    const exact_subTitle=req.body.subTitle
    const sub_index=req.body.subIndex
console.log(req.body);
 Category.find({_id: req.body.id}, (err, result) => {
    if (err) {
        return next(err);
    }
    const newCategory=clonedeep(result)
    console.log(newCategory);
     Category.remove({_id: req.body.id}, (err, result) => {
    if (err) {
        return next(err);
    }
    let arr5=[]
    const arr1=newCategory[0]["sub_course"]
     arr1.map((item,index,self)=>{
          if(index!==sub_index){
            arr5.push(item)
          }
      });
      newCategory[0]["sub_course"]=arr5
    Category.insertMany(newCategory, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: 'Successfully Deleted'
        })
        
    });
    
});
    
});
}else{
 Category.remove({_id: req.body.id}, (err, result) => {
    if (err) {
        return next(err);
    }
    res.json({
        status_code: 200,
        result: 'Successfully Deleted'
    })
    
});

}

});

router.get('/category/api/courses', (req, res, next) => {
    Category.find().sort({"_id":-1}).select('main_title main_total_count').exec((err, category) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: category
        })
    });
});

router.get('/category/api/courses1', (req, res, next) => {
    Category.find().sort({"_id":-1}).select('main_title main_total_count').exec((err, category) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: category
        })
    });
});




router.post("/category/api/list", (req, res, next)=>{

        // console.log(req.body);
        const keyword=req.body.key;
            const page=req.body.currentPage;
            const pageSize=req.body.pageSize;
        
            Category.find({
                $or: [ 
                    {main_title: {$regex: keyword,$options: '$i'}},
                    {"sub_course.sub_title": {$regex: keyword, $options: '$i'}}, 
                  ]
            }).skip((page - 1) * pageSize).limit(pageSize).sort({main_total_count:-1}).exec((err, courses) => {
                if (err) {
                    return next(err);
                }
                // console.log(courses);
                const course={}
                const course1=[]
                course1.push(courses)
                Category.count({
                    $or: [ 
                        {main_title: {$regex: keyword,$options: '$i'}},
                        {"sub_course.sub_title": {$regex: keyword, $options: '$i'}}, 
                      ]

                }, function( err, count){
                    console.log( "Number of categories:", count );
                    course1.push([count])
                    course["categories"]=course1
                    res.json({
                        status_code: 200,
                        result: course
                    })
                })
            });
});

module.exports = router;