"use strict";

module.exports = {
  "POST /dizhi": async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.response.body = { msg: "请求成功了." };
    /**返回体需要使用text() 方法或者json()方法解析 */
  }
};
