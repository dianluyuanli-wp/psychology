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
    myName: function () {
        console.log(11111);
        return 'wangPei';
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
                            var status = item.status, formData = item.formData, counselorId = item.counselorId, _id = item._id, counselorName = item.counselorName;
                            return {
                                date: formData.date,
                                time: formData.time,
                                counselorId: counselorId,
                                status: status,
                                _id: _id,
                                counselorName: counselorName,
                                counselorAvatar: (_a = counselorInfoList.find(function (item) { return item.name === counselorName; })) === null || _a === void 0 ? void 0 : _a.avatar
                            };
                        });
                        console.log(cRes, 'result');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBRWpDLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzNCLEdBQUcsRUFBRSxnQkFBZ0I7Q0FDdEIsQ0FBQyxDQUFDO0FBSUgsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osU0FBUyxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDL0csYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUN6QztJQUNELE1BQU0sRUFBTixVQUFPLEtBQWU7O1FBQ2QsSUFBQSxnQ0FBMkMsRUFBekMsVUFBRSxFQUFFLGdCQUFxQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTztZQUNWLEdBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxVQUFVLElBQUcsUUFBUTtnQkFDN0MsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBQ0ssUUFBUSxFQUFkOzs7Ozs0QkFDYyxXQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDOzRCQUNuRCxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO3lCQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O3dCQUY3QyxHQUFHLEdBQUcsU0FFdUM7d0JBRTdDLGFBQWEsWUFBTyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxXQUFXLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlELFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0NBQ25ELElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO29DQUNkLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQ0FDaEMsQ0FBQzs2QkFDSCxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O3dCQUpGLElBQUksR0FBRyxTQUlMO3dCQUNGLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQzs0QkFDL0MsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJOzRCQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTt5QkFDcEIsQ0FBQyxFQUg4QyxDQUc5QyxDQUFDLENBQUE7d0JBRUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTs7NEJBQ3pCLElBQUEsb0JBQU0sRUFBRSx3QkFBUSxFQUFFLDhCQUFXLEVBQUUsY0FBRyxFQUFFLGtDQUFhLENBQVU7NEJBQ25FLE9BQU87Z0NBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dDQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0NBQ25CLFdBQVcsYUFBQTtnQ0FDWCxNQUFNLFFBQUE7Z0NBQ04sR0FBRyxLQUFBO2dDQUNILGFBQWEsZUFBQTtnQ0FDYixlQUFlLFFBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLEVBQTNCLENBQTJCLENBQUMsMENBQUUsTUFBTTs2QkFDckYsQ0FBQTt3QkFDSCxDQUFDLENBQWUsQ0FBQzt3QkFHakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsU0FBUyxXQUFBOzRCQUNULGFBQWEsRUFBRSxpQkFBaUI7eUJBQ2pDLENBQUMsQ0FBQzs7Ozs7S0FDSjtJQUNLLGlCQUFpQjs7Ozs0QkFDckIsV0FBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUE7O3dCQUFyQixTQUFxQixDQUFDO3dCQUN0QixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDRixDQUFDLENBQUE7QUFFRixrQkFBZSxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xyXG4vLyDojrflj5blupTnlKjlrp7kvotcclxuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblxyXG5jb25zdCBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtcclxuICBlbnY6ICd0ZXN0LXBzeS1xa3R1aydcclxufSk7XHJcblxyXG4vLyAgaW1wb3J0IHsgcmVxR2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcmVxdWVzdCc7XHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBvcmRlckxpc3Q6IFt7ZGF0ZTogJycsIHRpbWU6ICcnLCBzdGF0dXM6ICcnLCBjb3Vuc2Vsb3JOYW1lOiAnJywgY291bnNlbG9ySWQ6ICcnLCBfaWQ6ICcnLCBjb3Vuc2Vsb3JBdmF0YXI6ICcnfV0sXHJcbiAgICBjb3Vuc2Vsb3JMaXN0OiBbeyBuYW1lOiAnJywgYXZhdGFyOiAnJ31dXHJcbiAgfSxcclxuICBjYW5jZWwoZXZlbnQ6IERvbUV2ZW50KSB7XHJcbiAgICBjb25zdCB7IGlkLCBpbmRleCB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgZGIuY29sbGVjdGlvbignaW50ZXJ2aWV3ZWUnKS5kb2MoaWQpLnVwZGF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdGF0dXM6ICdjYW5jZWwnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgWydvcmRlckxpc3RbJyArIGluZGV4ICsgJ10uc3RhdHVzJ106ICdjYW5jZWwnXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgbXlOYW1lKCkge1xyXG4gICAgY29uc29sZS5sb2coMTExMTEpO1xyXG4gICAgcmV0dXJuICd3YW5nUGVpJ1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZERhdGEoKSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLndoZXJlKHtcclxuICAgICAgb3BlbklkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQsXHJcbiAgICB9KS5vcmRlckJ5KCdmb3JtRGF0YS5kYXRlJywgJ2Rlc2MnKS5saW1pdCgxMCkuZ2V0KCk7XHJcblxyXG4gICAgY29uc3QgY291bnNlbG9yTGlzdCA9IFsuLi5uZXcgU2V0KHJlcy5kYXRhLm1hcChpdGVtID0+IGl0ZW0uY291bnNlbG9ySWQpKV07XHJcbiAgICBjb25zdCBjUmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbigndXNlckRldGFpbCcpLndoZXJlKHtcclxuICAgICAgbmFtZTogZGIuUmVnRXhwKHtcclxuICAgICAgICByZWdleHA6IGNvdW5zZWxvckxpc3Quam9pbignfCcpXHJcbiAgICAgIH0pXHJcbiAgICB9KS5nZXQoKTtcclxuICAgIGNvbnN0IGNvdW5zZWxvckluZm9MaXN0ID0gY1Jlcy5kYXRhLm1hcChpdGVtID0+ICh7XHJcbiAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgYXZhdGFyOiBpdGVtLmF2YXRhclxyXG4gICAgfSkpXHJcblxyXG4gICAgY29uc3Qgb3JkZXJMaXN0ID0gcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICBjb25zdCB7IHN0YXR1cywgZm9ybURhdGEsIGNvdW5zZWxvcklkLCBfaWQsIGNvdW5zZWxvck5hbWUgfSA9IGl0ZW07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0ZTogZm9ybURhdGEuZGF0ZSxcclxuICAgICAgICB0aW1lOiBmb3JtRGF0YS50aW1lLFxyXG4gICAgICAgIGNvdW5zZWxvcklkLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICBfaWQsXHJcbiAgICAgICAgY291bnNlbG9yTmFtZSxcclxuICAgICAgICBjb3Vuc2Vsb3JBdmF0YXI6IGNvdW5zZWxvckluZm9MaXN0LmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGNvdW5zZWxvck5hbWUpPy5hdmF0YXJcclxuICAgICAgfVxyXG4gICAgfSkgYXMgQXJyYXk8YW55PjtcclxuICAgIC8vICBjb25zdCBjb3Vuc2Vsb3JMaXN0ID0gWy4uLm5ldyBTZXQob3JkZXJMaXN0Lm1hcChpdGVtID0+IGl0ZW0uY291bnNlbG9ySWQpKV07XHJcblxyXG4gICAgY29uc29sZS5sb2coY1JlcywgJ3Jlc3VsdCcpO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgb3JkZXJMaXN0LFxyXG4gICAgICBjb3Vuc2Vsb3JMaXN0OiBjb3Vuc2Vsb3JJbmZvTGlzdFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBhc3luYyBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKTtcclxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKSAvL+WBnOatouS4i+aLieWIt+aWsFxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gIH0sXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fVxyXG4iXX0=