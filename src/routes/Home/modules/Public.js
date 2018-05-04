import React, { Component } from 'react'
import '../components/HomeView.scss'
import { browserHistory } from 'react-router'
import { message, Pagination } from 'antd'
import { POST } from '../../../components/commonModules/POST'
const moment = require('moment')

class Public extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }

  toMessage (e) {
    e.preventDefault()
    browserHistory.push({
      pathname:`/message`
    })
  }

  componentWillMount () {
    POST('/user/getMessage.action', `len=6&index=${1}`, re => {
      if (re.state == 1) {
        this.setState({ list:re.data })
      } else {
        message.error('服务器错误')
      }
    })
  }

  render () {
    return (
      <div className='public'>
        <div className='pub_head'>
          <h2>最新公告</h2>
        </div>
        <div className='item'>
          {this.state.list.map((item, i) => {
            return (
              <div className='pub_item' key={i} style={{ cursor:'pointer' }} >
                <div className='time'>{moment(item.time).format('YYYY/MM/DD')}</div>
                <a href=''>{item.title}</a>
                <p>{item.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Public
