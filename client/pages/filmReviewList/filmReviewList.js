// pages/filmReviewList/filmReviewList.js
const util = require("../../utils/util");
const qcloud = require("../../vendor/wafer2-client-sdk/index");
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    util.getFilmDetail({
      // 设置电影详情
      id: options.id,
      success: ({ filmDetail }) => {
        console.log("sss", filmDetail);
        that.setData({ filmDetail });
      }
    });
    this.getReviewList();
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    this.getReviewList(() => {
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 获取影评列表
   */
  getReviewList(callback) {
    qcloud.request({
      url: config.service.getReviewList,
      success: response => {
        const { data } = response.data;
        console.log(data);
        // let list = data.map(item => {
        //   let create_time = utils.setDate(item.create_time);
        //   return {
        //     ...item,
        //     create_time
        //   };
        // });
        // console.log(list);
        // this.setData({ list });
        callback && callback();
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  /**
   * 回到首页
   */
  goBackIndex() {
    wx.navigateTo({
      url: "/pages/index/index"
    });
  },

  /**
   * 前往影评详情页
   */
  onTapToFilmReviewDetail() {
    wx.navigateTo({
      url: "/pages/filmReviewDetail/filmReviewDetail"
    });
  }
});
