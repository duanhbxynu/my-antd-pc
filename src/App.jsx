import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import appRoute from '@/router/router'
import NotFound from '@/pages/NotFound'

export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Link to='/'>组件一</Link><br />
        <Link to='/two'>组件二</Link><br /><br />
        <Routes>
          {
            appRoute.map(routeObj => <Route path={routeObj.path} element={routeObj.component} key={routeObj.path} />)
          }
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </ConfigProvider>
    )
  }
}