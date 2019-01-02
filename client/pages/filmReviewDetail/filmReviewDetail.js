// pages/filmReviewDetail/filmReviewDetail.js
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
  data: {
    filmDetail: null,
    reviewDetail: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    util.getFilmDetail({
      // 设置电影详情
      id: options.id,
      success: ({ filmDetail }) => {
        that.setData({ filmDetail })
      }
    })
    console.log('options', options)

    this.getReviewDetail(options.review_id)
  },

  /**
   *
   */
  getReviewDetail(review_id) {
    qcloud.request({
      url: config.service.getReviewDetail,
      login: true,
      method: 'GET',
      data: {
        review_id
      },
      success: response => {
        const { data } = response.data
        console.log(data)
        this.setData({ reviewDetail: data[0] })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 点击进入编辑影评页面
   */
  onTapWrite() {
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
  }
})