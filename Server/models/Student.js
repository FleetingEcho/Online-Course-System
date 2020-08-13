import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/jake',{useNewUrlParser: true });

const studentSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    reg_account: {type: String, required: true},
    user_name: {type: String, required: true},
    user_age: {type: String, required: true},
    user_sex: {type: String, required: true},
    area: {type: String, required: true},
    phone: {type: String, required: true},
    points: {type: String, required: true},
    reg_time: {type: String, required: true},
    last_login_time: {type: Date, default: Date.now},
    c_time: {type: Date, default: Date.now},
    l_time: {type: Date, default: Date.now},
});

const Student = mongoose.model('Student', studentSchema,'students');
export default  Student;