"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        background: [{ src: 'http://cms-bucket.ws.126.net/2020/0123/564125bej00q4jo8e002tc000go008cc.jpg?imageView&thumbnail=600y300' },
            { src: 'http://cms-bucket.ws.126.net/2020/0119/f543f553j00q4cbge002uc000go008cc.jpg?imageView&thumbnail=600y300' }, {
                src: 'http://cms-bucket.ws.126.net/2020/0123/f25d19daj00q4ji4k001uc000go008cc.jpg?imageView&thumbnail=600y300'
            }],
        couList: [{
                name: 'wang',
                detail: '北京地坛医院',
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
    }
});
exports.default = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBTWpDLElBQUksQ0FBQztJQVFELElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO1FBQ25ELFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLHlHQUF5RyxFQUFDO1lBQzVILEVBQUUsR0FBRyxFQUFFLHlHQUF5RyxFQUFDLEVBQUU7Z0JBQ2pILEdBQUcsRUFBRSx5R0FBeUc7YUFDL0csQ0FBQztRQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixHQUFHLEVBQUUsa0lBQWtJO2FBQ3hJLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsTUFBTSxFQUFFLFlBQVk7Z0JBQ3BCLEdBQUcsRUFBRSxpSUFBaUk7YUFDdkksQ0FBQztRQUNGLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFFRCxNQUFNO1FBQU4saUJBMkJDO1FBMUJDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO2dCQUNqQyxXQUFXLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUE7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFHNUIsR0FBRyxDQUFDLHFCQUFxQixHQUFHLFVBQUEsR0FBRztnQkFDN0IsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7b0JBQ3RCLFdBQVcsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUE7WUFDSixDQUFDLENBQUE7U0FDRjthQUFNO1lBRUwsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDYixPQUFPLEVBQUUsVUFBQSxHQUFHO29CQUNWLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7b0JBQ3RDLEtBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO3dCQUN0QixXQUFXLEVBQUUsSUFBSTtxQkFDbEIsQ0FBQyxDQUFBO2dCQUNKLENBQUM7YUFDRixDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxPQUFPLEVBQVAsVUFBUSxLQUFlO1FBQ3JCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUk7U0FDdEUsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO1NBQ3hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtTQUM5QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsY0FBYyxFQUFkLFVBQWUsQ0FBVztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsY0FBYyxFQUFkLFVBQWUsQ0FBVztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblxyXG4vLyBjb25zdCBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtcclxuLy8gICBlbnY6ICd0ZXN0LXBzeS1xa3R1aydcclxuLy8gfSk7XHJcblxyXG5QYWdlKHtcclxuICAgIC8vIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgLy8gICByZXR1cm4ge1xyXG4gICAgLy8gICAgIHRpdGxlOiAnc3dpcGVyJyxcclxuICAgIC8vICAgICBwYXRoOiAncGFnZS9jb21wb25lbnQvcGFnZXMvc3dpcGVyL3N3aXBlcidcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICBcclxuICAgIGRhdGE6IHtcclxuICAgICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxyXG4gICAgICBiYWNrZ3JvdW5kOiBbeyBzcmM6ICdodHRwOi8vY21zLWJ1Y2tldC53cy4xMjYubmV0LzIwMjAvMDEyMy81NjQxMjViZWowMHE0am84ZTAwMnRjMDAwZ28wMDhjYy5qcGc/aW1hZ2VWaWV3JnRodW1ibmFpbD02MDB5MzAwJ30sXHJcbiAgICAgICAgeyBzcmM6ICdodHRwOi8vY21zLWJ1Y2tldC53cy4xMjYubmV0LzIwMjAvMDExOS9mNTQzZjU1M2owMHE0Y2JnZTAwMnVjMDAwZ28wMDhjYy5qcGc/aW1hZ2VWaWV3JnRodW1ibmFpbD02MDB5MzAwJ30sIHtcclxuICAgICAgICAgIHNyYzogJ2h0dHA6Ly9jbXMtYnVja2V0LndzLjEyNi5uZXQvMjAyMC8wMTIzL2YyNWQxOWRhajAwcTRqaTRrMDAxdWMwMDBnbzAwOGNjLmpwZz9pbWFnZVZpZXcmdGh1bWJuYWlsPTYwMHkzMDAnXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIGNvdUxpc3Q6IFt7XHJcbiAgICAgICAgbmFtZTogJ3dhbmcnLFxyXG4gICAgICAgIGRldGFpbDogJ+WMl+S6rOWcsOWdm+WMu+mZoicsXHJcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9ia2ltZy5jZG4uYmNlYm9zLmNvbS9waWMvNzcwOTRiMzZhY2FmMmVkZDY0NzRkZGJjODIxMDAxZTkzODAxOTNkYT94LWJjZS1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2ZpbGwsd18zNjAsaF8yODAsYWxpZ25fNTAnXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnemhhbmcnLFxyXG4gICAgICAgIGRldGFpbDogJ+aIkeS5n+S4jeefpemBk+ivpeaAjuS5iOWPmOS6hicsXHJcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9ia2ltZy5jZG4uYmNlYm9zLmNvbS9waWMvMWM5NTBhN2IwMjA4N2JmNGU3YzM0OGU1ZmVkMzU3MmMxMWRmY2Y4Yj94LWJjZS1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2xmaXQsd18yMjAsaF8yMjAsbGltaXRfMSdcclxuICAgICAgfV0sXHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICBpbnRlcnZhbDogMjAwMCxcclxuICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XHJcbiAgICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXHJcbiAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRlbnQoZXZlbnQ6IERvbUV2ZW50KSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4uL2RldGFpbC9kZXRhaWwnICsgJz9uYW1lPScgKyBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGNoYW5nZUluZGljYXRvckRvdHMoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW5kaWNhdG9yRG90czogIXRoaXMuZGF0YS5pbmRpY2F0b3JEb3RzXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgY2hhbmdlQXV0b3BsYXkoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgYXV0b3BsYXk6ICF0aGlzLmRhdGEuYXV0b3BsYXlcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBpbnRlcnZhbENoYW5nZShlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGludGVydmFsOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGR1cmF0aW9uQ2hhbmdlKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZHVyYXRpb246IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge307Il19