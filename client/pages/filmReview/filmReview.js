// pages/filmReview/filmReview.js
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 重新编辑
   */
  onTapAgainEdit() {
    wx.navigateBack({
      delta: 1 // 回退前 delta(默认为1) 页面
    })
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