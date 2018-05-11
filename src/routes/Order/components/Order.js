import React, { Component } from 'react'
import './Order.scss'
import { Table, Icon, Divider, message } from 'antd'
import { POST } from '../../../components/commonModules/POST'
import moment from 'moment'

export default class Zen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:[]
    }
  }

  componentDidMount () {
    POST('/root/getOrder.action', ``, re => {
      if (re.state == 1) {
        this.setState({ data:re.data })
      } else {
        message.error('输入错误')
      }
    })
  }
  deleteTra (id) {
    POST('/root/removeOrder.action', `id=${id}`, re => {
      console.log(re)
      if (re.state == 1) {
        message.success('删除成功')
        POST('/root/getOrder.action', ``, re => {
          if (re.state == 1) {
            this.setState({ data:re.data })
          } else {
            message.error('输入错误')
          }
        })
      } else {
        message.error('发生错误，请稍后重试')
      }
    })
  }
  render () {
    const columns = [{
      title: '用户名',
      dataIndex: 'user.uname',
      key: 'user.uname',
      width:'10%'
    }, {
      title: '旅行团',
      dataIndex: 'tra.name',
      key: 'tra.name',
      width:'20%'
    },
    {
      title: '时间',
      dataIndex: 'date1',
      key: 'date1',
      width:'20%',
      render:(text, record, index) => {
        return (
          <div>
            {moment(text).format('YYYY-MM-DD')}
          </div>
        )
      }
    },
    {
      title: '人数',
      dataIndex: 'count1',
      key: 'count1',
      width: '20%'
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: '20%'
    }, {
      title: '操作',
      dataIndex: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record, index) => {
        let id = record.id
        return (
          <div>
            <span>
              <span onClick={(e, record) => { this.deleteTra(id) }} style={{ cursor:'pointer', color:'blue' }}>Delete</span>
              <Divider type='vertical' />
            </span>
          </div>
        )
      }
    }]
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
