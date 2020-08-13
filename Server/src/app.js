import express from 'express';
import config from './config';
import indexRouter from './../routes/index';
import sowingRouter from './../routes/sowing';
import homeRouter from './../routes/home';
import userRouter from './../routes/user';
import studentRouter from './../routes/student';
import categoryRouter from './../routes/category';
import courseRouter from './../routes/course';
import errorLog from './../middle_wares/error_log';
import history from 'connect-history-api-fallback'
import nunjucks from 'nunjucks';
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const compression = require('compression')
//Be sure to use compression before other middleware
app.use(compression());

nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache: true
});

app.use(history({
    // verbose: true,
    index: '/'
  }))

app.get("/", (req,res)=>{
	res.sendFile(path.join(__dirname, '..',"build","index.html"))
})

//Configure static resources
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(config.publicPath));
// app.use('/node_modules', express.static(config.node_modules));
app.use(bodyParser.urlencoded({extended: false}));
// Note: Be sure to walk before all routes
app.use(bodyParser.json());

app.use(indexRouter);
app.use(sowingRouter);
app.use(homeRouter);
app.use(userRouter);
app.use(studentRouter);
app.use(categoryRouter);
app.use(courseRouter);

app.use(errorLog);

app.listen(3001, ()=>{
    console.log('server is running at 3001');
});