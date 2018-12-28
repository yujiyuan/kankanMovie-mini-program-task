// pages/recommend/recommend.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require("../../config.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  
  /**
   * 点击跳转到热门页面
   */
  onTapToPopular() {
    wx.navigateTo({
      url: '/pages/filmList/filmList'
    })
  },
  /**
   * 点击跳转到我的页面
   */
  onTapToUser() {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },
  /**
   * 点击跳转到详情页
   */
  onTapToDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  },
  /**
   * 点击跳转到影评详情页
   */
  onTapToFilmReviewDetail() {
    wx.navigateTo({
      url: '/pages/filmReviewDetail/filmReviewDetail'
    })
  }
})