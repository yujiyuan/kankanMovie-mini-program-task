const DB = require("../utils/db.js");

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM `movies`;");
  },
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let userName = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl;

    let id = +ctx.request.body.id;
    let content = ctx.request.body.content || null;
    let tempFilePath = ctx.request.body.tempFilePath || null;
    // let audio = ctx.request.body.audio || null
    // let userName = ctx.request.body.userName || null;
    // let duration = ctx.request.body.duration || null
    try {
      await DB.query(
        `INSERT  INTO reviewList (id, user, userName, avatar, content, tempFilePath) VALUES (${id},
        "${user}",
        "${userName}",
        "${avatar}",
        "${content}",
        "${tempFilePath}")`
      );
      // await DB.query('INSERT  INTO reviewList comment(id, user, userName, avatar, content, tempFilePath) VALUES ("","","","","","")', [id, user, userName, avatar, content, tempFilePath]);
      ctx.state.data = {
        status:true
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
    let { isLatestReview, id } = ctx.request.query;
    let sql = `SELECT * FROM reviewList WHERE id = "${id}";`;
    if (isLatestReview) {
      sql = `SELECT * FROM reviewList WHERE id = "${id}" ORDER BY create_time DESC LIMIT 1;`;
    }
    ctx.state.data = await DB.query(sql);
  },

  /**
   * 获取影评详情
   */
  reviewDetail:async ctx => {
    let { review_id } = ctx.request.query;
    ctx.state.data = await DB.query(`SELECT * FROM reviewList WHERE review_id = "${review_id}";`)
  }

};
