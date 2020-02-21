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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFDSCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLHlDQUEwQztBQUUxQyxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUUsRUFBRTtRQUNiLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBQyxDQUFDO1FBRTNELFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFFbkQsV0FBVyxFQUFFLEtBQUs7UUFFbEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsRUFBRTtRQUVYLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLFlBQVksRUFBRSxDQUFDO1FBRWYsUUFBUSxFQUFFLEVBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVB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LENBQUM7Z0NBQ25ELE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07Z0NBQzdCLEdBQUcsS0FBQTs2QkFDSixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUhKLEdBQUcsR0FBRyxTQUdGO3dCQUNWLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTs0QkFDYixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULEtBQUssRUFBRSxXQUFXOzZCQUNyQixDQUFDLENBQUE7NEJBQ0YsV0FBTzt5QkFDUjt3QkFDRCxXQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDO2dDQUNyQyxJQUFJLEVBQUU7b0NBQ0osUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQztvQ0FDeEUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUTtvQ0FDakMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTtvQ0FDN0IsTUFBTSxFQUFFLE9BQU87b0NBQ2YsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztvQ0FDbEMsV0FBVyxFQUFFLFdBQVc7b0NBQ3hCLFFBQVEsRUFBRSxHQUFHO2lDQUNkOzZCQUNGLENBQUMsRUFBQTs7d0JBVkYsU0FVRSxDQUFDO3dCQUNILEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQ1gsS0FBSyxFQUFFLE1BQU07eUJBQ2QsQ0FBQyxDQUFDOzs7OzthQUVWLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDRixDQUFDLENBQUE7QUFFRixrQkFBZSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmNvbnN0IGRiID0gd3guY2xvdWQuZGF0YWJhc2Uoe1xyXG4gIGVudjogJ3Rlc3QtcHN5LXFrdHVrJ1xyXG59KTtcclxuY29uc3QgXyA9IGRiLmNvbW1hbmQ7XHJcbmltcG9ydCB7IGdldFlNRCB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgY291bnNlbG9yOiAnJyxcclxuICAgICAgICBoZWlnaExpZ2h0SW5kZXg6IDEwMDAsXHJcbiAgICAgICAgdGltZUxpc3Q6IFt7IGRhdGU6ICcnLCB0aW1lOiAnJywgX2lkOiAnJywgY291bnNlbG9ySWQ6ICcnfV0sXHJcblxyXG4gICAgICAgIHVzZXJJbmZvOiB7fSxcclxuICAgICAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICAgICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxyXG4gICAgXHJcbiAgICAgICAgc2hvd1RvcFRpcHM6IGZhbHNlLFxyXG4gICAgXHJcbiAgICAgICAgZGF0ZTogXCIyMDE2LTA5LTAxXCIsXHJcbiAgICAgICAgdGltZTogXCIxMjowMVwiLFxyXG4gICAgICAgIHNheVNvbWU6ICcnLFxyXG4gICAgXHJcbiAgICAgICAgYWNjb3VudHM6IFtcIuW+ruS/oeWPt1wiLCBcIlFRXCIsIFwiRW1haWxcIl0sXHJcbiAgICAgICAgYWNjb3VudEluZGV4OiAwLFxyXG4gICAgXHJcbiAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdtb2JpbGUnLFxyXG4gICAgICAgICAgICBydWxlczogW3tyZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ21vYmlsZeW/heWhqyd9LCB7bW9iaWxlOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5qC85byP5LiN5a+5J31dLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBjaGVjayhldmVudDogRG9tRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBoZWlnaExpZ2h0SW5kZXg6IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgICAvLyDkuovku7blpITnkIblh73mlbBcclxuICBiaW5kVmlld1RhcCgpIHtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICcuLi9sb2dzL2xvZ3MnLFxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgbGV0IGN1cnJQYWdlID0gbnVsbDtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhZ2VzKSDnmoTliLDkuIDkuKrmlbDnu4RcclxuICAgIGlmIChwYWdlcy5sZW5ndGgpIHtcclxuICAgICAgLy8g6I635Y+W5b2T5YmN6aG16Z2i55qE5a+56LGh77yI5LiK6L655omA6I635b6X55qE5pWw57uE5Lit5pyA5ZCO5LiA6aG55bCx5piv5b2T5YmN6aG16Z2i55qE5a+56LGh77yJXHJcbiAgICAgIGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbiAgICAvLyDojrflj5blvZPliY3pobXpnaLnmoTot6/nlLFcclxuICAgIGxldCByb3V0ZSA9IGN1cnJQYWdlPy5vcHRpb25zLm5hbWU7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGNvdW5zZWxvcjogcm91dGVcclxuICAgIH0pO1xyXG4gICAgZGIuY29sbGVjdGlvbigncGVyaW9kJykud2hlcmUoe1xyXG4gICAgICBjb3Vuc2Vsb3JJZDogcm91dGUsXHJcbiAgICAgIGRhdGU6IF8uZ3RlKGdldFlNRChuZXcgRGF0ZSgpKSlcclxuICAgIH0pLm9yZGVyQnkoJ2RhdGUnLCAnYXNjJykubGltaXQoNykuZ2V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHRpbWVMaXN0OiByZXMuZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGRhdGUsIHN0YXJ0VGltZSwgZW5kVGltZSwgY291bnNlbG9ySWQsIF9pZCB9ID0gaXRlbTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgIHRpbWU6IHN0YXJ0VGltZSArICctLScgKyBlbmRUaW1lLFxyXG4gICAgICAgICAgICBjb3Vuc2Vsb3JJZCxcclxuICAgICAgICAgICAgX2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkgYXMgQXJyYXk8YW55PlxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XHJcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXHJcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgfSlcclxuICB9LFxyXG4gIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbiAoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGRhdGU6IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgICAgW2Bmb3JtRGF0YS5kYXRlYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBiaW5kVGV4dENoYW5nZTogZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzYXlTb21lOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgW2Bmb3JtRGF0YS5zYXlTb21lYF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZm9ybUlucHV0Q2hhbmdlOiBmdW5jdGlvbihlOiBEb21FdmVudCkge1xyXG4gICAgICBjb25zdCB7ZmllbGR9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBbYGZvcm1EYXRhLiR7ZmllbGR9YF06IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBiaW5kVGltZUNoYW5nZTogYXN5bmMgZnVuY3Rpb24gKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB0aW1lOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIFtgZm9ybURhdGEudGltZWBdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgY2hlY2tmeSgpIHtcclxuXHJcbiAgfSxcclxuICBzdWJtaXRGb3JtKCkge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudCgnI2Zvcm0nKS52YWxpZGF0ZShhc3luYyAodmFsaWQ6IGJvb2xlYW4sIGVycm9yczogQXJyYXk8dmFsaWRhdGVJbmZvPikgPT4ge1xyXG4gICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdEVycm9yID0gT2JqZWN0LmtleXMoZXJyb3JzKTtcclxuICAgICAgICAgICAgICBpZiAoZmlyc3RFcnJvci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbcGFyc2VJbnQoZmlyc3RFcnJvclswXSldLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vICAgIOmihOe6puaXtuauteW/hemAiVxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaGVpZ2hMaWdodEluZGV4ID09PSAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAn6K+36YCJ5oup6aKE57qm5pe25q61J1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBzYXlTb21lOiAnbm90aGluZydcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIGNvbnN0IHsgZGF0ZSwgdGltZSwgX2lkLCBjb3Vuc2Vsb3JJZCB9ID0gdGhpcy5kYXRhLnRpbWVMaXN0W3RoaXMuZGF0YS5oZWlnaExpZ2h0SW5kZXhdO1xyXG4gICAgICAgICAgICAgIC8vICAgIOmBv+WFjemHjeWkjemihOe6plxyXG4gICAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ2ludGVydmlld2VlJykud2hlcmUoe1xyXG4gICAgICAgICAgICAgICAgb3BlbklkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQsXHJcbiAgICAgICAgICAgICAgICBfaWRcclxuICAgICAgICAgICAgICB9KS5jb3VudCgpO1xyXG4gICAgICAgICAgICAgIGlmIChyZXMudG90YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICfor6Xml7bmrrXmgqjlt7Lnu4/pooTnuqbov4cnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBPYmplY3QuYXNzaWduKGRlZmF1bHRJbmZvLCB0aGlzLmRhdGEuZm9ybURhdGEsIHsgZGF0ZSwgdGltZSB9KSxcclxuICAgICAgICAgICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgICBvcGVuSWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5JZCxcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnYXBwbHknLFxyXG4gICAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JOYW1lOiB0aGlzLmRhdGEuY291bnNlbG9yLFxyXG4gICAgICAgICAgICAgICAgICBjb3Vuc2Vsb3JJZDogY291bnNlbG9ySWQsXHJcbiAgICAgICAgICAgICAgICAgIHBlcmlvZElkOiBfaWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DkuqTmiJDlip8nXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307Il19