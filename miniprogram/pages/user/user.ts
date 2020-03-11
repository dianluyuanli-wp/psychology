// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

const db = wx.cloud.database({
  env: 'test-psy-qktuk'
});

//  import { reqGet } from '../../utils/request';

Page({
  data: {
    orderList: [{date: '', time: '', status: '', counselorName: '', counselorId: '', _id: '', counselorAvatar: ''}],
    counselorList: [{ name: '', avatar: ''}]
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

    const counselorList = [...new Set(res.data.map(item => item.counselorId))];
    const cRes = await db.collection('userDetail').where({
      name: db.RegExp({
        regexp: counselorList.join('|')
      })
    }).get();
    const counselorInfoList = cRes.data.map(item => ({
      name: item.name,
      avatar: item.avatar
    }))

    const orderList = res.data.map(item => {
      const { status, formData, counselorId, _id, counselorName } = item;
      return {
        date: formData.date,
        time: formData.time,
        counselorId,
        status,
        _id,
        counselorName,
        counselorAvatar: counselorInfoList.find(item => item.name === counselorName)?.avatar
      }
    }) as Array<any>;

    this.setData({
      orderList,
      counselorList: counselorInfoList
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
