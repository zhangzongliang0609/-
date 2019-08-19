// pages/dingdan/dingdan.js
const db = wx.cloud.database({
  env: "web-zzl-iukkd"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canding:false,
    list:[]
  },
  //取消订单
  quxiao: function (e) {
    var that=this
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '删除订单',
      content: '确定要删除订单吗？',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          //console.log(1)
          var bg = that.data.list
          bg.splice(index, 1),
            that.setData({
              list: bg
            })
          db.collection("dingdan").doc(id).remove().then(res => {
            wx.showToast({
              title: '删除成功',
            })
            that.onShow()
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this
    db.collection("dingdan").get().then(res=>{
      that.setData({
        list:res.data 
      })
    })
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