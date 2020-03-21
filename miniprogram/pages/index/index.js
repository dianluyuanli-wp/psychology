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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var db = wx.cloud.database({
    env: 'test-psy-qktuk'
});
function prepareData(setFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var res, counselorList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, db.collection('userDetail').where({ identity: 'counselor' }).limit(6).get()];
                case 1:
                    res = _a.sent();
                    counselorList = res.data.map(function (item) {
                        var avatar = item.avatar, name = item.name, userInfo = item.userInfo;
                        return {
                            name: name,
                            detail: userInfo,
                            img: avatar
                        };
                    });
                    setFunc({
                        couList: counselorList
                    });
                    return [2];
            }
        });
    });
}
function getPageInfo(setFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a, _id, rest, pageInfo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db.collection('pageInfo').get()];
                case 1:
                    res = _b.sent();
                    _a = res.data[0], _id = _a._id, rest = __rest(_a, ["_id"]);
                    setFunc({
                        background: rest.imgList.map(function (item) { return ({ src: item.url }); })
                    });
                    pageInfo = rest;
                    console.log(pageInfo);
                    app.globalData.pageInfo = pageInfo;
                    return [2];
            }
        });
    });
}
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        background: [],
        couList: [],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500
    },
    onLoad: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4, Promise.all([getPageInfo(this.setData.bind(this)), prepareData(this.setData.bind(this))])];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
    content: function (event) {
        wx.navigateTo({
            url: '../detail/detail' + '?name=' + event.currentTarget.dataset.name
        });
    },
    changeIndicatorDots: function () {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function () {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        });
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        });
    },
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFFSCxTQUFlLFdBQVcsQ0FBQyxPQUFpQjs7Ozs7d0JBRTlCLFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O29CQUF2RixHQUFHLEdBQUcsU0FBaUY7b0JBQ3ZGLGFBQWEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7d0JBQzdCLElBQUEsb0JBQU0sRUFBRSxnQkFBSSxFQUFFLHdCQUFRLENBQVU7d0JBQ3hDLE9BQU87NEJBQ0wsSUFBSSxNQUFBOzRCQUNKLE1BQU0sRUFBRSxRQUFROzRCQUNoQixHQUFHLEVBQUUsTUFBTTt5QkFDWixDQUFBO29CQUNILENBQUMsQ0FBZSxDQUFDO29CQUVqQixPQUFPLENBQUM7d0JBQ04sT0FBTyxFQUFFLGFBQWE7cUJBQ3ZCLENBQUMsQ0FBQTs7Ozs7Q0FDSDtBQUVELFNBQWUsV0FBVyxDQUFDLE9BQWlCOzs7Ozt3QkFDOUIsV0FBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFBOztvQkFBM0MsR0FBRyxHQUFHLFNBQXFDO29CQUMzQyxLQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUE1QixHQUFHLFNBQUEsRUFB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QUFLO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxjQUFjLEVBQWQsVUFBZSxDQUFXO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUE7QUFFRixrQkFBZSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmNvbnN0IGRiID0gd3guY2xvdWQuZGF0YWJhc2Uoe1xyXG4gIGVudjogJ3Rlc3QtcHN5LXFrdHVrJ1xyXG59KTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmVEYXRhKHNldEZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgLy8gIOaLieWPluWSqOivouW4iOivpuaDhVxyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3VzZXJEZXRhaWwnKS53aGVyZSh7IGlkZW50aXR5OiAnY291bnNlbG9yJyB9KS5saW1pdCg2KS5nZXQoKTtcclxuICBjb25zdCBjb3Vuc2Vsb3JMaXN0ID0gcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgY29uc3QgeyBhdmF0YXIsIG5hbWUsIHVzZXJJbmZvIH0gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZSxcclxuICAgICAgZGV0YWlsOiB1c2VySW5mbyxcclxuICAgICAgaW1nOiBhdmF0YXJcclxuICAgIH1cclxuICB9KSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICBzZXRGdW5jKHtcclxuICAgIGNvdUxpc3Q6IGNvdW5zZWxvckxpc3RcclxuICB9KVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRQYWdlSW5mbyhzZXRGdW5jOiBGdW5jdGlvbikge1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3BhZ2VJbmZvJykuZ2V0KCk7XHJcbiAgY29uc3QgeyBfaWQsIC4uLnJlc3QgfSA9IHJlcy5kYXRhWzBdO1xyXG4gIHNldEZ1bmMoe1xyXG4gICAgYmFja2dyb3VuZDogcmVzdC5pbWdMaXN0Lm1hcCgoaXRlbTogeyB1cmw6IHN0cmluZyB9KSA9PiAoeyBzcmM6IGl0ZW0udXJsIH0pKVxyXG4gIH0pXHJcbiAgY29uc3QgcGFnZUluZm8gPSByZXN0IGFzIFBhZ2VJbmZvT2JqO1xyXG4gIGNvbnNvbGUubG9nKHBhZ2VJbmZvKTtcclxuICBhcHAuZ2xvYmFsRGF0YS5wYWdlSW5mbyA9IHBhZ2VJbmZvO1xyXG59XHJcblxyXG5QYWdlKHsgIFxyXG4gICAgZGF0YToge1xyXG4gICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICAgIGJhY2tncm91bmQ6IFtdLFxyXG4gICAgICBjb3VMaXN0OiBbXSxcclxuICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcclxuICAgICAgdmVydGljYWw6IGZhbHNlLFxyXG4gICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgIGludGVydmFsOiAyMDAwLFxyXG4gICAgICBkdXJhdGlvbjogNTAwXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcclxuICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2UpIHtcclxuICAgICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxyXG4gICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXHJcbiAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcclxuICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXHJcbiAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgLy8gIOaVsOaNruWHhuWkh1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbZ2V0UGFnZUluZm8odGhpcy5zZXREYXRhLmJpbmQodGhpcykpLCBwcmVwYXJlRGF0YSh0aGlzLnNldERhdGEuYmluZCh0aGlzKSldKTtcclxuICAgICAgLy8gIGF3YWl0IHByZXBhcmVEYXRhKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgY29udGVudChldmVudDogRG9tRXZlbnQpIHtcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vZGV0YWlsL2RldGFpbCcgKyAnP25hbWU9JyArIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgY2hhbmdlSW5kaWNhdG9yRG90cygpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpbmRpY2F0b3JEb3RzOiAhdGhpcy5kYXRhLmluZGljYXRvckRvdHNcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBjaGFuZ2VBdXRvcGxheSgpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBhdXRvcGxheTogIXRoaXMuZGF0YS5hdXRvcGxheVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGludGVydmFsQ2hhbmdlKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW50ZXJ2YWw6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgZHVyYXRpb25DaGFuZ2UoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBkdXJhdGlvbjogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge307Il19