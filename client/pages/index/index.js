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
    randomViewFilm: {} //随机热门电影
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({ title: "正在登录中" });
    app.checkSession({
      // 获取用户信息
      success: ({ userInfo }) => {
        wx.hideLoading();
        this.setData({ userInfo });
      }
    });
    this.getRandomHotFilm();
  },
  // 刷新页面
  onPullDownRefresh() {
    this.getRandomHotFilm(() => wx.stopPullDownRefresh());
  },
  /**
   * 随机获取热门电影的影评
   */
  getRandomHotFilm(callback) {
    wx.showLoading({
      title: "电影数据加载中"
    });
    qcloud.request({
      url: config.service.getFilmList,
      success: result => {
        const { data } = result;

        if (!data.code) {
          const filmList = data.data;
          const randomViewFilm =
            filmList[Math.floor(Math.random() * filmList.length)];
          console.log("item", randomViewFilm);
          this.setData({
            randomViewFilm
          });
        } else {
          wx.showToast({
            title: "数据加载失败！",
            icon: "none"
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: "数据加载失败",
          icon: "none"
        });
      },
      complete: () => {
        wx.hideLoading();
        callback && callback();
      }
    });
  },
  /**
   * 点击跳转到热门页面
   */
  onTapToPopular() {
    wx.navigateTo({
      url: "/pages/filmList/filmList"
    });
  },
  /**
   * 点击跳转到我的页面
   */
  onTapToUser() {
    wx.navigateTo({
      url: "/pages/user/user"
    });
  },
  /**
   * 点击跳转到详情页
   */
  onTapToDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  },
  /**
   * 点击跳转到影评详情页
   */
  onTapToFilmReviewDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/filmReviewDetail/filmReviewDetail?id=${id}&isIndexGetInto=false`
    });
  }
});
