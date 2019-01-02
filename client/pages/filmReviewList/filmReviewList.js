// pages/filmReviewList/filmReviewList.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')
const util = require('../../utils/util')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: { reviewList:[]},

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
        that.setData({ id: options.id,filmDetail })
      }
    });
    this.getReviewList(options.id)
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    
    const {id} = this.data;
    // 页面相关事件处理函数--监听用户下拉动作
    this.getReviewList(id,() => {
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 获取影评列表
   */
  getReviewList(id,callback) {
    qcloud.request({
      url: config.service.getReviewList,
      login: true,
      method: 'GET',
      data: {
        id
      },
      success: response => {
        const { data } = response.data;
        console.log(data)
        // let list = data.map(item => {
        //   let create_time = utils.setDate(item.create_time);
        //   return {
        //     ...item,
        //     create_time
        //   };
        // });
        // console.log(list);
        this.setData({ reviewList:data })
        callback && callback()
      },
      fail: err => {
        console.log(err)
      }
    })
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
  onTapToFilmReviewDetail(event) {
    console.log(event);
    const { id, user, reviewid } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/filmReviewDetail/filmReviewDetail?id=${id}&review_id=${reviewid}&user=${user}`
    })
  }
});
