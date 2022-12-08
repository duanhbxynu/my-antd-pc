import React, { useEffect } from "react"
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.less'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const location = useLocation()
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname

  const { UserStore, LoginStore } = useStore()
  useEffect(() => {
    UserStore.getUserInfo()
  }, [UserStore])

  // 退出登录
  const navigate = useNavigate()
  const onLogout = () => {
    LoginStore.logOut()
    navigate('/login')
  }


  return (
    <Layout>
      <Header className="header">
        <div className="logo">Logo</div>
        <div className="user-info">
          <span className="user-name">{UserStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" theme="dark" style={{ height: '100%', borderRight: 0 }} selectedKeys={[selectedKey]}   >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由默认页面 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)