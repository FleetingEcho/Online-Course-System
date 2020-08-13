import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/jake',{useNewUrlParser: true });
const commentsSchema = mongoose.Schema({
    course_id: {type: String, required: true},
    comments: [
        {
            content: {type: String, required: true},
            upload_time: {type: String, required: true},
        }
    ]
});

const Comments = mongoose.model('comments', commentsSchema,'comments');
export default  Comments;