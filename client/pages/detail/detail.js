// pages/detail/detail.js
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
   * 点击进入编辑影评页面
   */
  onTapAddFilmReview() {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        console.log(res.tapIndex)
        wx.navigateTo({
          url: '/pages/editFilmReview/editFilmReview'
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 点击进入影评列表
   */
  onTapFilmReviewList() {
    wx.navigateTo({
      url: '/pages/filmReviewList/filmReviewList'
    })
  }
})