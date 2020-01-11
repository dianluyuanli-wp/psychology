"use strict";
var app = getApp();
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
        rules: [{
            name: 'radio',
            rules: {required: true, message: '单选列表是必选项'},
        }, {
            name: 'checkbox',
            rules: {required: true, message: '多选列表是必选项'},
        }, {
            name: 'qq',
            rules: {required: true, message: 'qq必填'},
        }, {
            name: 'mobile',
            rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
        }, {
            name: 'vcode',
            rules: {required: true, message: '验证码必填'},
        }, {
            name: 'idcard',
            rules: {required: true, message: 'idcard必填'},
        }]
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function () {
        var _this = this;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = function (res) {
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        else {
            wx.getUserInfo({
                success: function (res) {
                    app.globalData.userInfo = res.userInfo;
                    _this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    });
                },
            });
        }
    },
    getUserInfo: function (e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },

    methods: {
        radioChange: function (e) {
            console.log('radio发生change事件，携带value值为：', e.detail.value);
    
            var radioItems = this.data.radioItems;
            for (var i = 0, len = radioItems.length; i < len; ++i) {
                radioItems[i].checked = radioItems[i].value == e.detail.value;
            }
    
            this.setData({
                radioItems: radioItems,
                [`formData.radio`]: e.detail.value
            });
        },
        checkboxChange: function (e) {
            console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    
            var checkboxItems = this.data.checkboxItems, values = e.detail.value;
            for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
                checkboxItems[i].checked = false;
    
                for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                    if(checkboxItems[i].value == values[j]){
                        checkboxItems[i].checked = true;
                        break;
                    }
                }
            }
    
            this.setData({
                checkboxItems: checkboxItems,
                [`formData.checkbox`]: e.detail.value
            });
        },
        bindDateChange: function (e) {
            this.setData({
                date: e.detail.value,
                [`formData.date`]: e.detail.value
            })
        },
        formInputChange(e) {
            const {field} = e.currentTarget.dataset
            this.setData({
                [`formData.${field}`]: e.detail.value
            })
        },
        bindTimeChange: function (e) {
            this.setData({
                time: e.detail.value
            })
        },
        bindCountryCodeChange: function(e){
            console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    
            this.setData({
                countryCodeIndex: e.detail.value
            })
        },
        bindCountryChange: function(e) {
            console.log('picker country 发生选择改变，携带值为', e.detail.value);
    
            this.setData({
                countryIndex: e.detail.value
            })
        },
        bindAccountChange: function(e) {
            console.log('picker account 发生选择改变，携带值为', e.detail.value);
    
            this.setData({
                accountIndex: e.detail.value
            })
        },
        bindAgreeChange: function (e) {
            this.setData({
                isAgree: !!e.detail.value.length
            });
        },
        submitForm() {
            this.selectComponent('#form').validate((valid, errors) => {
                console.log('valid', valid, errors)
                if (!valid) {
                    const firstError = Object.keys(errors)
                    if (firstError.length) {
                        this.setData({
                            error: errors[firstError[0]].message
                        })
    
                    }
                } else {
                    wx.showToast({
                        title: '校验通过'
                    })
                }
            })
        }

    }
});

// Component({
//     data: {
//         showTopTips: false,

//         radioItems: [
//             {name: 'cell standard', value: '0', checked: true},
//             {name: 'cell standard', value: '1'}
//         ],
//         checkboxItems: [
//             {name: 'standard is dealt for u.', value: '0', checked: true},
//             {name: 'standard is dealicient for u.', value: '1'}
//         ],
//         items: [
//             {name: 'USA', value: '美国'},
//             {name: 'CHN', value: '中国', checked: 'true'},
//             {name: 'BRA', value: '巴西'},
//             {name: 'JPN', value: '日本'},
//             {name: 'ENG', value: '英国'},
//             {name: 'TUR', value: '法国'},
//         ],

//         date: "2016-09-01",
//         time: "12:01",

//         countryCodes: ["+86", "+80", "+84", "+87"],
//         countryCodeIndex: 0,

//         countries: ["中国", "美国", "英国"],
//         countryIndex: 0,

//         accounts: ["微信号", "QQ", "Email"],
//         accountIndex: 0,

//         isAgree: false,
//         formData: {

//         },
//         rules: [{
//             name: 'radio',
//             rules: {required: true, message: '单选列表是必选项'},
//         }, {
//             name: 'checkbox',
//             rules: {required: true, message: '多选列表是必选项'},
//         }, {
//             name: 'qq',
//             rules: {required: true, message: 'qq必填'},
//         }, {
//             name: 'mobile',
//             rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
//         }, {
//             name: 'vcode',
//             rules: {required: true, message: '验证码必填'},
//         }, {
//             name: 'idcard',
//             rules: {required: true, message: 'idcard必填'},
//         }]
//     },
//     methods: {
//         radioChange: function (e) {
//             console.log('radio发生change事件，携带value值为：', e.detail.value);
    
//             var radioItems = this.data.radioItems;
//             for (var i = 0, len = radioItems.length; i < len; ++i) {
//                 radioItems[i].checked = radioItems[i].value == e.detail.value;
//             }
    
//             this.setData({
//                 radioItems: radioItems,
//                 [`formData.radio`]: e.detail.value
//             });
//         },
//         checkboxChange: function (e) {
//             console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    
//             var checkboxItems = this.data.checkboxItems, values = e.detail.value;
//             for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
//                 checkboxItems[i].checked = false;
    
//                 for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
//                     if(checkboxItems[i].value == values[j]){
//                         checkboxItems[i].checked = true;
//                         break;
//                     }
//                 }
//             }
    
//             this.setData({
//                 checkboxItems: checkboxItems,
//                 [`formData.checkbox`]: e.detail.value
//             });
//         },
//         bindDateChange: function (e) {
//             this.setData({
//                 date: e.detail.value,
//                 [`formData.date`]: e.detail.value
//             })
//         },
//         formInputChange(e) {
//             const {field} = e.currentTarget.dataset
//             this.setData({
//                 [`formData.${field}`]: e.detail.value
//             })
//         },
//         bindTimeChange: function (e) {
//             this.setData({
//                 time: e.detail.value
//             })
//         },
//         bindCountryCodeChange: function(e){
//             console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    
//             this.setData({
//                 countryCodeIndex: e.detail.value
//             })
//         },
//         bindCountryChange: function(e) {
//             console.log('picker country 发生选择改变，携带值为', e.detail.value);
    
//             this.setData({
//                 countryIndex: e.detail.value
//             })
//         },
//         bindAccountChange: function(e) {
//             console.log('picker account 发生选择改变，携带值为', e.detail.value);
    
//             this.setData({
//                 accountIndex: e.detail.value
//             })
//         },
//         bindAgreeChange: function (e) {
//             this.setData({
//                 isAgree: !!e.detail.value.length
//             });
//         },
//         submitForm() {
//             this.selectComponent('#form').validate((valid, errors) => {
//                 console.log('valid', valid, errors)
//                 if (!valid) {
//                     const firstError = Object.keys(errors)
//                     if (firstError.length) {
//                         this.setData({
//                             error: errors[firstError[0]].message
//                         })
    
//                     }
//                 } else {
//                     wx.showToast({
//                         title: '校验通过'
//                     })
//                 }
//             })
//         }

//     }
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLGFBQWE7UUFDcEIsUUFBUSxFQUFFLEVBQUU7UUFDWixXQUFXLEVBQUUsS0FBSztRQUNsQixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztLQUNwRDtJQUVELFdBQVc7UUFDVCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELE1BQU07UUFBTixpQkEyQkM7UUExQkMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQ2pDLFdBQVcsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQTtTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUc1QixHQUFHLENBQUMscUJBQXFCLEdBQUcsVUFBQSxHQUFHO2dCQUM3QixLQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtvQkFDdEIsV0FBVyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQTtZQUNKLENBQUMsQ0FBQTtTQUNGO2FBQU07WUFFTCxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUNiLE9BQU8sRUFBRSxVQUFBLEdBQUc7b0JBQ1YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTtvQkFDdEMsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7d0JBQ3RCLFdBQVcsRUFBRSxJQUFJO3FCQUNsQixDQUFDLENBQUE7Z0JBQ0osQ0FBQzthQUNGLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUNELFdBQVcsWUFBQyxDQUFNO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUMzQixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtb3R0bzogJ0hlbGxvIFdvcmxkJyxcbiAgICB1c2VySW5mbzoge30sXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgfSxcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXG4gIGJpbmRWaWV3VGFwKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcbiAgICB9KVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXG4gICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XG4gICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgfSlcbiAgfSxcbn0pXG4iXX0=