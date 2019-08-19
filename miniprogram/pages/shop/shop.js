// pages/shop/shop.js
const db = wx.cloud.database({
  env: "web-zzl-iukkd"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cangou: true,//登陆
    list: [],//数据
    checked: "",//全选
    zongjia: 0,//总价
    sel: false,//选中
  },
  //判断是否全选中
  xza: function(e) {
    let that=this
    var index = e.target.dataset.index;
    var dx = that.data.list;
    if (dx[index].select == true) {
      dx[index].select= false;
      db.collection('gouwu').doc(dx[index]._id).update({
        data:{
          select: dx[index].select
        }
      })
    }else{
      dx[index].select = true;
      db.collection('gouwu').doc(dx[index]._id).update({
        data: {
          select: dx[index].select
        }
      })
    }
    var cd=0;
    var jg=0
    for(let bl=0;bl<dx.length;bl++){
      if(dx[bl].select==true){
        jg += Number(dx[bl].cc);
        cd++
      }
    };
    jg = jg * 100
   //jg*=100+".00"
   // console.log(jg)
    that.setData({
      zongjia:jg
    })
    if(cd==dx.length){
      that.setData({
        checked:true
      })
    }else{
      that.setData({
        checked: false
      })
    }
  },
  //全选
  selcc: function() {
    var that = this;
    let sz = that.data.list;
    if (that.data.checked == true) {
      for (let qz = 0; qz < sz.length; qz++) {
        sz[qz].select = true;
        db.collection('gouwu').doc(sz[qz]._id).update({
          data: {
            select: sz[qz].select
          }
        })
      }
      that.setData({
        list: sz
      })
      that.zongjia()
    } else {
      for (let qz = 0; qz < sz.length; qz++) {
        sz[qz].select = false;
        db.collection('gouwu').doc(sz[qz]._id).update({
          data: {
            select: sz[qz].select
          }
        })
      }
      that.setData({
        list: sz,
        zongjia: 0
      })
    }
  },
  //第三方库
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },

  //单个删除
  del: function(e) {
    var that=this
    var did = e.target.dataset.id;
    var index = e.currentTarget.dataset.index
    var newList = that.data.list
    db.collection('gouwu').doc(did).remove({
      success: (res) => {
        //console.log(1);
        newList.splice(index, 1)
        that.setData({list:newList});
       that.zongjia()
      }
    })
  },
  //减
  subtraction: function(e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //把新的值给新的数组
    var newList = that.data.list
    var dan = newList[index].cc / num
    //当1件时，点击移除
    if (num == 1) {

    } else {
      num--
      newList[index].num = num
      newList[index].cc = (dan * num).toFixed(2);
      db.collection('gouwu').doc(newList[index]._id).update({
        data: {
          num: newList[index].num,
          cc: newList[index].cc
        }
      })
      that.zongjia()
    }

    //把新的数组传给前台
    that.setData({
      list: newList
    })
  },
  //加
  jia: function(e) {
    var that = this
    //得到下标
    var index = e.target.dataset.index
    //得到点击的值
    var newList = that.data.list
    var num = e.currentTarget.dataset.num;
    var dan = newList[index].cc / num
    //默认99件最多
    if (num < 100) {
      num++
    }
    //把新的值给新的数组
    newList[index].num = num
    newList[index].cc = (dan * num).toFixed(2)
    db.collection('gouwu').doc(newList[index]._id).update({
      data: {
        num: newList[index].num,
        cc: newList[index].cc
      }
    })
    //把新的数组传给前台
    that.setData({
      list: newList
    })
    that.zongjia()
  },
  //总价
  zongjia: function() {
    let that = this;
    var zon = 0;
    let  dy=0;
    for (var i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i].select== true) {
        var yige = Number(that.data.list[i].cc)
       // console.log(yige)
        zon += yige;
        dy++
      }
    }
    zon = zon * 100
    //console.log(that.data.list)
    that.setData({
      zongjia: zon
    })
    if (dy == that.data.list.length) {
      that.setData({
        checked: true
      })
    } else {
      that.setData({
        checked: false
      })
    }
  },
  //获取数据
  cc: function() {
    wx.showLoading({
      title: '等一下网络',
    })
    var that = this;
    var openid = wx.getStorageSync('openid');
    console.log(openid)
        db.collection("gouwu").where({
          _openid: openid
        }).get().then(res => {
        if(res.data.length>0){
          //console.log(res.data)
          that.setData({
            list: res.data,
             cangou: false
          });
          that.zongjia();
        }else{
          that.setData({
            cangou:true
          })
        }
        wx.hideLoading()
        });
  
  },
  //跳转首页
  tiao:function(){
    wx.switchTab({
      url: '../index/index'
    })}
  ,
  //提交订单
  onClickButton:function(){
    let that=this
    db.collection("gouwu").where({
       select:true
     }).get().then(res=>{
      if(res.data.length>0){
       let model = JSON.stringify(res.data);
       //let cc="aafdsfkhaflha"
        let jia=that.data.zongjia
        //console.log(model[0])
       wx.navigateTo({
         url: '../pay/pay?model='+model+'&jia='+jia,
       })
      }else{
        wx.showToast({
          title: '请勾选要购买的商品',
        })
      }
     })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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
    let that = this;
    that.cc();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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