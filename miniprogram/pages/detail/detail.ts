const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});

Page({
    data: {
        counselor: '',
        heighLightIndex: 1000,
        timeList: [{ date: '', time: '', _id: '', counselorId: ''}],

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
    check(event: DomEvent) {
        this.setData({
            heighLightIndex: event.currentTarget.dataset.index
        })
    },
      // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  async onLoad() {
    let pages = getCurrentPages();
    let currPage = null;
    // console.log(pages) 的到一个数组
    if (pages.length) {
      // 获取当前页面的对象（上边所获得的数组中最后一项就是当前页面的对象）
      currPage = pages[pages.length - 1];
    }
    // 获取当前页面的路由
    let route = currPage?.options.name;
    this.setData({
        counselor: route
    });
    const res = await db.collection('period').where({
      counselorId: route
    }).get();
    this.setData({
      timeList: res.data.map(item => {
        const { date, startTime, endTime, counselorId } = item;
        return {
          date,
          time: startTime + '--' + endTime,
          counselorId
        }
      }) as Array<any>
    });
    console.log(res);
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
  checkfy() {

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
              //    预约时段必选
              if (this.data.heighLightIndex === 1000) {
                this.setData({
                    error: '请选择预约时段'
                })
                return;
              }
              const defaultInfo = {
                saySome: 'nothing'
              };
              const { date, time, _id, counselorId } = this.data.timeList[this.data.heighLightIndex];
              //    避免重复预约
              const res = await db.collection('interviewee').where({
                openId: app.globalData.openId,
                _id
              }).count();
              if (res.total) {
                this.setData({
                    error: '该时段您已经预约过'
                })
                return;
              }
              await db.collection('interviewee').add({
                data: {
                  formData: Object.assign(defaultInfo, this.data.formData, { date, time }),
                  userInfo: app.globalData.userInfo,
                  openId: app.globalData.openId,
                  status: 'apply',
                  counselorName: this.data.counselor,
                  counselorId: counselorId,
                  periodId: _id
                }
              });
              wx.showToast({
                title: '提交成功'
              });
          }
      })
  }
})

export default {};