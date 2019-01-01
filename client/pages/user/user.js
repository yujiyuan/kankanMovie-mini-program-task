// pages/user/user.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    app.checkSession({
      // 获取用户信息
      success: ({ userInfo }) => {
        console.log('sss', userInfo)
        this.setData({ userInfo })
      }
    })
  },
  /**
   * 登陆
   */
  onTapLogin(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    app.login({
      success: ({ userInfo }) => {
        console.log('sss', userInfo)
        this.setData({
          userInfo
        })
      }
    })
  },
  /**
   * 点击播放语音
   */
  play() {
    let audioContext = wx.createInnerAudioContext()
    audioContext.src =
      'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    audioContext.play()

    audioContext.onPlay(() => {
      audioContext.onTimeUpdate(res => {
        console.log('audioContext.duration', audioContext.duration.toFixed(0))
      })
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