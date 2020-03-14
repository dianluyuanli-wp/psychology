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
        wx.requestSubscribeMessage({
            tmplIds: ['TsHTB3iCONjwJijrDPLH2eQUq3QmxPk5iNfFiRcZU3M'],
        });
    }
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBRWpDLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzNCLEdBQUcsRUFBRSxnQkFBZ0I7Q0FDdEIsQ0FBQyxDQUFDO0FBR0gsU0FBZSxXQUFXLENBQUMsT0FBaUI7Ozs7O3dCQUM5QixXQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFBOztvQkFBdEQsR0FBRyxHQUFHLFNBQWdEO29CQUN0RCxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO3dCQUM3QixJQUFBLG9CQUFNLEVBQUUsZ0JBQUksRUFBRSx3QkFBUSxDQUFVO3dCQUN4QyxPQUFPOzRCQUNMLElBQUksTUFBQTs0QkFDSixNQUFNLEVBQUUsUUFBUTs0QkFDaEIsR0FBRyxFQUFFLE1BQU07eUJBQ1osQ0FBQTtvQkFDSCxDQUFDLENBQWUsQ0FBQztvQkFDakIsT0FBTyxDQUFDO3dCQUNOLE9BQU8sRUFBRSxhQUFhO3FCQUN2QixDQUFDLENBQUE7Ozs7O0NBQ0g7QUFFRCxJQUFJLENBQUM7SUFRRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztRQUNuRCxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSx5R0FBeUcsRUFBQztZQUM1SCxFQUFFLEdBQUcsRUFBRSx5R0FBeUcsRUFBQyxFQUFFO2dCQUNqSCxHQUFHLEVBQUUseUdBQXlHO2FBQy9HLENBQUM7UUFDSixPQUFPLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsNFFBQTRRO2dCQUNwUixHQUFHLEVBQUUsa0lBQWtJO2FBQ3hJLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsTUFBTSxFQUFFLFlBQVk7Z0JBQ3BCLEdBQUcsRUFBRSxpSUFBaUk7YUFDdkksQ0FBQztRQUNGLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFFRCxNQUFNO1FBQU4saUJBNEJDO1FBM0JDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO2dCQUNqQyxXQUFXLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUE7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFHNUIsR0FBRyxDQUFDLHFCQUFxQixHQUFHLFVBQUEsR0FBRztnQkFDN0IsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7b0JBQ3RCLFdBQVcsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUE7WUFDSixDQUFDLENBQUE7U0FDRjthQUFNO1lBRUwsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDYixPQUFPLEVBQUUsVUFBQSxHQUFHO29CQUNWLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7b0JBQ3RDLEtBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO3dCQUN0QixXQUFXLEVBQUUsSUFBSTtxQkFDbEIsQ0FBQyxDQUFBO2dCQUNKLENBQUM7YUFDRixDQUFDLENBQUE7U0FDSDtRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPLEVBQVAsVUFBUSxLQUFlO1FBQ3JCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUk7U0FDdEUsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO1NBQ3hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtTQUM5QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsY0FBYyxFQUFkLFVBQWUsQ0FBVztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsY0FBYyxFQUFkLFVBQWUsQ0FBVztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsU0FBUztRQUNQLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztTQUN6RCxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblxyXG5jb25zdCBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtcclxuICBlbnY6ICd0ZXN0LXBzeS1xa3R1aydcclxufSk7XHJcbi8vICBjb25zdCBfID0gZGIuY29tbWFuZDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmVEYXRhKHNldEZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbigndXNlckRldGFpbCcpLmxpbWl0KDYpLmdldCgpO1xyXG4gIGNvbnN0IGNvdW5zZWxvckxpc3QgPSByZXMuZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICBjb25zdCB7IGF2YXRhciwgbmFtZSwgdXNlckluZm8gfSA9IGl0ZW07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lLFxyXG4gICAgICBkZXRhaWw6IHVzZXJJbmZvLFxyXG4gICAgICBpbWc6IGF2YXRhclxyXG4gICAgfVxyXG4gIH0pIGFzIEFycmF5PGFueT47XHJcbiAgc2V0RnVuYyh7XHJcbiAgICBjb3VMaXN0OiBjb3Vuc2Vsb3JMaXN0XHJcbiAgfSlcclxufVxyXG5cclxuUGFnZSh7XHJcbiAgICAvLyBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgIC8vICAgcmV0dXJuIHtcclxuICAgIC8vICAgICB0aXRsZTogJ3N3aXBlcicsXHJcbiAgICAvLyAgICAgcGF0aDogJ3BhZ2UvY29tcG9uZW50L3BhZ2VzL3N3aXBlci9zd2lwZXInXHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sXHJcbiAgXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgICAgYmFja2dyb3VuZDogW3sgc3JjOiAnaHR0cDovL2Ntcy1idWNrZXQud3MuMTI2Lm5ldC8yMDIwLzAxMjMvNTY0MTI1YmVqMDBxNGpvOGUwMDJ0YzAwMGdvMDA4Y2MuanBnP2ltYWdlVmlldyZ0aHVtYm5haWw9NjAweTMwMCd9LFxyXG4gICAgICAgIHsgc3JjOiAnaHR0cDovL2Ntcy1idWNrZXQud3MuMTI2Lm5ldC8yMDIwLzAxMTkvZjU0M2Y1NTNqMDBxNGNiZ2UwMDJ1YzAwMGdvMDA4Y2MuanBnP2ltYWdlVmlldyZ0aHVtYm5haWw9NjAweTMwMCd9LCB7XHJcbiAgICAgICAgICBzcmM6ICdodHRwOi8vY21zLWJ1Y2tldC53cy4xMjYubmV0LzIwMjAvMDEyMy9mMjVkMTlkYWowMHE0amk0azAwMXVjMDAwZ28wMDhjYy5qcGc/aW1hZ2VWaWV3JnRodW1ibmFpbD02MDB5MzAwJ1xyXG4gICAgICAgIH1dLFxyXG4gICAgICBjb3VMaXN0OiBbe1xyXG4gICAgICAgIG5hbWU6ICd3YW5nJyxcclxuICAgICAgICBkZXRhaWw6ICfpkp/ljZflsbHvvIznlLfvvIzmsYnml4/vvIznpo/lu7rljqbpl6jkurrvvIwxOTM25bm0MTDmnIjlh7rnlJ/kuo7ljZfkuqzvvIzkuK3lhbHlhZrlkZjvvIzkuK3lm73lt6XnqIvpmaLpmaLlo6vvvIzokZflkI3lkbzlkLjnl4XlrabkuJPlrrbvvIzkuK3lm73mipflh7vpnZ7lhbjlnovogrrngo7nmoTpooblhpvkurrnianvvIzmm77ku7vlub/lt57ljLvlrabpmaLpmaLplb/jgIHlhZrlp5TkuaborrDvvIzlub/lt57luILlkbzlkLjnlr7nl4XnoJTnqbbmiYDmiYDplb/jgIHlub/lt57lkbzlkLjnlr7nl4Xlm73lrrbph43ngrnlrp7pqozlrqTkuLvku7vjgIHkuK3ljY7ljLvlrabkvJrkvJrplb/jgILpkp/ljZflsbHlh7rnlJ/kuo7ljLvlrabkuJblrrbvvJsxOTU45bm0OOaciO+8jOWcqOesrOS4gOWxiuWFqOi/kOS8mueahOavlOi1m+a1i+mqjOS4re+8jOmSn+WNl+WxseS7pTU056eSMueahOaIkOe7qe+8jOaJk+egtOS6huW9k+aXtjU056eSNueahDQwMOexs+agj+WFqOWbvee6quW9leOAgjE5NjDlubTmr5XkuJrkuo7ljJfkuqzljLvlrabpmaLvvIjku4rljJfkuqzlpKflrabljLvlrabpg6jvvInvvJsyMDA35bm06I636Iux5Zu954ix5LiB5aCh5aSn5a2m6I2j6KqJ5Y2a5aOr77ybMjAwN+W5tDEw5pyI5Lu75ZG85ZC455a+55eF5Zu95a626YeN54K55a6e6aqM5a6k5Li75Lu777ybMjAxNOW5tOiOt+mmmea4r+S4reaWh+Wkp+WtpuiNo+iqieeQhuWtpuWNmuWjqycsXHJcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9ia2ltZy5jZG4uYmNlYm9zLmNvbS9waWMvNzcwOTRiMzZhY2FmMmVkZDY0NzRkZGJjODIxMDAxZTkzODAxOTNkYT94LWJjZS1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2ZpbGwsd18zNjAsaF8yODAsYWxpZ25fNTAnXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnemhhbmcnLFxyXG4gICAgICAgIGRldGFpbDogJ+aIkeS5n+S4jeefpemBk+ivpeaAjuS5iOWPmOS6hicsXHJcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9ia2ltZy5jZG4uYmNlYm9zLmNvbS9waWMvMWM5NTBhN2IwMjA4N2JmNGU3YzM0OGU1ZmVkMzU3MmMxMWRmY2Y4Yj94LWJjZS1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2xmaXQsd18yMjAsaF8yMjAsbGltaXRfMSdcclxuICAgICAgfV0sXHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICBpbnRlcnZhbDogMjAwMCxcclxuICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XHJcbiAgICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXHJcbiAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIHByZXBhcmVEYXRhKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgY29udGVudChldmVudDogRG9tRXZlbnQpIHtcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vZGV0YWlsL2RldGFpbCcgKyAnP25hbWU9JyArIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgY2hhbmdlSW5kaWNhdG9yRG90cygpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpbmRpY2F0b3JEb3RzOiAhdGhpcy5kYXRhLmluZGljYXRvckRvdHNcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBjaGFuZ2VBdXRvcGxheSgpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBhdXRvcGxheTogIXRoaXMuZGF0YS5hdXRvcGxheVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGludGVydmFsQ2hhbmdlKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW50ZXJ2YWw6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgZHVyYXRpb25DaGFuZ2UoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBkdXJhdGlvbjogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgc3Vic2NyaWJlKCkge1xyXG4gICAgICB3eC5yZXF1ZXN0U3Vic2NyaWJlTWVzc2FnZSh7XHJcbiAgICAgICAgdG1wbElkczogWydUc0hUQjNpQ09OandKaWpyRFBMSDJlUVVxM1FteFBrNWlOZkZpUmNaVTNNJ10sXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge307Il19