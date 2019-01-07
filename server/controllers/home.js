const DB = require("../utils/db.js");

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM `movies` ;");
  },
  detail: async ctx => {
    let { id } = ctx.request.query;
    ctx.state.data = await DB.query(
      `SELECT * FROM movies  WHERE id = "${id}";`
    );
  },
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let userName = ctx.state.$wxInfo.userinfo.nickName;
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl;

    let id = +ctx.request.body.id;
    let content = ctx.request.body.content || null;
    let tempFilePath = ctx.request.body.tempFilePath || null;
    let duration = ctx.request.body.duration || 0;
    let image = ctx.request.body.image || null;
    let title = ctx.request.body.title || null;
    // let duration = ctx.request.body.duration || null
    try {
      await DB.query(`INSERT  INTO reviewList (id, user, userName, avatar, content, tempFilePath,duration,title,image) VALUES (${id},
        "${user}",
        "${userName}",
        "${avatar}",
        "${content}",
        "${tempFilePath}",
        "${duration}",
        "${title}",
        "${image}")`);
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
    // let userId = ctx.state.$wxInfo.userinfo.openId
    /**
     * 这边本意是根据用户中心页面传进来的用户ID来获取用户发布的影评的。前面有点懵，瞎改了。。。。
     */
    let { isLatestReview, id, userId } = ctx.request.query;
    let sql = `SELECT * FROM reviewList WHERE id = "${id}";`;
    if (!!isLatestReview) {
      sql = `SELECT * FROM reviewList WHERE id = "${id}" ORDER BY create_time DESC LIMIT 1;`;
    }
    if (userId) {
      sql = `SELECT * FROM reviewList WHERE user = "${userId}" ;`;
    }
    ctx.state.data = await DB.query(sql);
  },

  /**
   * 获取影评详情
   */
  reviewDetail: async ctx => {
    let { review_id, isIndexGetInto, id } = ctx.request.query;
    if (isIndexGetInto === "true") {
      ctx.state.data = await DB.query(
        `SELECT * FROM reviewList WHERE id = "${id}"   ORDER BY create_time DESC LIMIT 1;`
      );
    } else {
      ctx.state.data = await DB.query(
        `SELECT * FROM reviewList WHERE review_id = "${review_id}";`
      );
    }
  },

  /**
   * 收藏影评
   */
  collectionReviews: async ctx => {
    // let user = ctx.state.$wxInfo.userinfo.openId
    // let userName = ctx.state.$wxInfo.userinfo.nickName
    // let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movie_id = ctx.request.body.movie_id;
    let image = ctx.request.body.image;
    let title = ctx.request.body.title;
    let content = ctx.request.body.content || null;
    let tempFilePath = ctx.request.body.tempFilePath || null;
    let duration = ctx.request.body.duration || 0;
    let user = ctx.request.body.openId || "";
    let avatar = ctx.request.body.avatar || "";
    let userName = ctx.request.body.userName || "";
    let reviewUserId = ctx.request.body.reviewUserId || "";
    try {
      await DB.query(
        "INSERT IGNORE  INTO collectionReviews (movie_id,title,image, userName,  content, user, tempFilePath ,avatar,duration,review_user_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          movie_id,
          title,
          image,
          userName,
          content,
          user,
          tempFilePath,
          avatar,
          duration,
          reviewUserId
        ]
      );
      ctx.state.data = {
        status: true
      };
    } catch (error) {
      ctx.state.data = error;
    }
  },
  /**
   * 获取影评
   */
  collectionList: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    ctx.state.data = await DB.query(
      `SELECT * FROM collectionReviews WHERE  user = "${user}" ;`
    );
  },
  /**
   * 判断用户是否已经评论过该电影
   */
  isReview: async ctx => {
    let id = ctx.request.query.id;
    let user = ctx.state.$wxInfo.userinfo.openId;
    ctx.state.data = await DB.query(
      `SELECT * FROM reviewList WHERE id = "${id}" AND user = "${user}" ;`
    );
  },
  /**
   * 判断用户是否已经收藏过该影评
   */
  isCollectionReview: async ctx => {
    let movie_id = ctx.request.query.movie_id;
    ctx.state.data = await DB.query(
      `SELECT * FROM collectionReviews WHERE movie_id = "${movie_id}"  ;`
    );
  },
  /**
   * 删除收藏的影评
   */
  deleteCollectionReview: async ctx => {
    let id = ctx.request.body.movie_id;
    let reviewUserId = ctx.request.body.reviewUserId;
    let openId = ctx.request.body.openId;
    try {
      await DB.query(
        `DELETE FROM collectionReviews WHERE movie_id = "${id}" AND  review_user_id="${reviewUserId}" AND user="${openId}" ;`
      );
      ctx.state.data = {
        status: true
      };
    } catch (error) {
      ctx.state.data = error;
    }
    // ctx.state.data = await DB.query(
    //   'DELETE  INTO  collectionReviews (movie_id,user,review_user_id) VALUES (?,?,?)',
    //   [id, openId, reviewUserId]
    // )
  }
};
