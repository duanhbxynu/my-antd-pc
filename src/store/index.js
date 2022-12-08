import React from "react"
import LoginStore from "./loginStore"
import UserStore from './userStore'

class RootStore {
  constructor() {
    // 组合模块
    this.LoginStore = new LoginStore()
    this.UserStore = new UserStore()
  }
}
// 导入useStore方法组件使用数据
const StoreContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoreContext)