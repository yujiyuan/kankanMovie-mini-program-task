const DB = require("../utils/db.js");

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM `movies`;");
  },
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let userName = ctx.state.$wxInfo.userinfo.nickName;
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl;

    let id = +ctx.request.body.id;
    let content = ctx.request.body.content || null;
    let tempFilePath = ctx.request.body.tempFilePath || null;
    let duration = ctx.request.body.duration || 0;
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
      );
      // await DB.query('INSERT  INTO reviewList comment(id, user, userName, avatar, content, tempFilePath) VALUES ("","","","","","")', [id, user, userName, avatar, content, tempFilePath]);
      ctx.state.data = {
        status: true
      };
    } catch (error) {
      ctx.state.data = { msg: error, status: false };
    }

    // ctx.state.data = {};
  },

  /**
   * 获取影评列表
   */
  reviewList: async ctx => {
    let { isLatestReview, id } = ctx.request.query;
    let sql = `SELECT * FROM reviewList WHERE id = "${id}";`;
    if (!!isLatestReview) {
      sql = `SELECT * FROM reviewList WHERE id = "${id}" ORDER BY create_time DESC LIMIT 1;`;
    }
    ctx.state.data = await DB.query(sql);
  },

  /**
   * 获取影评详情
   */
  reviewDetail: async ctx => {
    let { review_id } = ctx.request.query;
    ctx.state.data = await DB.query(
      `SELECT * FROM reviewList WHERE review_id = "${review_id}";`
    );
  },

  /**
   * 收藏影评
   */
  collectionReviews: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let userName = ctx.state.$wxInfo.userinfo.nickName;
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl;

    let movie_id = +ctx.request.body.movie_id;
    let image = +ctx.request.body.image;
    let title = +ctx.request.body.title;
    let content = ctx.request.body.content || null;
    let tempFilePath = ctx.request.body.tempFilePath || null;
    ctx.state.data = await DB.query(
      'INSERT  INTO collectionReviews (movie_id,title,image, userName,  content, user, tempFilePath ,avatar) VALUES ("","","","","","","","")',
      [movie_id, title, image, userName, content, user, tempFilePath, avatar]
    );
  }
};
