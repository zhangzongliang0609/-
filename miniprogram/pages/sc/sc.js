// pages/sc/sc.js
const db= wx.cloud.database({
  env: "web-zzl-iukkd"
})
const app = getApp()
Page({
  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    title: "",
    pic:"",
    cc:"",
    fenlei:""
  },
  onchange:function(e){
    var title =e.detail.value;
    console.log(title)
   this.setData({
     title:title
   })
   
  },
  change: function (e) {
    var jiage = e.detail.value;
    this.setData({
      cc: jiage
    })
  },
  cc: function (e) {
    var p = e.detail.value;
    console.log(p)
    this.setData({
      pic: p
    })
  },
 vv: function (e) {
    var p = e.detail.value;
    console.log(p)
    this.setData({
      fenlei: p
    })
  },

  /**生命周期函数--监听页面加载
   */
  onAdd: function () {
    db.collection("dingdan").add({
      data: {
        pic: this.data.pic,
        title:this.data.title,
        cc:this.data.cc,
        fenlei:this.data.fenlei
      }, success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      }, fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})