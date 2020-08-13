import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/jake',{useNewUrlParser: true });

const courseSchema = mongoose.Schema({
    course_name: {type: String, },
    course_title: {type: String, },
    course_sub_title: {type: String, },
    course_teacher: {type: String, },
    course_serialize_status: {type: String, },
    main_category: {type: String, },
    sub_category: {type: String, },
    course_intro: {type: String, },
    course_tag: {type: String, },
    course_page: {type: String, },
    course_class:{type: Object}
    /*course_manager: [
        {
            c_title: {type: String, required: true},
            c_video: {type: String, required: true},
            c_intro: {type: String, required: true},
            c_time: {type: String, required: true}
        }
    ]*/
});

const Course = mongoose.model('Course', courseSchema,'courses');
export default  Course;