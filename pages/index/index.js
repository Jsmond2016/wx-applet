// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "小林子呀~",
    userInfo: null,
  },
  handleParent() {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  handleChild() {
   //
  },
  // 用户授权回调
  handleGetUserInfo(data) {
    console.log('用户授权后回调', data);
    if(data.detail.rowData) {
      this.getUserInfo();
    }
  },
  // 获取用户信息
  getUserInfo() {
    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        this.setData({
          message: data.userInfo.nickName,
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log('fail');
      }
    })
  },
  // 获取用户是否已授权
  getUserSetting() {
    wx.getSetting({
      success: (data) => {
        console.log('授权信息', data);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户登录信息
    this.getUserInfo();
    this.getUserSetting();
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