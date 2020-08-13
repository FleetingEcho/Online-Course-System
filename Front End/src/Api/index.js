import axios from './ajax'

export const getHomeData = () => {
  return axios.request({
    url:  '/home/api/list',
    method: 'get',
  })
}
export const getHomeCategory = () => {
  return axios.request({
    url:  '/category/api/courses',
    method: 'get',
  })
}
export const getHomeCategory1 = () => {
  return axios.request({
    url:  '/category/api/courses1',
    method: 'get',
  })
}
export const getCourseComments= (params) => {
  return axios.request({
    url:  '/course/api/comments',
    method: 'post',
    data:params
  })
}
export const addCourseComments= (params) => {
  return axios.request({
    url:  '/course/api/addcomments',
    method: 'post',
    data:params
  })
}
export const getUserImg= (params) => {
  return axios.request({
    url:  '/user/api/getUerImg',
    method: 'post',
    data:params
  })
}
export const delCourseComments= (params) => {
  return axios.request({
    url:  '/course/api/delcomments',
    method: 'post',
    data:params
  })
}

export const getSowingData = (params) => {
  return axios.request({
    url: '/sowing/api/list',
    method: 'post',
    data:params
  })
}
export const addSowingData = (data) => {
  return axios.request({
    url: '/sowing/api/add',
    method: 'post',
    data: data,
  })

}
export const fetchCarousels = () => {
  return axios.request({
    url: '/sowing/api/carousels',
    method: 'get',
  })
}
export const removeSowingData = (id) => {
  return axios.request({
    url: '/sowing/api/remove',
    method: 'post',
    data: {
      id:id
    },
  })
}
export const removeStudentData = (id) => {
  return axios.request({
    url: '/student/api/delete',
    method: 'post',
    data: {
      id:id
    },
  })
}
export const removeCourseData = (id) => {
  return axios.request({
    url: '/course/api/remove',
    method: 'post',
    data: {
      deleteKey:id
    },
  })
}

export const editSowingData= (data) => {
  return axios.request({
    url: '/sowing/api/edit',
    method: 'post',
    data: data,
  })
}
export const getUserData= (data) => {
  return axios.request({
    url: '/user/api/login',
    method: 'post',
    data: data,
  })
}
export const editUserData= (data) => {
  return axios.request({
    url: '/user/api/edit',
    method: 'post',
    data: data,
  })
}
export const editPwdData= (data) => {
  return axios.request({
    url: '/user/api/reset',
    method: 'post',
    data: data,
  })
}

export const getStudentData= (data) => {
  return axios.request({
    url: '/stu/api/list',
    method: 'post',
    data: data
  })
}

export const getCategoryData= (params) => {
  return axios.request({
    url:   '/category/api/list',
    method: 'post',
    data:params

  })
}
export const addCategoryData= (params) => {
  return axios.request({
    url:   '/category/api/add',
    method: 'post',
    data:params

  })
}
export const changeCategoryData= (params) => {
  return axios.request({
    url:   '/category/api/change',
    method: 'post',
    data:params

  })
}
export const changeSubCategoryData= (params) => {
  return axios.request({
    url:   '/category/api/changesub',
    method: 'post',
    data:params

  })
}
export const fetchOneCategory= (params) => {
  return axios.request({
    url:   '/category/api/fetch',
    method: 'post',
    data:params

  })
}

export const delCategoryData= (params) => {
  return axios.request({
    url:   '/category/api/del',
    method: 'post',
    data:params

  })
}

export const addSourceData = (data) => {
  return axios.request({
    url:'/course/api/add',
    method: 'post',
    data: data,
  })
}
export const addSourceData1 = (data) => {
  return axios.request({
    url:'/course/api/add1',
    method: 'post',
    data: data,
  })
}

export const fetchCourseInfo = (data) => {
  return axios.request({
    url:'/course/api/courseinfo',
    method: 'post',
    data: {id:data},
  })
}

export const getSourceData = (searchVal,page,pageSize) => {
  return axios.request({
    url:  '/course/api/list',
    method: 'post',
    data:{
      search: searchVal,
      page:page,
      pageSize:pageSize
    }
  })
}
