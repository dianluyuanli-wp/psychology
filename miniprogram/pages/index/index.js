"use strict";
Page({
    data: {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxDQUFDO0lBUUQsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUseUdBQXlHLEVBQUM7WUFDNUgsRUFBRSxHQUFHLEVBQUUseUdBQXlHLEVBQUMsRUFBRTtnQkFDakgsR0FBRyxFQUFFLHlHQUF5RzthQUMvRyxDQUFDO1FBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEdBQUcsRUFBRSxrSUFBa0k7YUFDeEksRUFBRTtnQkFDRCxJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsR0FBRyxFQUFFLGlJQUFpSTthQUN2SSxDQUFDO1FBQ0YsYUFBYSxFQUFFLElBQUk7UUFDbkIsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsS0FBSztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUVELE9BQU8sRUFBUCxVQUFRLEtBQWU7UUFDckIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSTtTQUN0RSxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7U0FDeEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1NBQzlCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxjQUFjLEVBQWQsVUFBZSxDQUFXO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxjQUFjLEVBQWQsVUFBZSxDQUFXO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcclxuICAgIC8vIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgLy8gICByZXR1cm4ge1xyXG4gICAgLy8gICAgIHRpdGxlOiAnc3dpcGVyJyxcclxuICAgIC8vICAgICBwYXRoOiAncGFnZS9jb21wb25lbnQvcGFnZXMvc3dpcGVyL3N3aXBlcidcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICBcclxuICAgIGRhdGE6IHtcclxuICAgICAgYmFja2dyb3VuZDogW3sgc3JjOiAnaHR0cDovL2Ntcy1idWNrZXQud3MuMTI2Lm5ldC8yMDIwLzAxMjMvNTY0MTI1YmVqMDBxNGpvOGUwMDJ0YzAwMGdvMDA4Y2MuanBnP2ltYWdlVmlldyZ0aHVtYm5haWw9NjAweTMwMCd9LFxyXG4gICAgICAgIHsgc3JjOiAnaHR0cDovL2Ntcy1idWNrZXQud3MuMTI2Lm5ldC8yMDIwLzAxMTkvZjU0M2Y1NTNqMDBxNGNiZ2UwMDJ1YzAwMGdvMDA4Y2MuanBnP2ltYWdlVmlldyZ0aHVtYm5haWw9NjAweTMwMCd9LCB7XHJcbiAgICAgICAgICBzcmM6ICdodHRwOi8vY21zLWJ1Y2tldC53cy4xMjYubmV0LzIwMjAvMDEyMy9mMjVkMTlkYWowMHE0amk0azAwMXVjMDAwZ28wMDhjYy5qcGc/aW1hZ2VWaWV3JnRodW1ibmFpbD02MDB5MzAwJ1xyXG4gICAgICAgIH1dLFxyXG4gICAgICBjb3VMaXN0OiBbe1xyXG4gICAgICAgIG5hbWU6ICd3YW5nJyxcclxuICAgICAgICBkZXRhaWw6ICfljJfkuqzlnLDlnZvljLvpmaInLFxyXG4gICAgICAgIGltZzogJ2h0dHBzOi8vYmtpbWcuY2RuLmJjZWJvcy5jb20vcGljLzc3MDk0YjM2YWNhZjJlZGQ2NDc0ZGRiYzgyMTAwMWU5MzgwMTkzZGE/eC1iY2UtcHJvY2Vzcz1pbWFnZS9yZXNpemUsbV9maWxsLHdfMzYwLGhfMjgwLGFsaWduXzUwJ1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ3poYW5nJyxcclxuICAgICAgICBkZXRhaWw6ICfmiJHkuZ/kuI3nn6XpgZPor6XmgI7kuYjlj5jkuoYnLFxyXG4gICAgICAgIGltZzogJ2h0dHBzOi8vYmtpbWcuY2RuLmJjZWJvcy5jb20vcGljLzFjOTUwYTdiMDIwODdiZjRlN2MzNDhlNWZlZDM1NzJjMTFkZmNmOGI/eC1iY2UtcHJvY2Vzcz1pbWFnZS9yZXNpemUsbV9sZml0LHdfMjIwLGhfMjIwLGxpbWl0XzEnXHJcbiAgICAgIH1dLFxyXG4gICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgaW50ZXJ2YWw6IDIwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiA1MDBcclxuICAgIH0sXHJcblxyXG4gICAgY29udGVudChldmVudDogRG9tRXZlbnQpIHtcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vZGV0YWlsL2RldGFpbCcgKyAnP25hbWU9JyArIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgY2hhbmdlSW5kaWNhdG9yRG90cygpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpbmRpY2F0b3JEb3RzOiAhdGhpcy5kYXRhLmluZGljYXRvckRvdHNcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBjaGFuZ2VBdXRvcGxheSgpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBhdXRvcGxheTogIXRoaXMuZGF0YS5hdXRvcGxheVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGludGVydmFsQ2hhbmdlKGU6IERvbUV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW50ZXJ2YWw6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgZHVyYXRpb25DaGFuZ2UoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBkdXJhdGlvbjogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9KSJdfQ==