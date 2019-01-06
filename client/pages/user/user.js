// pages/user/user.js
const app = getApp();
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
    userInfo: null,
    isCollection: true, //是否展示收藏列表
    collectionReviewsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    wx.showLoading({ title: '正在登录中' })
    app.checkSession({
      // 获取用户信息
      success: ({ userInfo }) => {
        wx.hideLoading()
        this.setData({ userInfo })
      }
    })
    this.getCollectionReviewsList()
  },
  /**
   * 点击切换展示发布和收藏的影评列表
   */
  onTapChange(event){
    const { isCollection } = this.data;
    if (!isCollection){
      this.getCollectionReviewsList()
    }else {
      this.getReviewList()
    }
    this.setData({ isCollection: !isCollection })
  },
  /**
   * 登陆
   */
  onTapLogin(e) {
    wx.showLoading({ title: '正在登录中' })
    app.login({
      success: ({ userInfo }) => {
        wx.hideLoading()
        this.setData({
          userInfo
        })
      }
    })
  },
  /**
   * 获取发布的影评列表
   */
  getReviewList(callback) {
    wx.showLoading({ title: '正在获取已发布列表' })
    qcloud.request({
      url: config.service.getReviewList,
      login: true,
      method: 'GET',
      data: {
        userId: this.data.userInfo.openId
      },
      success: response => {
        const { data } = response.data
        console.log(data)
        this.setData({ collectionReviewsList: data })
        callback && callback()
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  /**
   * 获取收藏的影评列表
   */
  getCollectionReviewsList(callback) {
    wx.showLoading({ title: '正在获取收藏列表' })
    qcloud.request({
      url: config.service.getCollectionReviews,
      login: true,
      method: 'GET',
      success: response => {
        const { data } = response.data
        console.log(data)
        this.setData({ collectionReviewsList: data })
        callback && callback()
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  /**
   * 点击播放语音
   */
  onPlay(event) {
    const { src } = event.currentTarget.dataset
    console.log('event', event, src)
    innerAudioContext.src = src
    innerAudioContext.play(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError(res => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  /**
   * 点击跳转到影评详情页
   */
  onTapToFilmReviewDetail(event) {
   
    const { id,movieid } = event.currentTarget.dataset;
    const newId = movieid ? movieid:id;
    wx.navigateTo({
      url: `/pages/filmReviewDetail/filmReviewDetail?id=${newId}&isIndexGetInto=false`
    })
    
  },
  /**
   * 点击回到首页
   */
  onTapGoBackIndex() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  }
})