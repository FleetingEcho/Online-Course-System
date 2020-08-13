import React, {Component} from 'react';
import echarts from 'echarts'
import {getHomeCategory1} from '../../Api/index'
class LKEChartsOne extends Component {
    state={
        courseTitles:[],
        courseCount:[],
    }
    render() {
        console.log(this.state.courseTitles);
        return (
            <div id="main1" style={{height:400}} />
        );
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
if(this.state.courseTitles.length!==0){
        let main1 = echarts.init(document.getElementById('main1'));
        let option = {
            title: {
                text: 'Courses Numbers'
            },
            tooltip: {},
            legend: {
                data:['Users']
            },
            xAxis: {
                data: this.state.courseTitles
                // data: Object.keys(order_counter)
            },
            yAxis: {},
            series: [{
                name: 'Courses',
                type: 'bar',
                data:  this.state.courseCount
                // data: Object.values(order_counter)
            }]
        };
        main1.setOption(option);
    
}
    }

    componentDidMount() {
        getHomeCategory1().then((res)=>{
            console.log(res);
            let courseTitle1=[]
            let courseCount1=[]
            const categories=res["result"]
            categories.map((item,index,self)=>{
                courseTitle1.push(item.main_title)
                courseCount1.push(Number(item.main_total_count))
            })
            this.setState({
                courseCount:courseCount1,
                courseTitles:courseTitle1
            })

        }).catch(err=>console.log(err))

    }
}

export default LKEChartsOne