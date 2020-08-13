import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

// Pages
import CourseList from './CourseList'
import CourseAddOne from './CourseAddOne'
import CourseAddTwo from './CourseAddTwo'
import CourseThrees from './CourseThrees'
import CourseAdd from './CourseAdd'
import CourseTopic from './CourseTopic'
import CourseCategory from './CourseCategory'
import CourseCategoryAdd from './CourseCategoryAdd'
import CourseCategoryAdd1 from './CourseCategoryAdd1'
import CourseCategoryAddSub from './CourseCategoryAddSub'

class CourseRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/course/list" component={CourseList}/>
                <Route path="/course/add" component={CourseAdd}/>
                <Route path="/course/add_one" component={CourseAddOne}/>
                <Route path="/course/add_two" component={CourseAddTwo}/>
                <Route path="/course/add_three" component={CourseThrees}/>
                <Route path="/course/topic" component={CourseTopic}/>
                <Route path="/course/category" component={CourseCategory}/>
                <Route path="/course/category_add" component={CourseCategoryAdd}/>
                <Route path="/course/category_add_sub" component={CourseCategoryAddSub}/>
                <Route path="/course/category_add1" component={CourseCategoryAdd1}/>
                <Redirect exact form="/course" to="/course/list"/>
            </Switch>
        );
    }
}

export default CourseRouter;