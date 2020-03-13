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
function prepareData(setFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var res, counselorList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, db.collection('userDetail').limit(6).get()];
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
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        background: [{ src: 'http://cms-bucket.ws.126.net/2020/0123/564125bej00q4jo8e002tc000go008cc.jpg?imageView&thumbnail=600y300' },
            { src: 'http://cms-bucket.ws.126.net/2020/0119/f543f553j00q4cbge002uc000go008cc.jpg?imageView&thumbnail=600y300' }, {
                src: 'http://cms-bucket.ws.126.net/2020/0123/f25d19daj00q4ji4k001uc000go008cc.jpg?imageView&thumbnail=600y300'
            }],
        couList: [{
                name: 'wang',
                detail: '钟南山，男，汉族，福建厦门人，1936年10月出生于南京，中共党员，中国工程院院士，著名呼吸病学专家，中国抗击非典型肺炎的领军人物，曾任广州医学院院长、党委书记，广州市呼吸疾病研究所所长、广州呼吸疾病国家重点实验室主任、中华医学会会长。钟南山出生于医学世家；1958年8月，在第一届全运会的比赛测验中，钟南山以54秒2的成绩，打破了当时54秒6的400米栏全国纪录。1960年毕业于北京医学院（今北京大学医学部）；2007年获英国爱丁堡大学荣誉博士；2007年10月任呼吸疾病国家重点实验室主任；2014年获香港中文大学荣誉理学博士',
                img: 'https://bkimg.cdn.bcebos.com/pic/77094b36acaf2edd6474ddbc821001e9380193da?x-bce-process=image/resize,m_fill,w_360,h_280,align_50'
            }, {
                name: 'zhang',
                detail: '我也不知道该怎么变了',
                img: 'https://bkimg.cdn.bcebos.com/pic/1c950a7b02087bf4e7c348e5fed3572c11dfcf8b?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1'
            }],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500
    },
    onLoad: function () {
        var _this = this;
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
        prepareData(this.setData.bind(this));
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
    subscribe: function () {
        console.log('subscribe');
        wx.requestSubscribeMessage({
            tmplIds: ['TsHTB3iCONjwJijrDPLH2dMMx5BBislqnNJFx2d0Qz0'],
            success: function () {
                console.log('success!');
            }
        });
    }
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBRWpDLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzNCLEdBQUcsRUFBRSxnQkFBZ0I7Q0FDdEIsQ0FBQyxDQUFDO0FBR0gsU0FBZSxXQUFXLENBQUMsT0FBaUI7Ozs7O3dCQUM5QixXQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFBOztvQkFBdEQsR0FBRyxHQUFHLFNBQWdEO29CQUN0RCxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO3dCQUM3QixJQUFBLG9CQUFNLEVBQUUsZ0JBQUksRUFBRSx3QkFBUSxDQUFVO3dCQUN4QyxPQUFPOzRCQUNMLElBQUksTUFBQTs0QkFDSixNQUFNLEVBQUUsUUFBUTs0QkFDaEIsR0FBRyxFQUFFLE1BQU07eUJBQ1osQ0FBQTtvQkFDSCxDQUFDLENBQWUsQ0FBQztvQkFDakIsT0FBTyxDQUFDO3dCQUNOLE9BQU8sRUFBRSxhQUFhO3FCQUN2QixDQUFDLENBQUE7Ozs7O0NBQ0g7QUFFRCxJQUFJLENBQUM7SUFRRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztRQUNuRCxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSx5R0FBeUcsRUFBQztZQUM1SCxFQUFFLEdBQUcsRUFBRSx5R0FBeUcsRUFBQyxFQUFFO2dCQUNqSCxHQUFHLEVBQUUseUdBQXlHO2FBQy9HLENBQUM7UUFDSixPQUFPLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUs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cDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG4vLyAgY29uc3QgXyA9IGRiLmNvbW1hbmQ7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwcmVwYXJlRGF0YShzZXRGdW5jOiBGdW5jdGlvbikge1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3VzZXJEZXRhaWwnKS5saW1pdCg2KS5nZXQoKTtcclxuICBjb25zdCBjb3Vuc2Vsb3JMaXN0ID0gcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgY29uc3QgeyBhdmF0YXIsIG5hbWUsIHVzZXJJbmZvIH0gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZSxcclxuICAgICAgZGV0YWlsOiB1c2VySW5mbyxcclxuICAgICAgaW1nOiBhdmF0YXJcclxuICAgIH1cclxuICB9KSBhcyBBcnJheTxhbnk+O1xyXG4gIHNldEZ1bmMoe1xyXG4gICAgY291TGlzdDogY291bnNlbG9yTGlzdFxyXG4gIH0pXHJcbn1cclxuXHJcblBhZ2Uoe1xyXG4gICAgLy8gb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAvLyAgIHJldHVybiB7XHJcbiAgICAvLyAgICAgdGl0bGU6ICdzd2lwZXInLFxyXG4gICAgLy8gICAgIHBhdGg6ICdwYWdlL2NvbXBvbmVudC9wYWdlcy9zd2lwZXIvc3dpcGVyJ1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LFxyXG4gIFxyXG4gICAgZGF0YToge1xyXG4gICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICAgIGJhY2tncm91bmQ6IFt7IHNyYzogJ2h0dHA6Ly9jbXMtYnVja2V0LndzLjEyNi5uZXQvMjAyMC8wMTIzLzU2NDEyNWJlajAwcTRqbzhlMDAydGMwMDBnbzAwOGNjLmpwZz9pbWFnZVZpZXcmdGh1bWJuYWlsPTYwMHkzMDAnfSxcclxuICAgICAgICB7IHNyYzogJ2h0dHA6Ly9jbXMtYnVja2V0LndzLjEyNi5uZXQvMjAyMC8wMTE5L2Y1NDNmNTUzajAwcTRjYmdlMDAydWMwMDBnbzAwOGNjLmpwZz9pbWFnZVZpZXcmdGh1bWJuYWlsPTYwMHkzMDAnfSwge1xyXG4gICAgICAgICAgc3JjOiAnaHR0cDovL2Ntcy1idWNrZXQud3MuMTI2Lm5ldC8yMDIwLzAxMjMvZjI1ZDE5ZGFqMDBxNGppNGswMDF1YzAwMGdvMDA4Y2MuanBnP2ltYWdlVmlldyZ0aHVtYm5haWw9NjAweTMwMCdcclxuICAgICAgICB9XSxcclxuICAgICAgY291TGlzdDogW3tcclxuICAgICAgICBuYW1lOiAnd2FuZycsXHJcbiAgICAgICAgZGV0YWlsOiAn6ZKf5Y2X5bGx77yM55S377yM5rGJ5peP77yM56aP5bu65Y6m6Zeo5Lq677yMMTkzNuW5tDEw5pyI5Ye655Sf5LqO5Y2X5Lqs77yM5Lit5YWx5YWa5ZGY77yM5Lit5Zu95bel56iL6Zmi6Zmi5aOr77yM6JGX5ZCN5ZG85ZC455eF5a2m5LiT5a6277yM5Lit5Zu95oqX5Ye76Z2e5YW45Z6L6IK654KO55qE6aKG5Yab5Lq654mp77yM5pu+5Lu75bm/5bee5Yy75a2m6Zmi6Zmi6ZW/44CB5YWa5aeU5Lmm6K6w77yM5bm/5bee5biC5ZG85ZC455a+55eF56CU56m25omA5omA6ZW/44CB5bm/5bee5ZG85ZC455a+55eF5Zu95a626YeN54K55a6e6aqM5a6k5Li75Lu744CB5Lit5Y2O5Yy75a2m5Lya5Lya6ZW/44CC6ZKf5Y2X5bGx5Ye655Sf5LqO5Yy75a2m5LiW5a6277ybMTk1OOW5tDjmnIjvvIzlnKjnrKzkuIDlsYrlhajov5DkvJrnmoTmr5TotZvmtYvpqozkuK3vvIzpkp/ljZflsbHku6U1NOenkjLnmoTmiJDnu6nvvIzmiZPnoLTkuoblvZPml7Y1NOenkjbnmoQ0MDDnsbPmoI/lhajlm73nuqrlvZXjgIIxOTYw5bm05q+V5Lia5LqO5YyX5Lqs5Yy75a2m6Zmi77yI5LuK5YyX5Lqs5aSn5a2m5Yy75a2m6YOo77yJ77ybMjAwN+W5tOiOt+iLseWbveeIseS4geWgoeWkp+WtpuiNo+iqieWNmuWjq++8mzIwMDflubQxMOaciOS7u+WRvOWQuOeWvueXheWbveWutumHjeeCueWunumqjOWupOS4u+S7u++8mzIwMTTlubTojrfpppnmuK/kuK3mloflpKflrabojaPoqonnkIblrabljZrlo6snLFxyXG4gICAgICAgIGltZzogJ2h0dHBzOi8vYmtpbWcuY2RuLmJjZWJvcy5jb20vcGljLzc3MDk0YjM2YWNhZjJlZGQ2NDc0ZGRiYzgyMTAwMWU5MzgwMTkzZGE/eC1iY2UtcHJvY2Vzcz1pbWFnZS9yZXNpemUsbV9maWxsLHdfMzYwLGhfMjgwLGFsaWduXzUwJ1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ3poYW5nJyxcclxuICAgICAgICBkZXRhaWw6ICfmiJHkuZ/kuI3nn6XpgZPor6XmgI7kuYjlj5jkuoYnLFxyXG4gICAgICAgIGltZzogJ2h0dHBzOi8vYmtpbWcuY2RuLmJjZWJvcy5jb20vcGljLzFjOTUwYTdiMDIwODdiZjRlN2MzNDhlNWZlZDM1NzJjMTFkZmNmOGI/eC1iY2UtcHJvY2Vzcz1pbWFnZS9yZXNpemUsbV9sZml0LHdfMjIwLGhfMjIwLGxpbWl0XzEnXHJcbiAgICAgIH1dLFxyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgaW50ZXJ2YWw6IDIwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiA1MDBcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSkge1xyXG4gICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxyXG4gICAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxyXG4gICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICBwcmVwYXJlRGF0YSh0aGlzLnNldERhdGEuYmluZCh0aGlzKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRlbnQoZXZlbnQ6IERvbUV2ZW50KSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4uL2RldGFpbC9kZXRhaWwnICsgJz9uYW1lPScgKyBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGNoYW5nZUluZGljYXRvckRvdHMoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW5kaWNhdG9yRG90czogIXRoaXMuZGF0YS5pbmRpY2F0b3JEb3RzXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgY2hhbmdlQXV0b3BsYXkoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgYXV0b3BsYXk6ICF0aGlzLmRhdGEuYXV0b3BsYXlcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBpbnRlcnZhbENoYW5nZShlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGludGVydmFsOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGR1cmF0aW9uQ2hhbmdlKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZHVyYXRpb246IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHN1YnNjcmliZSgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3N1YnNjcmliZScpO1xyXG4gICAgICB3eC5yZXF1ZXN0U3Vic2NyaWJlTWVzc2FnZSh7XHJcbiAgICAgICAgdG1wbElkczogWydUc0hUQjNpQ09OandKaWpyRFBMSDJkTU14NUJCaXNscW5OSkZ4MmQwUXowJ10sXHJcbiAgICAgICAgc3VjY2VzcyAoKSB7IFxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge307Il19