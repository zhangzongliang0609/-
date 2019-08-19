// pages/shouhuo/shouhuo.js
const db = wx.cloud.database({
  env: "web-zzl-iukkd"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],

  },
  //删除
  shanchu:function(e){
    var that=this;
    let index=e.currentTarget.dataset.index;
    let id= e.currentTarget.dataset.id
    //console.log(id)
    wx.showModal({
      title: '删除收货地址',
      content: '确定要删除收货地址？',
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
         var bg= that.data.list
         bg.splice(index, 1),
            that.setData({
              list: bg
            })
            db.collection("site").doc(id).remove().then(res=>{
              wx.showToast({
                title: '删除成功',
              })
            })
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { 
      },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  //返回订单
  // tding: function(e) {
  //   //console.log(2)
  //   let id=e.currentTarget.dataset.id
  //   //console.log(id)
  //   let pages=getCurrentPages();
  //   console.log(pages)
  //   if(pages.length>=2){
  //     for(var i=0;i<pages.length;i++){
  //       if(pages[i].route=="pages/pay/pay"){
  //         wx.navigateTo({
  //           url: '../pay/pay?dn=' + id,
  //         })
  //       }
  //     }
  //   }
    
  // },
  //添加地址
  tianjia: function() {
    wx: wx.navigateTo({
      url: '../xiugai/xiugai',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //点击选中
  xuanz: function(e) {
    //console.log(1)
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
   // console.log(index)
    var cd = this.data.list;
    for (let i = 0; i < cd.length; i++) {
      if (cd[i].defaulte == true) {
        cd[i].defaulte = false
      }
    }
    cd[index].defaulte = true;
    this.setData({
      list: cd
    })
  },
  //加载
  jia: function() {
    var that = this
    db.collection("site").get().then(res => {
     // console.log(res.data)
      if (res.data.length == 1) {
        res.data[0].defaulte = true
      }
      that.setData({
        list: res.data
      })
    })
  },
  //修改数据库
  xiu: function() {
    var that = this;
      let gx = that.data.list
    for (var i = 0; i < gx.length; i++) {
        let setd = gx[i]._id
        let getd=gx[i].defaulte
      db.collection("site").doc(setd).update({
        data: {
          defaulte:getd
        }
      })
    }   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.jia()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.jia()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.xiu()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
 this.xiu()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})