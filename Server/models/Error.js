import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/jake',{useNewUrlParser: true });

const errorSchema = mongoose.Schema({
    error_name: {type: String, required: true},
    error_message: {type: String, required: true},
    error_stack: {type: String, required: true},
    e_time: {type: Date, default: Date.now},
});

const Error_log = mongoose.model('Error', errorSchema);
export default  Error_log;