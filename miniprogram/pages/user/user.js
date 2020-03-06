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
        orderList: [{ date: '', time: '', status: '', counselorName: '', counselorId: '', _id: '' }]
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
            var _this = this;
            return __generator(this, function (_a) {
                db.collection('interviewee').where({
                    openId: app.globalData.openId,
                }).orderBy('formData.date', 'desc').limit(10).get().then(function (res) {
                    _this.setData({
                        orderList: res.data.map(function (item) {
                            var status = item.status, formData = item.formData, counselorId = item.counselorId, _id = item._id, counselorName = item.counselorName;
                            return {
                                date: formData.date,
                                time: formData.time,
                                counselorId: counselorId,
                                status: status,
                                _id: _id,
                                counselorName: counselorName,
                            };
                        })
                    });
                });
                return [2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUVqQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMzQixHQUFHLEVBQUUsZ0JBQWdCO0NBQ3RCLENBQUMsQ0FBQztBQUlILElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUMzRjtJQUNELE1BQU0sRUFBTixVQUFPLEtBQWU7O1FBQ2QsSUFBQSxnQ0FBMkMsRUFBekMsVUFBRSxFQUFFLGdCQUFxQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTztZQUNWLEdBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxVQUFVLElBQUcsUUFBUTtnQkFDN0MsQ0FBQTtJQUNKLENBQUM7SUFDSyxRQUFRLEVBQWQ7Ozs7Z0JBQ0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07aUJBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO29CQUMxRCxLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7NEJBQ2xCLElBQUEsb0JBQU0sRUFBRSx3QkFBUSxFQUFFLDhCQUFXLEVBQUUsY0FBRyxFQUFFLGtDQUFhLENBQVU7NEJBQ25FLE9BQU87Z0NBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dDQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0NBQ25CLFdBQVcsYUFBQTtnQ0FDWCxNQUFNLFFBQUE7Z0NBQ04sR0FBRyxLQUFBO2dDQUNILGFBQWEsZUFBQTs2QkFDZCxDQUFBO3dCQUNILENBQUMsQ0FBZTtxQkFDakIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDOzs7O0tBQ0o7SUFDSyxpQkFBaUI7Ozs7NEJBQ3JCLFdBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBckIsU0FBcUIsQ0FBQzt3QkFDdEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbiAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbn0pO1xyXG5cclxuLy8gIGltcG9ydCB7IHJlcUdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgb3JkZXJMaXN0OiBbe2RhdGU6ICcnLCB0aW1lOiAnJywgc3RhdHVzOiAnJywgY291bnNlbG9yTmFtZTogJycsIGNvdW5zZWxvcklkOiAnJywgX2lkOiAnJ31dXHJcbiAgfSxcclxuICBjYW5jZWwoZXZlbnQ6IERvbUV2ZW50KSB7XHJcbiAgICBjb25zdCB7IGlkLCBpbmRleCB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgZGIuY29sbGVjdGlvbignaW50ZXJ2aWV3ZWUnKS5kb2MoaWQpLnVwZGF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdGF0dXM6ICdjYW5jZWwnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgWydvcmRlckxpc3RbJyArIGluZGV4ICsgJ10uc3RhdHVzJ106ICdjYW5jZWwnXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZERhdGEoKSB7XHJcbiAgICBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLndoZXJlKHtcclxuICAgICAgb3BlbklkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQsXHJcbiAgICB9KS5vcmRlckJ5KCdmb3JtRGF0YS5kYXRlJywgJ2Rlc2MnKS5saW1pdCgxMCkuZ2V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG9yZGVyTGlzdDogcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBzdGF0dXMsIGZvcm1EYXRhLCBjb3Vuc2Vsb3JJZCwgX2lkLCBjb3Vuc2Vsb3JOYW1lIH0gPSBpdGVtO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0ZTogZm9ybURhdGEuZGF0ZSxcclxuICAgICAgICAgICAgdGltZTogZm9ybURhdGEudGltZSxcclxuICAgICAgICAgICAgY291bnNlbG9ySWQsXHJcbiAgICAgICAgICAgIHN0YXR1cyxcclxuICAgICAgICAgICAgX2lkLFxyXG4gICAgICAgICAgICBjb3Vuc2Vsb3JOYW1lLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pIGFzIEFycmF5PGFueT5cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpIC8v5YGc5q2i5LiL5ouJ5Yi35pawXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgfSxcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9XHJcbiJdfQ==