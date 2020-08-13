import React, { Component } from 'react'
import { disConnect } from 'echarts'
import { Form, Input, InputNumber, Button, Space, Switch,message} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import {addCategoryData} from '../../Api/index'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}
class CourseCategoryAdd1 extends Component {
  state = {
    main_is_show_checked: '',
    main_sort_checked: '',
    main_title_checked: '',
    main_total_count_checked: '',
    sub_checked:[],
    value: 1,
  }

  onFinish = (res) => {
    const that=this
    // console.log(values)
    if(res.user.main_is_show===true){
      this.setState({main_is_show_checked:'1'})
    }else{
      this.setState({main_is_show_checked:'0'})
    }
    this.setState({
      main_sort_checked: String(res.user.main_sort),
      main_title_checked:res.user.main_title,
      main_total_count_checked:res.user.main_total_count
    })

    const subCourse=res.users
    if(subCourse!==undefined){
      subCourse.map((item,index,self)=>{
        item["sub_total_count"]=String(item.sub_total_count)
        if(item["sub_is_show"]===true){
          item["sub_is_show"]='1'
        }else{
          item["sub_is_show"]='0'
        }
      })
    }
    const  shouldSubmit={}
    shouldSubmit["main_title"]=this.state.main_title_checked
    shouldSubmit["main_total_count"]=this.state.main_total_count_checked
    shouldSubmit["main_is_show"]=this.state.main_is_show_checked
    shouldSubmit["main_sort"]=this.state.main_sort_checked
    shouldSubmit["sub_course"]=subCourse
    // console.log(subCourse);
    addCategoryData({data:shouldSubmit}).then((res)=>{
      console.log(res);
      if (res.status_code === 200) {
          message.success('Course Added Successfully', 1)
          that.props.history.push('/course/category')
      }
    }).catch(err=>console.log(err))

  }

  render() {
    return (
      <div>
        <Form
          {...layout}
          name="dynamic_form_nest_item"
          validateMessages={validateMessages}
          onFinish={this.onFinish.bind(this)}
          autoComplete="off"
        >
          <Form.Item
            name={['user', 'main_title']}
            label="Main Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'main_total_count']}
            label="Total Number"
            rules={[{ type: 'number', min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={['user', 'main_sort']}
            label="Sort"
            rules={[{ type: 'number', min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Show"
             name={['user', 'main_is_show']}
             >
            <Switch />
          </Form.Item>

          <div style={{ marginLeft: '33%' }}>
            <Form.List name="users">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="start"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, 'sub_title']}
                          fieldKey={[field.fieldKey, 'subTitle']}
                          rules={[
                            { required: true, message: 'Missing Sub Title' },
                          ]}
                        >
                          <Input
                            style={{ width: '150px' }}
                            placeholder="subTitle"
                          />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'sub_total_count']}
                          fieldKey={[field.fieldKey, 'courseNum']}
            rules={[{ type: 'number', min: 0, max: 99 }]}
          >
            <InputNumber                             style={{ width: '150px' }}
                            placeholder="course number" />
          </Form.Item>

                        <Form.Item label="Show"
                          name={[field.name, 'sub_is_show']}
                          fieldKey={[field.fieldKey, 'show']}
                        >
                          <Switch style={{ marginLeft: '10px' }} />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'sub_sort']}
                          fieldKey={[field.fieldKey, 'subSort']}
            rules={[{ type: 'number', min: 0, max: 99 }]}
          >
            <InputNumber                             style={{ width: '150px' }}
                            placeholder="sub course sort" />
          </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add()
                        }}
                        block
                      >
                        <PlusOutlined /> Add field
                      </Button>
                    </Form.Item>
                  </div>
                )
              }}
            </Form.List>
          </div>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default CourseCategoryAdd1
