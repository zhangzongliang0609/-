// pages/sou/sou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 变量首字母缩写
  sou:"",
  zg:[],
  bl:[]
  },
  // 保存输入的值
  sr: function (e) {
    var jiage = e.detail.value;
    this.setData({
      sou: jiage
    })
  },
  // 点击搜索按钮
  dj:function(){
    var that = this;
   let key=this.data.sou;
    if (key == '') {//用户没有输入 全部显示
      that.setData({
       bl:that.data.zg
      })
      return;
    }
    var arr=[];
    for (let i in that.data.zg) {
      if (that.data.zg[i].title.indexOf(key) >= 0) {//查找
       arr.push(that.data.zg[i])
      }
    }
    console.log(arr);
    that.setData({
      bl:arr
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({
      env: "web-zzl-iukkd"
    });
    db.collection("diaoyu_index").get().then(res => {
      wx.showLoading({
        title: '等一下网',
      })
      this.setData({
        zg: res.data
      })
      wx.hideLoading()
    });
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