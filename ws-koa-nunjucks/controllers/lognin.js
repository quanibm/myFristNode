"use strict";

module.exports = {
  "GET /lognin": async (ctx, next) => {
    console.log("我被请求了!");
    ctx.response.body = "您好,您成功登录了!";
  }
};
