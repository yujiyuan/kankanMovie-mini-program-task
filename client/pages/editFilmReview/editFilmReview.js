// pages/editFilmReview/editFilmReview.js

const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isReview: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 开始录音
   */
  start: function() {
    const options = {
      duration: 15000, //指定录音的时长，单位 ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50 //指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
      wx.showToast({
        title: '正在录音...',
        icon: 'none',
        duration: 15000
      })
    })
    //错误回调
    recorderManager.onError(res => {
      console.log(res)
    })
  },

  /**
   * 停止录音
   */
  stop: function() {
    recorderManager.stop()
    recorderManager.onStop(res => {
      this.tempFilePath = res.tempFilePath
      console.log('停止录音', res.tempFilePath)
      wx.hideToast()
      const { tempFilePath } = res
    })
  },

  /**
   * 前往影评预览页
   */
  onTapToFilmReview(){
    wx.navigateTo({
      url: '/pages/filmReview/filmReview',
    })
  }
})