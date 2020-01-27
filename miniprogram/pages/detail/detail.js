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
Page({
    data: {
        counselor: '',
        heighLightIndex: 1000,
        timeList: [{ date: '1月3号', time: '五点到十点', periodId: '0' }, { date: '1月4号', time: '五点到十点', periodId: '1' },
            { date: '1月5号', time: '五点到十点', periodId: '2' }],
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
    onShow: function () {
        var _a;
        var pages = getCurrentPages();
        var currPage = null;
        if (pages.length) {
            currPage = pages[pages.length - 1];
        }
        var route = (_a = currPage) === null || _a === void 0 ? void 0 : _a.options.name;
        this.setData({
            counselor: route
        });
        console.log(route);
    },
    check: function (event) {
        this.setData({
            heighLightIndex: event.currentTarget.dataset.index
        });
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
    checkfy: function () {
    },
    submitForm: function () {
        var _this = this;
        this.selectComponent('#form').validate(function (valid, errors) { return __awaiter(_this, void 0, void 0, function () {
            var firstError, defaultInfo, _a, date, time, periodId, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!valid) return [3, 1];
                        firstError = Object.keys(errors);
                        if (firstError.length) {
                            this.setData({
                                error: errors[parseInt(firstError[0])].message
                            });
                        }
                        return [3, 4];
                    case 1:
                        if (this.data.heighLightIndex === 1000) {
                            this.setData({
                                error: '请选择预约时段'
                            });
                            return [2];
                        }
                        defaultInfo = {
                            saySome: 'nothing'
                        };
                        _a = this.data.timeList[this.data.heighLightIndex], date = _a.date, time = _a.time, periodId = _a.periodId;
                        return [4, db.collection('interviewee').where({
                                openId: app.globalData.openId,
                                periodId: periodId
                            }).count()];
                    case 2:
                        res = _b.sent();
                        if (res.total) {
                            this.setData({
                                error: '该时段您已经预约过'
                            });
                            return [2];
                        }
                        return [4, db.collection('interviewee').add({
                                data: {
                                    formData: Object.assign(defaultInfo, this.data.formData, { date: date, time: time }),
                                    userInfo: this.data.userInfo,
                                    openId: app.globalData.openId,
                                    status: 'apply',
                                    counselorName: this.data.counselor,
                                    counselorId: '0001',
                                    periodId: periodId
                                }
                            })];
                    case 3:
                        _b.sent();
                        wx.showToast({
                            title: '提交成功'
                        });
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        }); });
    }
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFFSCxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUUsRUFBRTtRQUNiLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFFBQVEsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO1lBQ3JHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUU3QyxRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO1FBRW5ELFdBQVcsRUFBRSxLQUFLO1FBRWxCLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFFWCxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUNoQyxZQUFZLEVBQUUsQ0FBQztRQUVmLFFBQVEsRUFBRSxFQUNUO1FBQ0QsS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUs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Q29udGVudCI6WyJjb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmNvbnN0IGRiID0gd3guY2xvdWQuZGF0YWJhc2Uoe1xyXG4gIGVudjogJ3Rlc3QtcHN5LXFrdHVrJ1xyXG59KTtcclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGNvdW5zZWxvcjogJycsXHJcbiAgICAgICAgaGVpZ2hMaWdodEluZGV4OiAxMDAwLFxyXG4gICAgICAgIHRpbWVMaXN0OiBbe2RhdGU6ICcx5pyIM+WPtycsIHRpbWU6ICfkupTngrnliLDljYHngrknLCBwZXJpb2RJZDogJzAnfSwge2RhdGU6ICcx5pyINOWPtycsIHRpbWU6ICfkupTngrnliLDljYHngrknLCBwZXJpb2RJZDogJzEnfSxcclxuICAgICAgICB7ZGF0ZTogJzHmnIg15Y+3JywgdGltZTogJ+S6lOeCueWIsOWNgeeCuScsIHBlcmlvZElkOiAnMid9XSxcclxuXHJcbiAgICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICBcclxuICAgICAgICBzaG93VG9wVGlwczogZmFsc2UsXHJcbiAgICBcclxuICAgICAgICBkYXRlOiBcIjIwMTYtMDktMDFcIixcclxuICAgICAgICB0aW1lOiBcIjEyOjAxXCIsXHJcbiAgICAgICAgc2F5U29tZTogJycsXHJcbiAgICBcclxuICAgICAgICBhY2NvdW50czogW1wi5b6u5L+h5Y+3XCIsIFwiUVFcIiwgXCJFbWFpbFwiXSxcclxuICAgICAgICBhY2NvdW50SW5kZXg6IDAsXHJcbiAgICBcclxuICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ21vYmlsZScsXHJcbiAgICAgICAgICAgIHJ1bGVzOiBbe3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5b+F5aGrJ30sIHttb2JpbGU6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXmoLzlvI/kuI3lr7knfV0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICBsZXQgY3VyclBhZ2UgPSBudWxsO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhZ2VzKSDnmoTliLDkuIDkuKrmlbDnu4RcclxuICAgICAgICBpZiAocGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAvLyDojrflj5blvZPliY3pobXpnaLnmoTlr7nosaHvvIjkuIrovrnmiYDojrflvpfnmoTmlbDnu4TkuK3mnIDlkI7kuIDpobnlsLHmmK/lvZPliY3pobXpnaLnmoTlr7nosaHvvIlcclxuICAgICAgICAgIGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiOt+WPluW9k+WJjemhtemdoueahOi3r+eUsVxyXG4gICAgICAgIGxldCByb3V0ZSA9IGN1cnJQYWdlPy5vcHRpb25zLm5hbWU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY291bnNlbG9yOiByb3V0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJvdXRlKTtcclxuICAgIH0sXHJcbiAgICBjaGVjayhldmVudDogRG9tRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBoZWlnaExpZ2h0SW5kZXg6IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgICAvLyDkuovku7blpITnkIblh73mlbBcclxuICBiaW5kVmlld1RhcCgpIHtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICcuLi9sb2dzL2xvZ3MnLFxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcclxuICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2UpIHtcclxuICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxyXG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXHJcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXHJcbiAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XHJcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXHJcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgfSlcclxuICB9LFxyXG4gIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGRhdGU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgICAgW2Bmb3JtRGF0YS5kYXRlYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBiaW5kVGV4dENoYW5nZTogZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzYXlTb21lOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgW2Bmb3JtRGF0YS5zYXlTb21lYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZm9ybUlucHV0Q2hhbmdlOiBmdW5jdGlvbihlOiBEb21FdmVudCkge1xyXG4gICAgICBjb25zdCB7ZmllbGR9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBbYGZvcm1EYXRhLiR7ZmllbGR9YF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBiaW5kVGltZUNoYW5nZTogYXN5bmMgZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB0aW1lOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEudGltZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgY2hlY2tmeSgpIHtcclxuXHJcbiAgfSxcclxuICBzdWJtaXRGb3JtKCkge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudCgnI2Zvcm0nKS52YWxpZGF0ZShhc3luYyAodmFsaWQ6IGJvb2xlYW4sIGVycm9yczogQXJyYXk8dmFsaWRhdGVJbmZvPikgPT4ge1xyXG4gICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdEVycm9yID0gT2JqZWN0LmtleXMoZXJyb3JzKTtcclxuICAgICAgICAgICAgICBpZiAoZmlyc3RFcnJvci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbcGFyc2VJbnQoZmlyc3RFcnJvclswXSldLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vICAgIOmihOe6puaXtuauteW/hemAiVxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaGVpZ2hMaWdodEluZGV4ID09PSAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAn6K+36YCJ5oup6aKE57qm5pe25q61J1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBzYXlTb21lOiAnbm90aGluZydcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIGNvbnN0IHsgZGF0ZSwgdGltZSwgcGVyaW9kSWQgfSA9IHRoaXMuZGF0YS50aW1lTGlzdFt0aGlzLmRhdGEuaGVpZ2hMaWdodEluZGV4XTtcclxuICAgICAgICAgICAgICAvLyAgICDpgb/lhY3ph43lpI3pooTnuqZcclxuICAgICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLndoZXJlKHtcclxuICAgICAgICAgICAgICAgIG9wZW5JZDogYXBwLmdsb2JhbERhdGEub3BlbklkLFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kSWQ6IHBlcmlvZElkXHJcbiAgICAgICAgICAgICAgfSkuY291bnQoKTtcclxuICAgICAgICAgICAgICBpZiAocmVzLnRvdGFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAn6K+l5pe25q615oKo5bey57uP6aKE57qm6L+HJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbignaW50ZXJ2aWV3ZWUnKS5hZGQoe1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICBmb3JtRGF0YTogT2JqZWN0LmFzc2lnbihkZWZhdWx0SW5mbywgdGhpcy5kYXRhLmZvcm1EYXRhLCB7IGRhdGUsIHRpbWUgfSksXHJcbiAgICAgICAgICAgICAgICAgIHVzZXJJbmZvOiB0aGlzLmRhdGEudXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgIG9wZW5JZDogYXBwLmdsb2JhbERhdGEub3BlbklkLFxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHBseScsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW5zZWxvck5hbWU6IHRoaXMuZGF0YS5jb3Vuc2Vsb3IsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW5zZWxvcklkOiAnMDAwMScsXHJcbiAgICAgICAgICAgICAgICAgIHBlcmlvZElkOiBwZXJpb2RJZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOS6pOaIkOWKnydcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTsiXX0=