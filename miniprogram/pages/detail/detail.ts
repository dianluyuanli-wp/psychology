const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});
const _ = db.command;
import { getYMD } from '../../utils/util';

const weekDayWord = ['日', '一', '二', '三', '四', '五', '六'];

function getDateList(list: Array<any>) {
  const now = new Date();
  const weekDay = now.getDay();
  const nowTime = now.getTime();
  return new Array(7).fill('').map((_, index) => {
    const stamp = nowTime + 24 * 60 * 60 * 1000 * (index + 1);
    return {
      date: stamp,
      dateString: (new Date(stamp)).getDate().toString(),
      weekDay: '周' + weekDayWord[(index + weekDay + 1) % 7],
      periodList: list.filter(item => item.date === getYMD(new Date(stamp)))
    }
  })
}

async function prepareData(route: string, setFunc: Function) {
  const res = await db.collection('period').where({
    counselorId: route,
    date: _.gt(getYMD(new Date())),
    status: 'on'
  }).orderBy('date', 'asc').limit(28).get();
  const timeList = res.data.map(item => {
    const { date, startTime, endTime, counselorId, _id, count } = item;
    return {
      date,
      startTime,
      endTime,
      time: startTime + '--' + endTime,
      counselorId,
      count,
      _id
    }
  }) as Array<any>
  setFunc({
    dateList: getDateList(timeList),
    timeList: timeList
  })
}

//  一次性消息订阅
function subscribeMes() {
  wx.requestSubscribeMessage({
    tmplIds: ['TsHTB3iCONjwJijrDPLH2eQUq3QmxPk5iNfFiRcZU3M'],
  })
}

const dullTimeObj = { date: '', time: '', startTime: '', endTime: '', _id: '', counselorId: ''};

Page({
    data: {
        counselor: '',
        heightListhId: '',
        timeList: [dullTimeObj],

        //  dateList: [{ date: 0, dateString: '', weekDay: '', periodList: [dullTimeObj]}],
        dateList: [],

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
        ],
        show: false,
        counselorInfo: {}
    },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
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
        counselor: route,
        counselorInfo: app.globalData.couList?.find(({ name }) => name === route)
    });
    prepareData(route, this.setData.bind(this));
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
  itemClick(event: DomEvent) {
    this.setData({
      heightListhId: event.currentTarget.dataset.id,
      show: true
    })
  },
  submitForm() {
      //  这个订阅放在里面貌似无法触发
      subscribeMes();
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
            if (this.data.heightListhId === '') {
              this.setData({
                  error: '请选择预约时段'
              })
              return;
            }
            const defaultInfo = {
              saySome: 'nothing'
            };
            const { date, time, _id, counselorId } = this.data.timeList.find(item => item._id === this.data.heightListhId) || dullTimeObj;
            //    避免重复预约
            const res = await db.collection('period').where({
              _id,
              count: 1
            }).count();
            if (res.total === 0) {
              this.setData({
                  error: '该时段不可预约'
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
            this.setData({
              show: false
            })
          }
      })
  }
})

export default {};