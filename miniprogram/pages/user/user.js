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
                    console.log(res, 111);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUVqQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMzQixHQUFHLEVBQUUsZ0JBQWdCO0NBQ3RCLENBQUMsQ0FBQztBQUlILElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUMzRjtJQUNELE1BQU0sRUFBTixVQUFPLEtBQWU7O1FBQ2QsSUFBQSxnQ0FBMkMsRUFBekMsVUFBRSxFQUFFLGdCQUFxQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTztZQUNWLEdBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxVQUFVLElBQUcsUUFBUTtnQkFDN0MsQ0FBQTtJQUNKLENBQUM7SUFDSyxRQUFRLEVBQWQ7Ozs7Z0JBQ0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07aUJBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO29CQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJOzRCQUNsQixJQUFBLG9CQUFNLEVBQUUsd0JBQVEsRUFBRSw4QkFBVyxFQUFFLGNBQUcsRUFBRSxrQ0FBYSxDQUFVOzRCQUNuRSxPQUFPO2dDQUNMLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQ0FDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dDQUNuQixXQUFXLGFBQUE7Z0NBQ1gsTUFBTSxRQUFBO2dDQUNOLEdBQUcsS0FBQTtnQ0FDSCxhQUFhLGVBQUE7NkJBQ2QsQ0FBQTt3QkFDSCxDQUFDLENBQWU7cUJBQ2pCLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzs7OztLQUNKO0lBQ0ssaUJBQWlCOzs7OzRCQUNyQixXQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQXJCLFNBQXFCLENBQUM7d0JBQ3RCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBOzs7OztLQUN6QjtJQUNELE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXHJcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xyXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmNvbnN0IGRiID0gd3guY2xvdWQuZGF0YWJhc2Uoe1xyXG4gIGVudjogJ3Rlc3QtcHN5LXFrdHVrJ1xyXG59KTtcclxuXHJcbi8vICBpbXBvcnQgeyByZXFHZXQgfSBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIG9yZGVyTGlzdDogW3tkYXRlOiAnJywgdGltZTogJycsIHN0YXR1czogJycsIGNvdW5zZWxvck5hbWU6ICcnLCBjb3Vuc2Vsb3JJZDogJycsIF9pZDogJyd9XVxyXG4gIH0sXHJcbiAgY2FuY2VsKGV2ZW50OiBEb21FdmVudCkge1xyXG4gICAgY29uc3QgeyBpZCwgaW5kZXggfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgIGRiLmNvbGxlY3Rpb24oJ2ludGVydmlld2VlJykuZG9jKGlkKS51cGRhdGUoe1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RhdHVzOiAnY2FuY2VsJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIFsnb3JkZXJMaXN0WycgKyBpbmRleCArICddLnN0YXR1cyddOiAnY2FuY2VsJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGFzeW5jIGxvYWREYXRhKCkge1xyXG4gICAgZGIuY29sbGVjdGlvbignaW50ZXJ2aWV3ZWUnKS53aGVyZSh7XHJcbiAgICAgIG9wZW5JZDogYXBwLmdsb2JhbERhdGEub3BlbklkLFxyXG4gICAgfSkub3JkZXJCeSgnZm9ybURhdGEuZGF0ZScsICdkZXNjJykubGltaXQoMTApLmdldCgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzLDExMSk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgb3JkZXJMaXN0OiByZXMuZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IHN0YXR1cywgZm9ybURhdGEsIGNvdW5zZWxvcklkLCBfaWQsIGNvdW5zZWxvck5hbWUgfSA9IGl0ZW07XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRlOiBmb3JtRGF0YS5kYXRlLFxyXG4gICAgICAgICAgICB0aW1lOiBmb3JtRGF0YS50aW1lLFxyXG4gICAgICAgICAgICBjb3Vuc2Vsb3JJZCxcclxuICAgICAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgICAgICBfaWQsXHJcbiAgICAgICAgICAgIGNvdW5zZWxvck5hbWUsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkgYXMgQXJyYXk8YW55PlxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCkgLy/lgZzmraLkuIvmi4nliLfmlrBcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMubG9hZERhdGEoKTtcclxuICB9LFxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge31cclxuIl19