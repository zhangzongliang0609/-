// pages/pay/pay.js
const db = wx.cloud.database({
  env: "web-zzl-iukkd"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
   cd:30,
   list:[],
   zongjia:"",
   dz:{},
   canshow:false,
   heji:0,
   pand:""
  },
//收货人选择
  shouhuo:function(){
    wx.navigateTo({
      url: '../shouhuo/shouhuo',
    })
  },
  //添加一条地址
  tiaoxiu:function(){
    wx.navigateTo({
      url: '../xiugai/xiugai',
    })
  },
  //生成订单
  onSubmit:function(){
    let that=this;
   let danhao=new  Date();
   let nian=danhao.getFullYear();
   let yue=danhao.getMonth();
   yue=yue+1
   let ri=danhao.getDay(); 
   let miao=danhao.getMilliseconds()
   if(yue<10){
     yue="0"+yue
   }
   if(ri<10){
     ri="0"+ri
   }
  danhao=nian+yue+ri+miao
    db.collection("dingdan").add({
      data:{
        danhao:danhao,
        xinxi:that.data.list,
        heji: that.data.heji
      }
    }).then(res=>{
      setTimeout(function () {
        wx.switchTab({
          url: '../reg/reg'
        })},500)
    })
    let cd= that.data.list
   if(that.data.pand==1){
     for (var i = 0; i < cd.length; i++) {
       db.collection("gouwu").doc(cd[i]._id).remove().then(res=>{
         console.log(1)
       })
     }
  }
    setTimeout(function () {
      wx.switchTab({
        url: '../reg/reg'
      })
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    db.collection("site").get().then(res=>{
      if(res.data.length>=0){
        that.setData({
          canshow: true
        })
      }else{
        that.setData({
          canshow: false
        }) 
      }
    })
    let id=options.id;
    let dd=1
      if(id==undefined){
        that.setData({
          pand: dd
        })
      }
    if(id!=undefined){
      //首页跳转过来的
      wx.showLoading({
        title: '等等网络',
      })
      let num = options.num;
      db.collection("diaoyu_index").where({
        _id: id
      }).get().then(res => {
        let heji=num*res.data[0].cc*100+500
         res.data[0].num=Number(res.data[0].num)*num
        let jiage = Number(res.data[0].cc) * num + ".00"
        res.data[0].num=num
        that.setData({
          list: res.data,
          zongjia: jiage,
          heji:heji
        })
      })
      wx.hideLoading()
    }else{
      //购物车跳转过来的
      wx.showLoading({
        title: '等等网络',
      })
      let shuju = JSON.parse(options.model)
      let jia=options.jia
     let heji = Number(jia)+ 500 
      jia = Number(jia) / 100+ ".00"
      that.setData({
        list:shuju,
        zongjia:jia,
        heji:heji
      })
      wx.hideLoading()
    }
    let dz=options.dn;
    if(dz==undefined){
     db.collection("site").where({
         defaulte:true
     }).get().then(res=>{
       that.setData({
         dz: res.data[0]
       })
     })
    }else{
    db.collection("site").doc(dz).get().then(res=>{
     that.setData({
       dz:res.data
     })
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