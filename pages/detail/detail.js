// pages/detail/detail.js
let datas = require("../../datas/list-data.js");
const backgroundAudioManager = wx.getBackgroundAudioManager();
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: [],
    index: null,
    isCollected: false,
    isMusicPlay: false,
  },
  // 处理音乐播放
  handleMusicPlay() {
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    })
    console.log("isMusicPlay", isMusicPlay);
    // 控制音乐播放
    let { dataUrl, title } = this.data.detailObj.music;
    backgroundAudioManager.title = title;
    backgroundAudioManager.src = dataUrl;

    if(isMusicPlay) {
      // 播放音乐
      console.log("music 开始播放");
      backgroundAudioManager.play();
    } else {
      console.log("music 暂停");
      backgroundAudioManager.pause();
    }


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


    // 监听音乐是否在播放
  if(appData.data.isPlay && appData.data.pageIndex === index) {
    this.setData({
      isMusicPlay: true
    })
  }

    // 监听音乐播放状态
    backgroundAudioManager.onPlay(() => {
      this.setData({
        isMusicPlay: true
      })
      // 修改全局 app 中音乐的播放状态
      appData.data.isPlay = true;
      appData.data.pageIndex = index;
    });
    
    
    // 监听音乐是否暂停
    backgroundAudioManager.onPause(() => {
      this.setData({
        isMusicPlay: false
      })
      appData.data.isPlay = false;
    })
   
  },

})