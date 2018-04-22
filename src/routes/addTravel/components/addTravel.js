import React, { Component } from 'react'
import './addTravel.scss'
import { POST } from '../../../components/commonModules/POST'
import moment from 'moment'
import { Form, Input, Tooltip, Icon, Select, Row, DatePicker,message, InputNumber, Checkbox, Button, AutoComplete } from 'antd'
const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option
const { TextArea } = Input
const Option = Select.Option
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
        var data = `name=${values.name}&prices=${values.price}
        &startDate=${moment(values.startDate).format('YYYY-MM-DD')}&days=${values.days}`
        POST('/addGroup.action', data, re => {
          console.log(re)
          message.success('添加成功')
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
            label='名称'
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
            label='价格'
        >
            {getFieldDecorator('price', {
              rules: [{
                required: true, message: '正确的价格!'
              }]
            })(
              <InputNumber
                defaultValue={1000}
                formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
    />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开始时间'
        >
            {getFieldDecorator('endPoint', {
              rules: [{
                required: true, message: '请输入正确的时间'
              }]
            })(
              <DatePicker />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
              天数&nbsp;
              <Tooltip title='开始到结束所需要的时间'>
                <Icon type='question-circle-o' />
              </Tooltip>
              </span>
          )}
        >
            {getFieldDecorator('天数', {
              rules: [{ required: true, message: '请输入具体天数'}]
            })(
              <InputNumber min={1} max={50} defaultValue={1} />
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
