const DB = require("../utils/db.js");

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query('SELECT * FROM `movies` ;')
  },
  detail: async ctx => {
    let {  id } = ctx.request.query
    ctx.state.data = await DB.query(`SELECT * FROM movies  WHERE id = "${id}";`)
  },
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let userName = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let id = +ctx.request.body.id
    let content = ctx.request.body.content || null
    let tempFilePath = ctx.request.body.tempFilePath || null
    let duration = ctx.request.body.duration || 0
    // let audio = ctx.request.body.audio || null
    // let userName = ctx.request.body.userName || null;
    // let duration = ctx.request.body.duration || null
    try {
      await DB.query(
        `INSERT  INTO reviewList (id, user, userName, avatar, content, tempFilePath,duration) VALUES (${id},
        "${user}",
        "${userName}",
        "${avatar}",
        "${content}",
        "${tempFilePath}",
        "${duration}")`
      )
      // await DB.query('INSERT  INTO reviewList comment(id, user, userName, avatar, content, tempFilePath) VALUES ("","","","","","")', [id, user, userName, avatar, content, tempFilePath]);
      ctx.state.data = {
        status: true
      }
    } catch (error) {
      ctx.state.data = { msg: error, status: false }
    }

    // ctx.state.data = {};
  },

  /**
   * 获取影评列表
   */
  reviewList: async ctx => {
    let userId = ctx.state.$wxInfo.userinfo.openId
    let { isLatestReview, id } = ctx.request.query
    let sql = `SELECT * FROM reviewList WHERE id = "${id}";`
    if (!!isLatestReview) {
      sql = `SELECT * FROM reviewList WHERE id = "${id}" ORDER BY create_time DESC LIMIT 1;`
    }
    if (userId){
      sql = `SELECT * FROM reviewList WHERE user = "${userId}" ;`
    }
    ctx.state.data = await DB.query(sql)
  },

  /**
   * 获取影评详情
   */
  reviewDetail: async ctx => {
  
    let { review_id, isIndexGetInto, id } = ctx.request.query
    if (isIndexGetInto !== "false") {
      ctx.state.data = await DB.query(
        `SELECT * FROM reviewList WHERE id = "${id}"   ORDER BY create_time DESC LIMIT 1;`
      )
    } else {
      ctx.state.data = await DB.query(
        `SELECT * FROM reviewList WHERE review_id = "${review_id}";`
      )
    }
  },

  /**
   * 收藏影评
   */
  collectionReviews: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let userName = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movie_id = ctx.request.body.movie_id
    let image = ctx.request.body.image
    let title = ctx.request.body.title
    let content = ctx.request.body.content || null
    let tempFilePath = ctx.request.body.tempFilePath || null
    let duration = ctx.request.body.duration || 0
    try {
      await DB.query(
        'INSERT IGNORE  INTO collectionReviews (movie_id,title,image, userName,  content, user, tempFilePath ,avatar,duration) VALUES (?,?,?,?,?,?,?,?,?)',
        [
          movie_id,
          title,
          image,
          userName,
          content,
          user,
          tempFilePath,
          avatar,
          duration
        ]
      )
      ctx.state.data = {
        status: true
      }
    } catch (error) {
      ctx.state.data = error
    }
  },
  /**
   * 获取影评
   */
  collectionList: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    ctx.state.data = await DB.query(`SELECT * FROM collectionReviews WHERE  user = "${user}" ;`)
  },
  /**
   * 判断用户是否已经评论过该电影
   */
  isCollection:async ctx=>{
    
    let id = ctx.request.query.id;
    let user = ctx.state.$wxInfo.userinfo.openId;
    ctx.state.data = await DB.query(
      `SELECT * FROM reviewList WHERE id = "${id}" AND user = "${user}" ;`
    )
  }
}
