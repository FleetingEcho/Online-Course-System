import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/jake',{useNewUrlParser: true });
const sowingSchema = mongoose.Schema({
    image_title: {type: String, required: true},
    image_url: {type: String, required: true},
    image_small_url: {type: String, required: true},
    image_link: {type: String, required: true},
    s_time: {type: Date, required: true},
    e_time: {type: Date, required: true},
    c_time: {type: Date, default: Date.now},
    l_time: {type: Date, default: Date.now},
});

const Sowing = mongoose.model('Sowing', sowingSchema,'sowings');
export default  Sowing;