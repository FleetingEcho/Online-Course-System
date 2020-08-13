import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Select,Button,Input ,Radio,message } from 'antd';
import {connect} from "react-redux";
import {withRouter } from 'react-router';
import {getCategoryDataAction} from "./../../Store/actionCreators";
import {changeSubCategoryData,changeCategoryData,fetchOneCategory} from '../../Api/index'
const { Option } = Select;
class CourseCategoryAddSub extends Component {
    constructor(props){
        super(props);
        // const {categoryData} = this.props;
        // const category = this.props.categoryData[0][0]
        // const addCourseData = this.props.addCourseData;
        this.state = {
            s_sub_course:'------',
            s_main_course:'',
            fetch_sub_course:[],
            fetch_mainTitle:'',
            fetch_mainTitle_checked:'',
            fetch_sort:'',
            fetch_sort_checked:'',
            fetch_toShow:'1',
            fetch_toShow_checked:'',
            fetched_sub_course:'',
            fetched_sub_course_index:'',
            fetched_sub_total_count:'',
            fetch_subTitle_checked:'',
            fetch_count_checked:'',
            sub_course:  [],
            readOnly_flag:false,
            categoryId:'',
            sub_flag: false,
            // sub_course:categoryData[0][0] || []
        }

    }
    onChange(value) {
        // console.log(`selected ${value}`);
      }
      
    onBlur() {
        console.log('blur');
      }
      
    onFocus() {
        console.log('focus');
      }
      
    onSearch(val) {
        console.log('search:', val);
      }
      handleProvinceChange = index => {
        const {categoryData} = this.props;
        this.setState({
            s_main_course: categoryData[0][index].main_title,
            s_sub_course:categoryData[0][index].sub_course[0].sub_title,
            sub_course:  categoryData[0][index].sub_course,
        });
      };
      onSecondCityChange = index => {
        //   const secondCity=this.state.secondCity
        this.setState({
          s_sub_course: this.state.sub_course[index].sub_title,
        });
      };
    render() {
        const {fetched_sub_total_count,fetched_sub_course,fetch_mainTitle,fetch_toShow} =this.state
        // console.log(readOnly_flag);
        const {categoryData} = this.props;
            // console.log(categoryData);
if(categoryData[1].length!==0 && fetch_mainTitle!=='' && fetched_sub_course!=='1'){
    const {
        sub_course
    } = this.state;
    // console.log(this.sub_course)
    return (
        <div className="body course-category">
            <ol className="breadcrumb">
                <li><Link to="/course/category">Course/ </Link></li>
                <li className="active">Course Classification</li>
            </ol>
            <div className="category-add">
                <form action="" className="form-horizontal">
                    {
                        this.props.location.state.subTitle===-2 && fetch_mainTitle!==''
                        ?
                    <div className="form-group">
                        <label htmlFor=""  className="col-md-4 control-label">Main Title</label>
                        <div className="col-md-3">
                        <Input type="text"
                        
                        // readOnly={readOnly_flag}
                        readOnly={false} 
                        defaultValue={fetch_mainTitle}
                        // value={fetch_mainTitle_checked}
                        onChange={this.fetchMainTitle.bind(this)}
                        style={{width:'300px'}}
                        // className="form-control input-xs"
                         placeholder="Enter the name" />
                        </div>
                    </div>
                         :
                            ''
                    }
                    {
                        this.props.location.state.subTitle===-2 && fetched_sub_course!==''
                        ?
                            ''
                         :
                         <div className="form-group">
                        <label htmlFor=""  className="col-md-4 control-label">Sub-Title</label>
                        <div className="col-md-3">
                        <Input type="text"
                        
                        // readOnly={readOnly_flag}
                        readOnly={false} 
                        defaultValue={fetched_sub_course}
                        // value={fetch_mainTitle_checked}
                        onChange={this.fetchSubTitle.bind(this)}
                        style={{width:'300px'}}
                        // className="form-control input-xs"
                         placeholder="Enter the name" />
                        </div>
                    </div>
                    }
                    {
                        this.props.location.state.subTitle===-2
                        ?
                            ''
                         :
                         <div className="form-group">
                        <label htmlFor=""  className="col-md-4 control-label">Total Count</label>
                        <div className="col-md-3">
                        <Input type="text"
                        
                        // readOnly={readOnly_flag}
                        readOnly={false} 
                        defaultValue={fetched_sub_total_count}
                        // value={fetch_mainTitle_checked}
                        onChange={this.fetchTotalCount.bind(this)}
                        style={{width:'300px'}}
                        // className="form-control input-xs"
                         placeholder="Enter the name" />
                        </div>
                    </div>
                    }
                    {
                        this.props.location.state.subTitle=== -2
                        
                        ? <div className="form-group">
                                            <label htmlFor="" className="col-md-4 control-label">Sort</label>
                                            <div className="col-md-1">
                                                <input type="text"
                                                style={{ width: '50px' }}
                                                className="form-control input-sm" 
                                                defaultValue={this.state.fetch_sort}
                                                //  value={this.state.fetch_sort_checked}
                                                onChange={this.fetchSort.bind(this)}
                                                />
                                            </div>
                                        </div>
                                        : ''
                    }
{
    this.state.fetch_sub_course.length===100
    ?
    <div className="form-group">
                        <label htmlFor="" className="col-md-2 control-label">Classification</label>
                        <div className="col-md-8">
  
         
                <Select
                            defaultValue={categoryData[0][0]["main_title"]}
                            style={{ width: 120 }}
                            onChange={this.handleProvinceChange}
                            >
                            {categoryData[0].map((category, index) => (
                                <Option key={index}> {category.main_title}</Option>
                            ))}
                        </Select>
                        <Select
                                style={{ width: 120 }}
                                // defaultValue={this.state.s_sub_course}
                                defaultValue={this.state.s_sub_course}
                                onChange={this.onSecondCityChange}
                                >
                                { sub_course.map((course, index)=>(
                                 
                                        <Option key={index}>{course.sub_title}</Option>
                                
                                ))}
                        </Select>
                        </div>
    </div>
    : ''


}

                    <div className="form-group">
                        <label htmlFor="" className="col-md-4 control-label">Whether to show</label>
                            {
                              fetch_toShow!==''
                              ?
                        <div className="col-md-3">
                                <label className="radio-inline">
                                {/* <input name='isShow' type="radio" onChange={this.radioChange.bind(this)} checked={fetch_toShow==='1'? true: false}/> Yes */}
                                {/* <input name='isShow' type="radio" onChange={this.radioChange.bind(this)}  checked={fetch_toShow==='0'? true: false} style={{marginLeft:'30px'}}/> No */}
                                <Radio.Group onChange={this.radioChange.bind(this)} 
                                defaultValue={fetch_toShow}>
                                    <Radio value={'1'}>Yes</Radio>
                                    <Radio value={'0'}>No</Radio>
                                </Radio.Group>
                            </label>
                        </div>
                            : ''
                              
                            }
                    </div>
                    <div className="form-group">
                        <div className="col-md-8">
                            <Button  onClick={this.submitChange.bind(this)} type="primary"  className=" pull-right">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}else{
    return (<div>Fetching...</div>)
}
    }
    fetchMainTitle(e){
        const fetch_mainTitle_checked=e.target.value
        this.setState({
            fetch_mainTitle_checked:fetch_mainTitle_checked,
           
        })
    }
    fetchSubTitle(e){
        const fetch_subTitle_checked=e.target.value
        this.setState({
            fetch_subTitle_checked:fetch_subTitle_checked
        })
    }
    fetchSort(e){
        // console.log(e.target.value);
        const fetch_sort_checked=e.target.value
        this.setState({
            fetch_sort_checked:fetch_sort_checked
        })
    }
    fetchTotalCount(e){
        // console.log(e.target.value);
        const fetch_count_checked=e.target.value
        this.setState({
            fetch_count_checked:fetch_count_checked
        })
    }
    radioChange(e){
        // console.log('radio checked', e.target.value);
        this.setState({
          fetch_toShow_checked: e.target.value,
        });
    }
    submitChange(){
        // console.log(111);
        
        if( this.props.location.state.subTitle===-2){
            const that=this
                    const {fetch_mainTitle_checked, fetch_mainTitle,fetch_toShow,fetch_sort,fetch_sort_checked,fetch_toShow_checked,categoryId}=this.state
                    let fetch_sort_checked1
                    let fetch_mainTitle_checked1
                    let fetch_toShow_checked1
                    if(fetch_sort_checked===''){
                        fetch_sort_checked1=fetch_sort
                        }else{
                            fetch_sort_checked1=fetch_sort_checked
                        
                    }
                    if(fetch_mainTitle_checked===''){
                        fetch_mainTitle_checked1=fetch_mainTitle
                    }else{
                        fetch_mainTitle_checked1=fetch_mainTitle_checked
                    }
                    if(fetch_toShow_checked===''){
                        fetch_toShow_checked1=fetch_toShow
                    }else{
                        fetch_toShow_checked1=fetch_toShow_checked
                    }
                    const params={
                        categoryId:categoryId,
                        changeTitle:fetch_mainTitle_checked1,
                        changeSort:fetch_sort_checked1,
                        changeToShow:fetch_toShow_checked1
                    }
                    changeCategoryData(params).then(res=>{
                        console.log(res);
                        if(res.status_code === 200){
                            message.success('Course Added Successfully', 1)
                            that.props.history.push('/course/category')
                        }
                    }).catch(err=>console.log(err))
        }else{
            // console.log(1111);
            const {fetch_subTitle_checked,
                fetched_sub_course,
                fetched_sub_total_count,
                fetch_count_checked,
                fetch_toShow,
                fetch_toShow_checked,
                categoryId,
                fetched_sub_course_index
            } =this.state
            let fetch_subTitle_checked1
            let fetched_sub_total_count1
            let fetch_toShow_checked1
                if(fetch_subTitle_checked===''){
                    fetch_subTitle_checked1=fetched_sub_course
                }else{
                    fetch_subTitle_checked1=fetch_subTitle_checked
                }
                if(fetch_count_checked===''){
                    fetched_sub_total_count1=fetched_sub_total_count
                }else{
                    fetch_subTitle_checked1=fetch_count_checked
                }
                if(fetch_toShow_checked===''){
                    fetch_toShow_checked1=fetch_toShow
                }else{
                    fetch_toShow_checked1=fetch_toShow_checked
                }
                // console.log(fetch_sub_course);
                const params={
                    categoryId:categoryId,
                    sub_course_index:fetched_sub_course_index,
                    changeSubTitle:fetch_subTitle_checked1,
                    changeCount:fetched_sub_total_count1,
                    changeToShow:fetch_toShow_checked1
                }
            changeSubCategoryData(params).then(res=>{
                if(res.status_code === 200){
                    message.success('Course Added Successfully', 1)
                    this.props.history.push('/course/category')
                }
            }).catch(err=>console.log(err))
        }
    // console.log(fetch_mainTitle_checked,fetch_sort_checked,fetch_toShow_checked);
    }
    componentWillMount(){
        // let { location : { state : editParams } } = this.props;
        // console.log(this.props.location);

        // console.log(this.props.location);
        if(this.props.location.state!==undefined){
            const categoryId = this.props.location.state.id
            this.setState({
                categoryId:categoryId
            })
            fetchOneCategory({categoryId:categoryId}).then((res)=>{
                // console.log(res);
                const fetch_mainTitle=res.result[0].main_title
                console.log(fetch_mainTitle);
                this.setState({
                    fetch_mainTitle: fetch_mainTitle,
                    fetched_sub_course:'1'
                })
                if(this.props.location.state.subTitle===-2){
                    // console.log(res.result[0]);
                    // console.log(res.result[0].main_is_show);
                    this.setState({
                        // readOnly_flag: false,
                        fetch_sort:res.result[0].main_sort,
                        fetch_toShow:res.result[0].main_is_show,
                        fetched_sub_course:'1'
                    })
                }else{
                    // console.log(this.props.location.state.subTitle);
                    const index=this.props.location.state.subTitle;
                    const fetchedSubCourse=res.result[0].sub_course
                    fetchedSubCourse.some((item,index1)=>{
                        if(index1===index){
                            // console.log(item.sub_title);
                            this.setState({
                                fetched_sub_course:item.sub_title,
                                fetched_sub_total_count:item.sub_total_count,
                                fetched_sub_course_index:index
                            })
                        }
                    })
                    const fetch_sub_course=res.result[0].sub_course
                    // console.log(this.props.location.state.subTitle===-2);
                    this.setState({
                        fetch_sub_course:fetch_sub_course,
                        readOnly_flag: true
                    })
                }
            }).catch(err=>{console.log(err);})
        }

        
        const params={
            key:'',
            currentPage: 1,
            pageSize:100
        }
        this.props.reqCategoryData(params);
    }
}

const mapStateToProps = (state)=>{
    return {
        categoryData: state.categoryData
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        reqCategoryData(params){
            const action = getCategoryDataAction(params);
            dispatch(action)
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseCategoryAddSub));
// export default CourseCategoryAdd;