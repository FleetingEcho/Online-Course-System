import axios from 'axios'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'  
class HttpRequest {
  constructor (baseUrl = '') {
    this.baseUrl = baseUrl
    this.queue = {}
    
  }

  // Set the default configuration items of the request instance of axios
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        // "Content-Type": "application/json;charset=utf-8"
      //  "Content-Type": "application/x-www-form-urlencoded"
      },
      // withCredentials: true, //Whether to allow these with cookies

    }
    return config
  }

  // Destroy the request instance
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
    }
  }

  interceptors (instance, url) {
    instance.interceptors.request.use(
      config => {
        NProgress.start() //Set the loading progress bar (start...)
        if (!Object.keys(this.queue).length) {
        }
        this.queue[url] = true
        console.log(config);
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      res => {
        NProgress.done() // Set the loading progress bar (end...)
        this.destroy(url)
        console.log(res);
        const { data } = res // ES6
        // Generally only need to use data
        // console.log(data);
        return data
      },
      error => {
        // return Promise.reject(error)
        // Destroy the request instance
        this.destroy(url)
        return Promise.reject(error.response)
      }
    )
  }

  // Expose to the methods used in other files, the options parameter is also passed in by external files
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url) 
    return instance(options) 
  }
}
export default HttpRequest

/*
At the time of import:-instantiate it
import HttpRequest from '@/lib/axios'
const axios = new HttpRequest()
export default axios

*/
