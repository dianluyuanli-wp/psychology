// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    //  云函数初始化
    wx.cloud.init({
      env: 'test-psy-qktuk'
    });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    const openId = wx.getStorageSync('openId') || '';
    if (!openId) {
      wx.cloud.callFunction({
        name:'getOpenId',
        complete: (res: any) => {
          const openid = res.result.openid;
          console.log('111openid--', res.result.openid);
          wx.setStorageSync('openId', openid);
        }
      })
    }
    console.log(openId, 'dddd');

    // 登录
    wx.login({
      success: res => {
        console.log(res.code, res, '登录');
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res,123);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      },
    })
  },
})