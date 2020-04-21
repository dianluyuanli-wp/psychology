const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});

async function prepareData(setFunc: Function) {
  //  拉取咨询师详情
  const res = await db.collection('userDetail').where({ identity: 'counselor' }).limit(6).get();
  const counselorList = res.data.filter(item => !item.isFreezed).map(item => {
    const { avatar, name, userInfo } = item;
    return {
      name,
      detail: userInfo,
      img: avatar
    }
  }) as Array<any>;

  setFunc({
    couList: counselorList
  })
  app.globalData.couList = counselorList;
}

async function getPageInfo(setFunc: Function) {
  const res = await db.collection('pageInfo').get();
  const { _id, ...rest } = res.data[0];
  setFunc({
    background: rest.imgList.map((item: { url: string }) => ({ src: item.url }))
  })
  const pageInfo = rest as PageInfoObj;
  app.globalData.pageInfo = pageInfo;
}

Page({  
    data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      background: [],
      couList: [],
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500
    },

    async onLoad() {
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
      //  数据准备
      await Promise.all([getPageInfo(this.setData.bind(this)), prepareData(this.setData.bind(this))]);
    },

    content(event: DomEvent) {
      wx.navigateTo({
        url: '../detail/detail' + '?name=' + event.currentTarget.dataset.name
      })
    },
  
    changeIndicatorDots() {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
  
    changeAutoplay() {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
  
    intervalChange(e: DomEvent) {
      this.setData({
        interval: e.detail.value
      })
    },
  
    durationChange(e: DomEvent) {
      this.setData({
        duration: e.detail.value
      })
    },
  })

  export default {};