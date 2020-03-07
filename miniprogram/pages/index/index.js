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
        console.log('index');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBTWpDLElBQUksQ0FBQztJQVFELElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO1FBQ25ELFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLHlHQUF5RyxFQUFDO1lBQzVILEVBQUUsR0FBRyxFQUFFLHlHQUF5RyxFQUFDLEVBQUU7Z0JBQ2pILEdBQUcsRUFBRSx5R0FBeUc7YUFDL0csQ0FBQztRQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSw0UUFBNFE7Z0JBQ3BSLEdBQUcsRUFBRSxrSUFBa0k7YUFDeEksRUFBRTtnQkFDRCxJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsR0FBRyxFQUFFLGlJQUFpSTthQUN2SSxDQUFDO1FBQ0YsYUFBYSxFQUFFLElBQUk7UUFDbkIsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsS0FBSztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUVELE1BQU07UUFBTixpQkE0QkM7UUEzQkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUTtnQkFDakMsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBRzVCLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxVQUFBLEdBQUc7Z0JBQzdCLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO29CQUN0QixXQUFXLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFBO1NBQ0Y7YUFBTTtZQUVMLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ2IsT0FBTyxFQUFFLFVBQUEsR0FBRztvQkFDVixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO29CQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTt3QkFDdEIsV0FBVyxFQUFFLElBQUk7cUJBQ2xCLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBRUQsT0FBTyxFQUFQLFVBQVEsS0FBZTtRQUNyQixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1NBQ3RFLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtTQUN4QyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7U0FDOUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGNBQWMsRUFBZCxVQUFlLENBQVc7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDekIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGNBQWMsRUFBZCxVQUFlLENBQVc7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDekIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuLy8gY29uc3QgZGIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XHJcbi8vICAgZW52OiAndGVzdC1wc3ktcWt0dWsnXHJcbi8vIH0pO1xyXG5cclxuUGFnZSh7XHJcbiAgICAvLyBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgIC8vICAgcmV0dXJuIHtcclxuICAgIC8vICAgICB0aXRsZTogJ3N3aXBlcicsXHJcbiAgICAvLyAgICAgcGF0aDogJ3BhZ2UvY29tcG9uZW50L3BhZ2VzL3N3aXBlci9zd2lwZXInXHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sXHJcbiAgXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgICAgYmFja2dyb3VuZDogW3sgc3JjOiAnaHR0cDovL2Ntcy1idWNrZXQud3MuMTI2Lm5ldC8yMDIwLzAxMjMvNTY0MTI1YmVqMDBxNGpvOGUwMDJ0YzAwMGdvMDA4Y2MuanBnP2ltYWdlVmlldyZ0aHVtYm5haWw9NjAweTMwMCd9LFxyXG4gICAgICAgIHsgc3JjOiAnaHR0cDovL2Ntcy1idWNrZXQud3MuMTI2Lm5ldC8yMDIwLzAxMTkvZjU0M2Y1NTNqMDBxNGNiZ2UwMDJ1YzAwMGdvMDA4Y2MuanBnP2ltYWdlVmlldyZ0aHVtYm5haWw9NjAweTMwMCd9LCB7XHJcbiAgICAgICAgICBzcmM6ICdodHRwOi8vY21zLWJ1Y2tldC53cy4xMjYubmV0LzIwMjAvMDEyMy9mMjVkMTlkYWowMHE0amk0azAwMXVjMDAwZ28wMDhjYy5qcGc/aW1hZ2VWaWV3JnRodW1ibmFpbD02MDB5MzAwJ1xyXG4gICAgICAgIH1dLFxyXG4gICAgICBjb3VMaXN0OiBbe1xyXG4gICAgICAgIG5hbWU6ICd3YW5nJyxcclxuICAgICAgICBkZXRhaWw6ICfpkp/ljZflsbHvvIznlLfvvIzmsYnml4/vvIznpo/lu7rljqbpl6jkurrvvIwxOTM25bm0MTDmnIjlh7rnlJ/kuo7ljZfkuqzvvIzkuK3lhbHlhZrlkZjvvIzkuK3lm73lt6XnqIvpmaLpmaLlo6vvvIzokZflkI3lkbzlkLjnl4XlrabkuJPlrrbvvIzkuK3lm73mipflh7vpnZ7lhbjlnovogrrngo7nmoTpooblhpvkurrnianvvIzmm77ku7vlub/lt57ljLvlrabpmaLpmaLplb/jgIHlhZrlp5TkuaborrDvvIzlub/lt57luILlkbzlkLjnlr7nl4XnoJTnqbbmiYDmiYDplb/jgIHlub/lt57lkbzlkLjnlr7nl4Xlm73lrrbph43ngrnlrp7pqozlrqTkuLvku7vjgIHkuK3ljY7ljLvlrabkvJrkvJrplb/jgILpkp/ljZflsbHlh7rnlJ/kuo7ljLvlrabkuJblrrbvvJsxOTU45bm0OOaciO+8jOWcqOesrOS4gOWxiuWFqOi/kOS8mueahOavlOi1m+a1i+mqjOS4re+8jOmSn+WNl+WxseS7pTU056eSMueahOaIkOe7qe+8jOaJk+egtOS6huW9k+aXtjU056eSNueahDQwMOexs+agj+WFqOWbvee6quW9leOAgjE5NjDlubTmr5XkuJrkuo7ljJfkuqzljLvlrabpmaLvvIjku4rljJfkuqzlpKflrabljLvlrabpg6jvvInvvJsyMDA35bm06I636Iux5Zu954ix5LiB5aCh5aSn5a2m6I2j6KqJ5Y2a5aOr77ybMjAwN+W5tDEw5pyI5Lu75ZG85ZC455a+55eF5Zu95a626YeN54K55a6e6aqM5a6k5Li75Lu777ybMjAxNOW5tOiOt+mmmea4r+S4reaWh+Wkp+WtpuiNo+iqieeQhuWtpuWNmuWjqycsXHJcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9ia2ltZy5jZG4uYmNlYm9zLmNvbS9waWMvNzcwOTRiMzZhY2FmMmVkZDY0NzRkZGJjODIxMDAxZTkzODAxOTNkYT94LWJjZS1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2ZpbGwsd18zNjAsaF8yODAsYWxpZ25fNTAnXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnemhhbmcnLFxyXG4gICAgICAgIGRldGFpbDogJ+aIkeS5n+S4jeefpemBk+ivpeaAjuS5iOWPmOS6hicsXHJcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9ia2ltZy5jZG4uYmNlYm9zLmNvbS9waWMvMWM5NTBhN2IwMjA4N2JmNGU3YzM0OGU1ZmVkMzU3MmMxMWRmY2Y4Yj94LWJjZS1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2xmaXQsd18yMjAsaF8yMjAsbGltaXRfMSdcclxuICAgICAgfV0sXHJcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXHJcbiAgICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICBpbnRlcnZhbDogMjAwMCxcclxuICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdpbmRleCcpO1xyXG4gICAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSkge1xyXG4gICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxyXG4gICAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxyXG4gICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb250ZW50KGV2ZW50OiBEb21FdmVudCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9kZXRhaWwvZGV0YWlsJyArICc/bmFtZT0nICsgZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBjaGFuZ2VJbmRpY2F0b3JEb3RzKCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGluZGljYXRvckRvdHM6ICF0aGlzLmRhdGEuaW5kaWNhdG9yRG90c1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICBcclxuICAgIGNoYW5nZUF1dG9wbGF5KCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGF1dG9wbGF5OiAhdGhpcy5kYXRhLmF1dG9wbGF5XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgaW50ZXJ2YWxDaGFuZ2UoZTogRG9tRXZlbnQpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpbnRlcnZhbDogZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgXHJcbiAgICBkdXJhdGlvbkNoYW5nZShlOiBEb21FdmVudCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGR1cmF0aW9uOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHt9OyJdfQ==