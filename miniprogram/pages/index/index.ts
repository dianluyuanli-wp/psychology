// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});

import { reqGet } from '../../utils/request';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    showTopTips: false,

    radioItems: [
        {name: 'cell standard', value: '0', checked: true},
        {name: 'cell standard', value: '1'}
    ],
    checkboxItems: [
        {name: 'standard is dealt for u.', value: '0', checked: true},
        {name: 'standard is dealicient for u.', value: '1'}
    ],
    items: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'},
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false,
    formData: {

    },
    rules: [
      // {
      //   name: 'radio',
      //   rules: {required: true, message: '单选列表是必选项'},
      // }, 
      // {
      //   name: 'checkbox',
      //   rules: {required: true, message: '多选列表是必选项'},
      // }, 
      // {
      //   name: 'qq',
      //   rules: {required: true, message: 'qq必填'},
      // }, 
      {
        name: 'mobile',
        rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
      }, 
      // {
      //   name: 'vcode',
      //   rules: {required: true, message: '验证码必填'},
      // }, 
      // {
      //   name: 'idcard',
      //   rules: {required: true, message: 'idcard必填'},
      // }
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  // radioChange: function (e: DomEvent) {
  //     console.log('radio发生change事件，携带value值为：', e.detail.value);

  //     var radioItems = this.data.radioItems;
  //     for (var i = 0, len = radioItems.length; i < len; ++i) {
  //         radioItems[i].checked = radioItems[i].value == e.detail.value;
  //     }

  //     this.setData({
  //         radioItems: radioItems,
  //         [`formData.radio`]: e.detail.value
  //     });
  // },
  // checkboxChange: function (e: DomEvent) {
  //     console.log('checkbox发生change事件，携带value值为：', e.detail.value);

  //     var checkboxItems = this.data.checkboxItems, values = e.detail.value;
  //     for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
  //         checkboxItems[i].checked = false;

  //         for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
  //             if(checkboxItems[i].value == values[j]){
  //                 checkboxItems[i].checked = true;
  //                 break;
  //             }
  //         }
  //     }

  //     this.setData({
  //         checkboxItems: checkboxItems,
  //         [`formData.checkbox`]: e.detail.value
  //     });
  // },
  bindDateChange: function (e: DomEvent) {
    console.log(e);
      this.setData({
          date: e.detail.value,
          [`formData.date`]: e.detail.value
      })
  },
  formInputChange: function(e: DomEvent) {
      const {field} = e.currentTarget.dataset
      this.setData({
          [`formData.${field}`]: e.detail.value
      })
  },
  bindTimeChange: async function (e: DomEvent) {
      let a = await reqGet('123', {
        test: 123
      });
      // let a = await reqPost('chatVerify', {
      //   userName: 'wang',
      //   passWord: '123'
      // });
      console.log(a);
      this.setData({
          time: e.detail.value,
          [`formData.time`]: e.detail.value
      })
  },
  bindCountryCodeChange: function(e: DomEvent){
      console.log('picker country code 发生选择改变，携带值为', e.detail.value);

      this.setData({
          countryCodeIndex: e.detail.value
      })
  },
  bindCountryChange: function(e: DomEvent) {
      console.log('picker country 发生选择改变，携带值为', e.detail.value);

      this.setData({
          countryIndex: e.detail.value
      })
  },
  bindAccountChange: function(e: DomEvent) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);

      this.setData({
          accountIndex: e.detail.value
      })
  },
  bindAgreeChange: function (e: DomEvent) {
      this.setData({
          isAgree: !!e.detail.value.length
      });
  },
  submitForm() {
      this.selectComponent('#form').validate(async (valid: boolean, errors: Array<validateInfo>) => {
          console.log('valid', valid, errors)
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
              const res = await db.collection('interviewee').add({
                data: {
                  tel: 123,
                  date: '19-12-29',
                }
              });
              console.log(res, '提交数据库');
          }
      })
  }
})
