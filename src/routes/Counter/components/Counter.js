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
      groupList:[]
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
    var data = `name=${value}`
    POST('/getGroup.action', data, re => {
      console.log(re)
      this.setState({ groupList:re.data })
    })
  }
  render () {
    return (
      <div className='traBody'>
        <div className='searchInput'>
          <Search
            placeholder='input search text'
            onSearch={value => this.search(value)}
            enterButton
          />
        </div>
        {this.state.groupList.map((item, i) => {
          return (
            <Single key={i} item={item} />
          )
        })
        }

      </div>
    )
  }
}
