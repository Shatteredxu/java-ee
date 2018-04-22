import React, { Component } from 'react'
import Default from '../img/015a465698b54432f87574be965625.png'
import '../css/head.scss'
import { POST, BASE_URL } from '../../../components/commonModules/POST'
import Signin from './Calendar'

class PerHead extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ownInfo:''
    }
  }
  componentDidMount () {
    POST('/user/getUserInfo.action', ``, re => {
      if (re.state == 1) {
        this.setState({ ownInfo:re.data })
      }
    })
  }
  render () {
    const { email, headImg, phone, uname, power, teamId } = this.state.ownInfo
    return (
      <div>
        <div className='per_head'>
          <div className='per_himg'>
            <img src={BASE_URL + headImg || Default} alt='' />
          </div>
          <div className='per_detail'>昵称：{uname}</div>
          <div className='per_detail'>等级：{power === 0 ? '会员' : '导游'}</div>
          <div className='per_detail'>联系电话：{phone}</div>
          <div className='per_detail'>邮箱：{email}</div>
        </div>
      </div>
    )
  }
}

export default PerHead
