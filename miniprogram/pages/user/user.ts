// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});

//  import { reqGet } from '../../utils/request';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    showTopTips: false,

    date: "2016-09-01",
    time: "12:01",
    saySome: '',

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    formData: {
    },
    rules: [
      {
        name: 'mobile',
        rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
      }
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
  },
  getUserInfo(e: any) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  bindDateChange: function (e: DomEvent) {
      this.setData({
          date: e.detail.value,
          [`formData.date`]: e.detail.value
      })
  },
  bindTextChange: function (e: DomEvent) {
    this.setData({
      saySome: e.detail.value,
      [`formData.saySome`]: e.detail.value
    })
  },
  formInputChange: function(e: DomEvent) {
      const {field} = e.currentTarget.dataset;
      this.setData({
          [`formData.${field}`]: e.detail.value
      })
  },
  bindTimeChange: async function (e: DomEvent) {
      this.setData({
          time: e.detail.value,
          [`formData.time`]: e.detail.value
      })
  },
  submitForm() {
      this.selectComponent('#form').validate(async (valid: boolean, errors: Array<validateInfo>) => {
          if (!valid) {
              const firstError = Object.keys(errors);
              if (firstError.length) {
                  this.setData({
                      error: errors[parseInt(firstError[0])].message
                  })
              }
          } else {
              wx.showToast({
                title: '校验通过'
              });
              const defaultInfo = {
                date: '2020-12-08',
                time: '12:10',
                saySome: 'nothing'
              };
              await db.collection('interviewee').add({
                data: {
                  formData: Object.assign(defaultInfo, this.data.formData),
                  userInfo: this.data.userInfo,
                  openId: app.globalData.openId,
                  status: 'apply'
                }
              });
              console.log(this.data.formData, 'open');
          }
      })
  }
})
