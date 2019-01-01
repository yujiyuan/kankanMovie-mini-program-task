const qcloud = require('../vendor/wafer2-client-sdk/index')
const config = require('../config.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}
const setDate = (date) =>{
  var d = new Date(date)

  var times = `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + Number(d.getMonth() + 1)}-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()} ${d.getHours() > 9 ? d.getHours() : '0' + Number(d.getHours())}:${d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()}:${d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds()}`
  return times
}

const getFilmDetail = ({ id,success, error }) => {
  wx.showLoading({ title: '电影数据加载中' })
  qcloud.request({
    url: config.service.getFilmList,
    success: result => {
      wx.hideLoading()
      const { data } = result

      if (!data.code) {
        const filmDetail = data.data.filter(item => {
          return Number(item.id) === Number(id)
        })[0]
        success && success({ filmDetail});
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
}
module.exports = { formatTime, showBusy, showSuccess, showModel, setDate, getFilmDetail }
