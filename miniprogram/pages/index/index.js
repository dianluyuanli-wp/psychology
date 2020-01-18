"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var db = wx.cloud.database({
    env: 'test-psy-qktuk'
});
var request_1 = require("../../utils/request");
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showTopTips: false,
        radioItems: [
            { name: 'cell standard', value: '0', checked: true },
            { name: 'cell standard', value: '1' }
        ],
        checkboxItems: [
            { name: 'standard is dealt for u.', value: '0', checked: true },
            { name: 'standard is dealicient for u.', value: '1' }
        ],
        items: [
            { name: 'USA', value: '美国' },
            { name: 'CHN', value: '中国', checked: 'true' },
            { name: 'BRA', value: '巴西' },
            { name: 'JPN', value: '日本' },
            { name: 'ENG', value: '英国' },
            { name: 'TUR', value: '法国' },
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
        formData: {},
        rules: [
            {
                name: 'mobile',
                rules: [{ required: true, message: 'mobile必填' }, { mobile: true, message: 'mobile格式不对' }],
            },
        ]
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function () {
        var _this = this;
        console.log(app.globalData.userInfo);
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = function (res) {
                console.log(res.userInfo);
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
    bindDateChange: function (e) {
        var _a;
        console.log(e);
        this.setData((_a = {
                date: e.detail.value
            },
            _a["formData.date"] = e.detail.value,
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
            var a;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, request_1.reqGet('123', {
                            test: 123
                        })];
                    case 1:
                        a = _b.sent();
                        console.log(a);
                        this.setData((_a = {
                                time: e.detail.value
                            },
                            _a["formData.time"] = e.detail.value,
                            _a));
                        return [2];
                }
            });
        });
    },
    bindCountryCodeChange: function (e) {
        console.log('picker country code 发生选择改变，携带值为', e.detail.value);
        this.setData({
            countryCodeIndex: e.detail.value
        });
    },
    bindCountryChange: function (e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);
        this.setData({
            countryIndex: e.detail.value
        });
    },
    bindAccountChange: function (e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);
        this.setData({
            accountIndex: e.detail.value
        });
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
    submitForm: function () {
        var _this = this;
        this.selectComponent('#form').validate(function (valid, errors) { return __awaiter(_this, void 0, void 0, function () {
            var firstError, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('valid', valid, errors);
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
                        return [4, db.collection('interviewee').add({
                                data: {
                                    tel: 123,
                                    date: '19-12-29',
                                }
                            })];
                    case 2:
                        res = _a.sent();
                        console.log(res, '提交数据库');
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        }); });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBRWpDLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzNCLEdBQUcsRUFBRSxnQkFBZ0I7Q0FDdEIsQ0FBQyxDQUFDO0FBRUgsK0NBQTZDO0FBRTdDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFFbkQsV0FBVyxFQUFFLEtBQUs7UUFFbEIsVUFBVSxFQUFFO1lBQ1IsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQztZQUNsRCxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztTQUN0QztRQUNELGFBQWEsRUFBRTtZQUNYLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQztZQUM3RCxFQUFDLElBQUksRUFBRSwrQkFBK0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO1NBQ3REO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7WUFDMUIsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQztZQUMzQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUks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LEdBQUcsRUFBRSxHQUFHO29DQUNSLElBQUksRUFBRSxVQUFVO2lDQUNqQjs2QkFDRixDQUFDLEVBQUE7O3dCQUxJLEdBQUcsR0FBRyxTQUtWO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7OzthQUVqQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5cclxuaW1wb3J0IHsgcmVxR2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcmVxdWVzdCc7XHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBtb3R0bzogJ0hlbGxvIFdvcmxkJyxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuXHJcbiAgICBzaG93VG9wVGlwczogZmFsc2UsXHJcblxyXG4gICAgcmFkaW9JdGVtczogW1xyXG4gICAgICAgIHtuYW1lOiAnY2VsbCBzdGFuZGFyZCcsIHZhbHVlOiAnMCcsIGNoZWNrZWQ6IHRydWV9LFxyXG4gICAgICAgIHtuYW1lOiAnY2VsbCBzdGFuZGFyZCcsIHZhbHVlOiAnMSd9XHJcbiAgICBdLFxyXG4gICAgY2hlY2tib3hJdGVtczogW1xyXG4gICAgICAgIHtuYW1lOiAnc3RhbmRhcmQgaXMgZGVhbHQgZm9yIHUuJywgdmFsdWU6ICcwJywgY2hlY2tlZDogdHJ1ZX0sXHJcbiAgICAgICAge25hbWU6ICdzdGFuZGFyZCBpcyBkZWFsaWNpZW50IGZvciB1LicsIHZhbHVlOiAnMSd9XHJcbiAgICBdLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAgICB7bmFtZTogJ1VTQScsIHZhbHVlOiAn576O5Zu9J30sXHJcbiAgICAgICAge25hbWU6ICdDSE4nLCB2YWx1ZTogJ+S4reWbvScsIGNoZWNrZWQ6ICd0cnVlJ30sXHJcbiAgICAgICAge25hbWU6ICdCUkEnLCB2YWx1ZTogJ+W3tOilvyd9LFxyXG4gICAgICAgIHtuYW1lOiAnSlBOJywgdmFsdWU6ICfml6XmnKwnfSxcclxuICAgICAgICB7bmFtZTogJ0VORycsIHZhbHVlOiAn6Iux5Zu9J30sXHJcbiAgICAgICAge25hbWU6ICdUVVInLCB2YWx1ZTogJ+azleWbvSd9LFxyXG4gICAgXSxcclxuXHJcbiAgICBkYXRlOiBcIjIwMTYtMDktMDFcIixcclxuICAgIHRpbWU6IFwiMTI6MDFcIixcclxuXHJcbiAgICBjb3VudHJ5Q29kZXM6IFtcIis4NlwiLCBcIis4MFwiLCBcIis4NFwiLCBcIis4N1wiXSxcclxuICAgIGNvdW50cnlDb2RlSW5kZXg6IDAsXHJcblxyXG4gICAgY291bnRyaWVzOiBbXCLkuK3lm71cIiwgXCLnvo7lm71cIiwgXCLoi7Hlm71cIl0sXHJcbiAgICBjb3VudHJ5SW5kZXg6IDAsXHJcblxyXG4gICAgYWNjb3VudHM6IFtcIuW+ruS/oeWPt1wiLCBcIlFRXCIsIFwiRW1haWxcIl0sXHJcbiAgICBhY2NvdW50SW5kZXg6IDAsXHJcblxyXG4gICAgaXNBZ3JlZTogZmFsc2UsXHJcbiAgICBmb3JtRGF0YToge1xyXG5cclxuICAgIH0sXHJcbiAgICBydWxlczogW1xyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgbmFtZTogJ3JhZGlvJyxcclxuICAgICAgLy8gICBydWxlczoge3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAn5Y2V6YCJ5YiX6KGo5piv5b+F6YCJ6aG5J30sXHJcbiAgICAgIC8vIH0sIFxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgbmFtZTogJ2NoZWNrYm94JyxcclxuICAgICAgLy8gICBydWxlczoge3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAn5aSa6YCJ5YiX6KGo5piv5b+F6YCJ6aG5J30sXHJcbiAgICAgIC8vIH0sIFxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgbmFtZTogJ3FxJyxcclxuICAgICAgLy8gICBydWxlczoge3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAncXHlv4XloasnfSxcclxuICAgICAgLy8gfSwgXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnbW9iaWxlJyxcclxuICAgICAgICBydWxlczogW3tyZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeW/heWhqyd9LCB7bW9iaWxlOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5qC85byP5LiN5a+5J31dLFxyXG4gICAgICB9LCBcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIG5hbWU6ICd2Y29kZScsXHJcbiAgICAgIC8vICAgcnVsZXM6IHtyZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ+mqjOivgeeggeW/heWhqyd9LFxyXG4gICAgICAvLyB9LCBcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIG5hbWU6ICdpZGNhcmQnLFxyXG4gICAgICAvLyAgIHJ1bGVzOiB7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdpZGNhcmTlv4XloasnfSxcclxuICAgICAgLy8gfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXHJcbiAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcclxuICAgIH0pXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyk7XHJcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLnVzZXJJbmZvKVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcclxuICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXHJcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIHJhZGlvQ2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coJ3JhZGlv5Y+R55SfY2hhbmdl5LqL5Lu277yM5pC65bimdmFsdWXlgLzkuLrvvJonLCBlLmRldGFpbC52YWx1ZSk7XHJcblxyXG4gIC8vICAgICB2YXIgcmFkaW9JdGVtcyA9IHRoaXMuZGF0YS5yYWRpb0l0ZW1zO1xyXG4gIC8vICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmFkaW9JdGVtcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gIC8vICAgICAgICAgcmFkaW9JdGVtc1tpXS5jaGVja2VkID0gcmFkaW9JdGVtc1tpXS52YWx1ZSA9PSBlLmRldGFpbC52YWx1ZTtcclxuICAvLyAgICAgfVxyXG5cclxuICAvLyAgICAgdGhpcy5zZXREYXRhKHtcclxuICAvLyAgICAgICAgIHJhZGlvSXRlbXM6IHJhZGlvSXRlbXMsXHJcbiAgLy8gICAgICAgICBbYGZvcm1EYXRhLnJhZGlvYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vIH0sXHJcbiAgLy8gY2hlY2tib3hDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKTtcclxuXHJcbiAgLy8gICAgIHZhciBjaGVja2JveEl0ZW1zID0gdGhpcy5kYXRhLmNoZWNrYm94SXRlbXMsIHZhbHVlcyA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gIC8vICAgICBmb3IgKHZhciBpID0gMCwgbGVuSSA9IGNoZWNrYm94SXRlbXMubGVuZ3RoOyBpIDwgbGVuSTsgKytpKSB7XHJcbiAgLy8gICAgICAgICBjaGVja2JveEl0ZW1zW2ldLmNoZWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuSiA9IHZhbHVlcy5sZW5ndGg7IGogPCBsZW5KOyArK2opIHtcclxuICAvLyAgICAgICAgICAgICBpZihjaGVja2JveEl0ZW1zW2ldLnZhbHVlID09IHZhbHVlc1tqXSl7XHJcbiAgLy8gICAgICAgICAgICAgICAgIGNoZWNrYm94SXRlbXNbaV0uY2hlY2tlZCA9IHRydWU7XHJcbiAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gIC8vICAgICAgICAgICAgIH1cclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgfVxyXG5cclxuICAvLyAgICAgdGhpcy5zZXREYXRhKHtcclxuICAvLyAgICAgICAgIGNoZWNrYm94SXRlbXM6IGNoZWNrYm94SXRlbXMsXHJcbiAgLy8gICAgICAgICBbYGZvcm1EYXRhLmNoZWNrYm94YF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vIH0sXHJcbiAgYmluZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEuZGF0ZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgZm9ybUlucHV0Q2hhbmdlOiBmdW5jdGlvbihlOiBEb21FdmVudCkge1xyXG4gICAgICBjb25zdCB7ZmllbGR9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGJpbmRUaW1lQ2hhbmdlOiBhc3luYyBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgICAgbGV0IGEgPSBhd2FpdCByZXFHZXQoJzEyMycsIHtcclxuICAgICAgICB0ZXN0OiAxMjNcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIGxldCBhID0gYXdhaXQgcmVxUG9zdCgnY2hhdFZlcmlmeScsIHtcclxuICAgICAgLy8gICB1c2VyTmFtZTogJ3dhbmcnLFxyXG4gICAgICAvLyAgIHBhc3NXb3JkOiAnMTIzJ1xyXG4gICAgICAvLyB9KTtcclxuICAgICAgY29uc29sZS5sb2coYSk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB0aW1lOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEudGltZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZENvdW50cnlDb2RlQ2hhbmdlOiBmdW5jdGlvbihlOiBEb21FdmVudCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXIgY291bnRyeSBjb2RlIOWPkeeUn+mAieaLqeaUueWPmO+8jOaQuuW4puWAvOS4uicsIGUuZGV0YWlsLnZhbHVlKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBjb3VudHJ5Q29kZUluZGV4OiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZENvdW50cnlDaGFuZ2U6IGZ1bmN0aW9uKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXIgY291bnRyeSDlj5HnlJ/pgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSk7XHJcblxyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgY291bnRyeUluZGV4OiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZEFjY291bnRDaGFuZ2U6IGZ1bmN0aW9uKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXIgYWNjb3VudCDlj5HnlJ/pgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSk7XHJcblxyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgYWNjb3VudEluZGV4OiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZEFncmVlQ2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGlzQWdyZWU6ICEhZS5kZXRhaWwudmFsdWUubGVuZ3RoXHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgc3VibWl0Rm9ybSgpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoJyNmb3JtJykudmFsaWRhdGUoYXN5bmMgKHZhbGlkOiBib29sZWFuLCBlcnJvcnM6IEFycmF5PHZhbGlkYXRlSW5mbz4pID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd2YWxpZCcsIHZhbGlkLCBlcnJvcnMpXHJcbiAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JzW3BhcnNlSW50KGZpcnN0RXJyb3JbMF0pXS5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmoKHpqozpgJrov4cnXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgLy8gd3guY2xvdWQuY2FsbEZ1bmN0aW9uKHtcclxuICAgICAgICAgICAgICAvLyAgIG5hbWU6J2dldE9wZW5JZCcsXHJcbiAgICAgICAgICAgICAgLy8gICBjb21wbGV0ZTogcmVzID0+e1xyXG4gICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnb3BlbmlkLS0nLCByZXMpO1xyXG4gICAgICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbignaW50ZXJ2aWV3ZWUnKS5hZGQoe1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICB0ZWw6IDEyMyxcclxuICAgICAgICAgICAgICAgICAgZGF0ZTogJzE5LTEyLTI5JyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsICfmj5DkuqTmlbDmja7lupMnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==