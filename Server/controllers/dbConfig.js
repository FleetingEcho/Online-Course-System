import mongoose from 'mongoose';
mongoose.connect('mongodb://jake:123456@/localhost/jake',{useNewUrlParser: true });
export default mongooseConfig;
