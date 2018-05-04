import React, { Component } from 'react'
import './route.scss'
import { Table, Icon, Divider, message } from 'antd'
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

export default class Zen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    POST('/getRoute.action', ``, re => {
      if (re.state == 1) {
        this.setState({ data:re.data })
      } else {

      }
    })
  }
  deleteTra (id) {
    // e.preventDefault()
    console.log(id)
    POST('/root/removeRouter.action', `id=${id}`, re => {
      if (re.state == 1) {
        message.success('删除成功')
        POST('/getRoute.action', ``, re => {
          if (re.state == 1) {
            this.setState({ data:re.data })
          } else {
          }
        })
      } else {
        message.error('发生错误，请稍后重试')
      }
    })
  }
  render () {
    const columns = [{
      title: '路线名',
      dataIndex: 'name',
      key: 'name',
      width:'10%'
    }, {
      title: '旅行团',
      dataIndex: 'teamId',
      key: 'teamId',
      width:'15%'
    }, {
      title: '起点',
      dataIndex: 'startPoint',
      key: 'startPoint',
      width: '15%'
    }, {
      title: '终点',
      dataIndex: 'endPoint',
      key: 'endPoint',
      width: '15%'
    }, {
      title: '所有景点',
      dataIndex: 'allPoint',
      key: 'allPoint',
      width: '20%',
      render:(text, record, index) => {
        return (
          <div>
            {text == null ? '无' : text}
          </div>
        )
      }
    }, {
      title: '路线类型',
      dataIndex: 'types',
      key: 'types',
      width: '15%',
      render: (text, record, index) => {
        return (
          <div>
              {text == 0 ? '省内' : text == 1 ? '国内' : '国际'}
            </div>
        )
      }
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
                <span onClick={this.deleteTra.bind(this, record.id)} style={{ cursor:'pointer', color:'blue' }}>Delete</span>
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
