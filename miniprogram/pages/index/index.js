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
                    app.globalData.couList = counselorList;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0IsR0FBRyxFQUFFLGdCQUFnQjtDQUN0QixDQUFDLENBQUM7QUFFSCxTQUFlLFdBQVcsQ0FBQyxPQUFpQjs7Ozs7d0JBRTlCLFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O29CQUF2RixHQUFHLEdBQUcsU0FBaUY7b0JBQ3ZGLGFBQWEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7d0JBQzdCLElBQUEsb0JBQU0sRUFBRSxnQkFBSSxFQUFFLHdCQUFRLENBQVU7d0JBQ3hDLE9BQU87NEJBQ0wsSUFBSSxNQUFBOzRCQUNKLE1BQU0sRUFBRSxRQUFROzRCQUNoQixHQUFHLEVBQUUsTUFBTTt5QkFDWixDQUFBO29CQUNILENBQUMsQ0FBZSxDQUFDO29CQUVqQixPQUFPLENBQUM7d0JBQ04sT0FBTyxFQUFFLGFBQWE7cUJBQ3ZCLENBQUMsQ0FBQTtvQkFDRixHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7Ozs7O0NBQ3hDO0FBRUQsU0FBZSxXQUFXLENBQUMsT0FBaUI7Ozs7O3dCQUM5QixXQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O29CQUEzQyxHQUFHLEdBQUcsU0FBcUM7b0JBQzNDLEtBQW1CLEdB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QUFDLEtBQUs7U0FDekIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGNBQWMsRUFBZCxVQUFlLENBQVc7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDekIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gcHJlcGFyZURhdGEoc2V0RnVuYzogRnVuY3Rpb24pIHtcclxuICAvLyAg5ouJ5Y+W5ZKo6K+i5biI6K+m5oOFXHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbigndXNlckRldGFpbCcpLndoZXJlKHsgaWRlbnRpdHk6ICdjb3Vuc2Vsb3InIH0pLmxpbWl0KDYpLmdldCgpO1xyXG4gIGNvbnN0IGNvdW5zZWxvckxpc3QgPSByZXMuZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICBjb25zdCB7IGF2YXRhciwgbmFtZSwgdXNlckluZm8gfSA9IGl0ZW07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lLFxyXG4gICAgICBkZXRhaWw6IHVzZXJJbmZvLFxyXG4gICAgICBpbWc6IGF2YXRhclxyXG4gICAgfVxyXG4gIH0pIGFzIEFycmF5PGFueT47XHJcblxyXG4gIHNldEZ1bmMoe1xyXG4gICAgY291TGlzdDogY291bnNlbG9yTGlzdFxyXG4gIH0pXHJcbiAgYXBwLmdsb2JhbERhdGEuY291TGlzdCA9IGNvdW5zZWxvckxpc3Q7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFBhZ2VJbmZvKHNldEZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbigncGFnZUluZm8nKS5nZXQoKTtcclxuICBjb25zdCB7IF9pZCwgLi4ucmVzdCB9ID0gcmVzLmRhdGFbMF07XHJcbiAgc2V0RnVuYyh7XHJcbiAgICBiYWNrZ3JvdW5kOiByZXN0LmltZ0xpc3QubWFwKChpdGVtOiB7IHVybDogc3RyaW5nIH0pID0+ICh7IHNyYzogaXRlbS51cmwgfSkpXHJcbiAgfSlcclxuICBjb25zdCBwYWdlSW5mbyA9IHJlc3QgYXMgUGFnZUluZm9PYmo7XHJcbiAgYXBwLmdsb2JhbERhdGEucGFnZUluZm8gPSBwYWdlSW5mbztcclxufVxyXG5cclxuUGFnZSh7ICBcclxuICAgIGRhdGE6IHtcclxuICAgICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxyXG4gICAgICBiYWNrZ3JvdW5kOiBbXSxcclxuICAgICAgY291TGlzdDogW10sXHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICBpbnRlcnZhbDogMjAwMCxcclxuICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XHJcbiAgICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXHJcbiAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8vICDmlbDmja7lh4blpIdcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW2dldFBhZ2VJbmZvKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKSwgcHJlcGFyZURhdGEodGhpcy5zZXREYXRhLmJpbmQodGhpcykpXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRlbnQoZXZlbnQ6IERvbUV2ZW50KSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4uL2RldGFpbC9kZXRhaWwnICsgJz9uYW1lPScgKyBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGNoYW5nZUluZGljYXRvckRvdHMoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW5kaWNhdG9yRG90czogIXRoaXMuZGF0YS5pbmRpY2F0b3JEb3RzXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgY2hhbmdlQXV0b3BsYXkoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgYXV0b3BsYXk6ICF0aGlzLmRhdGEuYXV0b3BsYXlcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBpbnRlcnZhbENoYW5nZShlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGludGVydmFsOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGR1cmF0aW9uQ2hhbmdlKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZHVyYXRpb246IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIH0pXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHt9OyJdfQ==