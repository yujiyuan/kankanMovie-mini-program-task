// pages/filmList/filmList.js
const qcloud = require("../../vendor/wafer2-client-sdk/index");
const config = require("../../config.js");
const utils = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    this.getFilmList(() => {
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFilmList();
  },
  /**
   * 获取电影列表
   */
  getFilmList(callback) {
    qcloud.request({
      url: config.service.getFilmList,
      success: response => {
        const { data } = response.data;
        console.log(data);
        let list = data.map(item => {
          let create_time = utils.setDate(item.create_time);
          return {
            ...item,
            create_time
          };
        });
        console.log(list);
        this.setData({ list });
        callback && callback();
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  /**
   * 点击前往详情页
   */
  onTapToFilmDetail() {
    wx.navigateTo({
      url: "/pages/detail/detail"
    });
  }
});
