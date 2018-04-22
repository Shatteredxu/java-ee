import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import React, { Component } from 'react'
// import Info from '../../components/Side/sider'
class CoreLayout extends Component {
  render() {
    var path = this.props.location.pathname;
    var isShow = true
    if (path == '/login' || path == '/register') {
      isShow = false
    }
    return (
      <div>
        <div className='body'>
          {isShow ? <Header /> : ''}
          <div className='core-layout__viewport'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default CoreLayout
