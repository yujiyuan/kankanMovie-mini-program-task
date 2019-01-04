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
    reviewDetail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    util.getFilmDetail({
      // 设置电影详情
      id: options.id,
      success: ({ filmDetail }) => {
        that.setData({ filmDetail });
      }
    });
    console.log("options", options);

    this.getReviewDetail(options.review_id, options.id, options.isIndexGetInto);
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

    wx.showActionSheet({
      itemList: ["文字", "音频"],
      success(res) {
        console.log(res.tapIndex);
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
  },
  /**
   * 收藏影评
   */
  onTapCollection() {
    wx.showLoading({ title: "收藏中" });
    const { filmDetail, reviewDetail } = this.data;
    const { id, title, image } = filmDetail;
    const { content, tempFilePath, duration } = reviewDetail;
    console.log(filmDetail, reviewDetail);
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
        duration
      },
      success: response => {
        const { data } = response.data;
        console.log(data);
        // this.setData({ reviewDetail: data[0] })
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
