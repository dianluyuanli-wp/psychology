Page({
    // onShareAppMessage() {
    //   return {
    //     title: 'swiper',
    //     path: 'page/component/pages/swiper/swiper'
    //   }
    // },
  
    data: {
      background: [{ src: 'http://cms-bucket.ws.126.net/2020/0123/564125bej00q4jo8e002tc000go008cc.jpg?imageView&thumbnail=600y300'},
        { src: 'http://cms-bucket.ws.126.net/2020/0119/f543f553j00q4cbge002uc000go008cc.jpg?imageView&thumbnail=600y300'}, {
          src: 'http://cms-bucket.ws.126.net/2020/0123/f25d19daj00q4ji4k001uc000go008cc.jpg?imageView&thumbnail=600y300'
        }],
      couList: [{
        name: 'wang',
        detail: '北京地坛医院',
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
    }
  })