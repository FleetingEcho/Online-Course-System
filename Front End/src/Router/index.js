import Home from '../Pages/Home/Home'
import User from '../Pages/User/User'
import Mine from '../Pages/Mine/Mine'
import Rotation from '../Pages/Sowing/SowingList'
import CourseAdd from '../Pages/Course/CourseAdd'
import CourseCategory from '../Pages/Course/CourseCategory'
import CourseList from '../Pages/Course/CourseList'
import CourseTopic from '../Pages/Course/CourseTopic'
import SowingAdd from '../Pages/Sowing/SowingAdd'
import SowingEdit from '../Pages/Sowing/SowingEdit'

let routes = [
    // First level routing
    {path: '/', component: Home, exact: true},
    {path: '/user', component: User},
    {path: '/mine', component: Mine},
    {path: '/sowinglist', component: Rotation},
    {path: '/sowingadd', component: SowingAdd},
    {path: '/sowingedit', component: SowingEdit},
    {path: '/courseadd', component: CourseAdd},
    {path: '/coursecategory', component: CourseCategory},
    {path: '/courselist', component: CourseList},
    {path: '/coursetopic', component: CourseTopic},
];

export default routes;