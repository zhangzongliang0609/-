// pages/xq/xq.js
const db = wx.cloud.database({
  env: "web-zzl-iukkd"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
  xinXi:{},
  yuanJia:"",
  showModalStatus: false,
  cc: "",
  num: 1
  },
  tiaoding: function (e) {
    var id = e.currentTarget.dataset.id
    var num = e.currentTarget.dataset.num
    console.log(id + num)
    wx.navigateTo({
      url: '../pay/pay?id=' + id + '&num=' + num,
    })
  },
  //加入购物车弹框
  jiar: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.showLoading({
      title: '',
    })
    that.setData({
      showModalStatus: true,
      num: 1
    })
    db.collection("diaoyu_index").where({
      _id: id
    }).get().then(res => {
      // console.log(res.data);
      var jg = res.data
      that.setData({
        tc: jg[0],
        cc: jg[0].cc
      })
      wx.hideLoading()
    })
  },
  //输入个数时
  onchange: function (e) {
    var that = this
    //获得输入个数
    var gs = e.detail.value;
    //获得单个价格
    var cc = e.currentTarget.dataset.cc
    console.log(cc)
    console.log(gs)
    var geShujia = cc * gs + ".00"
    console.log(geShujia)
    that.data.tc.cc = geShujia
    that.setData({
      num: gs,
      cc: geShujia
    })
  },


  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //加号
  bindPlus: function (e) {
    var that = this
    //当1件时，点击移除
    var num = that.data.num
    var cc = e.currentTarget.dataset.cc
    var dg = cc / num;
    //console.log(cc);
    if (num < 100) {
      num++
    }
    let zh = dg * num + ".00"
    // var bs=
    that.setData({
      num: num,
      cc: zh
    })
  },
  //减号
  bindMinus: function (e) {
    var that = this
    //当1件时，点击移除
    var num = that.data.num
    var cc = e.currentTarget.dataset.cc
    var dg = cc / num
    //console.log(cc)
    if (num == 1) { } else {
      num--;
      let zh = dg * num + ".00"
      // var bs=
      that.setData({
        num: num,
        cc: zh
      })
    }
  },
  //加入购物车
  addCart: function (e) {
    var that = this;
    var cc = e.currentTarget.dataset.cc
    var sz = e.currentTarget.dataset.num
    var pic = e.currentTarget.dataset.pic
    var title = e.currentTarget.dataset.title
    var id = e.currentTarget.dataset.id
    db.collection("gouwu").where({
      pic: pic
    }).get().then(res => {
      if (res.data.length >= 1) {
        var id = res.data[0]._id
        sz = res.data[0].num + sz;
        cc = Number(res.data[0].cc) + Number(cc) + ".00"
        db.collection("gouwu").doc(id).update({
          data: {
            num: sz,
            cc: cc
          }
        }).then(res => {
          that.setData({
            showModalStatus: false,
          })
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../shop/shop'
          })
        }, 1000)
      } else {
        db.collection("gouwu").add({
          data: {
            cc: cc,
            num: sz,
            pic: pic,
            title: title
          },
          success: res => {
            console.log(res);
            that.setData({
              showModalStatus: false,
            })
          }
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../shop/shop'
          })
        }, 1000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieid = options.id;
    console.log(movieid);
    db.collection("diaoyu_index").where({
      _id:movieid
    }).get().then(res=>{
      console.log(res.data)
      var yj = Number(res.data[0].cc)+30+".00"
      this.setData({
        xinXi:res.data[0],
        yuanJia:yj
      })
    })
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