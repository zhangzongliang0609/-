// pages/reg/reg.js
const db = wx.cloud.database({
  env: "web-zzl-iukkd"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canreg: false,
    yh: {},
    shul:2,
    canshow:false
  },
  jum: function () {
    wx.navigateTo({
      url: "../my/my",
    });
  },
  tiaoxin:function(){
    wx.navigateTo({
      url: "../shouhuo/shouhuo",
    });
  }
  ,
  daifu:function(){
    wx.navigateTo({
      url: "../dingdan/dingdan",
    });
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
    var that=this;
    wx.getStorage({
      key: 'yh',
      success: function (res) {
        that.setData({
          yh: res.data,
        })
      }
    })
    var that = this;
    var openid = wx.getStorageSync('openid');
        db.collection("dingdan").where({
          _openid:openid 
        }).get().then(res => {
          if (res.data.length > 0) {
            //console.log(res.data.length)
            that.setData({
              shul: res.data.length,
              canshow: true
            })      
          } else {
            that.setData({
              canshow: false
            })
          }
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