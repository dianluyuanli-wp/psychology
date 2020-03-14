const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});
//  const _ = db.command;

async function prepareData(setFunc: Function) {
  const res = await db.collection('userDetail').limit(6).get();
  const counselorList = res.data.map(item => {
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
}

Page({
    // onShareAppMessage() {
    //   return {
    //     title: 'swiper',
    //     path: 'page/component/pages/swiper/swiper'
    //   }
    // },
  
    data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      background: [{ src: 'http://cms-bucket.ws.126.net/2020/0123/564125bej00q4jo8e002tc000go008cc.jpg?imageView&thumbnail=600y300'},
        { src: 'http://cms-bucket.ws.126.net/2020/0119/f543f553j00q4cbge002uc000go008cc.jpg?imageView&thumbnail=600y300'}, {
          src: 'http://cms-bucket.ws.126.net/2020/0123/f25d19daj00q4ji4k001uc000go008cc.jpg?imageView&thumbnail=600y300'
        }],
      couList: [{
        name: 'wang',
        detail: '钟南山，男，汉族，福建厦门人，1936年10月出生于南京，中共党员，中国工程院院士，著名呼吸病学专家，中国抗击非典型肺炎的领军人物，曾任广州医学院院长、党委书记，广州市呼吸疾病研究所所长、广州呼吸疾病国家重点实验室主任、中华医学会会长。钟南山出生于医学世家；1958年8月，在第一届全运会的比赛测验中，钟南山以54秒2的成绩，打破了当时54秒6的400米栏全国纪录。1960年毕业于北京医学院（今北京大学医学部）；2007年获英国爱丁堡大学荣誉博士；2007年10月任呼吸疾病国家重点实验室主任；2014年获香港中文大学荣誉理学博士',
        img: 'https://bkimg.cdn.bcebos.com/pic/77094b36acaf2edd6474ddbc821001e9380193da?x-bce-process=image/resize,m_fill,w_360,h_280,align_50'
      }, {
        name: 'zhang',
        detail: '我也不知道该怎么变了',
        img: 'https://bkimg.cdn.bcebos.com/pic/1c950a7b02087bf4e7c348e5fed3572c11dfcf8b?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1'
      }],
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500
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
      prepareData(this.setData.bind(this));
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