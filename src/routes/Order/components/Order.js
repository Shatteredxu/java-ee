import React, { Component } from 'react'
import './Order.scss'
import { Table, Icon, Divider } from 'antd'
import { POST } from '../../../components/commonModules/POST'
import moment from 'moment'
const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}]

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '时间',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address'
},, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href='javascript:;'>Delete</a>
    </span>
  )
}]
export default class Zen extends Component {
  componentDidMount () {
    POST('/getOrder.action', ``, re => {
      if (re.state == 1) {
        console.log(re)
      } else {

      }
    })
  }
  render () {
    return (
      <div className='detail_main_wrap'>
        <div className='order_list'>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    )
  }
}
