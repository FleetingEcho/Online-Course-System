import { Layout, Menu, Breadcrumb } from 'antd';
import React, {Component} from 'react';
// import { Layout, Menu, Breadcrumb } from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter } from 'react-router';
import {
  DesktopOutlined,
  PieChartOutlined,
  AreaChartOutlined ,
  PlusOutlined,
  EditOutlined,
  UserOutlined,
  DiffOutlined,
  UnorderedListOutlined ,
} from '@ant-design/icons';
const IMG_PRE = '../uploads/';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// Category1
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected_flag: '0',
        // isShow:'none',
        isShow:'hidden',
        collapsed: false,
    }
}
onCollapse = collapsed => {
  console.log(collapsed);
  this.setState({ collapsed });
};
render(){
  const {userData} = this.props;
  const that=this
  return (
<div className="aside1">

<Sider >
<div className="profile">
                    <div className="avatar img-circle">
                        <img src={userData ? IMG_PRE + userData.icon_url : '../uploads/ironman.jpg'}/>
                        {/* <img src="../uploads/ironman.jpg"/> */}
                    </div>
                    {/* <h4>{userData.real_name}</h4> */}
                </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" onClick={this.onClick.bind(this,'1')} icon={<AreaChartOutlined />}>
            Analysis
            </Menu.Item>
            <Menu.Item key="2" onClick={this.onClick.bind(this,'2')} icon={<UserOutlined />}>
            Students
            </Menu.Item>
            <SubMenu key="sub1" icon={<DesktopOutlined />} title="Courses">
              <Menu.Item key="4" icon={<UnorderedListOutlined/>} onClick={this.onClick.bind(this,'4')}>Course List</Menu.Item>
              <Menu.Item key="3" icon={<EditOutlined  />} onClick={this.onClick.bind(this,'3')}>Course Add</Menu.Item>
              <Menu.Item key="5" icon={<DiffOutlined />} onClick={this.onClick.bind(this,'5')}> Categories</Menu.Item>
            </SubMenu>
            <Menu.Item key="6" onClick={this.onClick.bind(this,'6')} icon={<PieChartOutlined />}>
            Carousels
            </Menu.Item>
            {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
    </div>
      )
    }
    onClick(key){
      // const that =this
     if(key==='1'){
        this.props.history.push('/')
     }
     if(key==='2'){
        this.props.history.push('/user')
     }
     if(key==='3'){
        this.props.history.push('/course/add')
     }
     if(key==='4'){
        this.props.history.push('/course/list')
     }
     if(key==='5'){
        this.props.history.push('/course/category')
     }
     if(key==='6'){
        this.props.history.push('/sowing/list')
     }
    }


}
  const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
  };
export default  withRouter(connect(mapStateToProps, null)(SideBar))