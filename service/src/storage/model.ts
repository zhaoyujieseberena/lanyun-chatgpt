import type { ObjectId } from 'mongodb'

class UserInfo {
  _id: ObjectId
  token: string
  times: number
  createTime: string
  verifyTime?: string
  constructor(token: string, times: number) {
    this.token = token
    this.times = times
    this.createTime = new Date().toLocaleString()
    this.verifyTime = null
  }
}

export { UserInfo }
