import React from 'react'
import { render } from 'react-dom'

// 安装history包，并创建新的路由，配置history参数
import { HistoryRouter, history } from '@/utils/history'

import 'antd/dist/reset.css'
import './index.less'
import App from './App'

const container = document.getElementById('root')
render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>, container
)