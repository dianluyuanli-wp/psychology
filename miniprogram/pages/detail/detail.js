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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var pages, currPage, route, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pages = getCurrentPages();
                        currPage = null;
                        if (pages.length) {
                            currPage = pages[pages.length - 1];
                        }
                        route = (_a = currPage) === null || _a === void 0 ? void 0 : _a.options.name;
                        this.setData({
                            counselor: route
                        });
                        return [4, db.collection('period').where({
                                counselorId: route
                            }).get()];
                    case 1:
                        res = _b.sent();
                        this.setData({
                            timeList: res.data.map(function (item) {
                                var date = item.date, startTime = item.startTime, endTime = item.endTime, counselorId = item.counselorId;
                                return {
                                    date: date,
                                    time: startTime + '--' + endTime,
                                    counselorId: counselorId
                                };
                            })
                        });
                        console.log(res);
                        return [2];
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFFSCxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUUsRUFBRTtRQUNiLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBQyxDQUFDO1FBRTNELFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFFbkQsV0FBVyxFQUFFLEtBQUs7UUFFbEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsRUFBRTtRQUVYLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLFlBQVksRUFBRSxDQUFDO1FBRWYsUUFBUSxFQUFFLEVBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFDLENBQUM7YUFDdEY7U0FDRjtLQUNKO0lBQ0QsS0FBSyxFQUFMLFVBQU0s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OzRCQUNGLFdBQU87eUJBQ1I7d0JBQ0QsV0FBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDckMsSUFBSSxFQUFFO29DQUNKLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUM7b0NBQ3hFLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7b0NBQ2pDLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07b0NBQzdCLE1BQU0sRUFBRSxPQUFPO29DQUNmLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7b0NBQ2xDLFdBQVcsRUFBRSxXQUFXO29DQUN4QixRQUFRLEVBQUUsR0FBRztpQ0FDZDs2QkFDRixDQUFDLEVBQUE7O3dCQVZGLFNBVUUsQ0FBQzt3QkFDSCxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxNQUFNO3lCQUNkLENBQUMsQ0FBQzs7Ozs7YUFFVixDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblxyXG5jb25zdCBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtcclxuICBlbnY6ICd0ZXN0LXBzeS1xa3R1aydcclxufSk7XHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBjb3Vuc2Vsb3I6ICcnLFxyXG4gICAgICAgIGhlaWdoTGlnaHRJbmRleDogMTAwMCxcclxuICAgICAgICB0aW1lTGlzdDogW3sgZGF0ZTogJycsIHRpbWU6ICcnLCBfaWQ6ICcnLCBjb3Vuc2Vsb3JJZDogJyd9XSxcclxuXHJcbiAgICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICBcclxuICAgICAgICBzaG93VG9wVGlwczogZmFsc2UsXHJcbiAgICBcclxuICAgICAgICBkYXRlOiBcIjIwMTYtMDktMDFcIixcclxuICAgICAgICB0aW1lOiBcIjEyOjAxXCIsXHJcbiAgICAgICAgc2F5U29tZTogJycsXHJcbiAgICBcclxuICAgICAgICBhY2NvdW50czogW1wi5b6u5L+h5Y+3XCIsIFwiUVFcIiwgXCJFbWFpbFwiXSxcclxuICAgICAgICBhY2NvdW50SW5kZXg6IDAsXHJcbiAgICBcclxuICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ21vYmlsZScsXHJcbiAgICAgICAgICAgIHJ1bGVzOiBbe3JlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5b+F5aGrJ30sIHttb2JpbGU6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXmoLzlvI/kuI3lr7knfV0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIGNoZWNrKGV2ZW50OiBEb21FdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGhlaWdoTGlnaHRJbmRleDogZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAgIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxyXG4gIGJpbmRWaWV3VGFwKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uL2xvZ3MvbG9ncycsXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICBsZXQgY3VyclBhZ2UgPSBudWxsO1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFnZXMpIOeahOWIsOS4gOS4quaVsOe7hFxyXG4gICAgaWYgKHBhZ2VzLmxlbmd0aCkge1xyXG4gICAgICAvLyDojrflj5blvZPliY3pobXpnaLnmoTlr7nosaHvvIjkuIrovrnmiYDojrflvpfnmoTmlbDnu4TkuK3mnIDlkI7kuIDpobnlsLHmmK/lvZPliY3pobXpnaLnmoTlr7nosaHvvIlcclxuICAgICAgY3VyclBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuICAgIC8vIOiOt+WPluW9k+WJjemhtemdoueahOi3r+eUsVxyXG4gICAgbGV0IHJvdXRlID0gY3VyclBhZ2U/Lm9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgY291bnNlbG9yOiByb3V0ZVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICAgIGNvdW5zZWxvcklkOiByb3V0ZVxyXG4gICAgfSkuZ2V0KCk7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB0aW1lTGlzdDogcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0ZSwgc3RhcnRUaW1lLCBlbmRUaW1lLCBjb3Vuc2Vsb3JJZCB9ID0gaXRlbTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgIHRpbWU6IHN0YXJ0VGltZSArICctLScgKyBlbmRUaW1lLFxyXG4gICAgICAgICAgY291bnNlbG9ySWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pIGFzIEFycmF5PGFueT5cclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxuICB9LFxyXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xyXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxyXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgIH0pXHJcbiAgfSxcclxuICBiaW5kRGF0ZUNoYW5nZTogZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEuZGF0ZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRleHRDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2F5U29tZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgIFtgZm9ybURhdGEuc2F5U29tZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGZvcm1JbnB1dENoYW5nZTogZnVuY3Rpb24oZTogRG9tRXZlbnQpIHtcclxuICAgICAgY29uc3Qge2ZpZWxkfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRpbWVDaGFuZ2U6IGFzeW5jIGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdGltZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLnRpbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGNoZWNrZnkoKSB7XHJcblxyXG4gIH0sXHJcbiAgc3VibWl0Rm9ybSgpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoJyNmb3JtJykudmFsaWRhdGUoYXN5bmMgKHZhbGlkOiBib29sZWFuLCBlcnJvcnM6IEFycmF5PHZhbGlkYXRlSW5mbz4pID0+IHtcclxuICAgICAgICAgIGlmICghdmFsaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JzW3BhcnNlSW50KGZpcnN0RXJyb3JbMF0pXS5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyAgICDpooTnuqbml7bmrrXlv4XpgIlcclxuICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmhlaWdoTGlnaHRJbmRleCA9PT0gMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivt+mAieaLqemihOe6puaXtuautSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgc2F5U29tZTogJ25vdGhpbmcnXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBjb25zdCB7IGRhdGUsIHRpbWUsIF9pZCwgY291bnNlbG9ySWQgfSA9IHRoaXMuZGF0YS50aW1lTGlzdFt0aGlzLmRhdGEuaGVpZ2hMaWdodEluZGV4XTtcclxuICAgICAgICAgICAgICAvLyAgICDpgb/lhY3ph43lpI3pooTnuqZcclxuICAgICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLndoZXJlKHtcclxuICAgICAgICAgICAgICAgIG9wZW5JZDogYXBwLmdsb2JhbERhdGEub3BlbklkLFxyXG4gICAgICAgICAgICAgICAgX2lkXHJcbiAgICAgICAgICAgICAgfSkuY291bnQoKTtcclxuICAgICAgICAgICAgICBpZiAocmVzLnRvdGFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAn6K+l5pe25q615oKo5bey57uP6aKE57qm6L+HJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYXdhaXQgZGIuY29sbGVjdGlvbignaW50ZXJ2aWV3ZWUnKS5hZGQoe1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICBmb3JtRGF0YTogT2JqZWN0LmFzc2lnbihkZWZhdWx0SW5mbywgdGhpcy5kYXRhLmZvcm1EYXRhLCB7IGRhdGUsIHRpbWUgfSksXHJcbiAgICAgICAgICAgICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcclxuICAgICAgICAgICAgICAgICAgb3BlbklkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQsXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2FwcGx5JyxcclxuICAgICAgICAgICAgICAgICAgY291bnNlbG9yTmFtZTogdGhpcy5kYXRhLmNvdW5zZWxvcixcclxuICAgICAgICAgICAgICAgICAgY291bnNlbG9ySWQ6IGNvdW5zZWxvcklkLFxyXG4gICAgICAgICAgICAgICAgICBwZXJpb2RJZDogX2lkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q5Lqk5oiQ5YqfJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9OyJdfQ==