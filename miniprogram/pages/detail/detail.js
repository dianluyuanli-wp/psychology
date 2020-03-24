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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFDSCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLHlDQUEwQztBQUUxQyxJQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXhELFNBQVMsV0FBVyxDQUFDLElBQWdCO0lBQ25DLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsS0FBSztRQUN4QyxJQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU87WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLFVBQVUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ2xELE9BQU8sRUFBRSxHQUFH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QkFDbkIsQ0FBQyxDQUFBOzRCQUNGLFdBQU87eUJBQ1I7d0JBQ0QsV0FBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDckMsSUFBSSxFQUFFO29DQUNKLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUM7b0NBQ3hFLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7b0NBQ2pDLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07b0NBQzdCLE1BQU0sRUFBRSxPQUFPO29DQUNmLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7b0NBQ2xDLFdBQVcsRUFBRSxXQUFXO29DQUN4QixRQUFRLEVBQUUsR0FBRztpQ0FDZDs2QkFDRixDQUFDLEVBQUE7O3dCQVZGLFNBVUUsQ0FBQzt3QkFDSCxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxNQUFNO3lCQUNkLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLElBQUksRUFBRSxLQUFLO3lCQUNaLENBQUMsQ0FBQTs7Ozs7YUFFUCxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblxyXG5jb25zdCBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtcclxuICBlbnY6ICd0ZXN0LXBzeS1xa3R1aydcclxufSk7XHJcbmNvbnN0IF8gPSBkYi5jb21tYW5kO1xyXG5pbXBvcnQgeyBnZXRZTUQgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcclxuXHJcbmNvbnN0IHdlZWtEYXlXb3JkID0gWyfml6UnLCAn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nXTtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGVMaXN0KGxpc3Q6IEFycmF5PGFueT4pIHtcclxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gIGNvbnN0IHdlZWtEYXkgPSBub3cuZ2V0RGF5KCk7XHJcbiAgY29uc3Qgbm93VGltZSA9IG5vdy5nZXRUaW1lKCk7XHJcbiAgcmV0dXJuIG5ldyBBcnJheSg3KS5maWxsKCcnKS5tYXAoKF8sIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBzdGFtcCA9IG5vd1RpbWUgKyAyNCAqIDYwICogNjAgKiAxMDAwICogKGluZGV4ICsgMSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkYXRlOiBzdGFtcCxcclxuICAgICAgZGF0ZVN0cmluZzogKG5ldyBEYXRlKHN0YW1wKSkuZ2V0RGF0ZSgpLnRvU3RyaW5nKCksXHJcbiAgICAgIHdlZWtEYXk6ICflkagnICsgd2Vla0RheVdvcmRbKGluZGV4ICsgd2Vla0RheSArIDEpICUgN10sXHJcbiAgICAgIHBlcmlvZExpc3Q6IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5kYXRlID09PSBnZXRZTUQobmV3IERhdGUoc3RhbXApKSlcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwcmVwYXJlRGF0YShyb3V0ZTogc3RyaW5nLCBzZXRGdW5jOiBGdW5jdGlvbikge1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3BlcmlvZCcpLndoZXJlKHtcclxuICAgIGNvdW5zZWxvcklkOiByb3V0ZSxcclxuICAgIGRhdGU6IF8uZ3QoZ2V0WU1EKG5ldyBEYXRlKCkpKSxcclxuICAgIHN0YXR1czogJ29uJ1xyXG4gIH0pLm9yZGVyQnkoJ2RhdGUnLCAnYXNjJykubGltaXQoMjgpLmdldCgpO1xyXG4gIGNvbnN0IHRpbWVMaXN0ID0gcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgY29uc3QgeyBkYXRlLCBzdGFydFRpbWUsIGVuZFRpbWUsIGNvdW5zZWxvcklkLCBfaWQsIGNvdW50IH0gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGF0ZSxcclxuICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICBlbmRUaW1lLFxyXG4gICAgICB0aW1lOiBzdGFydFRpbWUgKyAnLS0nICsgZW5kVGltZSxcclxuICAgICAgY291bnNlbG9ySWQsXHJcbiAgICAgIGNvdW50LFxyXG4gICAgICBfaWRcclxuICAgIH1cclxuICB9KSBhcyBBcnJheTxhbnk+XHJcbiAgc2V0RnVuYyh7XHJcbiAgICBkYXRlTGlzdDogZ2V0RGF0ZUxpc3QodGltZUxpc3QpLFxyXG4gICAgdGltZUxpc3Q6IHRpbWVMaXN0XHJcbiAgfSlcclxufVxyXG5cclxuLy8gIOS4gOasoeaAp+a2iOaBr+iuoumYhVxyXG5mdW5jdGlvbiBzdWJzY3JpYmVNZXMoKSB7XHJcbiAgd3gucmVxdWVzdFN1YnNjcmliZU1lc3NhZ2Uoe1xyXG4gICAgdG1wbElkczogWydUc0hUQjNpQ09OandKaWpyRFBMSDJlUVVxM1FteFBrNWlOZkZpUmNaVTNNJ10sXHJcbiAgfSlcclxufVxyXG5cclxuY29uc3QgZHVsbFRpbWVPYmogPSB7IGRhdGU6ICcnLCB0aW1lOiAnJywgc3RhcnRUaW1lOiAnJywgZW5kVGltZTogJycsIF9pZDogJycsIGNvdW5zZWxvcklkOiAnJ307XHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBjb3Vuc2Vsb3I6ICcnLFxyXG4gICAgICAgIGhlaWdodExpc3RoSWQ6ICcnLFxyXG4gICAgICAgIHRpbWVMaXN0OiBbZHVsbFRpbWVPYmpdLFxyXG5cclxuICAgICAgICBkYXRlTGlzdDogW3sgZGF0ZTogMCwgZGF0ZVN0cmluZzogJycsIHdlZWtEYXk6ICcnLCBwZXJpb2RMaXN0OiBbZHVsbFRpbWVPYmpdfV0sXHJcblxyXG4gICAgICAgIHVzZXJJbmZvOiB7fSxcclxuICAgICAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICAgICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxyXG4gICAgXHJcbiAgICAgICAgc2hvd1RvcFRpcHM6IGZhbHNlLFxyXG4gICAgXHJcbiAgICAgICAgZGF0ZTogXCIyMDE2LTA5LTAxXCIsXHJcbiAgICAgICAgdGltZTogXCIxMjowMVwiLFxyXG4gICAgICAgIHNheVNvbWU6ICcnLFxyXG4gICAgXHJcbiAgICAgICAgYWNjb3VudHM6IFtcIuW+ruS/oeWPt1wiLCBcIlFRXCIsIFwiRW1haWxcIl0sXHJcbiAgICAgICAgYWNjb3VudEluZGV4OiAwLFxyXG4gICAgXHJcbiAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdtb2JpbGUnLFxyXG4gICAgICAgICAgICBydWxlczogW3tyZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeW/heWhqyd9LCB7bW9iaWxlOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5qC85byP5LiN5a+5J31dLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2hvdzogZmFsc2UsXHJcbiAgICAgICAgY291bnNlbG9ySW5mbzoge31cclxuICAgIH0sXHJcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXHJcbiAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcclxuICAgIH0pXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgIGxldCBjdXJyUGFnZSA9IG51bGw7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwYWdlcykg55qE5Yiw5LiA5Liq5pWw57uEXHJcbiAgICBpZiAocGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIC8vIOiOt+WPluW9k+WJjemhtemdoueahOWvueixoe+8iOS4iui+ueaJgOiOt+W+l+eahOaVsOe7hOS4reacgOWQjuS4gOmhueWwseaYr+W9k+WJjemhtemdoueahOWvueixoe+8iVxyXG4gICAgICBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG4gICAgLy8g6I635Y+W5b2T5YmN6aG16Z2i55qE6Lev55SxXHJcbiAgICBsZXQgcm91dGUgPSBjdXJyUGFnZT8ub3B0aW9ucy5uYW1lO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBjb3Vuc2Vsb3I6IHJvdXRlLFxyXG4gICAgICAgIGNvdW5zZWxvckluZm86IGFwcC5nbG9iYWxEYXRhLmNvdUxpc3Q/LmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lID09PSByb3V0ZSlcclxuICAgIH0pO1xyXG4gICAgcHJlcGFyZURhdGEocm91dGUsIHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xyXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxyXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgIH0pXHJcbiAgfSxcclxuICBiaW5kRGF0ZUNoYW5nZTogZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEuZGF0ZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRleHRDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2F5U29tZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgIFtgZm9ybURhdGEuc2F5U29tZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGZvcm1JbnB1dENoYW5nZTogZnVuY3Rpb24oZTogRG9tRXZlbnQpIHtcclxuICAgICAgY29uc3Qge2ZpZWxkfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRpbWVDaGFuZ2U6IGFzeW5jIGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdGltZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLnRpbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGl0ZW1DbGljayhldmVudDogRG9tRXZlbnQpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGhlaWdodExpc3RoSWQ6IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCxcclxuICAgICAgc2hvdzogdHJ1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICAgIC8vICDov5nkuKrorqLpmIXmlL7lnKjph4zpnaLosozkvLzml6Dms5Xop6blj5FcclxuICAgICAgc3Vic2NyaWJlTWVzKCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KCcjZm9ybScpLnZhbGlkYXRlKGFzeW5jICh2YWxpZDogYm9vbGVhbiwgZXJyb3JzOiBBcnJheTx2YWxpZGF0ZUluZm8+KSA9PiB7XHJcbiAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycyk7XHJcbiAgICAgICAgICAgIGlmIChmaXJzdEVycm9yLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JzW3BhcnNlSW50KGZpcnN0RXJyb3JbMF0pXS5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAg6aKE57qm5pe25q615b+F6YCJXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaGVpZ2h0TGlzdGhJZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivt+mAieaLqemihOe6puaXtuautSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0SW5mbyA9IHtcclxuICAgICAgICAgICAgICBzYXlTb21lOiAnbm90aGluZydcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRlLCB0aW1lLCBfaWQsIGNvdW5zZWxvcklkIH0gPSB0aGlzLmRhdGEudGltZUxpc3QuZmluZChpdGVtID0+IGl0ZW0uX2lkID09PSB0aGlzLmRhdGEuaGVpZ2h0TGlzdGhJZCkgfHwgZHVsbFRpbWVPYmo7XHJcbiAgICAgICAgICAgIC8vICAgIOmBv+WFjemHjeWkjemihOe6plxyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICAgICAgICAgICAgX2lkLFxyXG4gICAgICAgICAgICAgIGNvdW50OiAxXHJcbiAgICAgICAgICAgIH0pLmNvdW50KCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMudG90YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivpeaXtuauteS4jeWPr+mihOe6pidcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmFkZCh7XHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IE9iamVjdC5hc3NpZ24oZGVmYXVsdEluZm8sIHRoaXMuZGF0YS5mb3JtRGF0YSwgeyBkYXRlLCB0aW1lIH0pLFxyXG4gICAgICAgICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgb3BlbklkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHBseScsXHJcbiAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JOYW1lOiB0aGlzLmRhdGEuY291bnNlbG9yLFxyXG4gICAgICAgICAgICAgICAgY291bnNlbG9ySWQ6IGNvdW5zZWxvcklkLFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kSWQ6IF9pZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DkuqTmiJDlip8nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307Il19