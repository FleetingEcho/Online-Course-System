import * as constants from './actionTypes'

// original data
const defaultState = {
    homeData: {},
    sowingData: [[],[]],
    userData: {},
    studentData: [[],[]],
    categoryData: [[],[]],
    addCourseData: {
        course_name:'',
        course_title: '',
        course_sub_title: '',
        course_teacher: '',
        course_serialize_status: '',
        main_category: '',
        sub_category: '',
        course_intro: '',
        course_tag: '',
        course_page: '',
        course_page_url: {},
    },
    sourceData: [[],[]],
};

export default (state = defaultState, action)=>{
    if(action.type === constants.INIT_HOME_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.homeData = action.homeData;
        return newState;
    }else if(action.type === constants.INIT_SOWING_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.sowingData = action.sowingData;
        return newState;
    }else if(action.type === constants.INIT_USER_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        // save userData locally
        sessionStorage.setItem('userData', JSON.stringify(action.userData));
        newState.userData = action.userData;
        return newState;
    }else if(action.type === constants.INIT_STUDENT_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.studentData = action.studentData;
        return newState;
    }else if(action.type === constants.INIT_CATEGORY_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.categoryData = action.categoryData;
        return newState;
    }else if(action.type === constants.INIT_SOURCE_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.sourceData = action.sourceData;
        return newState;
    }
    return state;
}