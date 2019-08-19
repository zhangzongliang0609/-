// pages/xiugai/xiugai.js
const db = wx.cloud.database({
  env: "web-zzl-iukkd"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    uname:"",
    phone:"",
    site:"",
    isshow:false,
   tishi:""
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
,
  xm:function(e){
    var that=this;
    var xm=e.detail.value
    console.log(xm)
    that.setData({
      uname:xm
    })
  },
dz:function(e){
  var that=this
  var dz=e.detail.value;
  console.log(dz)
  that.setData({
    site: dz
  })
},
  phone: function (e) {
    var that = this
    var sj = e.detail.value
    console.log(sj)
    that.setData({
    phone: sj
    })
  },
  subite:function(){
    var that=this
   if(that.data.uname){
    if(that.data.site){
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
     if(that.data.phone&&myreg.test(that.data.phone)){
       console.log(1)
       db.collection("site").add({
         data:{
           uname:that.data.uname,
           site: that.data.region + that.data.site,
           phone:that.data.phone,
           defaulte:false
         },success: res => {
           wx.showToast({
             title: '添加成功',
           })
           setTimeout(function(){
             console.log(1)
             wx.redirectTo({
               url: '../shouhuo/shouhuo',
             })
           },500)
         }
       })
     }else{
       var ss = "手机格式不正确"
       that.setData({
         isshow: true,
         tishi: ss
       })
     }

    }else{
      var zz = "详细地址不能为空"
      that.setData({
        isshow: true,
        tishi:zz
      })
    }
   }else{
     var cc ="姓名不能为空"
     that.setData({
       isshow: true,
       tishi:cc
     })
   }
  },
  gb: function(e){
   this.setData({
     isshow:false
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