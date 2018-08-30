"use strict";
/**关于跨域的简单dome
 *
 */
var Koa = require("koa");
var router = require("koa-router")();
var cors = require("koa-cors");
var app = new Koa();

app.use(cors());

router.get("/", async (ctx, next) => {
  ctx.response.body = { msg: "hello world!" };
});

app.use(router.routes());

app.listen(3333);
