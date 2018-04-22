import React, { Component } from 'react'
import './addRoute.scss'
import { POST } from '../../../components/commonModules/POST'
import moment from 'moment'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option
const { TextArea } = Input
const Option = Select.Option
const residences = [{
  value: '湖北',
  label: '湖北',
  children: [{
    value: '武汉',
    label: '武汉',
    children: [{
      value: '江夏区',
      label: '江夏区'
    }, {
      value: '洪山',
      label: '洪山'
    }]
  }]
}, {
  value: '陕西',
  label: '陕西',
  children: [{
    value: '西安',
    label: '西安',
    children: [{
      value: '雁塔',
      label: '雁塔'
    }]
  }]
}]
class RegistrationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      name:'',
      startPoint:'',
      endPoint:'',
      type:0,
      allPoint:''
    }
  }
  componentDidMount () {
    POST('/getOrder.action', ``, re => {
      if (re.state == 1) {
        console.log(re)
      } else {

      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        var data= `name=${values.name}&startPoint=${values.startPoint}
        &endPoint=${values.endPoint}&allPoint=${values.allPoint}&type=${values.types}`
        POST('/addRoute.action',data,re=>{
          console.log(re)
        })
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
    }
    this.setState({ autoCompleteResult })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { autoCompleteResult } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    return (
      <div className='add_route_css'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label='线路名'
        >
            {getFieldDecorator('name', {
              rules: [ {
                required: true, message: '名称不能为空'
              }]
            })(
              <Input />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='起始地点'
        >
            {getFieldDecorator('startPoint', {
              rules: [{
                required: true, message: '请输入正确的起点!'
              }]
            })(
              <Input type='text' />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='终点'
        >
            {getFieldDecorator('endPoint', {
              rules: [{
                required: true, message: '请输入正确的终点'
              }]
            })(
              <Input type='text' />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
              路线类型&nbsp;
              <Tooltip title='国内路线或者国外路线'>
                <Icon type='question-circle-o' />
              </Tooltip>
              </span>
          )}
        >
            {getFieldDecorator('type', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Select a person'
                optionFilterProp='children'
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
                <Option value='0'>省内游线路</Option>
                <Option value='1'>国内游线路</Option>
                <Option value='2'>国际游线</Option>
              </Select>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='所有景点'
        >
            {getFieldDecorator('allPoint', {
              rules: [{ required: true, message: '所有景点!' }]
            })(
              <TextArea />
          )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked'
            })(
              <Checkbox>请确认以上信息正确无误后提交</Checkbox>
          )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>Register</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm)
export default WrappedRegistrationForm
