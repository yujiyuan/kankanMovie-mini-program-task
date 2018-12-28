// pages/filmReviewList/filmReviewList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 回到首页
   */
  goBackIndex() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  /**
   * 前往影评详情页
   */
  onTapToFilmReviewDetail(){
    wx.navigateTo({
      url: '/pages/filmReviewDetail/filmReviewDetail'
    })
  }
})