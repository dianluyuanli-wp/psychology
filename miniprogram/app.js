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
App({
    globalData: {},
    onLaunch: function () {
        return __awaiter(this, void 0, void 0, function () {
            var logs, openId;
            var _this = this;
            return __generator(this, function (_a) {
                wx.cloud.init({
                    env: 'test-psy-qktuk'
                });
                logs = wx.getStorageSync('logs') || [];
                logs.unshift(Date.now());
                wx.setStorageSync('logs', logs);
                openId = wx.getStorageSync('openId') || '';
                if (!openId) {
                    wx.cloud.callFunction({
                        name: 'getOpenId',
                        complete: function (res) {
                            var openid = res.result.openid;
                            wx.setStorageSync('openId', openid);
                            openId = openid;
                        }
                    });
                }
                this.globalData.openId = openId;
                wx.login({});
                wx.getSetting({
                    success: function (res) {
                        if (res.authSetting['scope.userInfo']) {
                            wx.getUserInfo({
                                success: function (res) {
                                    _this.globalData.userInfo = res.userInfo;
                                    if (_this.userInfoReadyCallback) {
                                        _this.userInfoReadyCallback(res);
                                    }
                                },
                            });
                        }
                    },
                });
                return [2];
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUUsRUFBRTtJQUNSLFFBQVEsRUFBZDs7Ozs7Z0JBRUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1osR0FBRyxFQUFFLGdCQUFnQjtpQkFDdEIsQ0FBQyxDQUFDO2dCQUVHLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtnQkFDeEIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTVCLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQzt3QkFDcEIsSUFBSSxFQUFDLFdBQVc7d0JBQ2hCLFFBQVEsRUFBRSxVQUFDLEdBQVE7NEJBQ2pCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDOzRCQUNqQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFDcEMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFDbEIsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUdoQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBS1IsQ0FBQyxDQUFBO2dCQUdGLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ1osT0FBTyxFQUFFLFVBQUEsR0FBRzt3QkFDVixJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTs0QkFFckMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQ0FDYixPQUFPLEVBQUUsVUFBQSxHQUFHO29DQUVWLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7b0NBSXZDLElBQUksS0FBSSxDQUFDLHFCQUFxQixFQUFFO3dDQUM5QixLQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUE7cUNBQ2hDO2dDQUNILENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIO29CQUNILENBQUM7aUJBQ0YsQ0FBQyxDQUFBOzs7O0tBQ0g7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcclxuXHJcbkFwcDxJQXBwT3B0aW9uPih7XHJcbiAgZ2xvYmFsRGF0YToge30sXHJcbiAgYXN5bmMgb25MYXVuY2goKSB7XHJcbiAgICAvLyAg5LqR5Ye95pWw5Yid5aeL5YyWXHJcbiAgICB3eC5jbG91ZC5pbml0KHtcclxuICAgICAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbiAgICB9KTtcclxuICAgIC8vIOWxleekuuacrOWcsOWtmOWCqOiDveWKm1xyXG4gICAgY29uc3QgbG9ncyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cclxuICAgIGxvZ3MudW5zaGlmdChEYXRlLm5vdygpKVxyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ3MnLCBsb2dzKTtcclxuXHJcbiAgICBsZXQgb3BlbklkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcpIHx8ICcnO1xyXG4gICAgaWYgKCFvcGVuSWQpIHtcclxuICAgICAgd3guY2xvdWQuY2FsbEZ1bmN0aW9uKHtcclxuICAgICAgICBuYW1lOidnZXRPcGVuSWQnLFxyXG4gICAgICAgIGNvbXBsZXRlOiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9wZW5pZCA9IHJlcy5yZXN1bHQub3BlbmlkO1xyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcsIG9wZW5pZCk7XHJcbiAgICAgICAgICBvcGVuSWQgPSBvcGVuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxEYXRhLm9wZW5JZCA9IG9wZW5JZDtcclxuXHJcbiAgICAvLyDnmbvlvZVcclxuICAgIHd4LmxvZ2luKHtcclxuICAgICAgLy8gc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgLy8gICAvLyAgY29uc29sZS5sb2cocmVzLmNvZGUsIHJlcywgJ+eZu+W9lScpO1xyXG4gICAgICAvLyAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXHJcbiAgICAgIC8vIH0sXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxyXG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcclxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuXHJcbiAgICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgICAgICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIH0sXHJcbn0pIl19