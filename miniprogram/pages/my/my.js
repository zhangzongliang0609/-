// pages/my/my.js
var app = getApp(); // 获取全局变量
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 默认没有授权登录
  },
  bindGetUserInfo: function(e) { // 点击 授权按钮
    if (e.detail.userInfo) { //用户按了允许授权按钮
      var that = this;
      let yh = e.detail.userInfo
      console.log(yh); // 获取到用户的信息了
      wx.setStorage({
        key: "yh",
        data: yh
      })
      wx.getSetting({ // 查看是否授权
        success: function (res) {
          //res.authSetting['scope.userInfo'] 的值是true，表示scope.userInfo这个权限已经授权。
          //res.authSetting['scope.userInfo'] 的值是false ，表示scope.userInfo这个权限没有授权。
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                // 用户已经授权过,不需要显示授权页面,所以不需要改变isLogin的值
                // 根据自己的需求有其他操作再补充
                // 这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                // console.log(res.userInfo)
                wx.login({
                  success: res => {
                    // 获取到用户的 code 之后：res.code
                    console.log("用户的code:" + res.code);
                    // 可以传给后台，再经过解析获取用户的 openid
                    // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                    wx.request({
                      // 自行补上自己的 APPID 和 SECRET
                      // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2770d94707658e95&secret=f2f2fbc5b275b3038d5bd164a81e1e9a&js_code=' + res.code + '&grant_type=authorization_code',
                      success: res => {
                        // 获取到用户的 openid
                      //  console.log("用户的openid:" + res.data.openid);
                        // 把openid存入本地缓存
                        wx.setStorageSync('openid', res.data.openid);

                      }
                    });
                  }
                });
              }
            });
          }
        }
      })
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.onLoad();
      setTimeout(function() {
        wx.hideLoading()
        wx.switchTab({
          url: '../reg/reg'
        })
      }, 1800)
    } else { //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法使用更多功能。',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isLogin 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
   
  },
  
  /*##############################################*/
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