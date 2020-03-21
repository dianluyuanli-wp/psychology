// index.ts
//  获取应用实例
const app = getApp<IAppOption>();

// const db = wx.cloud.database({
//   env: 'test-psy-qktuk'
// });

//  import { reqGet } from '../../utils/request';

Page({
  data: {
      text: ''
  },
  onLoad() {
      this.setData({
        text: app.globalData.pageInfo?.text
      })
  }
})

export default {}
