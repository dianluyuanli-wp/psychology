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
    console.log('月月');
}
var dullTimeObj = { date: '', time: '', startTime: '', endTime: '', _id: '', counselorId: '' };
Page({
    data: {
        counselor: '',
        heightListhId: '',
        timeList: [dullTimeObj],
        dateList: [{ date: 0, dateString: '', weekDay: '', periodList: [dullTimeObj] }],
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
                        console.log('预定');
                        subscribeMes();
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        }); });
    }
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFDSCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLHlDQUEwQztBQUUxQyxJQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXhELFNBQVMsV0FBVyxDQUFDLElBQWdCO0lBQ25DLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsS0FBSztRQUN4QyxJQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU87WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLFVBQVUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ2xELE9BQU8sRUFBRSxHQUFH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Q0FDVCxLQUFLLEVBQUUsU0FBUzs2QkFDbkIsQ0FBQyxDQUFBOzRCQUNGLFdBQU87eUJBQ1I7d0JBQ0QsV0FBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDckMsSUFBSSxFQUFFO29DQUNKLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUM7b0NBQ3hFLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7b0NBQ2pDLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07b0NBQzdCLE1BQU0sRUFBRSxPQUFPO29DQUNmLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7b0NBQ2xDLFdBQVcsRUFBRSxXQUFXO29DQUN4QixRQUFRLEVBQUUsR0FBRztpQ0FDZDs2QkFDRixDQUFDLEVBQUE7O3dCQVZGLFNBVUUsQ0FBQzt3QkFDSCxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxNQUFNO3lCQUNkLENBQUMsQ0FBQzt3QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixZQUFZLEVBQUUsQ0FBQzs7Ozs7YUFFdEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5jb25zdCBfID0gZGIuY29tbWFuZDtcclxuaW1wb3J0IHsgZ2V0WU1EIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcblxyXG5jb25zdCB3ZWVrRGF5V29yZCA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ107XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlTGlzdChsaXN0OiBBcnJheTxhbnk+KSB7XHJcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbm93LmdldERheSgpO1xyXG4gIGNvbnN0IG5vd1RpbWUgPSBub3cuZ2V0VGltZSgpO1xyXG4gIHJldHVybiBuZXcgQXJyYXkoNykuZmlsbCgnJykubWFwKChfLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhbXAgPSBub3dUaW1lICsgMjQgKiA2MCAqIDYwICogMTAwMCAqIChpbmRleCArIDEpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGF0ZTogc3RhbXAsXHJcbiAgICAgIGRhdGVTdHJpbmc6IChuZXcgRGF0ZShzdGFtcCkpLmdldERhdGUoKS50b1N0cmluZygpLFxyXG4gICAgICB3ZWVrRGF5OiAn5ZGoJyArIHdlZWtEYXlXb3JkWyhpbmRleCArIHdlZWtEYXkgKyAxKSAlIDddLFxyXG4gICAgICBwZXJpb2RMaXN0OiBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uZGF0ZSA9PT0gZ2V0WU1EKG5ldyBEYXRlKHN0YW1wKSkpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcHJlcGFyZURhdGEocm91dGU6IHN0cmluZywgc2V0RnVuYzogRnVuY3Rpb24pIHtcclxuICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICBjb3Vuc2Vsb3JJZDogcm91dGUsXHJcbiAgICBkYXRlOiBfLmd0KGdldFlNRChuZXcgRGF0ZSgpKSksXHJcbiAgICBzdGF0dXM6ICdvbidcclxuICB9KS5vcmRlckJ5KCdkYXRlJywgJ2FzYycpLmxpbWl0KDI4KS5nZXQoKTtcclxuICBjb25zdCB0aW1lTGlzdCA9IHJlcy5kYXRhLm1hcChpdGVtID0+IHtcclxuICAgIGNvbnN0IHsgZGF0ZSwgc3RhcnRUaW1lLCBlbmRUaW1lLCBjb3Vuc2Vsb3JJZCwgX2lkLCBjb3VudCB9ID0gaXRlbTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGRhdGUsXHJcbiAgICAgIHN0YXJ0VGltZSxcclxuICAgICAgZW5kVGltZSxcclxuICAgICAgdGltZTogc3RhcnRUaW1lICsgJy0tJyArIGVuZFRpbWUsXHJcbiAgICAgIGNvdW5zZWxvcklkLFxyXG4gICAgICBjb3VudCxcclxuICAgICAgX2lkXHJcbiAgICB9XHJcbiAgfSkgYXMgQXJyYXk8YW55PlxyXG4gIHNldEZ1bmMoe1xyXG4gICAgZGF0ZUxpc3Q6IGdldERhdGVMaXN0KHRpbWVMaXN0KSxcclxuICAgIHRpbWVMaXN0OiB0aW1lTGlzdFxyXG4gIH0pXHJcbn1cclxuXHJcbi8vICDkuIDmrKHmgKfmtojmga/orqLpmIVcclxuZnVuY3Rpb24gc3Vic2NyaWJlTWVzKCkge1xyXG4gIHd4LnJlcXVlc3RTdWJzY3JpYmVNZXNzYWdlKHtcclxuICAgIHRtcGxJZHM6IFsnVHNIVEIzaUNPTmp3SmlqckRQTEgyZVFVcTNRbXhQazVpTmZGaVJjWlUzTSddLFxyXG4gIH0pXHJcbiAgY29uc29sZS5sb2coJ+aciOaciCcpXHJcbn1cclxuXHJcbmNvbnN0IGR1bGxUaW1lT2JqID0geyBkYXRlOiAnJywgdGltZTogJycsIHN0YXJ0VGltZTogJycsIGVuZFRpbWU6ICcnLCBfaWQ6ICcnLCBjb3Vuc2Vsb3JJZDogJyd9O1xyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgY291bnNlbG9yOiAnJyxcclxuICAgICAgICBoZWlnaHRMaXN0aElkOiAnJyxcclxuICAgICAgICB0aW1lTGlzdDogW2R1bGxUaW1lT2JqXSxcclxuXHJcbiAgICAgICAgZGF0ZUxpc3Q6IFt7IGRhdGU6IDAsIGRhdGVTdHJpbmc6ICcnLCB3ZWVrRGF5OiAnJywgcGVyaW9kTGlzdDogW2R1bGxUaW1lT2JqXX1dLFxyXG5cclxuICAgICAgICB1c2VySW5mbzoge30sXHJcbiAgICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIFxyXG4gICAgICAgIHNob3dUb3BUaXBzOiBmYWxzZSxcclxuICAgIFxyXG4gICAgICAgIGRhdGU6IFwiMjAxNi0wOS0wMVwiLFxyXG4gICAgICAgIHRpbWU6IFwiMTI6MDFcIixcclxuICAgICAgICBzYXlTb21lOiAnJyxcclxuICAgIFxyXG4gICAgICAgIGFjY291bnRzOiBbXCLlvq7kv6Hlj7dcIiwgXCJRUVwiLCBcIkVtYWlsXCJdLFxyXG4gICAgICAgIGFjY291bnRJbmRleDogMCxcclxuICAgIFxyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnbW9iaWxlJyxcclxuICAgICAgICAgICAgcnVsZXM6IFt7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXlv4XloasnfSwge21vYmlsZTogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeagvOW8j+S4jeWvuSd9XSxcclxuICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgIGNvdW5zZWxvckluZm86IHt9XHJcbiAgICB9LFxyXG4gIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxyXG4gIGJpbmRWaWV3VGFwKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uL2xvZ3MvbG9ncycsXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICBsZXQgY3VyclBhZ2UgPSBudWxsO1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFnZXMpIOeahOWIsOS4gOS4quaVsOe7hFxyXG4gICAgaWYgKHBhZ2VzLmxlbmd0aCkge1xyXG4gICAgICAvLyDojrflj5blvZPliY3pobXpnaLnmoTlr7nosaHvvIjkuIrovrnmiYDojrflvpfnmoTmlbDnu4TkuK3mnIDlkI7kuIDpobnlsLHmmK/lvZPliY3pobXpnaLnmoTlr7nosaHvvIlcclxuICAgICAgY3VyclBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuICAgIC8vIOiOt+WPluW9k+WJjemhtemdoueahOi3r+eUsVxyXG4gICAgbGV0IHJvdXRlID0gY3VyclBhZ2U/Lm9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgY291bnNlbG9yOiByb3V0ZSxcclxuICAgICAgICBjb3Vuc2Vsb3JJbmZvOiBhcHAuZ2xvYmFsRGF0YS5jb3VMaXN0Py5maW5kKCh7IG5hbWUgfSkgPT4gbmFtZSA9PT0gcm91dGUpXHJcbiAgICB9KTtcclxuICAgIHByZXBhcmVEYXRhKHJvdXRlLCB0aGlzLnNldERhdGEuYmluZCh0aGlzKSk7XHJcbiAgfSxcclxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcclxuICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYmluZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgZGF0ZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLmRhdGVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGJpbmRUZXh0Q2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHNheVNvbWU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICBbYGZvcm1EYXRhLnNheVNvbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBmb3JtSW5wdXRDaGFuZ2U6IGZ1bmN0aW9uKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHtmaWVsZH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGJpbmRUaW1lQ2hhbmdlOiBhc3luYyBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHRpbWU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgICAgW2Bmb3JtRGF0YS50aW1lYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBpdGVtQ2xpY2soZXZlbnQ6IERvbUV2ZW50KSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBoZWlnaHRMaXN0aElkOiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQsXHJcbiAgICAgIHNob3c6IHRydWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBzdWJtaXRGb3JtKCkge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudCgnI2Zvcm0nKS52YWxpZGF0ZShhc3luYyAodmFsaWQ6IGJvb2xlYW4sIGVycm9yczogQXJyYXk8dmFsaWRhdGVJbmZvPikgPT4ge1xyXG4gICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdEVycm9yID0gT2JqZWN0LmtleXMoZXJyb3JzKTtcclxuICAgICAgICAgICAgICBpZiAoZmlyc3RFcnJvci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbcGFyc2VJbnQoZmlyc3RFcnJvclswXSldLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vICAgIOmihOe6puaXtuauteW/hemAiVxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaGVpZ2h0TGlzdGhJZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICfor7fpgInmi6npooTnuqbml7bmrrUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIHNheVNvbWU6ICdub3RoaW5nJ1xyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgY29uc3QgeyBkYXRlLCB0aW1lLCBfaWQsIGNvdW5zZWxvcklkIH0gPSB0aGlzLmRhdGEudGltZUxpc3QuZmluZChpdGVtID0+IGl0ZW0uX2lkID09PSB0aGlzLmRhdGEuaGVpZ2h0TGlzdGhJZCkgfHwgZHVsbFRpbWVPYmo7XHJcbiAgICAgICAgICAgICAgLy8gICAg6YG/5YWN6YeN5aSN6aKE57qmXHJcbiAgICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbigncGVyaW9kJykud2hlcmUoe1xyXG4gICAgICAgICAgICAgICAgX2lkLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDFcclxuICAgICAgICAgICAgICB9KS5jb3VudCgpO1xyXG4gICAgICAgICAgICAgIGlmIChyZXMudG90YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICfor6Xml7bmrrXkuI3lj6/pooTnuqYnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBPYmplY3QuYXNzaWduKGRlZmF1bHRJbmZvLCB0aGlzLmRhdGEuZm9ybURhdGEsIHsgZGF0ZSwgdGltZSB9KSxcclxuICAgICAgICAgICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgICBvcGVuSWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5JZCxcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnYXBwbHknLFxyXG4gICAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JOYW1lOiB0aGlzLmRhdGEuY291bnNlbG9yLFxyXG4gICAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JJZDogY291bnNlbG9ySWQsXHJcbiAgICAgICAgICAgICAgICAgIHBlcmlvZElkOiBfaWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DkuqTmiJDlip8nXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+mihOWumicpO1xyXG4gICAgICAgICAgICAgIHN1YnNjcmliZU1lcygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9OyJdfQ==