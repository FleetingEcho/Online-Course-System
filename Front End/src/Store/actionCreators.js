import * as constants from './actionTypes'
import { message } from 'antd';
import {
    getHomeData,
    getSowingData,
    getUserData,
    getStudentData,
    getCategoryData,
    getSourceData
} from './../Api/index'

export const getHomeDataAction = () => {
    return (dispatch)=>{
        getHomeData().then((res)=>{
            console.log(res);
            if(res.status_code === 200){
                const homeData = res.result[0];
                dispatch({
                    type: constants.INIT_HOME_DATA,
                    homeData
                })
            }
        }).catch((err)=>{
            console.log(err);
            message.error('Failed to fetch homepage data')
        })
    }
};

export const getSowingDataAction = (params) => {
    return (dispatch)=>{
        getSowingData(params).then((res)=>{
            if(res.status_code === 200){
                const sowingData = res.result.carousels;
                dispatch({
                    type: constants.INIT_SOWING_DATA,
                    sowingData
                })
            }
        }).catch(()=>{
            message.error('Failed to fetch homepage data')
        })
    }
};

// 2. 用户登录
export const getUserDataAction = (data, callback)=>{
    return (dispatch)=>{
       getUserData(data).then((res)=>{
           if(res.status_code === 200){
               const userData = res.result;
            //    const userData = res;
               dispatch({
                   type: constants.INIT_USER_DATA,
                   userData
               });
               callback && callback(userData);
           }else {
               message.error(res.result);
           }
       }).catch((err)=>{
        message.error(err)
       })
    }
};

export const getStudentDataAction = (parmas) => {
    return (dispatch)=>{
        getStudentData(parmas).then((res)=>{
            if(res.status_code === 200){
                const studentData = res.result.students;
                dispatch({
                    type: constants.INIT_STUDENT_DATA,
                    studentData
                })
            }
        }).catch((err)=>{
            message.error(err)
        })
    }
};

export const getCategoryDataAction = (params) => {
    return (dispatch)=>{
        getCategoryData(params).then((res)=>{
            if(res.status_code === 200){
                const categoryData = res.result.categories;
                dispatch({
                    type: constants.INIT_CATEGORY_DATA,
                    categoryData
                })
            }
        }).catch((err)=>{
            message.error('Paging data acquisition failed')
        })
    }
};

export const getSourceDataAction = (searchVal,page,pageSize) => {
    return (dispatch)=>{
        getSourceData(searchVal,page,pageSize).then((res)=>{
            if(res.status_code === 200){
                const sourceData = res.result.course;
                dispatch({
                    type: constants.INIT_SOURCE_DATA,
                    sourceData,
                })
            }
        }).catch((err)=>{
            message.error('Failed to fetch course data')
        })
    }
};
