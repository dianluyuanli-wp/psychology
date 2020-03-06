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
        var pages = getCurrentPages();
        var currPage = null;
        if (pages.length) {
            currPage = pages[pages.length - 1];
        }
        var route = currPage === null || currPage === void 0 ? void 0 : currPage.options.name;
        this.setData({
            counselor: route
        });
        db.collection('period').where({
            counselorId: route,
            date: _.gte(util_1.getYMD(new Date())),
            status: 'on'
        }).orderBy('date', 'asc').limit(7).get().then(function (res) {
            _this.setData({
                timeList: res.data.map(function (item) {
                    var date = item.date, startTime = item.startTime, endTime = item.endTime, counselorId = item.counselorId, _id = item._id, count = item.count;
                    return {
                        date: date,
                        time: startTime + '--' + endTime,
                        counselorId: counselorId,
                        count: count,
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
                        return [3, 5];
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
                        return [4, db.collection('period').where({
                                _id: _id,
                                count: 1
                            }).count()];
                    case 2:
                        res = _b.sent();
                        if (res.total === 0) {
                            this.setData({
                                error: '该时段不可预约'
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
                        return [4, db.collection('period').doc(_id).update({ data: { count: 0 } })];
                    case 4:
                        _b.sent();
                        wx.showToast({
                            title: '提交成功'
                        });
                        _b.label = 5;
                    case 5: return [2];
                }
            });
        }); });
    }
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFDSCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLHlDQUEwQztBQUUxQyxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUUsRUFBRTtRQUNiLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBQyxDQUFDO1FBRTNELFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFFbkQsV0FBVyxFQUFFLEtBQUs7UUFFbEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsRUFBRTtRQUVYLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLFlBQVksRUFBRSxDQUFDO1FBRWYsUUFBUSxFQUFFLEVBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVB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Q0FBQzs7Ozs7YUFFVixDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblxyXG5jb25zdCBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtcclxuICBlbnY6ICd0ZXN0LXBzeS1xa3R1aydcclxufSk7XHJcbmNvbnN0IF8gPSBkYi5jb21tYW5kO1xyXG5pbXBvcnQgeyBnZXRZTUQgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGNvdW5zZWxvcjogJycsXHJcbiAgICAgICAgaGVpZ2hMaWdodEluZGV4OiAxMDAwLFxyXG4gICAgICAgIHRpbWVMaXN0OiBbeyBkYXRlOiAnJywgdGltZTogJycsIF9pZDogJycsIGNvdW5zZWxvcklkOiAnJ31dLFxyXG5cclxuICAgICAgICB1c2VySW5mbzoge30sXHJcbiAgICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIFxyXG4gICAgICAgIHNob3dUb3BUaXBzOiBmYWxzZSxcclxuICAgIFxyXG4gICAgICAgIGRhdGU6IFwiMjAxNi0wOS0wMVwiLFxyXG4gICAgICAgIHRpbWU6IFwiMTI6MDFcIixcclxuICAgICAgICBzYXlTb21lOiAnJyxcclxuICAgIFxyXG4gICAgICAgIGFjY291bnRzOiBbXCLlvq7kv6Hlj7dcIiwgXCJRUVwiLCBcIkVtYWlsXCJdLFxyXG4gICAgICAgIGFjY291bnRJbmRleDogMCxcclxuICAgIFxyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnbW9iaWxlJyxcclxuICAgICAgICAgICAgcnVsZXM6IFt7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXlv4XloasnfSwge21vYmlsZTogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeagvOW8j+S4jeWvuSd9XSxcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgY2hlY2soZXZlbnQ6IERvbUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaGVpZ2hMaWdodEluZGV4OiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgICAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXHJcbiAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcclxuICAgIH0pXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgIGxldCBjdXJyUGFnZSA9IG51bGw7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwYWdlcykg55qE5Yiw5LiA5Liq5pWw57uEXHJcbiAgICBpZiAocGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIC8vIOiOt+WPluW9k+WJjemhtemdoueahOWvueixoe+8iOS4iui+ueaJgOiOt+W+l+eahOaVsOe7hOS4reacgOWQjuS4gOmhueWwseaYr+W9k+WJjemhtemdoueahOWvueixoe+8iVxyXG4gICAgICBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG4gICAgLy8g6I635Y+W5b2T5YmN6aG16Z2i55qE6Lev55SxXHJcbiAgICBsZXQgcm91dGUgPSBjdXJyUGFnZT8ub3B0aW9ucy5uYW1lO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBjb3Vuc2Vsb3I6IHJvdXRlXHJcbiAgICB9KTtcclxuICAgIGRiLmNvbGxlY3Rpb24oJ3BlcmlvZCcpLndoZXJlKHtcclxuICAgICAgY291bnNlbG9ySWQ6IHJvdXRlLFxyXG4gICAgICBkYXRlOiBfLmd0ZShnZXRZTUQobmV3IERhdGUoKSkpLFxyXG4gICAgICBzdGF0dXM6ICdvbidcclxuICAgIH0pLm9yZGVyQnkoJ2RhdGUnLCAnYXNjJykubGltaXQoNykuZ2V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHRpbWVMaXN0OiByZXMuZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGRhdGUsIHN0YXJ0VGltZSwgZW5kVGltZSwgY291bnNlbG9ySWQsIF9pZCwgY291bnQgfSA9IGl0ZW07XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICB0aW1lOiBzdGFydFRpbWUgKyAnLS0nICsgZW5kVGltZSxcclxuICAgICAgICAgICAgY291bnNlbG9ySWQsXHJcbiAgICAgICAgICAgIGNvdW50LFxyXG4gICAgICAgICAgICBfaWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSBhcyBBcnJheTxhbnk+XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcclxuICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYmluZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgZGF0ZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLmRhdGVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGJpbmRUZXh0Q2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHNheVNvbWU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICBbYGZvcm1EYXRhLnNheVNvbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBmb3JtSW5wdXRDaGFuZ2U6IGZ1bmN0aW9uKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHtmaWVsZH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGJpbmRUaW1lQ2hhbmdlOiBhc3luYyBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHRpbWU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgICAgW2Bmb3JtRGF0YS50aW1lYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBjaGVja2Z5KCkge1xyXG5cclxuICB9LFxyXG4gIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KCcjZm9ybScpLnZhbGlkYXRlKGFzeW5jICh2YWxpZDogYm9vbGVhbiwgZXJyb3JzOiBBcnJheTx2YWxpZGF0ZUluZm8+KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RXJyb3IgPSBPYmplY3Qua2V5cyhlcnJvcnMpO1xyXG4gICAgICAgICAgICAgIGlmIChmaXJzdEVycm9yLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yc1twYXJzZUludChmaXJzdEVycm9yWzBdKV0ubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gICAg6aKE57qm5pe25q615b+F6YCJXHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5oZWlnaExpZ2h0SW5kZXggPT09IDEwMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICfor7fpgInmi6npooTnuqbml7bmrrUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIHNheVNvbWU6ICdub3RoaW5nJ1xyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgY29uc3QgeyBkYXRlLCB0aW1lLCBfaWQsIGNvdW5zZWxvcklkIH0gPSB0aGlzLmRhdGEudGltZUxpc3RbdGhpcy5kYXRhLmhlaWdoTGlnaHRJbmRleF07XHJcbiAgICAgICAgICAgICAgLy8gICAg6YG/5YWN6YeN5aSN6aKE57qmXHJcbiAgICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbigncGVyaW9kJykud2hlcmUoe1xyXG4gICAgICAgICAgICAgICAgX2lkLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDFcclxuICAgICAgICAgICAgICB9KS5jb3VudCgpO1xyXG4gICAgICAgICAgICAgIGlmIChyZXMudG90YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICfor6Xml7bmrrXkuI3lj6/pooTnuqYnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBPYmplY3QuYXNzaWduKGRlZmF1bHRJbmZvLCB0aGlzLmRhdGEuZm9ybURhdGEsIHsgZGF0ZSwgdGltZSB9KSxcclxuICAgICAgICAgICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgICBvcGVuSWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5JZCxcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnYXBwbHknLFxyXG4gICAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JOYW1lOiB0aGlzLmRhdGEuY291bnNlbG9yLFxyXG4gICAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JJZDogY291bnNlbG9ySWQsXHJcbiAgICAgICAgICAgICAgICAgIHBlcmlvZElkOiBfaWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS5kb2MoX2lkKS51cGRhdGUoeyBkYXRhOiB7IGNvdW50OiAwIH19KTtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DkuqTmiJDlip8nXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307Il19