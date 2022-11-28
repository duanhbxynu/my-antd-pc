import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router, Route, Link } from 'react-router-dom'
import routes from './router/router'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <div>123</div>
  // <Router>
  //   <Link to='/'>组件一</Link>
  //   <Link to='/two'>组件二</Link>
  //   {
  //     routes.map((value, key) => {
  //       if (value.exact) {
  //         return <Route exact path={value.path} component={value.component} key={key}></Route>
  //       } else {
  //         return <Route path={value.path} component={value.component} key={key}></Route>
  //       }
  //     })
  //   }
  // </Router>
)