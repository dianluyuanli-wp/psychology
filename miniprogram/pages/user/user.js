"use strict";
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
    onLoad: function () {
        var _this = this;
        db.collection('interviewee').where({
            openId: app.globalData.openId,
        }).orderBy('date', 'desc').limit(10).get().then(function (res) {
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
    },
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUVqQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMzQixHQUFHLEVBQUUsZ0JBQWdCO0NBQ3RCLENBQUMsQ0FBQztBQUlILElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUMzRjtJQUNELE1BQU0sRUFBTixVQUFPLEtBQWU7O1FBQ2QsSUFBQSxnQ0FBMkMsRUFBekMsVUFBRSxFQUFFLGdCQUFxQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTztZQUNWLEdBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxVQUFVLElBQUcsUUFBUTtnQkFDN0MsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNLEVBQU47UUFBQSxpQkFrQkM7UUFqQkMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTtTQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNqRCxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7b0JBQ2xCLElBQUEsb0JBQU0sRUFBRSx3QkFBUSxFQUFFLDhCQUFXLEVBQUUsY0FBRyxFQUFFLGtDQUFhLENBQVU7b0JBQ25FLE9BQU87d0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO3dCQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7d0JBQ25CLFdBQVcsYUFBQTt3QkFDWCxNQUFNLFFBQUE7d0JBQ04sR0FBRyxLQUFBO3dCQUNILGFBQWEsZUFBQTtxQkFDZCxDQUFBO2dCQUNILENBQUMsQ0FBZTthQUNqQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQUE7QUFFRixrQkFBZSxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xyXG4vLyDojrflj5blupTnlKjlrp7kvotcclxuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblxyXG5jb25zdCBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtcclxuICBlbnY6ICd0ZXN0LXBzeS1xa3R1aydcclxufSk7XHJcblxyXG4vLyAgaW1wb3J0IHsgcmVxR2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcmVxdWVzdCc7XHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBvcmRlckxpc3Q6IFt7ZGF0ZTogJycsIHRpbWU6ICcnLCBzdGF0dXM6ICcnLCBjb3Vuc2Vsb3JOYW1lOiAnJywgY291bnNlbG9ySWQ6ICcnLCBfaWQ6ICcnfV1cclxuICB9LFxyXG4gIGNhbmNlbChldmVudDogRG9tRXZlbnQpIHtcclxuICAgIGNvbnN0IHsgaWQsIGluZGV4IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLmRvYyhpZCkudXBkYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHN0YXR1czogJ2NhbmNlbCdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBbJ29yZGVyTGlzdFsnICsgaW5kZXggKyAnXS5zdGF0dXMnXTogJ2NhbmNlbCdcclxuICAgIH0pXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBkYi5jb2xsZWN0aW9uKCdpbnRlcnZpZXdlZScpLndoZXJlKHtcclxuICAgICAgb3BlbklkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQsXHJcbiAgICB9KS5vcmRlckJ5KCdkYXRlJywgJ2Rlc2MnKS5saW1pdCgxMCkuZ2V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG9yZGVyTGlzdDogcmVzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBzdGF0dXMsIGZvcm1EYXRhLCBjb3Vuc2Vsb3JJZCwgX2lkLCBjb3Vuc2Vsb3JOYW1lIH0gPSBpdGVtO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0ZTogZm9ybURhdGEuZGF0ZSxcclxuICAgICAgICAgICAgdGltZTogZm9ybURhdGEudGltZSxcclxuICAgICAgICAgICAgY291bnNlbG9ySWQsXHJcbiAgICAgICAgICAgIHN0YXR1cyxcclxuICAgICAgICAgICAgX2lkLFxyXG4gICAgICAgICAgICBjb3Vuc2Vsb3JOYW1lLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pIGFzIEFycmF5PGFueT5cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge31cclxuIl19