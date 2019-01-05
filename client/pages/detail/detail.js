// pages/detail/detail.js
const qcloud = require("../../vendor/wafer2-client-sdk/index");
const config = require("../../config.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    filmDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.getFilmDetail(options.id);
  },
  /**
   * 获取电影详情
   */
  getFilmDetail(id) {
    wx.showLoading({ title: "电影数据加载中" });
    qcloud.request({
      url: config.service.getFilmDetail,
      login: true,
      data:{id},
      success: result => {
        wx.hideLoading()
        const { data } = result

        if (!data.code) {
          // const filmDetail = data.data.filter(item => {
          //   return Number(item.id) === Number(id)
          // })[0]
          this.setData({ filmDetail:data.data[0] })
          console.log('filmDetail', data)
        } else {
          wx.showToast({ title: '电影数据加载失败', icon: 'none' })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '电影数据加载失败', icon: 'none' })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  /**
   * 点击进入编辑影评页面
   */
  onTapAddFilmReview(event) {
    const { id } = event.currentTarget.dataset;
    wx.showLoading({ title: "数据加载中" });
    qcloud.request({
      url: config.service.isCollection,
      login: true,
      data: {
        id
      },
      success: result => {
        wx.hideLoading()
        const { data } = result

        if (!data.code) {
          if(data.data.length  === 0) {
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
          }else {
            wx.navigateTo({
              url: `/pages/filmReviewDetail/filmReviewDetail?id=${id}&review_id=${
                data.data[0].review_id
              }&isIndexGetInto=false`
            })
          }
        } else {
          wx.showToast({ title: '数据加载失败', icon: 'none' })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '数据加载失败', icon: 'none' })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
    
  },
  /**
   * 点击进入影评列表
   */
  onTapFilmReviewList(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/filmReviewList/filmReviewList?id=${id}` });
  }
});
