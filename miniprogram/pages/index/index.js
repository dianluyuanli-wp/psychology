"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var app = getApp();
var db = wx.cloud.database({
    env: 'test-psy-qktuk'
});
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
        formData: {},
        rules: [
            {
                name: 'mobile',
                rules: [{ required: true, message: 'mobile必填' }, { mobile: true, message: 'mobile格式不对' }],
            }
        ]
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
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
    bindDateChange: function (e) {
        var _a;
        this.setData((_a = {
                date: e.detail.value
            },
            _a["formData.date"] = e.detail.value,
            _a));
    },
    bindTextChange: function (e) {
        var _a;
        this.setData((_a = {
                saySome: e.detail.value
            },
            _a["formData.saySome"] = e.detail.value,
            _a));
    },
    formInputChange: function (e) {
        var _a;
        var field = e.currentTarget.dataset.field;
        this.setData((_a = {},
            _a["formData." + field] = e.detail.value,
            _a));
    },
    bindTimeChange: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                this.setData((_a = {
                        time: e.detail.value
                    },
                    _a["formData.time"] = e.detail.value,
                    _a));
                return [2];
            });
        });
    },
    submitForm: function () {
        var _this = this;
        this.selectComponent('#form').validate(function (valid, errors) { return __awaiter(_this, void 0, void 0, function () {
            var firstError, defaultInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!valid) return [3, 1];
                        firstError = Object.keys(errors);
                        if (firstError.length) {
                            this.setData({
                                error: errors[parseInt(firstError[0])].message
                            });
                        }
                        return [3, 3];
                    case 1:
                        wx.showToast({
                            title: '校验通过'
                        });
                        defaultInfo = {
                            date: '2020-12-08',
                            time: '12:10',
                            saySome: 'nothing'
                        };
                        return [4, db.collection('interviewee').add({
                                data: {
                                    formData: Object.assign(defaultInfo, this.data.formData),
                                    userInfo: this.data.userInfo,
                                    openId: app.globalData.openId
                                }
                            })];
                    case 2:
                        _a.sent();
                        console.log(this.data.formData, 'open');
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        }); });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUVqQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMzQixHQUFHLEVBQUUsZ0JBQWdCO0NBQ3RCLENBQUMsQ0FBQztBQUlILElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFFbkQsV0FBVyxFQUFFLEtBQUs7UUFFbEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsRUFBRTtRQUVYLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLFlBQVksRUFBRSxDQUFDO1FBRWYsUUFBUSxFQUFFLEVBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFDLENBQUM7YUFDdEY7U0FDRjtLQUNGO0lBRUQsV0FBVztRQUNULEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsY0FBYztTQUNwQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUFOLGlCQTJCQztRQTFCQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUks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QUNsQixJQUFJLEVBQUUsT0FBTzs0QkFDYixPQUFPLEVBQUUsU0FBUzt5QkFDbkIsQ0FBQzt3QkFDRixXQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDO2dDQUNyQyxJQUFJLEVBQUU7b0NBQ0osUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO29DQUN4RCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO29DQUM1QixNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO2lDQUM5Qjs2QkFDRixDQUFDLEVBQUE7O3dCQU5GLFNBTUUsQ0FBQzt3QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7OzthQUUvQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5cclxuLy8gIGltcG9ydCB7IHJlcUdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgbW90dG86ICdIZWxsbyBXb3JsZCcsXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcblxyXG4gICAgc2hvd1RvcFRpcHM6IGZhbHNlLFxyXG5cclxuICAgIGRhdGU6IFwiMjAxNi0wOS0wMVwiLFxyXG4gICAgdGltZTogXCIxMjowMVwiLFxyXG4gICAgc2F5U29tZTogJycsXHJcblxyXG4gICAgYWNjb3VudHM6IFtcIuW+ruS/oeWPt1wiLCBcIlFRXCIsIFwiRW1haWxcIl0sXHJcbiAgICBhY2NvdW50SW5kZXg6IDAsXHJcblxyXG4gICAgZm9ybURhdGE6IHtcclxuICAgIH0sXHJcbiAgICBydWxlczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ21vYmlsZScsXHJcbiAgICAgICAgcnVsZXM6IFt7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXlv4XloasnfSwge21vYmlsZTogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeagvOW8j+S4jeWvuSd9XSxcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXHJcbiAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcclxuICAgIH0pXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXHJcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxyXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xyXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxyXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgIH0pXHJcbiAgfSxcclxuICBiaW5kRGF0ZUNoYW5nZTogZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEuZGF0ZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRleHRDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2F5U29tZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgIFtgZm9ybURhdGEuc2F5U29tZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGZvcm1JbnB1dENoYW5nZTogZnVuY3Rpb24oZTogRG9tRXZlbnQpIHtcclxuICAgICAgY29uc3Qge2ZpZWxkfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRpbWVDaGFuZ2U6IGFzeW5jIGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdGltZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLnRpbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KCcjZm9ybScpLnZhbGlkYXRlKGFzeW5jICh2YWxpZDogYm9vbGVhbiwgZXJyb3JzOiBBcnJheTx2YWxpZGF0ZUluZm8+KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JzW3BhcnNlSW50KGZpcnN0RXJyb3JbMF0pXS5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmoKHpqozpgJrov4cnXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAyMC0xMi0wOCcsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiAnMTI6MTAnLFxyXG4gICAgICAgICAgICAgICAgc2F5U29tZTogJ25vdGhpbmcnXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBPYmplY3QuYXNzaWduKGRlZmF1bHRJbmZvLCB0aGlzLmRhdGEuZm9ybURhdGEpLFxyXG4gICAgICAgICAgICAgICAgICB1c2VySW5mbzogdGhpcy5kYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgICBvcGVuSWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5JZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5mb3JtRGF0YSwgJ29wZW4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==