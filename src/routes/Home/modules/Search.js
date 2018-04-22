import React, { Component } from 'react'
import '../components/HomeView.scss'
import { Input, Button, Row, Col, DatePicker, Icon, Select } from 'antd'

const Option = Select.Option
class Search extends Component {
  constructor(props){
    super(props)
    this.state={
      state:true,//true:旅行团，false：路线
    }
  }

  changState=()=>{ 
    this.setState({state:!this.state.state})
  }

  onChange(date, dateString) {
  console.log(date, dateString);
}

  handleChange(value) {
  console.log(`selected ${value}`);
  }

  render () {
    const {state} = this.state
    return (
      <div className='search'>
        <div className="sear_hea">
          <h2>{state?'旅行团搜索':'路线搜索'}</h2>
        </div>
        <div className="sear_con">
        {state?
          //旅行团
          <div className='lxt'>
            <Row>
              <Col span={6}>
                <span className='span'>出发时间:</span>
              </Col>
              <Col span={11}>
                <DatePicker onChange={this.onChange.bind(this)} />
              </Col>
              <Col span={4}>
                <Button type='primary'>搜索</Button>
              </Col>
            </Row>
          </div>: 
          //路线
          <div style={{textAlign:'center'}} className='lx'>
          <Row style={{width:'50%',marginLeft:'auto',marginRight:'auto'}}>
            <Col span={4}>
            <span className='span'>起点:</span></Col>
            <Col span={19}>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)} style={{width:'100%'}}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled">Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            </Col>
          </Row>
          <Row style={{width:'50%',marginLeft:'auto',marginRight:'auto',marginTop:20}}>
            <Col span={4}>
            <span className='span'>终点:</span></Col>
            <Col span={19}>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)} style={{width:'100%'}}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled">Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            </Col>
          </Row>          
          <Button style={{width:'50%',marginLeft:'auto',marginRight:'auto',marginTop:20}} type='primary'>搜 索</Button>              
          </div> }
        </div>
        <div className="sear_change">
          <span href="" onClick={(e)=>this.changState()} >
          {state?'路 线 搜 索':'旅 行 团 搜 索'}</span>
        </div>
      </div>
    )
  }
}

export default Search
