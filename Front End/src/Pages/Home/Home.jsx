import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getHomeDataAction} from './../../Store/actionCreators'
import LKEChartsOne from './../../Components/LKTool/LKEChartsOne'
import LKEChartsTwo from './../../Components/LKTool/LKEChartsTwo'
import { Carousel } from 'antd';
import {fetchCarousels,getHomeCategory} from '../../Api/index'
import clonedeep from 'clonedeep'
const Basic='./uploads/'
class Home extends Component {
    state = {
        dotPosition: 'bottom',
        carousels:[],

      };
    render() {
        const divStyle = {
            height:'350px',
            width:'70%',
            marginLeft:'15%',
            // backgroundColor:'skyblue'
            background: '#364d79',
            marginBottom:'-50px'
            // new Date(dateTime).getTime()
          };
          const carouselImg = {
            height:'350px',
          };
          const profileCSS = {
              marginTop:'50px',
          };
        const {carousels} =this.state
        console.log(carousels);
        return (

            <div className="container-fluid">
        

                <div className="body teacher-profile">
                <div style={divStyle}>
                <Carousel autoplay 
                style={{height:'350px'}}
                // effect="fade" 
                 dotPosition={this.state.dotPosition}>
                {
                    carousels.map((item,index,self)=>{
                    return(
                    <div key={index}>
                     <img style={{height:'350px'}} src={Basic+item.image_url} alt=""/>
                    </div>
                    )
                    })
                }

                </Carousel>
                </div>


                    <div className="profile" style={profileCSS} >


                        <div className="lk-chart">
                            <div className="chart">
                                <LKEChartsOne />
                            </div>
                            <div className="chart">
                                <LKEChartsTwo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
    
        this.props.reqHomeData();
        fetchCarousels().then((res)=>{
            const rawImg=res["result"]
            const dateNow=new Date().getTime()
            const carousels=clonedeep(rawImg)
            let tempArr=[]
            carousels.map((item,index,self)=>{
            if(new Date(item.s_time.substr(0,10)).getTime()< dateNow &&new Date(item.e_time.substr(0,10)).getTime()> dateNow){
                tempArr.push(item)
            }
            })
            this.setState({
                carousels:tempArr
            })
        }).catch(err=>console.log(err))


    }
}

const mapStateToProps = (state)=>{
    return {
        homeData: state.homeData
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        reqHomeData(){
            const action = getHomeDataAction();
            dispatch(action)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);