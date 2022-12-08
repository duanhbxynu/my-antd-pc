import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'

import appRoute from '@/router/router'
import NotFound from '@/pages/NotFound'

export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Routes>
          {/* {
            appRoute.map(item => <Route path={item.path} element={item.component} key={item.path} />)
          } */}
          {/* 需要鉴权的路由 */}
          <Route path="/*" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          } >
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </ConfigProvider>
    )
  }
}