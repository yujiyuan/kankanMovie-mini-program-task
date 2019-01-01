// pages/filmReview/filmReview.js
const app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')
const util = require('../../utils/util')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: { filmDetail: {},},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    util.getFilmDetail({ // 设置电影详情
      id: options.id,
      success: ({ filmDetail }) => {
        console.log('sss', filmDetail)
        that.setData({ filmDetail })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 重新编辑
   */
  onTapAgainEdit() {
    console.log("ss");
    wx.navigateBack()
  },
  /**
   * 发布影评
   */
  onTapRelease(){
    wx.navigateTo({
      url: '/pages/filmReviewList/filmReviewList',
    })
  }
})