// pages/editFilmReview/editFilmReview.js
const app = getApp();
const qcloud = require("../../vendor/wafer2-client-sdk/index");
const config = require("../../config.js");
const util = require("../../utils/util");
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    filmDetail: {},
    userInfo: null,
    tapIndex: 0,
    tempFilePath: "",
    duration: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    util.getFilmDetail({
      // 设置电影详情
      id: options.id,
      success: ({ filmDetail }) => {
        console.log("sss", filmDetail);
        that.setData({ filmDetail });
      }
    });
    this.setData({
      tapIndex: Number(options.tapIndex)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    app.checkSession({
      // 获取用户信息
      success: ({ userInfo }) => {
        console.log("sss", userInfo);
        this.setData({ userInfo });
      }
    });
  },

  /**
   * 开始录音
   */
  start: function() {
    const options = {
      duration: 15000, //指定录音的时长，单位 ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: "mp3", //音频格式，有效值 aac/mp3
      frameSize: 50 //指定帧大小，单位 KB
    };
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log("recorder start");
      wx.showToast({
        title: "正在录音...",
        icon: "none",
        duration: 15000
      });
    });
    //错误回调
    recorderManager.onError(res => {
      console.log(res);
    });
  },

  /**
   * 停止录音
   */
  stop: function() {
    recorderManager.stop();
    recorderManager.onStop(res => {
      this.tempFilePath = res.tempFilePath;
      console.log("停止录音", res);
      wx.hideToast();
      const { tempFilePath, duration } = res;
      innerAudioContext.src = tempFilePath;

      this.setData({ tempFilePath, duration: Math.round(duration / 1000) });
    });
  },

  longTap() {
    console.log("longTap....");
  },
  /**
   * 播放录音
   */
  onPlay() {
    innerAudioContext.src = this.data.tempFilePath;
    innerAudioContext.play(() => {
      console.log("开始播放");
    });
    innerAudioContext.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  },
  /**
   * 上传影评，并前往影评预览页
   */
  onTapToFilmReview(event) {
    //todo:这边不知道为什么会发起两次请求。login和uploadReview各两次
    //关于这个发起两次请求的问题好象是因为后台报错导致。不使用接口的话不会发起请求两次了。
    //另外关于雷同的问题，前两天有人在github上fock了我的这个项目，不知道是不是这个原因。。。
    const { userInfo, tempFilePath, filmDetail, duration } = this.data;
    const { nickName } = userInfo;
    console.log("content", event);
    try {
      wx.setStorage({
        key: "reviewDetail",
        data: {
          id: filmDetail.id,
          content: event.detail.value.textarea,
          userName: nickName,
          tempFilePath,
          duration
        }
      });
      wx.navigateTo({
        url: `/pages/filmReview/filmReview?id=${filmDetail.id}`
      });
    } catch (error) {
      console.log(error);
    }
  }
});
