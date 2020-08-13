import React, {Component} from 'react';
import echarts from 'echarts'
import {getHomeCategory} from '../../Api/index'
class LKEChartsTwo extends Component {
    state={
        courseTitles:[],
        courseCount:[],
        courseInfo:[],
    }
    render() {
        return (
            <div id="main2" style={{height:400}} />
        );
    }
    componentWillMount() {
        getHomeCategory().then((res)=>{
            // console.log(res);
            let courseTitle1=[]
            let courseCount1=[]
            let  courseInfo1=[]
            const categories=res["result"]
            categories.map((item,index,self)=>{
                courseTitle1.push(item.main_title)
                courseCount1.push(Number(item.main_total_count))
                const childInfo={}
                childInfo["value"]=Number(item.main_total_count)
                childInfo["name"]=item.main_title
                courseInfo1.push(childInfo)
            })
            this.setState({
                courseCount:courseCount1,
                courseTitles:courseTitle1,
                courseInfo:courseInfo1
            })

        }).catch(err=>console.log(err))

    }


    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.state.courseTitles.length!==0){
            const {courseTitles}=this.state
            let main2 = echarts.init(document.getElementById('main2'));
            let option = {
                title: {
                    text: 'Course Analysis',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                
                    data: courseTitles
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                    }
                },
                series: [
                    {
                        name: 'Area mode',
                        type: 'pie',
                        radius: [30, 100],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: this.state.courseInfo
                    }
                ]
            };
            
            main2.setOption(option);
        }
    }
}




export default LKEChartsTwo