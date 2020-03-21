/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    openId?: string,
    pageInfo?: PageInfoObj
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface PageInfoObj {
  imgList: Array<singleImg>,
  text?: string
}
interface singleImg {
  uid: string, 
  size: number,
  name: string, 
  type: string, 
  url: string
}
