import React, { Component } from 'react'
import './Login.scss'
import head from './e用户.png'
import off from './off.png'
import { Row, Col, message } from 'antd'
import user from './e用户.png'
import pass from './钥匙.png'
import { browserHistory } from 'React-router'
import { POST, BASE_URL } from '../../../components/commonModules/POST'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      passwd: '',
      headImg:''
    }
  }

  toRegister () {
    browserHistory.push({
      pathname: '/register'
    })
  }

  toForget=() => browserHistory.push({ pathname:'/Forget' })

  changeValue (value, type) {
    if (type == 1) {
      this.setState({ user: value })
      var data = `uname=${value}`
      POST('/QueryIMG.action', data, re => {
        if (re.data) {
          this.setState({ headImg:re.data.headImg })
        } else {
          this.setState({ headImg:'' })
        }
      })
    } else {
      this.setState({ passwd: value })
    }
  }

  Login () {
    var { user, passwd } = this.state
    var data = `uname=${user}&pass=${passwd}`
    if (!user) {
      message.error('用户名为空')
    } else if (!passwd) {
      message.error('密码为空')
    } else {
      POST('/login.action', data, (re) => {
        console.log(re)
        if (re.state == 1) {
          browserHistory.push({
            pathname: '/'
          })
        } else if (re.state == -1) {
          message.error('用户名不存在')
        } else if (re.state == -2) {
          message.error('密码错误')
        } else {
          message.error('服务器错误')
        }
      })
    }
  }

  render () {
    const headImg = this.state.headImg
    return (
      <div className='login'>
        <div style={{ width: '100%', height: 120 }} />
        {/* 用户头像 */}
        <div className='login_box'>
          <div className='user'>
            <img src={headImg ? BASE_URL + headImg : head} alt='' className='head1' />
          </div>
        </div>
        <div className='content'>
          {/* Login-input */}
          <Row className='account'>
            <Col className='icon' span={4}>
              <img src={user} alt='' className='i' />
            </Col>
            <Col className='inp' span={20}>
              <input
                type='text'
                className='text'
                placeholder='(用户名)'
                onChange={(e) => { this.changeValue(e.target.value, 1) }} />
            </Col>
          </Row>

          <Row className='passwd'>
            <Col className='icon' span={4}>
              <img src={pass} alt='' className='i' />
            </Col>
            <Col className='inp' span={20}>
              <input
                type='password'
                className='text'
                placeholder='password'
                onChange={(e) => { this.changeValue(e.target.value, 0) }} />
            </Col>
          </Row>

          {/* button */}
          <Row className='login_but'>
            <Col span={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <div className='but' onClick={this.toRegister.bind(this)} style={{ display: 'block', height: 36 }}>
                <span>注册</span>
              </div>
            </Col>
            <Col span={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <div className='but' onClick={this.Login.bind(this)}>
                <span>登录</span>
              </div>
            </Col>
          </Row>

          {/* foreget */}
          <div className='forget' onClick={this.toForget.bind(this)}>
            <p>忘记密码？</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
