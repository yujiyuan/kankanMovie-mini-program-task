// pages/filmReview/filmReview.js
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
  data: { userInfo:null,reviewDetail: {}, filmDetail: {} },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    app.checkSession({
      // 获取用户信息
      success: ({ userInfo }) => {
        console.log('sss', userInfo)
        this.setData({ userInfo })
      }
    })
    util.getFilmDetail({
      // 设置电影详情
      id: options.id,
      success: ({ filmDetail }) => {
        console.log('sss', filmDetail)
        that.setData({ filmDetail })
      }
    })
    this.getReviewDetail()
  },
  /**
   * 预览影评
   */
  getReviewDetail() {

    wx.getStorage({
      key: 'reviewDetail',
      success: res => {
        console.log(res.data)
        this.setData({ reviewDetail: res.data })
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
    wx.navigateBack()
  },
  /**
   * 发布影评
   */
  onTapRelease() {
    // wx.navigateTo({
    //   url: `/pages/filmReviewList/filmReviewList?id=${this.data.filmDetail.id}`
    // });
    const { userInfo, reviewDetail, filmDetail } = this.data
    const { nickName, id, content, tempFilePath } = reviewDetail;
    console.log('ss', reviewDetail)

    wx.showLoading({ title: '正在发表评论' })
    qcloud.request({
      url: config.service.uploadReview,
      login: true,
      method: 'POST',
      data: {
        id: id,
        content: content,
        userName: nickName,
        tempFilePath
      },
      success: result => {
        wx.hideLoading()
        wx.navigateTo({
          url: `/pages/filmReviewList/filmReviewList?id=${filmDetail.id}`
        })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '发表评论失败'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})
 