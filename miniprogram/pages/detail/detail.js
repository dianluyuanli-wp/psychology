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
        var stamp = nowTime + 24 * 60 * 60 * 1000 * index;
        return {
            date: stamp,
            dateString: (new Date(stamp)).getDate().toString(),
            weekDay: '周' + weekDayWord[(index + weekDay) % 7],
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
                        date: _.gte(util_1.getYMD(new Date())),
                        status: 'on'
                    }).orderBy('date', 'asc').limit(7).get()];
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
                    console.log(getDateList(timeList));
                    setFunc({
                        dateList: getDateList(timeList),
                        timeList: timeList
                    });
                    return [2];
            }
        });
    });
}
var dullTimeObj = { date: '', time: '', startTime: '', endTime: '', _id: '', counselorId: '' };
Page({
    data: {
        counselor: '',
        heighLightIndex: 1000,
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
        var pages = getCurrentPages();
        var currPage = null;
        if (pages.length) {
            currPage = pages[pages.length - 1];
        }
        var route = currPage === null || currPage === void 0 ? void 0 : currPage.options.name;
        this.setData({
            counselor: route
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFDSCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLHlDQUEwQztBQUUxQyxJQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXhELFNBQVMsV0FBVyxDQUFDLElBQWdCO0lBQ25DLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUU5QixPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsS0FBSztRQUN4QyxJQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLEtBQUs7WUFDWCxVQUFVLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsRCxPQUFPLEVBQUUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFD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Q0FDZixhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO29DQUNsQyxXQUFXLEVBQUUsV0FBVztvQ0FDeEIsUUFBUSxFQUFFLEdBQUc7aUNBQ2Q7NkJBQ0YsQ0FBQyxFQUFBOzt3QkFWRixTQVVFLENBQUM7d0JBQ0gsV0FBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFBOzt3QkFBcEUsU0FBb0UsQ0FBQzt3QkFDckUsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsTUFBTTt5QkFDZCxDQUFDLENBQUM7Ozs7O2FBRVYsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5jb25zdCBfID0gZGIuY29tbWFuZDtcclxuaW1wb3J0IHsgZ2V0WU1EIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcblxyXG5jb25zdCB3ZWVrRGF5V29yZCA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ107XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlTGlzdChsaXN0OiBBcnJheTxhbnk+KSB7XHJcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbm93LmdldERheSgpO1xyXG4gIGNvbnN0IG5vd1RpbWUgPSBub3cuZ2V0VGltZSgpO1xyXG5cclxuICByZXR1cm4gbmV3IEFycmF5KDcpLmZpbGwoJycpLm1hcCgoXywgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IHN0YW1wID0gbm93VGltZSArIDI0ICogNjAgKiA2MCAqIDEwMDAgKiBpbmRleDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGRhdGU6IHN0YW1wLFxyXG4gICAgICBkYXRlU3RyaW5nOiAobmV3IERhdGUoc3RhbXApKS5nZXREYXRlKCkudG9TdHJpbmcoKSxcclxuICAgICAgd2Vla0RheTogJ+WRqCcgKyB3ZWVrRGF5V29yZFsoaW5kZXggKyB3ZWVrRGF5KSAlIDddLFxyXG4gICAgICBwZXJpb2RMaXN0OiBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uZGF0ZSA9PT0gZ2V0WU1EKG5ldyBEYXRlKHN0YW1wKSkpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcHJlcGFyZURhdGEocm91dGU6IHN0cmluZywgc2V0RnVuYzogRnVuY3Rpb24pIHtcclxuICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICBjb3Vuc2Vsb3JJZDogcm91dGUsXHJcbiAgICBkYXRlOiBfLmd0ZShnZXRZTUQobmV3IERhdGUoKSkpLFxyXG4gICAgc3RhdHVzOiAnb24nXHJcbiAgfSkub3JkZXJCeSgnZGF0ZScsICdhc2MnKS5saW1pdCg3KS5nZXQoKTtcclxuICBjb25zdCB0aW1lTGlzdCA9IHJlcy5kYXRhLm1hcChpdGVtID0+IHtcclxuICAgIGNvbnN0IHsgZGF0ZSwgc3RhcnRUaW1lLCBlbmRUaW1lLCBjb3Vuc2Vsb3JJZCwgX2lkLCBjb3VudCB9ID0gaXRlbTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGRhdGUsXHJcbiAgICAgIHN0YXJ0VGltZSxcclxuICAgICAgZW5kVGltZSxcclxuICAgICAgdGltZTogc3RhcnRUaW1lICsgJy0tJyArIGVuZFRpbWUsXHJcbiAgICAgIGNvdW5zZWxvcklkLFxyXG4gICAgICBjb3VudCxcclxuICAgICAgX2lkXHJcbiAgICB9XHJcbiAgfSkgYXMgQXJyYXk8YW55PlxyXG4gIGNvbnNvbGUubG9nKGdldERhdGVMaXN0KHRpbWVMaXN0KSk7XHJcbiAgc2V0RnVuYyh7XHJcbiAgICBkYXRlTGlzdDogZ2V0RGF0ZUxpc3QodGltZUxpc3QpLFxyXG4gICAgdGltZUxpc3Q6IHRpbWVMaXN0XHJcbiAgfSlcclxufVxyXG5cclxuY29uc3QgZHVsbFRpbWVPYmogPSB7IGRhdGU6ICcnLCB0aW1lOiAnJywgc3RhcnRUaW1lOiAnJywgZW5kVGltZTogJycsIF9pZDogJycsIGNvdW5zZWxvcklkOiAnJ307XHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBjb3Vuc2Vsb3I6ICcnLFxyXG4gICAgICAgIGhlaWdoTGlnaHRJbmRleDogMTAwMCxcclxuICAgICAgICB0aW1lTGlzdDogW2R1bGxUaW1lT2JqXSxcclxuXHJcbiAgICAgICAgZGF0ZUxpc3Q6IFt7IGRhdGU6IDAsIGRhdGVTdHJpbmc6ICcnLCB3ZWVrRGF5OiAnJywgcGVyaW9kTGlzdDogW2R1bGxUaW1lT2JqXX1dLFxyXG5cclxuICAgICAgICB1c2VySW5mbzoge30sXHJcbiAgICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIFxyXG4gICAgICAgIHNob3dUb3BUaXBzOiBmYWxzZSxcclxuICAgIFxyXG4gICAgICAgIGRhdGU6IFwiMjAxNi0wOS0wMVwiLFxyXG4gICAgICAgIHRpbWU6IFwiMTI6MDFcIixcclxuICAgICAgICBzYXlTb21lOiAnJyxcclxuICAgIFxyXG4gICAgICAgIGFjY291bnRzOiBbXCLlvq7kv6Hlj7dcIiwgXCJRUVwiLCBcIkVtYWlsXCJdLFxyXG4gICAgICAgIGFjY291bnRJbmRleDogMCxcclxuICAgIFxyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnbW9iaWxlJyxcclxuICAgICAgICAgICAgcnVsZXM6IFt7cmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXlv4XloasnfSwge21vYmlsZTogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeagvOW8j+S4jeWvuSd9XSxcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gIGNoZWNrKGV2ZW50OiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgaGVpZ2hMaWdodEluZGV4OiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgfSlcclxuICB9LFxyXG4gICAgICAvLyDkuovku7blpITnkIblh73mlbBcclxuICBiaW5kVmlld1RhcCgpIHtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICcuLi9sb2dzL2xvZ3MnLFxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgbGV0IGN1cnJQYWdlID0gbnVsbDtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhZ2VzKSDnmoTliLDkuIDkuKrmlbDnu4RcclxuICAgIGlmIChwYWdlcy5sZW5ndGgpIHtcclxuICAgICAgLy8g6I635Y+W5b2T5YmN6aG16Z2i55qE5a+56LGh77yI5LiK6L655omA6I635b6X55qE5pWw57uE5Lit5pyA5ZCO5LiA6aG55bCx5piv5b2T5YmN6aG16Z2i55qE5a+56LGh77yJXHJcbiAgICAgIGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbiAgICAvLyDojrflj5blvZPliY3pobXpnaLnmoTot6/nlLFcclxuICAgIGxldCByb3V0ZSA9IGN1cnJQYWdlPy5vcHRpb25zLm5hbWU7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGNvdW5zZWxvcjogcm91dGVcclxuICAgIH0pO1xyXG4gICAgcHJlcGFyZURhdGEocm91dGUsIHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xyXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxyXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgIH0pXHJcbiAgfSxcclxuICBiaW5kRGF0ZUNoYW5nZTogZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEuZGF0ZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRleHRDaGFuZ2U6IGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2F5U29tZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgIFtgZm9ybURhdGEuc2F5U29tZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGZvcm1JbnB1dENoYW5nZTogZnVuY3Rpb24oZTogRG9tRXZlbnQpIHtcclxuICAgICAgY29uc3Qge2ZpZWxkfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgYmluZFRpbWVDaGFuZ2U6IGFzeW5jIGZ1bmN0aW9uIChlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdGltZTogZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICBbYGZvcm1EYXRhLnRpbWVgXTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICB9LFxyXG4gIGNoZWNrZnkoKSB7XHJcblxyXG4gIH0sXHJcbiAgc3VibWl0Rm9ybSgpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoJyNmb3JtJykudmFsaWRhdGUoYXN5bmMgKHZhbGlkOiBib29sZWFuLCBlcnJvcnM6IEFycmF5PHZhbGlkYXRlSW5mbz4pID0+IHtcclxuICAgICAgICAgIGlmICghdmFsaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JzW3BhcnNlSW50KGZpcnN0RXJyb3JbMF0pXS5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyAgICDpooTnuqbml7bmrrXlv4XpgIlcclxuICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmhlaWdoTGlnaHRJbmRleCA9PT0gMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivt+mAieaLqemihOe6puaXtuautSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgc2F5U29tZTogJ25vdGhpbmcnXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBjb25zdCB7IGRhdGUsIHRpbWUsIF9pZCwgY291bnNlbG9ySWQgfSA9IHRoaXMuZGF0YS50aW1lTGlzdFt0aGlzLmRhdGEuaGVpZ2hMaWdodEluZGV4XTtcclxuICAgICAgICAgICAgICAvLyAgICDpgb/lhY3ph43lpI3pooTnuqZcclxuICAgICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdwZXJpb2QnKS53aGVyZSh7XHJcbiAgICAgICAgICAgICAgICBfaWQsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogMVxyXG4gICAgICAgICAgICAgIH0pLmNvdW50KCk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy50b3RhbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ+ivpeaXtuauteS4jeWPr+mihOe6pidcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oJ2ludGVydmlld2VlJykuYWRkKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgZm9ybURhdGE6IE9iamVjdC5hc3NpZ24oZGVmYXVsdEluZm8sIHRoaXMuZGF0YS5mb3JtRGF0YSwgeyBkYXRlLCB0aW1lIH0pLFxyXG4gICAgICAgICAgICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgIG9wZW5JZDogYXBwLmdsb2JhbERhdGEub3BlbklkLFxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHBseScsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW5zZWxvck5hbWU6IHRoaXMuZGF0YS5jb3Vuc2Vsb3IsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW5zZWxvcklkOiBjb3Vuc2Vsb3JJZCxcclxuICAgICAgICAgICAgICAgICAgcGVyaW9kSWQ6IF9pZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3BlcmlvZCcpLmRvYyhfaWQpLnVwZGF0ZSh7IGRhdGE6IHsgY291bnQ6IDAgfX0pO1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOS6pOaIkOWKnydcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTsiXX0=