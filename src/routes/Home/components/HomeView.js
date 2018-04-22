import React from 'react'
import './HomeView.scss'
import { Row, Col, Carousel } from 'antd'
import 'antd/dist/antd.css'
import Public from '../modules/Public'
import Search from '../modules/Search'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
export default class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    console.log(this.state.phone)
    return (
      <div >
        <Carousel autoplay>
          <img src={img1} />
          <img src={img2} />
          <img src={img3} />
          <img src={img4} />
        </Carousel>
        <Row>
          <Col span={12} style={{ paddingRight:8 }}>
            <Search />
          </Col>
          <Col span={12} style={{ paddingLeft: 8 }}>
            <Public />
          </Col>
        </Row>
      </div>
    )
  }
}

