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
var weekDayWord = ['日', '一', '二', '三', '四', '五', '六'];
function getDateList(list) {
    var now = new Date();
    var weekDay = now.getDay();
    var nowTime = now.getTime();
    return new Array(7).fill('').map(function (_, index) {
        var stamp = nowTime + 24 * 60 * 60 * 1000 * (index + 1);
        return {
            date: stamp,
            dateString: (new Date(stamp)).getDate().toString(),
            weekDay: '周' + weekDayWord[(index + weekDay + 1) % 7],
            periodList: list.filter(function (item) { return item.date === util_1.getYMD(new Date(stamp)); })
        };
    });
}
function prepareData(route, setFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var res, timeList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, db.collection('period').where({
                        counselorId: route,
                        date: _.gt(util_1.getYMD(new Date())),
                        status: 'on'
                    }).orderBy('date', 'asc').limit(28).get()];
                case 1:
                    res = _a.sent();
                    timeList = res.data.map(function (item) {
                        var date = item.date, startTime = item.startTime, endTime = item.endTime, counselorId = item.counselorId, _id = item._id, count = item.count;
                        return {
                            date: date,
                            startTime: startTime,
                            endTime: endTime,
                            time: startTime + '--' + endTime,
                            counselorId: counselorId,
                            count: count,
                            _id: _id
                        };
                    });
                    setFunc({
                        dateList: getDateList(timeList),
                        timeList: timeList
                    });
                    return [2];
            }
        });
    });
}
function subscribeMes() {
    wx.requestSubscribeMessage({
        tmplIds: ['TsHTB3iCONjwJijrDPLH2eQUq3QmxPk5iNfFiRcZU3M'],
    });
}
var dullTimeObj = { date: '', time: '', startTime: '', endTime: '', _id: '', counselorId: '' };
Page({
    data: {
        counselor: '',
        heightListhId: '',
        timeList: [dullTimeObj],
        dateList: [],
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
        ],
        show: false,
        counselorInfo: {}
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function () {
        var _a;
        var pages = getCurrentPages();
        var currPage = null;
        if (pages.length) {
            currPage = pages[pages.length - 1];
        }
        var route = currPage === null || currPage === void 0 ? void 0 : currPage.options.name;
        this.setData({
            counselor: route,
            counselorInfo: (_a = app.globalData.couList) === null || _a === void 0 ? void 0 : _a.find(function (_a) {
                var name = _a.name;
                return name === route;
            })
        });
        prepareData(route, this.setData.bind(this));
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
    itemClick: function (event) {
        this.setData({
            heightListhId: event.currentTarget.dataset.id,
            show: true
        });
    },
    submitForm: function () {
        var _this = this;
        subscribeMes();
        this.selectComponent('#form').validate(function (valid, errors) { return __awaiter(_this, void 0, void 0, function () {
            var firstError, defaultInfo, _a, date, time, _id, counselorId, res;
            var _this = this;
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
                        if (this.data.heightListhId === '') {
                            this.setData({
                                error: '请选择预约时段'
                            });
                            return [2];
                        }
                        defaultInfo = {
                            saySome: 'nothing'
                        };
                        _a = this.data.timeList.find(function (item) { return item._id === _this.data.heightListhId; }) || dullTimeObj, date = _a.date, time = _a.time, _id = _a._id, counselorId = _a.counselorId;
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
                        wx.showToast({
                            title: '提交成功'
                        });
                        this.setData({
                            show: false
                        });
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        }); });
    }
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFDSCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLHlDQUEwQztBQUUxQyxJQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXhELFNBQVMsV0FBVyxDQUFDLElBQWdCO0lBQ25DLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsS0FBSztRQUN4QyxJQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU87WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLFVBQVUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ2xELE9BQU8sRUFBRSxHQUFH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RUFBRTtvQ0FDSixRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDO29DQUN4RSxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO29DQUNqQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO29DQUM3QixNQUFNLEVBQUUsT0FBTztvQ0FDZixhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO29DQUNsQyxXQUFXLEVBQUUsV0FBVztvQ0FDeEIsUUFBUSxFQUFFLEdBQUc7aUNBQ2Q7NkJBQ0YsQ0FBQyxFQUFBOzt3QkFWRixTQVVFLENBQUM7d0JBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsTUFBTTt5QkFDZCxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxJQUFJLEVBQUUsS0FBSzt5QkFDWixDQUFDLENBQUE7Ozs7O2FBRVAsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5jb25zdCBfID0gZGIuY29tbWFuZDtcclxuaW1wb3J0IHsgZ2V0WU1EIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcblxyXG5jb25zdCB3ZWVrRGF5V29yZCA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ107XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlTGlzdChsaXN0OiBBcnJheTxhbnk+KSB7XHJcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbm93LmdldERheSgpO1xyXG4gIGNvbnN0IG5vd1RpbWUgPSBub3cuZ2V0VGltZSgpO1xyXG4gIHJldHVybiBuZXcgQXJyYXkoNykuZmlsbCgnJykubWFwKChfLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhbXAgPSBub3dUaW1lICsgMjQgKiA2MCAqIDYwICogMTAwMCAqIChpbmRleCArIDEpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGF0ZTogc3RhbXAsXHJcbiAgICAgIGRhdGVTdHJpbmc6IChuZXcgRGF0ZShzdGFtcCkpLmdldERhdGUoKS50b1N0cmluZygpLFxyXG4gICAgICB3ZWVrRGF5OiAn5ZGoJyArIHdlZWtEYXlXb3JkWyhpbmRleCArIHdlZWtEYXkgKyAxKSAlIDddLFxyXG4gICAgICBwZXJpb2RMaXN0OiBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uZGF0ZSA9PT0gZ2V0WU1EKG5ldyBEYXRlKHN0YW1wKSkpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcHJlcGFyZURhdGEocm91dGU6IHN0cmluZywgc2V0RnVuYzogRnVuY3Rpb24pIHtcclxuICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICBjb3Vuc2Vsb3JJZDogcm91dGUsXHJcbiAgICBkYXRlOiBfLmd0KGdldFlNRChuZXcgRGF0ZSgpKSksXHJcbiAgICBzdGF0dXM6ICdvbidcclxuICB9KS5vcmRlckJ5KCdkYXRlJywgJ2FzYycpLmxpbWl0KDI4KS5nZXQoKTtcclxuICBjb25zdCB0aW1lTGlzdCA9IHJlcy5kYXRhLm1hcChpdGVtID0+IHtcclxuICAgIGNvbnN0IHsgZGF0ZSwgc3RhcnRUaW1lLCBlbmRUaW1lLCBjb3Vuc2Vsb3JJZCwgX2lkLCBjb3VudCB9ID0gaXRlbTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGRhdGUsXHJcbiAgICAgIHN0YXJ0VGltZSxcclxuICAgICAgZW5kVGltZSxcclxuICAgICAgdGltZTogc3RhcnRUaW1lICsgJy0tJyArIGVuZFRpbWUsXHJcbiAgICAgIGNvdW5zZWxvcklkLFxyXG4gICAgICBjb3VudCxcclxuICAgICAgX2lkXHJcbiAgICB9XHJcbiAgfSkgYXMgQXJyYXk8YW55PlxyXG4gIHNldEZ1bmMoe1xyXG4gICAgZGF0ZUxpc3Q6IGdldERhdGVMaXN0KHRpbWVMaXN0KSxcclxuICAgIHRpbWVMaXN0OiB0aW1lTGlzdFxyXG4gIH0pXHJcbn1cclxuXHJcbi8vICDkuIDmrKHmgKfmtojmga/orqLpmIVcclxuZnVuY3Rpb24gc3Vic2NyaWJlTWVzKCkge1xyXG4gIHd4LnJlcXVlc3RTdWJzY3JpYmVNZXNzYWdlKHtcclxuICAgIHRtcGxJZHM6IFsnVHNIVEIzaUNPTmp3SmlqckRQTEgyZVFVcTNRbXhQazVpTmZGaVJjWlUzTSddLFxyXG4gIH0pXHJcbn1cclxuXHJcbmNvbnN0IGR1bGxUaW1lT2JqID0geyBkYXRlOiAnJywgdGltZTogJycsIHN0YXJ0VGltZTogJycsIGVuZFRpbWU6ICcnLCBfaWQ6ICcnLCBjb3Vuc2Vsb3JJZDogJyd9O1xyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgY291bnNlbG9yOiAnJyxcclxuICAgICAgICBoZWlnaHRMaXN0aElkOiAnJyxcclxuICAgICAgICB0aW1lTGlzdDogW2R1bGxUaW1lT2JqXSxcclxuXHJcbiAgICAgICAgLy8gIGRhdGVMaXN0OiBbeyBkYXRlOiAwLCBkYXRlU3RyaW5nOiAnJywgd2Vla0RheTogJycsIHBlcmlvZExpc3Q6IFtkdWxsVGltZU9ial19XSxcclxuICAgICAgICBkYXRlTGlzdDogW10sXHJcblxyXG4gICAgICAgIHVzZXJJbmZvOiB7fSxcclxuICAgICAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICAgICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxyXG4gICAgXHJcbiAgICAgICAgc2hvd1RvcFRpcHM6IGZhbHNlLFxyXG4gICAgXHJcbiAgICAgICAgZGF0ZTogXCIyMDE2LTA5LTAxXCIsXHJcbiAgICAgICAgdGltZTogXCIxMjowMVwiLFxyXG4gICAgICAgIHNheVNvbWU6ICcnLFxyXG4gICAgXHJcbiAgICAgICAgYWNjb3VudHM6IFtcIuW+ruS/oeWPt1wiLCBcIlFRXCIsIFwiRW1haWxcIl0sXHJcbiAgICAgICAgYWNjb3VudEluZGV4OiAwLFxyXG4gICAgXHJcbiAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdtb2JpbGUnLFxyXG4gICAgICAgICAgICBydWxlczogW3tyZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeW/heWhqyd9LCB7bW9iaWxlOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5qC85byP5LiN5a+5J31dLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2hvdzogZmFsc2UsXHJcbiAgICAgICAgY291bnNlbG9ySW5mbzoge31cclxuICAgIH0sXHJcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXHJcbiAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcclxuICAgIH0pXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgIGxldCBjdXJyUGFnZSA9IG51bGw7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwYWdlcykg55qE5Yiw5LiA5Liq5pWw57uEXHJcbiAgICBpZiAocGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIC8vIOiOt+WPluW9k+WJjemhtemdoueahOWvueixoe+8iOS4iui+ueaJgOiOt+W+l+eahOaVsOe7hOS4reacgOWQjuS4gOmhueWwseaYr+W9k+WJjemhtemdoueahOWvueixoe+8iVxyXG4gICAgICBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG4gICAgLy8g6I635Y+W5b2T5YmN6aG16Z2i55qE6Lev55SxXHJcbiAgICBsZXQgcm91dGUgPSBjdXJyUGFnZT8ub3B0aW9ucy5uYW1lO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBjb3Vuc2Vsb3I6IHJvdXRlLFxyXG4gICAgICAgIGNvdW5zZWxvckluZm86IGFwcC5nbG9iYWxEYXRhLmNvdUxpc3Q/LmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lID09PSByb3V0ZSlcclxuICAgIH0pO1xyXG4gICAgcHJlcGFyZURhdGEocm91dGUsIHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xyXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxyXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgIH0pXHJcbiAgfSxcclxuICBiaW5kRGF0ZUNoYW5nZTogZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEuZGF0ZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRleHRDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2F5U29tZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgIFtgZm9ybURhdGEuc2F5U29tZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGZvcm1JbnB1dENoYW5nZTogZnVuY3Rpb24oZTogRG9tRXZlbnQpIHtcclxuICAgICAgY29uc3Qge2ZpZWxkfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRpbWVDaGFuZ2U6IGFzeW5jIGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdGltZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLnRpbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGl0ZW1DbGljayhldmVudDogRG9tRXZlbnQpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGhlaWdodExpc3RoSWQ6IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCxcclxuICAgICAgc2hvdzogdHJ1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICAgIC8vICDov5nkuKrorqLpmIXmlL7lnKjph4zpnaLosozkvLzml6Dms5Xop6blj5FcclxuICAgICAgc3Vic2NyaWJlTWVzKCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KCcjZm9ybScpLnZhbGlkYXRlKGFzeW5jICh2YWxpZDogYm9vbGVhbiwgZXJyb3JzOiBBcnJheTx2YWxpZGF0ZUluZm8+KSA9PiB7XHJcbiAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycyk7XHJcbiAgICAgICAgICAgIGlmIChmaXJzdEVycm9yLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JzW3BhcnNlSW50KGZpcnN0RXJyb3JbMF0pXS5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAg6aKE57qm5pe25q615b+F6YCJXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaGVpZ2h0TGlzdGhJZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivt+mAieaLqemihOe6puaXtuautSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0SW5mbyA9IHtcclxuICAgICAgICAgICAgICBzYXlTb21lOiAnbm90aGluZydcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRlLCB0aW1lLCBfaWQsIGNvdW5zZWxvcklkIH0gPSB0aGlzLmRhdGEudGltZUxpc3QuZmluZChpdGVtID0+IGl0ZW0uX2lkID09PSB0aGlzLmRhdGEuaGVpZ2h0TGlzdGhJZCkgfHwgZHVsbFRpbWVPYmo7XHJcbiAgICAgICAgICAgIC8vICAgIOmBv+WFjemHjeWkjemihOe6plxyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICAgICAgICAgICAgX2lkLFxyXG4gICAgICAgICAgICAgIGNvdW50OiAxXHJcbiAgICAgICAgICAgIH0pLmNvdW50KCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMudG90YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivpeaXtuauteS4jeWPr+mihOe6pidcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmFkZCh7XHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IE9iamVjdC5hc3NpZ24oZGVmYXVsdEluZm8sIHRoaXMuZGF0YS5mb3JtRGF0YSwgeyBkYXRlLCB0aW1lIH0pLFxyXG4gICAgICAgICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgb3BlbklkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHBseScsXHJcbiAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JOYW1lOiB0aGlzLmRhdGEuY291bnNlbG9yLFxyXG4gICAgICAgICAgICAgICAgY291bnNlbG9ySWQ6IGNvdW5zZWxvcklkLFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kSWQ6IF9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DkuqTmiJDlip8nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307Il19