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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var db = wx.cloud.database({
    env: 'test-psy-qktuk'
});
Page({
    data: {
        orderList: [{ date: '', time: '', status: '', counselorName: '', counselorId: '', _id: '', counselorAvatar: '' }],
        counselorList: [{ name: '', avatar: '' }]
    },
    cancel: function (event) {
        var _a;
        var _b = event.currentTarget.dataset, id = _b.id, index = _b.index, periodid = _b.periodid, status = _b.status;
        db.collection('interviewee').doc(id).update({
            data: {
                status: 'cancel'
            }
        });
        if (status === 'accept') {
            db.collection('period').doc(periodid).update({
                data: {
                    count: 1
                }
            });
        }
        this.setData((_a = {},
            _a['orderList[' + index + '].status'] = 'cancel',
            _a));
    },
    loadData: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, counselorList, cRes, counselorInfoList, orderList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, db.collection('interviewee').where({
                            openId: app.globalData.openId,
                        }).orderBy('formData.date', 'desc').limit(10).get()];
                    case 1:
                        res = _a.sent();
                        counselorList = __spread(new Set(res.data.map(function (item) { return item.counselorId; })));
                        return [4, db.collection('userDetail').where({
                                name: db.RegExp({
                                    regexp: counselorList.join('|')
                                })
                            }).get()];
                    case 2:
                        cRes = _a.sent();
                        counselorInfoList = cRes.data.map(function (item) { return ({
                            name: item.name,
                            avatar: item.avatar
                        }); });
                        orderList = res.data.map(function (item) {
                            var _a;
                            var status = item.status, formData = item.formData, counselorId = item.counselorId, _id = item._id, counselorName = item.counselorName, periodId = item.periodId;
                            return {
                                date: formData.date,
                                time: formData.time,
                                counselorId: counselorId,
                                status: status,
                                _id: _id,
                                periodId: periodId,
                                counselorName: counselorName,
                                counselorAvatar: (_a = counselorInfoList.find(function (item) { return item.name === counselorName; })) === null || _a === void 0 ? void 0 : _a.avatar
                            };
                        });
                        console.log(orderList);
                        this.setData({
                            orderList: orderList,
                            counselorList: counselorInfoList
                        });
                        return [2];
                }
            });
        });
    },
    onPullDownRefresh: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadData()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    },
    onLoad: function () {
        this.loadData();
    },
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBRWpDLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzNCLEdBQUcsRUFBRSxnQkFBZ0I7Q0FDdEIsQ0FBQyxDQUFDO0FBSUgsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osU0FBUyxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDL0csYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUN6QztJQUNELE1BQU0sRUFBTixVQUFPLEtBQWU7O1FBQ2QsSUFBQSxnQ0FBNkQsRUFBM0QsVUFBRSxFQUFFLGdCQUFLLEVBQUUsc0JBQVEsRUFBRSxrQkFBc0MsQ0FBQztRQUVwRSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUMsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxRQUFRO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDM0MsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTztZQUNWLEdBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxVQUFVLElBQUcsUUFBUTtnQkFDN0MsQ0FBQTtJQUNKLENBQUM7SUFDSyxRQUFRLEVBQWQ7Ozs7OzRCQUNjLFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7NEJBQ25ELE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07eUJBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQTs7d0JBRjdDLEdBQUcsR0FBRyxTQUV1Qzt3QkFFN0MsYUFBYSxZQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFdBQVcsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUQsV0FBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQztnQ0FDbkQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0NBQ2QsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lDQUNoQyxDQUFDOzZCQUNILENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQTs7d0JBSkYsSUFBSSxHQUFHLFNBSUw7d0JBQ0YsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDOzRCQUMvQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3lCQUNwQixDQUFDLEVBSDhDLENBRzlDLENBQUMsQ0FBQTt3QkFFRyxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJOzs0QkFDekIsSUFBQSxvQkFBTSxFQUFFLHdCQUFRLEVBQUUsOEJBQVcsRUFBRSxjQUFHLEVBQUUsa0NBQWEsRUFBRSx3QkFBUSxDQUFVOzRCQUM3RSxPQUFPO2dDQUNMLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQ0FDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dDQUNuQixXQUFXLGFBQUE7Z0NBQ1gsTUFBTSxRQUFBO2dDQUNOLEdBQUcsS0FBQTtnQ0FDSCxRQUFRLFVBQUE7Z0NBQ1IsYUFBYSxlQUFBO2dDQUNiLGVBQWUsUUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBM0IsQ0FBMkIsQ0FBQywwQ0FBRSxNQUFNOzZCQUNyRixDQUFBO3dCQUNILENBQUMsQ0FBZSxDQUFDO3dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUV2QixJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLFNBQVMsV0FBQTs0QkFDVCxhQUFhLEVBQUUsaUJBQWlCO3lCQUNqQyxDQUFDLENBQUM7Ozs7O0tBQ0o7SUFDSyxpQkFBaUI7Ozs7NEJBQ3JCLFdBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBckIsU0FBcUIsQ0FBQzt3QkFDdEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5cclxuLy8gIGltcG9ydCB7IHJlcUdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgb3JkZXJMaXN0OiBbe2RhdGU6ICcnLCB0aW1lOiAnJywgc3RhdHVzOiAnJywgY291bnNlbG9yTmFtZTogJycsIGNvdW5zZWxvcklkOiAnJywgX2lkOiAnJywgY291bnNlbG9yQXZhdGFyOiAnJ31dLFxyXG4gICAgY291bnNlbG9yTGlzdDogW3sgbmFtZTogJycsIGF2YXRhcjogJyd9XVxyXG4gIH0sXHJcbiAgY2FuY2VsKGV2ZW50OiBEb21FdmVudCkge1xyXG4gICAgY29uc3QgeyBpZCwgaW5kZXgsIHBlcmlvZGlkLCBzdGF0dXMgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgIC8vICDkv67mlLnnirbmgIFcclxuICAgIGRiLmNvbGxlY3Rpb24oJ2ludGVydmlld2VlJykuZG9jKGlkKS51cGRhdGUoe1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RhdHVzOiAnY2FuY2VsJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vICDlpoLmnpzlt7Lnoa7orqTvvIzmgaLlpI3lupPlrZhcclxuICAgIGlmIChzdGF0dXMgPT09ICdhY2NlcHQnKSB7XHJcbiAgICAgIGRiLmNvbGxlY3Rpb24oJ3BlcmlvZCcpLmRvYyhwZXJpb2RpZCkudXBkYXRlKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjb3VudDogMVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBbJ29yZGVyTGlzdFsnICsgaW5kZXggKyAnXS5zdGF0dXMnXTogJ2NhbmNlbCdcclxuICAgIH0pXHJcbiAgfSxcclxuICBhc3luYyBsb2FkRGF0YSgpIHtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ2ludGVydmlld2VlJykud2hlcmUoe1xyXG4gICAgICBvcGVuSWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5JZCxcclxuICAgIH0pLm9yZGVyQnkoJ2Zvcm1EYXRhLmRhdGUnLCAnZGVzYycpLmxpbWl0KDEwKS5nZXQoKTtcclxuXHJcbiAgICBjb25zdCBjb3Vuc2Vsb3JMaXN0ID0gWy4uLm5ldyBTZXQocmVzLmRhdGEubWFwKGl0ZW0gPT4gaXRlbS5jb3Vuc2Vsb3JJZCkpXTtcclxuICAgIGNvbnN0IGNSZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCd1c2VyRGV0YWlsJykud2hlcmUoe1xyXG4gICAgICBuYW1lOiBkYi5SZWdFeHAoe1xyXG4gICAgICAgIHJlZ2V4cDogY291bnNlbG9yTGlzdC5qb2luKCd8JylcclxuICAgICAgfSlcclxuICAgIH0pLmdldCgpO1xyXG4gICAgY29uc3QgY291bnNlbG9ySW5mb0xpc3QgPSBjUmVzLmRhdGEubWFwKGl0ZW0gPT4gKHtcclxuICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICBhdmF0YXI6IGl0ZW0uYXZhdGFyXHJcbiAgICB9KSlcclxuXHJcbiAgICBjb25zdCBvcmRlckxpc3QgPSByZXMuZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgc3RhdHVzLCBmb3JtRGF0YSwgY291bnNlbG9ySWQsIF9pZCwgY291bnNlbG9yTmFtZSwgcGVyaW9kSWQgfSA9IGl0ZW07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0ZTogZm9ybURhdGEuZGF0ZSxcclxuICAgICAgICB0aW1lOiBmb3JtRGF0YS50aW1lLFxyXG4gICAgICAgIGNvdW5zZWxvcklkLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICBfaWQsXHJcbiAgICAgICAgcGVyaW9kSWQsXHJcbiAgICAgICAgY291bnNlbG9yTmFtZSxcclxuICAgICAgICBjb3Vuc2Vsb3JBdmF0YXI6IGNvdW5zZWxvckluZm9MaXN0LmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGNvdW5zZWxvck5hbWUpPy5hdmF0YXJcclxuICAgICAgfVxyXG4gICAgfSkgYXMgQXJyYXk8YW55PjtcclxuICAgIGNvbnNvbGUubG9nKG9yZGVyTGlzdCk7XHJcblxyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgb3JkZXJMaXN0LFxyXG4gICAgICBjb3Vuc2Vsb3JMaXN0OiBjb3Vuc2Vsb3JJbmZvTGlzdFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBhc3luYyBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKTtcclxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKSAvL+WBnOatouS4i+aLieWIt+aWsFxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gIH0sXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fVxyXG4iXX0=