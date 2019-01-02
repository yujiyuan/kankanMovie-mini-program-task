/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = "https://8ycdipys.qcloud.la";

var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    // 拉取用户信息
    user: `${host}/weapp/user`,

    // 获取电影列表
    getFilmList: `${host}/weapp/filmList`,

    // 上传影评
    uploadReview: `${host}/weapp/uploadReview`,

    // 获取电影列表
    getReviewList: `${host}/weapp/getReviewList`,

    //获取单个影评详情 
    getReviewDetail: `${host}/weapp/getReviewDetail`
  }
};

module.exports = config;
