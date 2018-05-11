import React, { Component } from 'react'
import './Zen.scss'
import { Row, Col, DatePicker, InputNumber, message,Icon } from 'antd'
import img1 from './1.jpg'
import { POST } from '../../../components/commonModules/POST'
import moment from 'moment'
export default class Zen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      group:'',
      dateString:'',
      count:1,
      sum:0,
      user:'',
      route:[]
    }
  }
  componentDidMount () {
    var tid = JSON.parse(this.props.params.id)
    var data = `id=${tid}`
    POST('/getGroup.action', data, (re) => {
      console.log(re)
      if (re.state == 1) {
        this.setState({ user:re.data[0].user })
        this.setState({ route:re.data[0].rou })
        console.log(re.data)
        this.setState({ group:re.data[0] })
      }
    })
  }
  ChangeDate (dateString) {
    dateString = moment(dateString).format('YYYY-MM-DD HH:mm:SS')
    this.setState({ dataString:dateString })
  }
  changeCount (value, price) {
    // console.log('changed', value)
    this.setState({ count:value })
    console.log(price)
    var sum = parseInt(value * parseInt(price))
    this.setState({ sum:sum })
  }
  submit (e) {
    e.preventDefault()
    var travelId = JSON.parse(this.props.params.id)
    console.log(this.state.dateString)
    var data = `travelId=${travelId}&date1=${this.state.dataString}&count1=${this.state.count}&price=${this.state.sum}`
    POST('/root/addOrder.action', data, (re) => {
      if (re.state == 1) {
        message.success('购买成功')
      } else {
        message.error('网络错误')
      }
    })
  }
  render () {
    const { name, price, days } = this.state.group
    return (
      <div className='detail_main_wrap'>
        <Row>
          <Col span={10} style={{ padding:10 }}>
            <img src={img1} width='460px'height='300px' />
          </Col>
          <Col span={14}>
            <h1 className='name'>
              {name}<i className='diamond_5' />
            </h1>
            <div className='main_price'>
              <strong className='total_price' ><dfn>¥</dfn>{price}<em>/人起</em></strong>
            </div>
            <dl className='service_dl'>
              <dt>服务保障</dt><dd><span title='无购物'><Icon type="check-circle-o" style={{ fontSize: 16, color: 'green' }} />无购物</span><span >
                <Icon type="check-circle-o" tyle={{ fontSize: 16, color: 'green' }}/>成团保障</span></dd>
            </dl>
            <dl className='service_dl'>
              <dt>天数</dt><dd><span title='无购物'><i className='ico_right' />{days}天左右</span></dd>
            </dl>
            <dl className='service_dl'>
              <dt>导游</dt><dd><span title='无购物'><i className='ico_right' />{this.state.user.uname}</span></dd>
            </dl>
            <dl className='service_dl'>
              <dt>开始地点</dt><dd><span title='无购物'><i className='ico_right' />{this.state.route.startPoint}</span></dd>
            </dl>
            <dl className='service_dl'>
              <dt>结束地点</dt><dd><span title='无购物'><i className='ico_right' />{this.state.route.endtPoint}</span></dd>
            </dl>
            <div className='product_tips'><i className='icon_mark' />因航班行程不同，产品特色、服务保障、行程概要、产品经理推荐均以实际选择的线路类型所包含的内容为准。</div>
          </Col>
        </Row>
        <div className='js_order'>
          <div className='resource'>
            <Row>
              <Col span={6}>
                <label >出发&nbsp;&nbsp;&nbsp;</label>
                <DatePicker onChange={(dateString) => this.ChangeDate(dateString)} />
              </Col>
              <Col span={6}>
                <label>人数&nbsp;&nbsp;&nbsp;</label>
                <InputNumber min={1} max={10} step={1} onChange={(v) => { this.changeCount(v, price) }} />
              </Col>
              <Col span={8}>
                <label>总价&nbsp;&nbsp;&nbsp;</label>
                <InputNumber min={0} disabled value={this.state.sum} />元
              </Col>
              <Col span={4}>
                <a className='btn_red_big' onClick={(e) => { this.submit(e) }}>立即购买</a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
