// pages/filmReviewDetail/filmReviewDetail.js
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
  data: {
    filmDetail: null,
    reviewDetail: null,
    isCancel: false,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    app.checkSession({
      // 获取用户信息
      success: ({ userInfo }) => {
        wx.hideLoading();
        this.setData({ userInfo });
      }
    });
    util.getFilmDetail({
      // 设置电影详情
      id: options.id,
      success: ({ filmDetail }) => {
        that.setData({ filmDetail });
      }
    });
    console.log("options", options);

    this.getReviewDetail(options.review_id, options.id, options.isIndexGetInto);
    this.isCollectionReview(options.id);
  },
  /**
   * 播放录音
   */
  onPlay() {
    innerAudioContext.src = this.data.reviewDetail.tempFilePath;
    innerAudioContext.play(() => {
      console.log("开始播放");
    });
    innerAudioContext.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  },
  /**
   *获取影评详情
   */
  getReviewDetail(review_id, id, isIndexGetInto) {
    wx.showLoading({ title: "获取影评详情中" });
    console.log(isIndexGetInto);
    const data =
      isIndexGetInto === "false"
        ? { id, isIndexGetInto: true }
        : { review_id, isIndexGetInto: false };
    qcloud.request({
      url: config.service.getReviewDetail,
      login: true,
      method: "GET",
      data: data,
      success: response => {
        const { data } = response.data;
        console.log(data);
        this.setData({ reviewDetail: data[0] });
      },
      fail: err => {
        console.log(err);
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },
  /**
   * 点击进入编辑影评页面
   */
  onTapWrite(event) {
    const { id } = event.currentTarget.dataset;
    wx.showLoading({ title: "数据加载中" });
    qcloud.request({
      url: config.service.isCollection,
      login: true,
      data: {
        id
      },
      success: result => {
        wx.hideLoading();
        const { data } = result;

        if (!data.code) {
          if (data.data.length === 0) {
            wx.showActionSheet({
              itemList: ["文字", "音频"],
              success(res) {
                wx.navigateTo({
                  url: `/pages/editFilmReview/editFilmReview?id=${id}&tapIndex=${
                    res.tapIndex
                  }`
                });
              },
              fail(res) {
                console.log(res.errMsg);
              }
            });
          } else {
            wx.navigateTo({
              url: `/pages/filmReviewDetail/filmReviewDetail?id=${id}&review_id=${
                data.data[0].review_id
              }&isIndexGetInto=false`
            });
          }
        } else {
          wx.showToast({ title: "数据加载失败", icon: "none" });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({ title: "数据加载失败", icon: "none" });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },
  /**
   * 收藏影评
   */
  onTapCollection() {
    wx.showLoading({ title: "收藏中" });
    const { filmDetail, reviewDetail, isCancel, userInfo } = this.data;
    const { id, title, image } = filmDetail;
    const { content, tempFilePath, duration, user } = reviewDetail;
    const { nickName, avatarUrl, openId } = userInfo;
    console.log(filmDetail, reviewDetail);
    if (!isCancel) {
      qcloud.request({
        url: config.service.addCollectionReviews,
        login: true,
        method: "POST",
        data: {
          movie_id: id,
          title,
          image,
          content,
          tempFilePath,
          duration,
          reviewUserId: user,
          userName: nickName,
          avatar: avatarUrl,
          openId
        },
        success: response => {
          const { data } = response.data;
          console.log(data);
          wx.showLoading({ title: "收藏成功" });
          this.setData({ isCancel: true });
          setTimeout(function() {
            wx.hideLoading();
          }, 2000);
        },
        fail: err => {
          console.log(err);
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    } else {
      qcloud.request({
        url: config.service.deleteCollectionReview,
        login: true,
        method: "POST",
        data: {
          movie_id: id,
          reviewUserId: user,
          openId
        },
        success: response => {
          const { data } = response.data;
          console.log(data);
          if (data.status) {
            this.setData({ isCancel: false });
          }
        },
        fail: err => {
          console.log(err);
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    }
  },
  isCollectionReview(id) {
    qcloud.request({
      url: config.service.isCollectionReview,
      login: true,
      method: "GET",
      data: {
        movie_id: id
      },
      success: response => {
        const { data } = response.data;
        console.log(data);
        this.setData({ isCancel: data.length > 0 });
      },
      fail: err => {
        console.log(err);
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  }
});
