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
    tempFilePath: "" //留言的录音地址
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
      console.log("停止录音", res.tempFilePath);
      wx.hideToast();
      const { tempFilePath } = res;
      this.setData({ tempFilePath });
    });
  },

  /**
   * 上传影评，并前往影评预览页
   */
  onTapToFilmReview(event) {
    //todo:这边不知道为什么会发起两次请求。login和uploadReview各两次
    const { userInfo, tempFilePath, filmDetail } = this.data;
    const { nickName } = userInfo;
    console.log("content", event);
    // wx.showLoading({
    //   title: "正在发表评论"
    // });
    // qcloud.request({
    //   url: config.service.uploadReview,
    //   login: true,
    //   method: "PUT",
    //   data: {
    //     id: filmDetail.id,
    //     avatar: filmDetail.avatar,
    //     user: filmDetail.user,
    //     content: event.detail.value.textarea,
    //     userName: nickName,
    //     tempFilePath
    //   },
    //   success: result => {
    //     wx.hideLoading();
    //     wx.navigateTo({
    //       url: `/pages/filmReview/filmReview?id=${filmDetail.id}`
    //     });
    //   },
    //   fail: () => {
    //     wx.hideLoading();
    //     wx.showToast({
    //       icon: "none",
    //       title: "发表评论失败"
    //     });
    //   },
    //   complete: () => {
    //     wx.hideLoading();
    //   }
    // });
    try {
          wx.setStorage({
            key: 'reviewDetail',
            data: {
              id: filmDetail.id,
              content: event.detail.value.textarea,
              userName: nickName,
              tempFilePath
            }
          })
              wx.navigateTo({
                url: `/pages/filmReview/filmReview?id=${filmDetail.id}`
              });
        } catch (error) {
      console.log(error)
    }

  }
});
