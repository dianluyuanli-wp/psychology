"use strict";
App({
    globalData: {},
    onLaunch: function () {
        var _this = this;
        wx.cloud.init({
            env: 'test-psy-qktuk'
        });
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        var openId = wx.getStorageSync('openId') || '';
        if (!openId) {
            wx.cloud.callFunction({
                name: 'getOpenId',
                complete: function (res) {
                    var openid = res.result.openid;
                    wx.setStorageSync('openId', openid);
                    openId = openid;
                }
            });
        }
        this.globalData.openId = openId;
        wx.login({
            success: function (res) {
                console.log(res.code, res, '登录');
            },
        });
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            _this.globalData.userInfo = res.userInfo;
                            if (_this.userInfoReadyCallback) {
                                _this.userInfoReadyCallback(res);
                            }
                        },
                    });
                }
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUUsRUFBRTtJQUNkLFFBQVE7UUFBUixpQkFrREM7UUFoREMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDWixHQUFHLEVBQUUsZ0JBQWdCO1NBQ3RCLENBQUMsQ0FBQztRQUVILElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDeEIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUNwQixJQUFJLEVBQUMsV0FBVztnQkFDaEIsUUFBUSxFQUFFLFVBQUMsR0FBUTtvQkFDakIsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ2pDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNwQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUNsQixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFHaEMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVuQyxDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBRXJDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ2IsT0FBTyxFQUFFLFVBQUEsR0FBRzs0QkFFVixLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBOzRCQUl2QyxJQUFJLEtBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDOUIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFBOzZCQUNoQzt3QkFDSCxDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwLnRzXHJcbkFwcDxJQXBwT3B0aW9uPih7XHJcbiAgZ2xvYmFsRGF0YToge30sXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICAvLyAg5LqR5Ye95pWw5Yid5aeL5YyWXHJcbiAgICB3eC5jbG91ZC5pbml0KHtcclxuICAgICAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbiAgICB9KTtcclxuICAgIC8vIOWxleekuuacrOWcsOWtmOWCqOiDveWKm1xyXG4gICAgY29uc3QgbG9ncyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cclxuICAgIGxvZ3MudW5zaGlmdChEYXRlLm5vdygpKVxyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ3MnLCBsb2dzKTtcclxuXHJcbiAgICBsZXQgb3BlbklkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcpIHx8ICcnO1xyXG4gICAgaWYgKCFvcGVuSWQpIHtcclxuICAgICAgd3guY2xvdWQuY2FsbEZ1bmN0aW9uKHtcclxuICAgICAgICBuYW1lOidnZXRPcGVuSWQnLFxyXG4gICAgICAgIGNvbXBsZXRlOiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9wZW5pZCA9IHJlcy5yZXN1bHQub3BlbmlkO1xyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcsIG9wZW5pZCk7XHJcbiAgICAgICAgICBvcGVuSWQgPSBvcGVuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxEYXRhLm9wZW5JZCA9IG9wZW5JZDtcclxuXHJcbiAgICAvLyDnmbvlvZVcclxuICAgIHd4LmxvZ2luKHtcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSwgcmVzLCAn55m75b2VJyk7XHJcbiAgICAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgIHd4LmdldFNldHRpbmcoe1xyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcclxuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcclxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAvLyDlj6/ku6XlsIYgcmVzIOWPkemAgee7meWQjuWPsOino+eggeWHuiB1bmlvbklkXHJcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcblxyXG4gICAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgICAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICB9LFxyXG59KSJdfQ==