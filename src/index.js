import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/reset.css'
import App from './App'

const container = document.getElementById('root')
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, container
)