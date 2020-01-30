// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});

//  import { reqGet } from '../../utils/request';

Page({
  data: {
    orderList: [{date: '', time: '', status: '', counselorName: '', counselorId: '', _id: ''}]
  },
  cancel(event: DomEvent) {
    const { id, index } = event.currentTarget.dataset;
    db.collection('interviewee').doc(id).update({
      data: {
        status: 'cancel'
      }
    });
    this.setData({
      ['orderList[' + index + '].status']: 'cancel'
    })
  },
  onLoad() {
    db.collection('interviewee').where({
      openId: app.globalData.openId,
    }).orderBy('date', 'desc').limit(10).get().then(res => {
      this.setData({
        orderList: res.data.map(item => {
          const { status, formData, counselorId, _id, counselorName } = item;
          return {
            date: formData.date,
            time: formData.time,
            counselorId,
            status,
            _id,
            counselorName,
          }
        }) as Array<any>
      });
    });
  },
})

export default {}
