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
var _ = db.command;
var util_1 = require("../../utils/util");
Page({
    data: {
        counselor: '',
        heighLightIndex: 1000,
        timeList: [{ date: '', time: '', _id: '', counselorId: '' }],
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
        db.collection('period').where({
            counselorId: route,
            date: _.gte(util_1.getYMD(new Date()))
        }).orderBy('date', 'asc').limit(7).get().then(function (res) {
            _this.setData({
                timeList: res.data.map(function (item) {
                    var date = item.date, startTime = item.startTime, endTime = item.endTime, counselorId = item.counselorId, _id = item._id;
                    return {
                        date: date,
                        time: startTime + '--' + endTime,
                        counselorId: counselorId,
                        _id: _id
                    };
                })
            });
        });
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
            var firstError, defaultInfo, _a, date, time, _id, counselorId, res;
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
                        _a = this.data.timeList[this.data.heighLightIndex], date = _a.date, time = _a.time, _id = _a._id, counselorId = _a.counselorId;
                        return [4, db.collection('interviewee').where({
                                openId: app.globalData.openId,
                                _id: _id
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
                                    userInfo: app.globalData.userInfo,
                                    openId: app.globalData.openId,
                                    status: 'apply',
                                    counselorName: this.data.counselor,
                                    counselorId: counselorId,
                                    periodId: _id
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFDSCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLHlDQUEwQztBQUUxQyxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUUsRUFBRTtRQUNiLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBQyxDQUFDO1FBRTNELFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFFbkQsV0FBVyxFQUFFLEtBQUs7UUFFbEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsRUFBRTtRQUVYLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLFlBQVksRUFBRSxDQUFDO1FBRWYsUUFBUSxFQUFFLEVBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVB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QUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTtnQ0FDN0IsR0FBRyxLQUFBOzZCQUNKLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBSEosR0FBRyxHQUFHLFNBR0Y7d0JBQ1YsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFOzRCQUNiLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1QsS0FBSyxFQUFFLFdBQVc7NkJBQ3JCLENBQUMsQ0FBQTs0QkFDRixXQUFPO3lCQUNSO3dCQUNELFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0NBQ3JDLElBQUksRUFBRTtvQ0FDSixRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDO29DQUN4RSxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO29DQUNqQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO29DQUM3QixNQUFNLEVBQUUsT0FBTztvQ0FDZixhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO29DQUNsQyxXQUFXLEVBQUUsV0FBVztvQ0FDeEIsUUFBUSxFQUFFLEdBQUc7aUNBQ2Q7NkJBQ0YsQ0FBQyxFQUFBOzt3QkFWRixTQVVFLENBQUM7d0JBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsTUFBTTt5QkFDZCxDQUFDLENBQUM7Ozs7O2FBRVYsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5jb25zdCBfID0gZGIuY29tbWFuZDtcclxuaW1wb3J0IHsgZ2V0WU1EIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBjb3Vuc2Vsb3I6ICcnLFxyXG4gICAgICAgIGhlaWdoTGlnaHRJbmRleDogMTAwMCxcclxuICAgICAgICB0aW1lTGlzdDogW3sgZGF0ZTogJycsIHRpbWU6ICcnLCBfaWQ6ICcnLCBjb3Vuc2Vsb3JJZDogJyd9XSxcclxuXHJcbiAgICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICBcclxuICAgICAgICBzaG93VG9wVGlwczogZmFsc2UsXHJcbiAgICBcclxuICAgICAgICBkYXRlOiBcIjIwMTYtMDktMDFcIixcclxuICAgICAgICB0aW1lOiBcIjEyOjAxXCIsXHJcbiAgICAgICAgc2F5U29tZTogJycsXHJcbiAgICBcclxuICAgICAgICBhY2NvdW50czogW1wi5b6u5L+h5Y+3XCIsIFwiUVFcIiwgXCJFbWFpbFwiXSxcclxuICAgICAgICBhY2NvdW50SW5kZXg6IDAsXHJcbiAgICBcclxuICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ21vYmlsZScsXHJcbiAgICAgICAgICAgIHJ1bGVzOiBbe3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5b+F5aGrJ30sIHttb2JpbGU6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXmoLzlvI/kuI3lr7knfV0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIGNoZWNrKGV2ZW50OiBEb21FdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGhlaWdoTGlnaHRJbmRleDogZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAgIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxyXG4gIGJpbmRWaWV3VGFwKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uL2xvZ3MvbG9ncycsXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICBsZXQgY3VyclBhZ2UgPSBudWxsO1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFnZXMpIOeahOWIsOS4gOS4quaVsOe7hFxyXG4gICAgaWYgKHBhZ2VzLmxlbmd0aCkge1xyXG4gICAgICAvLyDojrflj5blvZPliY3pobXpnaLnmoTlr7nosaHvvIjkuIrovrnmiYDojrflvpfnmoTmlbDnu4TkuK3mnIDlkI7kuIDpobnlsLHmmK/lvZPliY3pobXpnaLnmoTlr7nosaHvvIlcclxuICAgICAgY3VyclBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuICAgIC8vIOiOt+WPluW9k+WJjemhtemdoueahOi3r+eUsVxyXG4gICAgbGV0IHJvdXRlID0gY3VyclBhZ2U/Lm9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgY291bnNlbG9yOiByb3V0ZVxyXG4gICAgfSk7XHJcbiAgICBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICAgIGNvdW5zZWxvcklkOiByb3V0ZSxcclxuICAgICAgZGF0ZTogXy5ndGUoZ2V0WU1EKG5ldyBEYXRlKCkpKVxyXG4gICAgfSkub3JkZXJCeSgnZGF0ZScsICdhc2MnKS5saW1pdCg3KS5nZXQoKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgdGltZUxpc3Q6IHJlcy5kYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZGF0ZSwgc3RhcnRUaW1lLCBlbmRUaW1lLCBjb3Vuc2Vsb3JJZCwgX2lkIH0gPSBpdGVtO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgdGltZTogc3RhcnRUaW1lICsgJy0tJyArIGVuZFRpbWUsXHJcbiAgICAgICAgICAgIGNvdW5zZWxvcklkLFxyXG4gICAgICAgICAgICBfaWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSBhcyBBcnJheTxhbnk+XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcclxuICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYmluZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgZGF0ZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLmRhdGVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGJpbmRUZXh0Q2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHNheVNvbWU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICBbYGZvcm1EYXRhLnNheVNvbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBmb3JtSW5wdXRDaGFuZ2U6IGZ1bmN0aW9uKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHtmaWVsZH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGJpbmRUaW1lQ2hhbmdlOiBhc3luYyBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHRpbWU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgICAgW2Bmb3JtRGF0YS50aW1lYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBjaGVja2Z5KCkge1xyXG5cclxuICB9LFxyXG4gIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KCcjZm9ybScpLnZhbGlkYXRlKGFzeW5jICh2YWxpZDogYm9vbGVhbiwgZXJyb3JzOiBBcnJheTx2YWxpZGF0ZUluZm8+KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RXJyb3IgPSBPYmplY3Qua2V5cyhlcnJvcnMpO1xyXG4gICAgICAgICAgICAgIGlmIChmaXJzdEVycm9yLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yc1twYXJzZUludChmaXJzdEVycm9yWzBdKV0ubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gICAg6aKE57qm5pe25q615b+F6YCJXHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5oZWlnaExpZ2h0SW5kZXggPT09IDEwMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICfor7fpgInmi6npooTnuqbml7bmrrUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIHNheVNvbWU6ICdub3RoaW5nJ1xyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgY29uc3QgeyBkYXRlLCB0aW1lLCBfaWQsIGNvdW5zZWxvcklkIH0gPSB0aGlzLmRhdGEudGltZUxpc3RbdGhpcy5kYXRhLmhlaWdoTGlnaHRJbmRleF07XHJcbiAgICAgICAgICAgICAgLy8gICAg6YG/5YWN6YeN5aSN6aKE57qmXHJcbiAgICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbignaW50ZXJ2aWV3ZWUnKS53aGVyZSh7XHJcbiAgICAgICAgICAgICAgICBvcGVuSWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5JZCxcclxuICAgICAgICAgICAgICAgIF9pZFxyXG4gICAgICAgICAgICAgIH0pLmNvdW50KCk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy50b3RhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivpeaXtuauteaCqOW3sue7j+mihOe6pui/hydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oJ2ludGVydmlld2VlJykuYWRkKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgZm9ybURhdGE6IE9iamVjdC5hc3NpZ24oZGVmYXVsdEluZm8sIHRoaXMuZGF0YS5mb3JtRGF0YSwgeyBkYXRlLCB0aW1lIH0pLFxyXG4gICAgICAgICAgICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgIG9wZW5JZDogYXBwLmdsb2JhbERhdGEub3BlbklkLFxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHBseScsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW5zZWxvck5hbWU6IHRoaXMuZGF0YS5jb3Vuc2Vsb3IsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW5zZWxvcklkOiBjb3Vuc2Vsb3JJZCxcclxuICAgICAgICAgICAgICAgICAgcGVyaW9kSWQ6IF9pZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOS6pOaIkOWKnydcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTsiXX0=