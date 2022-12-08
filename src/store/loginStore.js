// 登录模块
import { makeAutoObservable } from "mobx"
import { setToken, getToken, clearToken, http } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.get('http://geek.itheima.net/v1_0/channels', { mobile, code })
    // const resToken = res.data.token
    // mobx存储
    console.log(res, 'store,res')
    this.token = 'aldjflkajdfkaf'
    // 本地存储
    setToken('aldjflkajdfkaf')
  }
  logOut = () => {
    this.token = ''
    clearToken()
  }
}
export default LoginStore