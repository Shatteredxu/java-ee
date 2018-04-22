import React, { Component } from 'react'
import './Order.scss'
import { Table, Icon, Divider } from 'antd'
import { POST } from '../../../components/commonModules/POST'
import moment from 'moment'

const columns = [{
  title: '用户名',
  dataIndex: 'user.uname',
  key: 'user.uname',
  width:'20%'
}, {
  title: '旅行团',
  dataIndex: 'tra.name',
  key: 'tra.name',
  width:'20%'
}, {
  title: '时间',
  dataIndex: 'date1',
  key: 'date1',
  width:'20%',
  render:(text, record, index) => {
    return (
      <div>
        {moment().format(text, "YYYY-MM-DD")}
      </div>
    )
  }
}, {
  title: '人数',
  dataIndex: 'count1',
  key: 'count1',
  width: '20%'
}, {
  title: '价格',
  dataIndex: 'price',
  key: 'price',
  width: '20%'
}]
export default class Zen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:[]
    }
  }

  componentDidMount () {
    POST('/getOrder.action', ``, re => {
      if (re.state == 1) {
        this.setState({ data:re.data })
      } else {

      }
    })
  }
  render () {
    const { data } = this.state
    return (
      <div className='detail_main_wrap'>
        <div className='order_list'>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    )
  }
}
