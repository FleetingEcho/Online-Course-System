import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/jake',{useNewUrlParser: true });
const categorySchema = mongoose.Schema({
    main_title: {type: String, },
    main_total_count: {type: Number, },
    main_is_show: {type: String, },
    main_sort: {type: String, },
    sub_course: [
        {
            sub_title: {type: String, },
            sub_total_count: {type: Number, },
            sub_is_show: {type: Number, },
            sub_sort: {type: String, }
        }
    ]
});

const Category = mongoose.model('Category', categorySchema,'category');
export default  Category;