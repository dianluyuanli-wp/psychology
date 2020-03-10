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
Page({
    data: {
        orderList: [{ date: '', time: '', status: '', counselorName: '', counselorId: '', _id: '' }],
        counselorList: []
    },
    cancel: function (event) {
        var _a;
        var _b = event.currentTarget.dataset, id = _b.id, index = _b.index;
        db.collection('interviewee').doc(id).update({
            data: {
                status: 'cancel'
            }
        });
        this.setData((_a = {},
            _a['orderList[' + index + '].status'] = 'cancel',
            _a));
    },
    loadData: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, orderList, counselorList, cRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, db.collection('interviewee').where({
                            openId: app.globalData.openId,
                        }).orderBy('formData.date', 'desc').limit(10).get()];
                    case 1:
                        res = _a.sent();
                        orderList = res.data.map(function (item) {
                            var status = item.status, formData = item.formData, counselorId = item.counselorId, _id = item._id, counselorName = item.counselorName;
                            return {
                                date: formData.date,
                                time: formData.time,
                                counselorId: counselorId,
                                status: status,
                                _id: _id,
                                counselorName: counselorName,
                            };
                        });
                        counselorList = ['wang'];
                        return [4, db.collection('userDetail').where({
                                name: db.RegExp({
                                    regexp: counselorList.join('|')
                                })
                            }).get()];
                    case 2:
                        cRes = _a.sent();
                        console.log(cRes, 'result');
                        this.setData({
                            orderList: orderList
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUVqQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMzQixHQUFHLEVBQUUsZ0JBQWdCO0NBQ3RCLENBQUMsQ0FBQztBQUlILElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUMxRixhQUFhLEVBQUUsRUFBRTtLQUNsQjtJQUNELE1BQU0sRUFBTixVQUFPLEtBQWU7O1FBQ2QsSUFBQSxnQ0FBMkMsRUFBekMsVUFBRSxFQUFFLGdCQUFxQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTztZQUNWLEdBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxVQUFVLElBQUcsUUFBUTtnQkFDN0MsQ0FBQTtJQUNKLENBQUM7SUFDSyxRQUFRLEVBQWQ7Ozs7OzRCQUNjLFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7NEJBQ25ELE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07eUJBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQTs7d0JBRjdDLEdBQUcsR0FBRyxTQUV1Qzt3QkFDN0MsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTs0QkFDekIsSUFBQSxvQkFBTSxFQUFFLHdCQUFRLEVBQUUsOEJBQVcsRUFBRSxjQUFHLEVBQUUsa0NBQWEsQ0FBVTs0QkFDbkUsT0FBTztnQ0FDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0NBQ25CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQ0FDbkIsV0FBVyxhQUFBO2dDQUNYLE1BQU0sUUFBQTtnQ0FDTixHQUFHLEtBQUE7Z0NBQ0gsYUFBYSxlQUFBOzZCQUNkLENBQUE7d0JBQ0gsQ0FBQyxDQUFlLENBQUM7d0JBQ1gsYUFBYSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xCLFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0NBQ25ELElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO29DQUNkLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQ0FDaEMsQ0FBQzs2QkFFSCxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O3dCQUxGLElBQUksR0FBRyxTQUtMO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLFNBQVMsV0FBQTt5QkFDVixDQUFDLENBQUM7Ozs7O0tBQ0o7SUFDSyxpQkFBaUI7Ozs7NEJBQ3JCLFdBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBckIsU0FBcUIsQ0FBQzt3QkFDdEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5cclxuLy8gIGltcG9ydCB7IHJlcUdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgb3JkZXJMaXN0OiBbe2RhdGU6ICcnLCB0aW1lOiAnJywgc3RhdHVzOiAnJywgY291bnNlbG9yTmFtZTogJycsIGNvdW5zZWxvcklkOiAnJywgX2lkOiAnJ31dLFxyXG4gICAgY291bnNlbG9yTGlzdDogW11cclxuICB9LFxyXG4gIGNhbmNlbChldmVudDogRG9tRXZlbnQpIHtcclxuICAgIGNvbnN0IHsgaWQsIGluZGV4IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmRvYyhpZCkudXBkYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHN0YXR1czogJ2NhbmNlbCdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBbJ29yZGVyTGlzdFsnICsgaW5kZXggKyAnXS5zdGF0dXMnXTogJ2NhbmNlbCdcclxuICAgIH0pXHJcbiAgfSxcclxuICBhc3luYyBsb2FkRGF0YSgpIHtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ2ludGVydmlld2VlJykud2hlcmUoe1xyXG4gICAgICBvcGVuSWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5JZCxcclxuICAgIH0pLm9yZGVyQnkoJ2Zvcm1EYXRhLmRhdGUnLCAnZGVzYycpLmxpbWl0KDEwKS5nZXQoKTtcclxuICAgIGNvbnN0IG9yZGVyTGlzdCA9IHJlcy5kYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgY29uc3QgeyBzdGF0dXMsIGZvcm1EYXRhLCBjb3Vuc2Vsb3JJZCwgX2lkLCBjb3Vuc2Vsb3JOYW1lIH0gPSBpdGVtO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGU6IGZvcm1EYXRhLmRhdGUsXHJcbiAgICAgICAgdGltZTogZm9ybURhdGEudGltZSxcclxuICAgICAgICBjb3Vuc2Vsb3JJZCxcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgX2lkLFxyXG4gICAgICAgIGNvdW5zZWxvck5hbWUsXHJcbiAgICAgIH1cclxuICAgIH0pIGFzIEFycmF5PGFueT47XHJcbiAgICBjb25zdCBjb3Vuc2Vsb3JMaXN0ID0gWyd3YW5nJ107XHJcbiAgICBjb25zdCBjUmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbigndXNlckRldGFpbCcpLndoZXJlKHtcclxuICAgICAgbmFtZTogZGIuUmVnRXhwKHtcclxuICAgICAgICByZWdleHA6IGNvdW5zZWxvckxpc3Quam9pbignfCcpXHJcbiAgICAgIH0pXHJcbiAgICAgIC8vICBuYW1lOiAvd2FuZy9cclxuICAgIH0pLmdldCgpO1xyXG4gICAgY29uc29sZS5sb2coY1JlcywgJ3Jlc3VsdCcpO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgb3JkZXJMaXN0XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpIC8v5YGc5q2i5LiL5ouJ5Yi35pawXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgfSxcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9XHJcbiJdfQ==