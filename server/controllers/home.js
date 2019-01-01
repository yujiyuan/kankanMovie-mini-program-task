const DB = require("../utils/db.js");

module.exports = {
    list: async ctx => {
        ctx.state.data = await DB.query('SELECT * FROM `movies`;')
    },
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        //let username = ctx.state.$wxInfo.userinfo.nickName
        let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

        let id = +ctx.request.body.id
        let content = ctx.request.body.content || null
        let tempFilePath = ctx.request.body.tempFilePath || null
        // let audio = ctx.request.body.audio || null
        let userName = ctx.request.body.userName || null
        // let duration = ctx.request.body.duration || null
        // await DB.query(
        //   'REPLACE  INTO movies(id, user, userName, avatar, content, tempFilePath) VALUES (?, ?, ?, ?, ?, ?)',
        //   [id, user, userName, avatar, content, tempFilePath]
        // )
        await DB.query(`UPDATE  movies set user= "${user}", userName=" ${userName}", avatar= "${avatar}", content= "${content}", tempFilePath= "${tempFilePath}" where id = ${id};`)

        ctx.state.data = {}
    }
}