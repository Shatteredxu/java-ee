import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import logo from './海鲜.png'
import home from './home-big.png'
import lab from './实验室编号.png'
import item from './item.png'
import { Menu, Dropdown } from 'antd'

// import {Row, Col} from 'antd'

const menuitem = (
  <Menu>
    <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/setting' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>修改信息</Link>
    </Menu.Item>
    <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/route' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>个人中心</Link>
    </Menu.Item>
   

  </Menu>
)

class Header extends React.Component {

  render () {
    return (
      <div className='head'>
        <div className='navbar'>
          <div className='nav_con'>
            <Dropdown overlay={menuitem} placement='bottomCenter'>
              <span className='nav_logo'>
                <a href=''>
                  <img src={logo} alt='' />
                </a>
              </span>
            </Dropdown>
            <IndexLink to='/' activeClassName='active'>
              <span className='nav_item'>
                <img src={home} alt='' />
                主页
            </span>
            </IndexLink>
            <Link activeClassName='active' to='/counter'>
              <span className='nav_item'>
                <img src={lab} alt='' />
                旅游团列表
            </span>
            </Link>
            <Link activeClassName='active' to='/routes'>
              <span className='nav_item'>
                <img src={item} alt='' />
                路线列表
            </span>
            </Link>
            <Link activeClassName='active' to='/order'>
              <span className='nav_item'>
                <img src={item} alt='' />
                订单列表
            </span>
            </Link>
            
          </div>
        </div>
      </div>
    )
  }
}

export default Header

