import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/jake',{useNewUrlParser: true });

const homeSchema = mongoose.Schema({
    login_user: {type: String, required: true},
    new_register: {type: String, required: true},
    new_stu_course: {type: String, required: true},
    new_stu_classes: {type: String, required: true},
    new_member: {type: String, required: true},
    not_reply: {type: String, required: true},
    order_counter: {type: Object, require: true},
    c_time: {type: Date, default: Date.now},
    l_time: {type: Date, default: Date.now},
});

const Home = mongoose.model('Home', homeSchema,'homes');
export default  Home;