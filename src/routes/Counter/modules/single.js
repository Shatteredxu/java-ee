import React from 'react'
import '../components/Counter.scss'
import { Row, Col, Button } from 'antd'
import 'antd/dist/antd.css'
import Img1 from './1.jpg'
import { POST } from '../../../components/commonModules/POST'
import { browserHistory } from 'React-router'
export default class Single extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  getDetail(id){
    console.log(id)
    browserHistory.push({
      pathname: `/zen/${id}`
    })
  }
  render () {
    const { name, price, startDate, days,id,rou,user  } = this.props.item
    return (
      <div className='main_mod'>
        <Row>
          <Col span={5}><img src={Img1} width='150px' height='100px' /></Col>
          <Col span={15}>
            <h2><a>{name}</a></h2>
            <div className='product_sublist'>
              <Row>
                <Col span={20}>
                  <div className='product_info' />
                  <dl className='start_info'> <dt>{rou.startPoint}出发</dt>
                    <dd title={rou.allPoint}>{rou.allPoint}</dd></dl>
                  <div className='product_schedule'> <p>  开始时间： {startDate}出发
            </p> </div>
                  <p className='product_retail' title={user.uname}>导游：{user.uname}<i className='saleout_icon' /></p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={3}><span className='sr_price'><dfn>¥</dfn><strong>{price}</strong>起</span>
            <Button style={{ marginTop:30 }} onClick={() => { this.getDetail(id) }}>购买</Button></Col>
        </Row>
      </div>
    )
  }
}
