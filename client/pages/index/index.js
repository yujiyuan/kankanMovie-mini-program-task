// pages/recommend/recommend.js
const app = getApp();
const qcloud = require("../../vendor/wafer2-client-sdk/index");
const config = require("../../config.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hotFilm: {}, //热门电影
    randomViewFilm: {}, //随机热门电影
    reviewDetail: null, //影评详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({ title: '正在登录中' })
    app.checkSession({
      // 获取用户信息
      success: ({ userInfo }) => {
        wx.hideLoading()
        this.setData({ userInfo })
      }
    })
    this.getRandomHotFilm()
  },
  // 刷新页面
  onPullDownRefresh() {
    this.getRandomHotFilm(() => wx.stopPullDownRefresh())
  },
  /**
   * 随机获取热门电影的影评
   */
  getRandomHotFilm(callback) {
    wx.showLoading({
      title: '电影数据加载中'
    })
    qcloud.request({
      url: config.service.getFilmList,
      success: result => {
        const { data } = result

        if (!data.code) {
          const filmList = data.data
          const randomViewFilm =
            filmList.length > 0
              ? filmList[Math.floor(Math.random() * filmList.length)]
              : null
          this.setData({
            randomViewFilm
          })
          randomViewFilm && this.getReviewDetail(randomViewFilm.id, true)
        } else {
          wx.showToast({
            title: '数据加载失败！',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
        callback && callback()
      }
    })
  },
  /**
   *获取影评详情
   */
  getReviewDetail(id, isIndexGetInto) {
    wx.showLoading({ title: '获取影评详情中' })
    console.log(isIndexGetInto)

    qcloud.request({
      url: config.service.getReviewDetail,
      login: true,
      method: 'GET',
      data: { id, isIndexGetInto },
      success: response => {
        const { data } = response.data
        console.log("s",data)
        this.setData({ reviewDetail: data.length >0 ? data[0] : null })
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
  onTapToDetail(event) {
    const { id } = event.currentTarget.dataset
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },
  /**
   * 点击跳转到影评详情页
   */
  onTapToFilmReviewDetail(event) {
    //点击 "XX给你推荐了一部电影" 可跳转至该推荐人对此影片的影评详情页的这个功能是有做的。
    //只是把bind：tap放到了头像上了。。。
    const { id } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/filmReviewDetail/filmReviewDetail?id=${id}&isIndexGetInto=false`
    })
  }
})
