import Error_log from './../models/Error'

export default (errLog, req, res, next)=>{
    const error_log = new Error_log({
        error_name:  errLog.name,
        error_message: errLog.message,
        error_stack: errLog.stack,
    });

    error_log.save((err, result)=>{
        res.json({
            err_code: 500,
            result: 'Server internal error',
            message: errLog.message
        });
    });
}