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
module.exports = { formatTime, showBusy, showSuccess, showModel, setDate }
