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
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
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
            var _a, a;
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
        this.selectComponent('#form').validate(function (valid, errors) {
            console.log('valid', valid, errors);
            if (!valid) {
                var firstError = Object.keys(errors);
                if (firstError.length) {
                    _this.setData({
                        error: errors[parseInt(firstError[0])].message
                    });
                }
            }
            else {
                wx.showToast({
                    title: '校验通过'
                });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsK0NBQTZDO0FBRTdDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFFbkQsV0FBVyxFQUFFLEtBQUs7UUFFbEIsVUFBVSxFQUFFO1lBQ1IsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQztZQUNsRCxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztTQUN0QztRQUNELGFBQWEsRUFBRTtZQUNYLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQztZQUM3RCxFQUFDLElBQUksRUFBRSwrQkFBK0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO1NBQ3REO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7WUFDMUIsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQztZQUMzQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUMxQixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUMxQixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FB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LENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxZQUFZLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQy9CLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxlQUFlLEVBQUUsVUFBVSxDQUFXO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDbkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFVBQVU7UUFBVixpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBQyxLQUFjLEVBQUUsTUFBMkI7WUFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ25DLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUNuQixLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNULEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztxQkFDakQsQ0FBQyxDQUFBO2lCQUVMO2FBQ0o7aUJBQU07Z0JBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsTUFBTTtpQkFDaEIsQ0FBQyxDQUFBO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5pbXBvcnQgeyByZXFHZXQgfSBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtb3R0bzogJ0hlbGxvIFdvcmxkJyxcbiAgICB1c2VySW5mbzoge30sXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcblxuICAgIHNob3dUb3BUaXBzOiBmYWxzZSxcblxuICAgIHJhZGlvSXRlbXM6IFtcbiAgICAgICAge25hbWU6ICdjZWxsIHN0YW5kYXJkJywgdmFsdWU6ICcwJywgY2hlY2tlZDogdHJ1ZX0sXG4gICAgICAgIHtuYW1lOiAnY2VsbCBzdGFuZGFyZCcsIHZhbHVlOiAnMSd9XG4gICAgXSxcbiAgICBjaGVja2JveEl0ZW1zOiBbXG4gICAgICAgIHtuYW1lOiAnc3RhbmRhcmQgaXMgZGVhbHQgZm9yIHUuJywgdmFsdWU6ICcwJywgY2hlY2tlZDogdHJ1ZX0sXG4gICAgICAgIHtuYW1lOiAnc3RhbmRhcmQgaXMgZGVhbGljaWVudCBmb3IgdS4nLCB2YWx1ZTogJzEnfVxuICAgIF0sXG4gICAgaXRlbXM6IFtcbiAgICAgICAge25hbWU6ICdVU0EnLCB2YWx1ZTogJ+e+juWbvSd9LFxuICAgICAgICB7bmFtZTogJ0NITicsIHZhbHVlOiAn5Lit5Zu9JywgY2hlY2tlZDogJ3RydWUnfSxcbiAgICAgICAge25hbWU6ICdCUkEnLCB2YWx1ZTogJ+W3tOilvyd9LFxuICAgICAgICB7bmFtZTogJ0pQTicsIHZhbHVlOiAn5pel5pysJ30sXG4gICAgICAgIHtuYW1lOiAnRU5HJywgdmFsdWU6ICfoi7Hlm70nfSxcbiAgICAgICAge25hbWU6ICdUVVInLCB2YWx1ZTogJ+azleWbvSd9LFxuICAgIF0sXG5cbiAgICBkYXRlOiBcIjIwMTYtMDktMDFcIixcbiAgICB0aW1lOiBcIjEyOjAxXCIsXG5cbiAgICBjb3VudHJ5Q29kZXM6IFtcIis4NlwiLCBcIis4MFwiLCBcIis4NFwiLCBcIis4N1wiXSxcbiAgICBjb3VudHJ5Q29kZUluZGV4OiAwLFxuXG4gICAgY291bnRyaWVzOiBbXCLkuK3lm71cIiwgXCLnvo7lm71cIiwgXCLoi7Hlm71cIl0sXG4gICAgY291bnRyeUluZGV4OiAwLFxuXG4gICAgYWNjb3VudHM6IFtcIuW+ruS/oeWPt1wiLCBcIlFRXCIsIFwiRW1haWxcIl0sXG4gICAgYWNjb3VudEluZGV4OiAwLFxuXG4gICAgaXNBZ3JlZTogZmFsc2UsXG4gICAgZm9ybURhdGE6IHtcblxuICAgIH0sXG4gICAgcnVsZXM6IFtcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgbmFtZTogJ3JhZGlvJyxcbiAgICAgIC8vICAgcnVsZXM6IHtyZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ+WNlemAieWIl+ihqOaYr+W/hemAiemhuSd9LFxuICAgICAgLy8gfSwgXG4gICAgICAvLyB7XG4gICAgICAvLyAgIG5hbWU6ICdjaGVja2JveCcsXG4gICAgICAvLyAgIHJ1bGVzOiB7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICflpJrpgInliJfooajmmK/lv4XpgInpobknfSxcbiAgICAgIC8vIH0sIFxuICAgICAgLy8ge1xuICAgICAgLy8gICBuYW1lOiAncXEnLFxuICAgICAgLy8gICBydWxlczoge3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAncXHlv4XloasnfSxcbiAgICAgIC8vIH0sIFxuICAgICAge1xuICAgICAgICBuYW1lOiAnbW9iaWxlJyxcbiAgICAgICAgcnVsZXM6IFt7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXlv4XloasnfSwge21vYmlsZTogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeagvOW8j+S4jeWvuSd9XSxcbiAgICAgIH0sIFxuICAgICAgLy8ge1xuICAgICAgLy8gICBuYW1lOiAndmNvZGUnLFxuICAgICAgLy8gICBydWxlczoge3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAn6aqM6K+B56CB5b+F5aGrJ30sXG4gICAgICAvLyB9LCBcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgbmFtZTogJ2lkY2FyZCcsXG4gICAgICAvLyAgIHJ1bGVzOiB7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdpZGNhcmTlv4XloasnfSxcbiAgICAgIC8vIH1cbiAgICBdXG4gIH0sXG4gIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxuICBiaW5kVmlld1RhcCgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL2xvZ3MvbG9ncycsXG4gICAgfSlcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKTtcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcbiAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2UpIHtcbiAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLnVzZXJJbmZvKVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgIH0pXG4gIH0sXG4gIC8vIHJhZGlvQ2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdyYWRpb+WPkeeUn2NoYW5nZeS6i+S7tu+8jOaQuuW4pnZhbHVl5YC85Li677yaJywgZS5kZXRhaWwudmFsdWUpO1xuXG4gIC8vICAgICB2YXIgcmFkaW9JdGVtcyA9IHRoaXMuZGF0YS5yYWRpb0l0ZW1zO1xuICAvLyAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJhZGlvSXRlbXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgLy8gICAgICAgICByYWRpb0l0ZW1zW2ldLmNoZWNrZWQgPSByYWRpb0l0ZW1zW2ldLnZhbHVlID09IGUuZGV0YWlsLnZhbHVlO1xuICAvLyAgICAgfVxuXG4gIC8vICAgICB0aGlzLnNldERhdGEoe1xuICAvLyAgICAgICAgIHJhZGlvSXRlbXM6IHJhZGlvSXRlbXMsXG4gIC8vICAgICAgICAgW2Bmb3JtRGF0YS5yYWRpb2BdOiBlLmRldGFpbC52YWx1ZVxuICAvLyAgICAgfSk7XG4gIC8vIH0sXG4gIC8vIGNoZWNrYm94Q2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdjaGVja2JveOWPkeeUn2NoYW5nZeS6i+S7tu+8jOaQuuW4pnZhbHVl5YC85Li677yaJywgZS5kZXRhaWwudmFsdWUpO1xuXG4gIC8vICAgICB2YXIgY2hlY2tib3hJdGVtcyA9IHRoaXMuZGF0YS5jaGVja2JveEl0ZW1zLCB2YWx1ZXMgPSBlLmRldGFpbC52YWx1ZTtcbiAgLy8gICAgIGZvciAodmFyIGkgPSAwLCBsZW5JID0gY2hlY2tib3hJdGVtcy5sZW5ndGg7IGkgPCBsZW5JOyArK2kpIHtcbiAgLy8gICAgICAgICBjaGVja2JveEl0ZW1zW2ldLmNoZWNrZWQgPSBmYWxzZTtcblxuICAvLyAgICAgICAgIGZvciAodmFyIGogPSAwLCBsZW5KID0gdmFsdWVzLmxlbmd0aDsgaiA8IGxlbko7ICsraikge1xuICAvLyAgICAgICAgICAgICBpZihjaGVja2JveEl0ZW1zW2ldLnZhbHVlID09IHZhbHVlc1tqXSl7XG4gIC8vICAgICAgICAgICAgICAgICBjaGVja2JveEl0ZW1zW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICB9XG4gIC8vICAgICB9XG5cbiAgLy8gICAgIHRoaXMuc2V0RGF0YSh7XG4gIC8vICAgICAgICAgY2hlY2tib3hJdGVtczogY2hlY2tib3hJdGVtcyxcbiAgLy8gICAgICAgICBbYGZvcm1EYXRhLmNoZWNrYm94YF06IGUuZGV0YWlsLnZhbHVlXG4gIC8vICAgICB9KTtcbiAgLy8gfSxcbiAgYmluZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZSxcbiAgICAgICAgICBbYGZvcm1EYXRhLmRhdGVgXTogZS5kZXRhaWwudmFsdWVcbiAgICAgIH0pXG4gIH0sXG4gIGZvcm1JbnB1dENoYW5nZTogZnVuY3Rpb24oZTogRG9tRXZlbnQpIHtcbiAgICAgIGNvbnN0IHtmaWVsZH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBbYGZvcm1EYXRhLiR7ZmllbGR9YF06IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9KVxuICB9LFxuICBiaW5kVGltZUNoYW5nZTogYXN5bmMgZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XG4gICAgICBsZXQgYSA9IGF3YWl0IHJlcUdldCgnMTIzJywge1xuICAgICAgICB0ZXN0OiAxMjNcbiAgICAgIH0pO1xuICAgICAgLy8gbGV0IGEgPSBhd2FpdCByZXFQb3N0KCdjaGF0VmVyaWZ5Jywge1xuICAgICAgLy8gICB1c2VyTmFtZTogJ3dhbmcnLFxuICAgICAgLy8gICBwYXNzV29yZDogJzEyMydcbiAgICAgIC8vIH0pO1xuICAgICAgY29uc29sZS5sb2coYSk7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHRpbWU6IGUuZGV0YWlsLnZhbHVlLFxuICAgICAgICAgIFtgZm9ybURhdGEudGltZWBdOiBlLmRldGFpbC52YWx1ZVxuICAgICAgfSlcbiAgfSxcbiAgYmluZENvdW50cnlDb2RlQ2hhbmdlOiBmdW5jdGlvbihlOiBEb21FdmVudCl7XG4gICAgICBjb25zb2xlLmxvZygncGlja2VyIGNvdW50cnkgY29kZSDlj5HnlJ/pgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSk7XG5cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgY291bnRyeUNvZGVJbmRleDogZS5kZXRhaWwudmFsdWVcbiAgICAgIH0pXG4gIH0sXG4gIGJpbmRDb3VudHJ5Q2hhbmdlOiBmdW5jdGlvbihlOiBEb21FdmVudCkge1xuICAgICAgY29uc29sZS5sb2coJ3BpY2tlciBjb3VudHJ5IOWPkeeUn+mAieaLqeaUueWPmO+8jOaQuuW4puWAvOS4uicsIGUuZGV0YWlsLnZhbHVlKTtcblxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBjb3VudHJ5SW5kZXg6IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9KVxuICB9LFxuICBiaW5kQWNjb3VudENoYW5nZTogZnVuY3Rpb24oZTogRG9tRXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXIgYWNjb3VudCDlj5HnlJ/pgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSk7XG5cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYWNjb3VudEluZGV4OiBlLmRldGFpbC52YWx1ZVxuICAgICAgfSlcbiAgfSxcbiAgYmluZEFncmVlQ2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgaXNBZ3JlZTogISFlLmRldGFpbC52YWx1ZS5sZW5ndGhcbiAgICAgIH0pO1xuICB9LFxuICBzdWJtaXRGb3JtKCkge1xuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoJyNmb3JtJykudmFsaWRhdGUoKHZhbGlkOiBib29sZWFuLCBlcnJvcnM6IEFycmF5PHZhbGlkYXRlSW5mbz4pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWQnLCB2YWxpZCwgZXJyb3JzKVxuICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycyk7XG4gICAgICAgICAgICAgIGlmIChmaXJzdEVycm9yLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JzW3BhcnNlSW50KGZpcnN0RXJyb3JbMF0pXS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmoKHpqozpgJrov4cnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgfVxufSlcbiJdfQ==
