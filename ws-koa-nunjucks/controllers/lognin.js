"use strict";

module.exports = {
  "GET /lognin": async (ctx, next) => {
    console.log("我被请求了!");
    ctx.response.body = { msg: "请求成功了." };
    /**返回体需要使用text() 方法或者json()方法解析 */
  }
};
