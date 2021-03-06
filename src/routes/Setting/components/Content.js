import React, { Component } from 'react'
import { Row, Col, Radio, message } from 'antd'
import { POST } from '../../../components/commonModules/POST'
const RadioGroup = Radio.Group

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'haha',
      idnum: 123456,
      phone: 123456766,
      email: '541006240@qq.com',
      sex: 1,
      intor: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae nam ipsum, qui iusto expedita facilis ab, eius harum sit nulla sapiente, commodi voluptas. Inventore id incidunt fuga soluta odio, fugiat?',
      cname: 0,
      cmail: 0
    }
  }

  componentWillMount () {
    POST('/user/getUserInfo.action', `data=''`, (re) => {
      if (re.state == 1) {
        this.setState({
          name:re.data.uname,
          phone:re.data.phone,
          email:re.data.email
        })
      } else if (re.state == -2) {
        message.error('请先登录')
      }
    })
  }

  // change value
  changeValue (e, type) {
    switch (type) {
      case 1:
        this.setState({
          name: e.target.value,
          cname: 1
        })
        break
      case 2:
        this.setState({ idnum: e.target.value })
        break
      case 3:
        this.setState({ phone: e.target.value })
        break
      case 4:
        this.setState({
          email: e.target.value,
          cmail: 1
        })
        break
      case 5:
        this.setState({ sex: e.target.value })
        break
      default:
        this.setState({ intor: e.target.value })
    }
  }

  // 唯一验证
  isUniqe () {
    return new Promise((resolve, reject) => {
      let { name, email, cmail, cname } = this.state
      var Re = 1
      if (cname == 1) {
      if (name.length < 3 || name.length > 15) {
        message.error('用户名长度在3到15之间')
        reject(Re = 0)
      } else {
        POST('/user/queryUname', `uname=${name}`, (re) => {
          if (re.data) {
            Re = 0
            console.log(Re)
            message.error('用户名已存在')
            reject(Re)
          }else {
            console.log(Re)
            resolve(Re)
          }
        })
      }
    }
      if (cmail == 1) {
      if (!email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        message.error('请输入正确的邮箱')
        reject(Re = 0)
      } else {
        POST('/user/queryEmail', `email=${email}`, (re) => {
          if (re.state) {
            Re = 0
            console.log(Re)
            message.error('邮箱已存在')
            reject(Re)
          }else {
            console.log(Re)
            resolve(Re)
          }
        })
      }
    }
      if (!cname && !cmail) {
      resolve(Re)
    }
    })
  }

  // submit
  submit () {
    let { phone, name, email } = this.state
    let data = `uname=${name}&email=${email}&phone=${phone}`
    POST('/user/updateUserInfo.action', data, (re) => {
      if (re.state == 1) {
        message.success('修改成功')
      } else {
        message.error('服务器错误')
      }
    })
    // this.isUniqe().then((re) => {
    //   console.log(re)
    //   if (re) {
    //     let { phone, name, email } = this.state
    //     let data = `uname=${name}&email=${email}&phone=${phone}`
    //     POST('/user/updateUserInfo.action', data, (re) => {
    //       if (re.state == 1) {
    //         message.success('修改成功')
    //       } else {
    //         message.error('服务器错误')
    //       }
    //     })
    //   }else{

    //   }
    // }
  }

  render () {
    return (
      <div className='set_con' style={{ minHeight:400 }}>
        <div className='con_head'>
          <h2 className='profile'>个&nbsp;&nbsp;人&nbsp;&nbsp;信&nbsp;&nbsp;息</h2>
        </div>
        <div className='con_item'>
          <Row className='from_row'>
            <Col span={6} style={{ paddingLeft: 10 }}>用户名：</Col>
            <Col span={18} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <input
                type='text'
                className='con_inp'
                value={this.state.name}
                onChange={(e) => this.changeValue(e, 1)}
                 />
            </Col>
          </Row>
          <Row className='from_row'>
            <Col span={6} style={{ paddingLeft: 10 }}>联系电话：</Col>
            <Col span={18} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <input type='text' className='con_inp' value={this.state.phone} onChange={(e) => this.changeValue(e, 3)} />
            </Col>
          </Row>
          <Row className='from_row'>
            <Col span={6} style={{ paddingLeft: 10 }}>E-mail：</Col>
            <Col span={18} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <input
                type='text'
                className='con_inp'
                value={this.state.email}
                onChange={(e) => this.changeValue(e, 4)}
                 />
            </Col>
          </Row>

        </div>
        <div className='Commit' onClick={this.submit.bind(this)}>
          <button>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</button>
        </div>
      </div>
    )
  }
}

export default Content
