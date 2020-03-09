// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});

//  import { reqGet } from '../../utils/request';

Page({
  data: {
    orderList: [{date: '', time: '', status: '', counselorName: '', counselorId: '', _id: ''}],
    counselorList: []
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
  async loadData() {
    const res = await db.collection('interviewee').where({
      openId: app.globalData.openId,
    }).orderBy('formData.date', 'desc').limit(10).get();
    const orderList = res.data.map(item => {
      const { status, formData, counselorId, _id, counselorName } = item;
      return {
        date: formData.date,
        time: formData.time,
        counselorId,
        status,
        _id,
        counselorName,
      }
    }) as Array<any>;
    const counselorList = orderList.map(item => item.counselorId);
    this.setData({
      orderList
    });
  },
  async onPullDownRefresh() {
    await this.loadData();
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  onLoad() {
    this.loadData();
  },
})

export default {}
