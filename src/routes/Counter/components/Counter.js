import React from 'react'
import './Counter.scss'
import { Row, Col, Carousel, Button, Input } from 'antd'
import 'antd/dist/antd.css'
import { POST } from '../../../components/commonModules/POST'
import Single from '../modules/single'
const Search = Input.Search
export default class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groupList:[],
      user:[],
      route:[]
    }
  }
  componentDidMount () {
    POST('/getGroup.action', ``, (re) => {
      if (re.state == 1) {
        this.setState({ groupList:re.data })
      }
    })
  }
  search (value) {
    console.log(value)
    var data = `t=${value}`
    POST('/getLikeGroup.action', data, re => {
      console.log(re)
      this.setState({ groupList:re.data })
    })
  }
  render () {
    console.log(this.state.groupList.length )
    return (
      <div className='traBody'>
        <div className='searchInput'>
          <Search
            placeholder='input search text'
            onSearch={value => this.search(value)}
            enterButton
          />
        </div>

        {this.state.groupList.length ? this.state.groupList.map((item, i) => {
          return (
            <Single key={i} item={item} />
          )
        }) : <span style={{display:'inline-block' ,margin:'0 auto'}}>没有可选择的</span>
        }
      </div>
    )
  }
}
