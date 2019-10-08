// pages/detail/detail.js
let datas = require("../../datas/list-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: [],
    index: null,
    isCollected: false,
  },

  handleCollection() {
    console.log('collect');
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    })
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    })

    // 缓存数据到本地
    let { index } = this.data;
   // let obj = {};
    let obj = wx.getStorage({
      key: 'isCollected',
      success: function(datas) {
        let obj = datas.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('缓存成功');
          }
        })
      },
    })
    // obj.index = isCollected; 注意，这里使用 obj.index 和 obj[index]区别，前者被识别为 字符串，后者为 变量
    //obj[index] = isCollected;
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      detailObj: datas.list_data[index],
      index,
    });

    // 根据本地缓存的数据判断是否收藏当前的文章
    let detailStorage = wx.getStorageSync("isCollected");
    console.log(detailStorage);

    // 在缓存中初始化空对象
    if(!detailStorage){
      wx.setStorageSync('isCollected', {})
    }

    //判断用户是否收藏
    if(detailStorage[index]){
      this.setData({
        isCollected: true
      })
    }
  },

})