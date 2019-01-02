const DB = require("../utils/db.js");

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM `movies`;");
  },
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    //let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl;

    let id = +ctx.request.body.id;
    let content = ctx.request.body.content || null;
    let tempFilePath = ctx.request.body.tempFilePath || null;
    // let audio = ctx.request.body.audio || null
    let userName = ctx.request.body.userName || null;
    // let duration = ctx.request.body.duration || null
    await DB.query(
      `INSERT  INTO reviewList (id, user, userName, avatar, content, tempFilePath) VALUES (${id},
        "${user}",
        "${userName}",
        "${avatar}",
        "${content}",
        "${tempFilePath}")`
    );
    // await DB.query(`UPDATE  movies set user= "${user}", userName=" ${userName}", avatar= "${avatar}", content= "${content}", tempFilePath= "${tempFilePath}" where id = ${id};`)

    ctx.state.data = {};
  },
  //   latestReview: async ctx => {
  //     const id = ctx.request.body.id;
  //     ctx.state.data = await DB.query(
  //       `SELECT TOP 1 * FROM "reviewList" WHERE "id" = ${id} ORDER BY create_time DESC`
  //     );
  //   },

  /**
   * 获取影评列表
   */
  reviewList: async ctx => {
    let { isLatestReview, id } = ctx.request.body;
    console.log("ctx.request.body", ctx.request.body);
    let sql = `SELECT * FROM reviewList WHERE id = "${id}";`;
    if (isLatestReview) {
      sql = `SELECT * FROM reviewList WHERE id = "${id}" ORDER BY create_time DESC LIMIT 1;`;
    }
    ctx.state.data = await DB.query(sql);
  }
};
