import { makeAutoObservable } from 'mobx'
// import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo() {
    // 异步请求获取res
    const res = {
      data: {
        id: '20221206',
        name: 'duanhb',
        photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        mobile: '17899990987',
        gender: '0',
        birthday: '2020-01-01'
      }
    }
    this.userInfo = res.data
  }
}
export default UserStore